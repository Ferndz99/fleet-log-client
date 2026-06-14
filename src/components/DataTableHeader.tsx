import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableHeaderProps<T> {
    headerGroups: HeaderGroup<T>[];
}

export function DataTableHeader<T>({ headerGroups }: DataTableHeaderProps<T>) {
    return (
        <TableHeader>
            {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.hiddenOnMobile ? "hidden sm:table-cell" : ""}>
                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                <button
                                    type="button"
                                    className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" && <ArrowUp size={14} />}
                                    {header.column.getIsSorted() === "desc" && <ArrowDown size={14} />}
                                    {!header.column.getIsSorted() && (
                                        <ArrowUpDown size={14} className="text-muted-foreground" />
                                    )}
                                </button>
                            ) : (
                                <span>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </span>
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    );
}