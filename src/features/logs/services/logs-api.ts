import type { VehicleDetail } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type { LogCreate } from "../types/logs";

export async function fetchVehiclePatent(
	patent: string,
): Promise<VehicleDetail> {
	// const res = await fetch(
	// 	`http://127.0.0.1:8000/api/v1/vehicles/by-patent/?patent=${patent}`,
	// );
	// if (!res.ok) throw new Error("Error");
	// return res.json();

	const {data} = await axiosInstance.get(`api/v1/vehicles/by-patent/?patent=${patent}`)
	return data
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

	// const res = await fetch(
	// 	`http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/logs/`,
	// 	{
	// 		method: "POST",
	// 		body: formData,
	// 	},
	// );
	// if (!res.ok) throw new Error("Error");
	// return res.json();
}
