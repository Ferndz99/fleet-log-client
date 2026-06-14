import { Button } from "#/components/ui/button";

interface DataTablePaginationProps {
    page: number;
    totalPages: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({
    page,
    totalPages,
    isLoading,
    onPageChange,
}: DataTablePaginationProps) {
    const isFirst = page === 1 || isLoading;
    const isLast = page === totalPages || totalPages === 0 || isLoading;

    return (
        <div className="flex items-center justify-center lg:justify-between mt-4">
            <p className="text-sm text-muted-foreground hidden lg:visible">
                Página {page} de {totalPages || 1}
            </p>
            <div className="flex items-center gap-2">
                <Button className="hidden sm:inline-flex"  variant="outline" size="sm" onClick={() => onPageChange(1)} disabled={isFirst}>«</Button>
                <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={isFirst}>Anterior</Button>
                <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={isLast}>Siguiente</Button>
                <Button className="hidden sm:inline-flex"  variant="outline" size="sm" onClick={() => onPageChange(totalPages)} disabled={isLast}>»</Button>
            </div>
        </div>
    );
}