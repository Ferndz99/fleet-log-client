import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "#/components/ui/popover";
import { Button } from "#/components/ui/button";
import { Info } from "lucide-react";

interface TableInfoPopoverProps {
    title?: string;
    description: string;
    side?: "top" | "right" | "bottom" | "left";
}

function TableInfoPopover({
    title,
    description,
    side = "top",
}: TableInfoPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent side={side} className="w-72 text-sm space-y-1">
                {title && (
                    <p className="font-medium text-sm">{title}</p>
                )}

                <p className="text-muted-foreground">
                    {description}
                </p>
            </PopoverContent>
        </Popover>
    );
}

export default TableInfoPopover;