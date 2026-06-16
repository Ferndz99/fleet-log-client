import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLogStatus } from "../services/logs-api";
import type {
	LogDetail,
	LogStatus,
	UpdateLogStatusPayload,
} from "../types/logs";
import { toast } from "sonner";

export function useUpdateLogStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			vehicleId,
			logId,
			payload,
		}: {
			vehicleId: number;
			logId: number;
			payload: UpdateLogStatusPayload;
		}) => updateLogStatus(vehicleId, logId, payload),
		onMutate: async ({ logId, vehicleId, payload }) => {
			// Cancela refetches en vuelo para evitar que sobreescriban el optimistic update
			await queryClient.cancelQueries({ queryKey: ["log", vehicleId, logId] });

			// Guarda el valor anterior por si hay que revertir
			const previousLog = queryClient.getQueryData(["log", vehicleId, logId]);

			// Actualiza el cache inmediatamente
			queryClient.setQueryData(["log", vehicleId, logId], (old: LogDetail) => ({
				...old,
				status: payload.status,
			}));

			return { previousLog };
		},

		onError: (err, { vehicleId, logId }, context) => {
			// Revierte al valor anterior si falla
			queryClient.setQueryData(["log", vehicleId, logId], context?.previousLog);
			toast.error("No se pudo actualizar el estado");
		},

		onSuccess: () => {
			toast.success("Estado actualizado");
		},

		onSettled: ({ vehicleId, logId }) => {
			// Sincroniza con el servidor al final, sin importar si fue éxito o error
			queryClient.invalidateQueries({ queryKey: ["log", vehicleId, logId] });
			queryClient.invalidateQueries({ queryKey: ["vehicle"] });
		},
		// onSuccess: () => {
		// 	toast.success("Estado actualizado");
		// 	queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
		// 	queryClient.invalidateQueries({
		// 		queryKey: ["logs"],
		// 	});
		// },
	});
}
