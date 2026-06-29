import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestAddRemovePermissions } from "../types/permissions";
import { setPermissions } from "../services/permission-api";
import { toast } from "sonner";

export function useSetPermissions(groupId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RequestAddRemovePermissions) =>
			setPermissions(groupId, payload),
		onSuccess: () => {
			toast.success("Permisos modificados con exito!");
			queryClient.invalidateQueries({ queryKey: ["group"] });
		},
		onError: () => {
			toast.error("Error al modificar permisos");
		},
	});
}
