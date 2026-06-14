import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { Table } from "#/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";
import { useDataTable } from "#/hooks/useDataTable";

interface DataTableProps<T> {
    columns: ColumnDef<T, any>[];
    data: T[];
    isLoading: boolean;
    isError: boolean;
    sorting: SortingState;
    onSortingChange: (updater: any) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    toolbar?: React.ReactNode; // ← slot para search + botones
}

export function DataTable<T>({
    columns, data, isLoading, isError,
    sorting, onSortingChange,
    page, totalPages, onPageChange,
    toolbar,
}: DataTableProps<T>) {
    const table = useDataTable({ data, columns, sorting, onSortingChange });

    return (
        <>
            {toolbar && <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">{toolbar}</div>}
            <div>
                <Table>
                    <DataTableHeader headerGroups={table.getHeaderGroups()} />
                    <DataTableBody
                        rows={table.getRowModel().rows}
                        columnsCount={columns.length}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </Table>
            </div>
            <DataTablePagination
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                onPageChange={onPageChange}
            />
        </>
    );
}