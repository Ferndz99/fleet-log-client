import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateMembership } from "../services/memberships-api";
import { toast } from "sonner";

export function useDeactivateMembership(membershipId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => deactivateMembership(membershipId),
		onSuccess: () => {
			toast.success("Membresia desactivada con exito!");
			queryClient.invalidateQueries({ queryKey: ["memberships"] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: () => {
			toast.error("Error al desactivar membresia");
		},
	});
}
