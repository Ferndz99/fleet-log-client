import { useQuery } from "@tanstack/react-query";
import { fetchLog } from "../services/logs-api";

export function useLog(vehicleId: number, logId: number) {
	return useQuery({
		queryKey: ["log", vehicleId, logId],
		queryFn: () => fetchLog(vehicleId, logId),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
