import type {
	LogDetail,
	PaginatedResponse,
	Vehicle,
	VehicleDetail,
	VehiclesParams,
} from "../types/vehicle";

export async function fetchVehicles(
	params: VehiclesParams,
): Promise<PaginatedResponse<Vehicle>> {
	const query = new URLSearchParams();
	if (params.search) query.set("search", params.search);
	if (params.ordering) query.set("ordering", params.ordering);
	if (params.page && params.page > 1) query.set("page", String(params.page));

	const res = await fetch(`http://127.0.0.1:8000/api/v1/vehicles/?${query}`);
	if (!res.ok) throw new Error("Error al obtener vehículos");
	return res.json();
}

export async function fetchVehicle(vehicleId: number): Promise<VehicleDetail> {
	const res = await fetch(
		`http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/`,
	);
	if (!res.ok) throw new Error("Error");
	return res.json();
}

export async function fetchVehicleLog(
	vehicleId: number,
	logId: number,
): Promise<LogDetail> {
	const res = await fetch(
		`http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/logs/${logId}`,
	);
	if (!res.ok) throw new Error("Error");
	return res.json();
}
