import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateMembership } from "../services/memberships-api";
import { toast } from "sonner";

export function useActivateMembership(membershipId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => activateMembership(membershipId),
		onSuccess: () => {
			toast.success("Membresia activada con exito!");
			queryClient.invalidateQueries({ queryKey: ["memberships"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: () => {
			toast.error("Error al activar membresia");
		},
	});
}
