import type { UseFormReturn } from "react-hook-form";
import type { PasswordReset } from "../types/users";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../services/users-api";
import { toast } from "sonner";
import { handleApiErrors } from "#/lib/handle-api-errors";

interface UseRequestPasswordResetParams {
	form: UseFormReturn<PasswordReset>;
	onSuccess?: () => void;
}

export function useRequestPasswordReset({
	form,
	onSuccess,
}: UseRequestPasswordResetParams) {
	return useMutation({
		mutationFn: (payload: PasswordReset) => requestPasswordReset(payload),
		onSuccess: () => {
			toast.success("Correo de recuperacion de contraseña enviado!");
			form.reset();
			onSuccess?.();
		},
		onError: (error) => {
			handleApiErrors(error, form);
		},
	});
}
