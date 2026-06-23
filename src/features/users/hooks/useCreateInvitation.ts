import type { UseFormReturn } from "react-hook-form";
import type { InvitationCreate } from "../types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvitation } from "../services/users-api";
import { toast } from "sonner";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface UseCreateInvitationParams {
	form: UseFormReturn<InvitationCreate>;
	onSuccess?: () => void;
}

export function useCreateInvitation({
	form,
	onSuccess,
}: UseCreateInvitationParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: InvitationCreate) => createInvitation(payload),
		onSuccess: () => {
			toast.success("Invitacion creada con exito!");
			form.reset();
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
