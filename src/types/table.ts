// types/table.ts
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData, TValue> {
		label?: string; // etiqueta visible en modo tarjeta
		hiddenOnMobile?: boolean; // columnas a ocultar en móvil
	}
}
