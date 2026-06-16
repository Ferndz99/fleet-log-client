import { type Table } from "@tanstack/react-table";
import { Button } from "#/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "#/components/ui/select";

interface TablePaginationProps<T> {
    table: Table<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
    return (
        <div className="flex flex-col items-center gap-2 mt-4 p-4 md:flex-row md:justify-between">
            <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                    Filas por página
                </span>
                <Select
                    value={String(table.getState().pagination.pageSize)}
                    onValueChange={(value) => table.setPageSize(Number(value))}
                >
                    <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={String(pageSize)}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <p className="hidden lg:block text-sm text-muted-foreground">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount() || 1}
            </p>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>«</Button>
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Anterior</Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Siguiente</Button>
                <Button variant="outline" size="sm" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>»</Button>
            </div>


        </div>
    );
}