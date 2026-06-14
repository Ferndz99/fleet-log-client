import { useQuery } from "@tanstack/react-query";
import { fetchVehicleByPatent } from "../services/vehicles-api";

export function useVehicleByPatent(patent: string) {
	return useQuery({
		queryKey: ["vehicles", "patent", patent],
		queryFn: () => fetchVehicleByPatent(patent),
		placeholderData: (prev) => prev,
		enabled: !!patent,
		staleTime: 30_000,
	});
}
