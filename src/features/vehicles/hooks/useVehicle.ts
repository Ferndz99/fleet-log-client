import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "../services/vehicles-api";

export function useVehicle(vehicleId: number) {
	return useQuery({
		queryKey: ["vehicle", vehicleId],
		queryFn: () => fetchVehicle(vehicleId),
		staleTime: 30_000,
	});
}
