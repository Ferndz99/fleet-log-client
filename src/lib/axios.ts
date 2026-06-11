// src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "/", // ← Vite usa import.meta.env import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
});

// REQUEST: adjunta el token
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// RESPONSE: maneja expiración con cola
let isRefreshing = false;
let failedQueue: {
	resolve: (token: string) => void;
	reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		error ? prom.reject(error) : prom.resolve(token!);
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

        const isLoginRequest = originalRequest.url?.includes("/auth/login/");

		if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
			if (isRefreshing) {
				// encola peticiones mientras se refresca
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axiosInstance(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data } = await axiosInstance.post(
					"/api/v1/auth/jwt/refresh/",
					{},
				);
				const newToken = data.access;

				localStorage.setItem("access_token", newToken);
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				processQueue(null, newToken);

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				localStorage.removeItem("access_token");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
