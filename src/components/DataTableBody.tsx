import { flexRender, type Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "#/components/ui/table";

interface DataTableBodyProps<T> {
    rows: Row<T>[];
    columnsCount: number;
    isLoading: boolean;
    isError: boolean;
}

export function DataTableBody<T>({
    rows,
    columnsCount,
    isLoading,
    isError,
}: DataTableBodyProps<T>) {
    return (
        <TableBody>
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={columnsCount} className="text-center">
                        Cargando...
                    </TableCell>
                </TableRow>
            ) : isError ? (
                <TableRow>
                    <TableCell colSpan={columnsCount} className="text-center text-destructive">
                        Error al cargar los datos
                    </TableCell>
                </TableRow>
            ) : rows.length ? (
                rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {

                            const isMobileHidden = cell.column.columnDef.meta?.hiddenOnMobile;

                            return (
                                <TableCell key={cell.id} className={isMobileHidden ? "hidden sm:table-cell" : ""}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={columnsCount} className="text-center">
                        No hay resultados
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
}