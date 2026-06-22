import type { UseFormReturn } from "react-hook-form";
import type { PasswordResetConfirm } from "../types/users";
import { useMutation } from "@tanstack/react-query";
import { passwordResetConfirm } from "../services/users-api";
import { toast } from "sonner";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface UsePasswordResetConfirmParams {
	form: UseFormReturn<PasswordResetConfirm>;
	onSuccess?: () => void;
	uid: string;
	token: string;
}

export function usePasswordResetConfirm({
	form,
	onSuccess,
	uid,
	token,
}: UsePasswordResetConfirmParams) {
	return useMutation({
		mutationFn: (payload: PasswordResetConfirm) =>
			passwordResetConfirm(payload, uid, token),
		onSuccess: () => {
			toast.success("Contraseña cambiada!");
			form.reset();
			onSuccess?.();
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
