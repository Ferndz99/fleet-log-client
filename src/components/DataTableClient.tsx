import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "./ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { TablePagination } from "./TablePagination";


interface DataTableClientProps<T> {
    columns: ColumnDef<T, any>[];
    data: T[];
    isLoading: boolean;
    isError: boolean;
    toolbar?: React.ReactNode;
}

function DataTableClient<T>({
    columns, data, isLoading, isError, toolbar
}: DataTableClientProps<T>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        state: { sorting, pagination },
    });

    return (
        <>
            {toolbar && <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">{toolbar}</div>}
            <Table>
                <DataTableHeader headerGroups={table.getHeaderGroups()} />
                <DataTableBody
                    rows={table.getRowModel().rows}
                    columnsCount={columns.length}
                    isLoading={isLoading}
                    isError={isError}
                />
            </Table>
            <TablePagination table={table} />
        </>
    )
}

export default DataTableClient