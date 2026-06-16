import axiosInstance from "#/lib/axios";
import type {
	LogCreate,
	LogDetail,
	LogStatus,
	UpdateLogStatusPayload,
} from "../types/logs";

export async function fetchLog(
	vehicleId: number,
	logId: number,
): Promise<LogDetail> {
	const { data } = await axiosInstance.get(
		`api/v1/vehicles/${vehicleId}/logs/${logId}`,
	);
	return data;
}

export async function createLog(vehicleId: number, payload: LogCreate) {
	const formData = new FormData();
	formData.append("title", payload.title);
	formData.append("detail", payload.detail);
	formData.append("type", payload.type);
	formData.append("status", payload.status);
	payload.files.forEach((file) => {
		formData.append("files", file);
	});

	const { data } = await axiosInstance.post(
		`/api/v1/vehicles/${vehicleId}/logs/`,
		formData,
	);

	return data;
}

export async function updateLogStatus(
	vehicleId: number,
	logId: number,
	payload: UpdateLogStatusPayload,
) {

	const { data } = await axiosInstance.patch(
		`http://localhost:8000/api/v1/vehicles/${vehicleId}/logs/${logId}/status/`,
		payload,
	);

	return data;
}
