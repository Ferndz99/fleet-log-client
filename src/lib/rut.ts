// utils/rut.ts

/**
 * Elimina puntos, guión y espacios, dejando solo el cuerpo numérico + dígito verificador.
 * Ej: "12.345.678-9" -> "123456789"
 */
export function cleanRut(value: string): string {
	return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

/**
 * Formatea un RUT al formato xx.xxx.xxx-x mientras el usuario escribe.
 * Acepta input parcial (mientras escribe) y completo.
 */
export function formatRut(value: string): string {
	const clean = cleanRut(value);

	if (clean.length === 0) return "";

	// Separar cuerpo y dígito verificador (último carácter)
	const body = clean.slice(0, -1);
	const dv = clean.slice(-1);

	if (body.length === 0) {
		return dv;
	}

	// Agregar puntos de miles al cuerpo, de derecha a izquierda
	const bodyFormatted = body
		.split("")
		.reverse()
		.reduce((acc, digit, index) => {
			const separator = index > 0 && index % 3 === 0 ? "." : "";
			return digit + separator + acc;
		}, "");

	return `${bodyFormatted}-${dv}`;
}

/**
 * Valida que el RUT tenga el formato correcto y que el dígito verificador sea válido.
 * Útil para usar junto a zod/yup en el schema del formulario.
 */
export function isValidRut(value: string): boolean {
	const clean = cleanRut(value);
	if (clean.length < 2) return false;

	const body = clean.slice(0, -1);
	const dv = clean.slice(-1);

	let sum = 0;
	let multiplier = 2;

	for (let i = body.length - 1; i >= 0; i--) {
		sum += parseInt(body[i], 10) * multiplier;
		multiplier = multiplier === 7 ? 2 : multiplier + 1;
	}

	const expectedDv = 11 - (sum % 11);
	const expectedDvStr =
		expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString();

	return dv === expectedDvStr;
}
