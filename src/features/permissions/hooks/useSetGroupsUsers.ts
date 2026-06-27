import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestAddGroupsToUser } from "../types/permissions";
import { setGroupsToUsers } from "../services/permission-api";
import { toast } from "sonner";

export function useSetGroupsUsers(userId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RequestAddGroupsToUser) =>
			setGroupsToUsers(userId, payload),
		onSuccess: () => {
			toast.success("Permisos modificados con exito!");
			queryClient.invalidateQueries({ queryKey: ["groups"] });
			queryClient.invalidateQueries({ queryKey: ["group"] });
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: () => {
			toast.error("Error al modificar permisos");
		},
	});
}
