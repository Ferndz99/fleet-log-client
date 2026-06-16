import { RefreshCw } from "lucide-react"   // o usa <i class="ti ti-refresh"> si no usas lucide
import { Button } from "#/components/ui/button"

interface RefreshButtonProps {
    refetch: () => void
    isFetching: boolean
    className?: string;
}

export function RefreshInfoButton({ refetch, isFetching, className }: RefreshButtonProps) {

    return (
        <Button
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Recargar datos"
            className={className}
        >
            <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
        </Button>
    )
}