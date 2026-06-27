import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestAddRemoveUsers } from "../types/permissions";
import { setUsers } from "../services/permission-api";
import { toast } from "sonner";

export function useSetUsers(groupId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RequestAddRemoveUsers) => setUsers(groupId, payload),
		onSuccess: () => {
			toast.success("Usuario(s) modifcados con exito!");
			queryClient.invalidateQueries({ queryKey: ["group"] });
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: () => {
			toast.error("Error al modificar usuario(s)");
		},
	});
}
