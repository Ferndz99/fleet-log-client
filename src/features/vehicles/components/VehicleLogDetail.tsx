import { Badge } from "#/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import type { LogDetail } from "../types/vehicle";


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
	};

	return (

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

				<p className="">{log?.detail}</p>
			</CardContent>
		</Card>

	);
}

export default VehicleLogDetail;
