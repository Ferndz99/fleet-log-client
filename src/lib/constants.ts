export const PAGE_SIZE = 10;

export const passwordRequirements = [
	{
		label: "Al menos 8 caracteres",
		test: (value: string) => value.length >= 8,
	},
	{
		label: "Una letra mayúscula",
		test: (value: string) => /[A-Z]/.test(value),
	},
	{
		label: "Una letra minúscula",
		test: (value: string) => /[a-z]/.test(value),
	},
	{
		label: "Un número",
		test: (value: string) => /[0-9]/.test(value),
	},
	{
		label: "Un carácter especial",
		test: (value: string) => /[^A-Za-z0-9]/.test(value),
	},
];

export const statusLabel = {
	Incident: "Incidente",
	Maintenance: "Mantenimiento",
	Observation: "Observacion",
	Cleaning: "Limpieza",
};
