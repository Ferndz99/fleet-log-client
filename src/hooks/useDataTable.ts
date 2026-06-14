import {
	useReactTable,
	getCoreRowModel,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table";

interface UseDataTableProps<T> {
	data: T[];
	columns: ColumnDef<T, any>[];
	sorting: SortingState;
	onSortingChange: (updater: any) => void;
}

export function useDataTable<T>({
	data,
	columns,
	sorting,
	onSortingChange,
}: UseDataTableProps<T>) {
	return useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualSorting: true,
		onSortingChange,
		state: { sorting },
	});
}
