import { useQuery } from "@tanstack/react-query";
import { fetchVehiclePatent } from "../services/logs-api";

export function useVehicleByPatent(patent: string) {
	return useQuery({
		queryKey: ["vehicles", "patent", patent],
		queryFn: () => fetchVehiclePatent(patent),
		enabled: !!patent,
        staleTime: 30_000,
	});
}
