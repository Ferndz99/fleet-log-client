// lib/handle-api-errors.ts
import axios from "axios";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function handleApiErrors<T extends FieldValues>(
	error: unknown,
	form: UseFormReturn<T>,
) {
	if (!axios.isAxiosError(error)) {
		form.setError("root" as Path<T>, { message: "Error inesperado" });
		return;
	}

	const data = error.response?.data;

	if (data?.code === "validation_error" && data?.errors) {
		data.errors.forEach(
			({ field, message }: { field: string; message: string }) => {
				form.setError(field as Path<T>, { message });
			},
		);
	} else {
		form.setError("root" as Path<T>, {
			message: data?.detail ?? "Error inesperado",
		});
	}
}
