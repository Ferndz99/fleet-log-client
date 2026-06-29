import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPermissionToGroup } from "../services/permission-api";
import type { RequestAddRemovePermissions } from "../types/permissions";
import { toast } from "sonner";

export function useGroupAddPermissions(groupId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RequestAddRemovePermissions) =>
			addPermissionToGroup(groupId, payload),
		onSuccess: () => {
			toast.success("Permisos agregados con exito!");
			queryClient.invalidateQueries({ queryKey: ["group"] });
		},
        onError: () => {
			toast.error("Error al activar membresia");
		},
	});
}
