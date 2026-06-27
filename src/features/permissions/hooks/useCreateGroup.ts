import type { UseFormReturn } from "react-hook-form";
import type { RequestGroup } from "../types/permissions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../services/permission-api";
import { toast } from "sonner";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface UseCreateGroupParams {
	form: UseFormReturn<RequestGroup>;
	onSuccess?: () => void;
}

export function useCreateGroup({ form, onSuccess }: UseCreateGroupParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RequestGroup) => createGroup(payload),
		onSuccess: () => {
			toast.success("Registro creado con éxito!");
			form.reset();
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
