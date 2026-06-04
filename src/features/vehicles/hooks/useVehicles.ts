import { useQuery } from "@tanstack/react-query";
import type { VehiclesParams } from "../types/vehicle";
import { fetchVehicles } from "../services/vehicles-api";


export function useVehicles(params: VehiclesParams) {
	return useQuery({
		queryKey: ["vehicles", params], // se refetchea automáticamente cuando params cambia
		queryFn: () => fetchVehicles(params),
		placeholderData: (prev) => prev, // mantiene los datos anteriores mientras carga (evita el flash vacío)
		staleTime: 30_000, // considera los datos frescos por 30s
	});
}


