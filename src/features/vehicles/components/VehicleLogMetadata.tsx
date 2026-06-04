import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { LogDetail } from "../types/vehicle";

function getInitials(email: string) {
	return email
		.split("@")[0]
		.split(".")
		.map((part) => part[0])
		.join("")
		.toUpperCase();
}

interface VehicleLogMetadataProps {
	log?: LogDetail;
}

function VehicleLogMetadata({ log }: VehicleLogMetadataProps) {
	const logDate = log?.created_at ? new Date(log.created_at) : undefined;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Información</CardTitle>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarFallback>
							{getInitials(log?.created_by.email)}
						</AvatarFallback>
					</Avatar>

					<div>
						<p className="text-xs text-muted-foreground">Creado por</p>
						<p className="font-medium">{log?.created_by.email}</p>
					</div>
				</div>

				<div className="space-y-3 text-sm">
					<div>
						<p className="text-muted-foreground">Estado</p>
						<p>{log?.status}</p>
					</div>

					<div>
						<p className="text-muted-foreground">Tipo</p>
						<p>{log?.type}</p>
					</div>

					<div>
						<p className="text-muted-foreground">Fecha</p>
						<p>
							{logDate
								? logDate.toLocaleDateString("es-ES", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})
								: "Fecha no disponible"}
						</p>
					</div>

					<div>
						<p className="text-muted-foreground">Hora</p>
						<p>
							{logDate
								? logDate.toLocaleTimeString("es-ES", {
									hour: "2-digit",
									minute: "2-digit",
								})
								: ""}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default VehicleLogMetadata;
