import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

export interface RankingItem {
    id: number | string;
    label: string;
    secondaryLabel?: string;
    count: number;
}

interface RankingTableProps {
    title: string;
    items?: RankingItem[];
    countLabel?: string;
    emptyMessage?: string;
    onItemClick?: (item: RankingItem) => void;
}

function RankingTable({
    title,
    items,
    countLabel = "registros",
    emptyMessage = "No hay datos para mostrar",
    onItemClick
}: RankingTableProps) {



    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {items?.length === 0 ? (
                    <p className="text-muted-foreground text-sm">{emptyMessage}</p>
                ) : (
                    <Table>
                        <TableBody>
                            {items?.map((item) => (
                                <TableRow key={item.id}
                                    className="cursor-pointer transition-colors hover:bg-muted/50"
                                    onClick={() => onItemClick?.(item)}
                                    >
                                    {/* AGREGAR ACCESIBILIDAD DESPUES CON UN ENLACE !!!!!*/}
                                    <TableCell>
                                        <div className="font-medium">{item.label}</div>
                                        {item.secondaryLabel && (
                                            <div className="text-muted-foreground text-xs">
                                                {item.secondaryLabel}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="secondary">
                                            {item.count} {countLabel}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export default RankingTable;