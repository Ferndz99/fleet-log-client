import type { SortingState } from "@tanstack/react-table";

export function toOrdering(
	sorting: SortingState,
	columnMap: Record<string, string> = {},
): string {
	if (!sorting.length) return "";
	const { id, desc } = sorting[0];
	const field = columnMap[id] ?? id;
	return desc ? `-${field}` : field;
}
