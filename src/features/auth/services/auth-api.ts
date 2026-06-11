import axiosInstance from "#/lib/axios";

export const authService = {
	login: async (email: string, password: string) => {
		const response = await axiosInstance.post("/api/v1/auth/login/", {
			email,
			password,
		});
		return response.data;
	},

	logout: async () => {
		const response = await axiosInstance.post("/api/v1/auth/logout/", {});
		return response.data;
	},

	getCurrentUser: async () => {
		const response = await axiosInstance.get("/api/v1/users/me/");
		return response.data;
	},


	requestPasswordReset: async ({ email }: { email: string }) => {
		const response = await axiosInstance.post(
			"/api/v1/users/reset_password/",
			{ email },
		);
		return response.data;
	},

	confirmPasswordReset: async ({
		uid,
		token,
		new_password,
		re_new_password,
	}: {
		uid: string;
		token: string;
		new_password: string;
		re_new_password: string;
	}) => {
		const response = await axiosInstance.post(
			"/api/v1/users/reset_password_confirm/",
			{ uid, token, new_password, re_new_password },
		);
		return response.data;
	},
	verifyToken: async () => {
		const response = await axiosInstance.get("/api/v1/auth/verify/");
		return response.data;
	},
};
