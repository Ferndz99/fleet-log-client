import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleStatsDetailSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			{/* Tarjeta 1: Total registros */}
			<Card>
				<CardHeader>
					{/* Mantenemos el CardTitle textual ya que el texto es estático, 
              o puedes reemplazarlo por un Skeleton si prefieres ocultar el título durante la carga */}
					<CardTitle>Total registros</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Imita el número grande de logCount (text-3xl) */}
					<Skeleton className="h-9 w-16" />
				</CardContent>
			</Card>

			{/* Tarjeta 2: Última actividad */}
			<Card>
				<CardHeader>
					<CardTitle>Última actividad</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Imita la fecha o texto de última actividad */}
					<Skeleton className="h-5 w-40" />
				</CardContent>
			</Card>
		</div>
	);
}
