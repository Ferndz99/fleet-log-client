import { useQuery } from "@tanstack/react-query";
import { fetchVehicleLog } from "../services/vehicles-api";

export function useLog(vehicleId: number, logId: number) {
	return useQuery({
		queryKey: ["log", vehicleId, logId],
		queryFn: () => fetchVehicleLog(vehicleId, logId),
		staleTime: 30_000,
	});
}
