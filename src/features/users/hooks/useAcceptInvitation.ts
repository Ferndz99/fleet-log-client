import type { UseFormReturn } from "react-hook-form";
import type { InvitationAccept, InvitationAcceptBasic } from "../types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvitation } from "../services/users-api";
import { toast } from "sonner";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface useAcceptInvitationProps {
	form: UseFormReturn<InvitationAcceptBasic>;
	onSuccess?: () => void;
	token: string;
}

export function useAcceptInvitation({
	form,
	onSuccess,
	token,
}: useAcceptInvitationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: InvitationAcceptBasic) => acceptInvitation(payload, token),
		onSuccess: () => {
			toast.success("Usuario creado con exito!");
			form.reset();
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["invitations"] });
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
