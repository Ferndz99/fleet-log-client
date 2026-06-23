// utils/text.ts

/**
 * Capitaliza el primer carácter y deja el resto en minúsculas.
 * Ej: "juan" -> "Juan", "JUAN PEREZ" -> "Juan perez"
 */
export function capitalizeFirst(value: string): string {
	if (value.length === 0) return value;
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
