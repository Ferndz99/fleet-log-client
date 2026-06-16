import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LogCreate } from "../types/logs";
import { createLog } from "../services/logs-api";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface UseCreateLogParams {
	vehicleId: number;
	form: UseFormReturn<LogCreate>;
	onSuccess?: () => void;
}

export function useCreateLog({ vehicleId, form, onSuccess  }: UseCreateLogParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: LogCreate) => createLog(vehicleId, payload),
		onSuccess: () => {
			toast.success("Registro creado con éxito!");
			form.reset();
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
			queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
