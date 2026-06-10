import type { VehicleDetail } from "#/features/vehicles/types/vehicle";

export async function fetchVehiclePatent(
	patent: string,
): Promise<VehicleDetail> {
	const res = await fetch(
		`http://127.0.0.1:8000/api/v1/vehicles/by-patent/?patent=${patent}`,
	);
	if (!res.ok) throw new Error("Error");
	return res.json();
}

export interface LogCreate {
	title: string;
	detail: string;
	files: File[];
	type: string;
	status: string;
}

export async function createLog(vehicleId: number, data: LogCreate) {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("detail", data.detail);
	formData.append("type", data.type);
	formData.append("status", data.status);
	data.files.forEach((file) => {
		formData.append("files", file);
	});

	const res = await fetch(
		`http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/logs/`,
		{
			method: "POST",
			body: formData,
		},
	);
	if (!res.ok) throw new Error("Error");
	return res.json();
}
