import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

type LogType = "incident" | "maintenance" | "observation" | "cleaning";
type LogStatus = "pending" | "reviewed" | "resolved";

interface RecentLog {
    id: number;
    title: string;
    type: LogType;
    status: LogStatus;
    createdAt: string;
    vehiclePatent: string;
    createdByEmail: string;
    mediaCount: number;
}

interface RecentLogsTableProps {
    logs?: RecentLog[];
    onViewAll?: () => void;
    maxRows?: number;
}

const typeStyles: Record<LogType, string> = {
    incident: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    maintenance:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    observation:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    cleaning:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

const typeLabels: Record<LogType, string> = {
    incident: "Incidente",
    maintenance: "Mantenimiento",
    observation: "Observación",
    cleaning: "Limpieza",
};

const statusVariant: Record<LogStatus, "outline" | "secondary" | "default"> = {
    pending: "outline",
    reviewed: "secondary",
    resolved: "default",
};

const statusLabels: Record<LogStatus, string> = {
    pending: "Pendiente",
    reviewed: "Revisado",
    resolved: "Resuelto",
};

function RecentLogsTable({
    logs,
    onViewAll,
    maxRows = 8,
}: RecentLogsTableProps) {
    const visibleLogs = logs?.slice(0, maxRows);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Actividad reciente</CardTitle>
                {onViewAll && (
                    <Button variant="ghost" size="sm" onClick={onViewAll}>
                        Ver todo
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Vehículo</TableHead>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Adjuntos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visibleLogs?.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">{log.title}</TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-xs font-medium",
                                            typeStyles[log.type],
                                        )}
                                    >
                                        {typeLabels[log.type]}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[log.status]}>
                                        {statusLabels[log.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell>{log.vehiclePatent}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {log.createdByEmail}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {log.createdAt}
                                </TableCell>
                                <TableCell className="text-right">
                                    {log.mediaCount > 0 && (
                                        <div className="flex items-center justify-end gap-1 text-muted-foreground text-xs">
                                            <Paperclip className="h-3 w-3" />
                                            {log.mediaCount}
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default RecentLogsTable;