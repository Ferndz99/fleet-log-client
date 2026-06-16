import { Badge } from "#/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import { useUpdateLogStatus } from "#/features/logs/hooks/useUpdateLogStatus";
import type { LogDetail, LogStatus, UpdateLogStatusPayload } from "#/features/logs/types/logs";
// import type { LogDetail } from "../types/vehicle";


interface VehicleLogDetailProps {
	log?: LogDetail;
}

function VehicleLogDetail({ log }: VehicleLogDetailProps) {
	const statusColors: Record<string, string> = {
		pending:
			"bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100",
		resolved:
			"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100",
	};

	const typeLabels = {
		observation: "Observación",
		maintenance: "Mantenimiento",
		incident: "Incidente",
	};

	const statusLabels: Record<string, string> = {
		pending: "Pendiente",
		resolved: "Resuelto",
		reviewed: "revisado",
	};

	const updateLogStatus = useUpdateLogStatus()



	return (

		// <Card className="h-full flex flex-col">
		// 	<CardHeader className="pb-3">
		// 		<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
		// 			<CardTitle className="text-lg leading-snug sm:text-xl">
		// 				{log?.title}
		// 			</CardTitle>
		// 			<div className="flex flex-wrap gap-2 shrink-0">
		// 				<Badge variant="outline" className="h-7 text-xs">
		// 					{typeLabels[log?.type ?? ""] ?? log?.type}
		// 				</Badge>
		// 				<Badge
		// 					className={`${statusColors[log?.status ?? ""] || ""} capitalize border-none h-7 text-xs`}
		// 				>
		// 					{statusLabels[log?.status ?? ""] ?? log?.status}
		// 				</Badge>
		// 			</div>
		// 		</div>
		// 	</CardHeader>

		// 	<Separator />

		// 	<CardContent className="flex flex-col gap-5 pt-5 flex-1">
		// 		<div className="space-y-2">
		// 			<Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
		// 				Estado
		// 			</Label>
		// 			<Select value={log?.status}>
		// 				<SelectTrigger className="w-full sm:w-52">
		// 					<SelectValue />
		// 				</SelectTrigger>
		// 				<SelectContent position="popper">
		// 					<SelectItem value="pending">Pendiente</SelectItem>
		// 					<SelectItem value="reviewed">Revisado</SelectItem>
		// 					<SelectItem value="resolved">Resuelto</SelectItem>
		// 				</SelectContent>
		// 			</Select>
		// 		</div>

		// 		{log?.detail && (
		// 			<div className="space-y-2">
		// 				<Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
		// 					Detalle
		// 				</Label>
		// 				<p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
		// 					{log.detail}
		// 				</p>
		// 			</div>
		// 		)}
		// 	</CardContent>
		// </Card>

		<Card className="h-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					{/* <CardDescription>
									Vehículo #{log?.vehicle_id} • Log #{log?.id}
								</CardDescription> */}
					<CardTitle>
						{log?.title}
					</CardTitle>
					<div className="flex gap-2">
						<Badge variant="outline" className="h-7">
							{typeLabels[log?.type] ?? log?.type}
						</Badge>
						<Badge
							className={`${statusColors[log?.status ?? ""] || ""} capitalize border-none h-7`}
						>
							{statusLabels[log?.status] ?? log?.status}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Label>Estado</Label>

					<Select
						value={log?.status}
						disabled={updateLogStatus.isPending}
						onValueChange={(value) =>
							updateLogStatus.mutate({
								vehicleId: Number(log?.vehicle_id),
								logId: Number(log?.id),
								payload: { status: value } as UpdateLogStatusPayload
							})
						}
					>
						<SelectTrigger className="w-full sm:w-55">
							<SelectValue />
						</SelectTrigger>

						<SelectContent position="popper">
							<SelectItem value="pending">
								Pendiente
							</SelectItem>

							<SelectItem value="reviewed">
								Revisado
							</SelectItem>

							<SelectItem value="resolved">
								Resuelto
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label>
						Detalle
					</Label>
					<p className="">{log?.detail}</p>
				</div>
			</CardContent>
		</Card>

	);
}

export default VehicleLogDetail;
