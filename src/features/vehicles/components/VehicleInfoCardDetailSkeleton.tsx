import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function VehicleInfoCardDetailSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Información del vehículo</CardTitle>
			</CardHeader>

			<CardContent>
				{/* Mantenemos exactamente la misma estructura de grilla */}
				<div className="grid gap-4 md:grid-cols-2">
					{/* Patente */}
					<div className="space-y-1">
						<p className="text-muted-foreground">Patente</p>
						<Skeleton className="h-5 w-24" />
					</div>

					{/* Marca */}
					<div className="space-y-1">
						<p className="text-muted-foreground">Marca</p>
						<Skeleton className="h-5 w-32" />
					</div>

					{/* Modelo */}
					<div className="space-y-1">
						<p className="text-muted-foreground">Modelo</p>
						<Skeleton className="h-5 w-28" />
					</div>

					{/* Año */}
					<div className="space-y-1">
						<p className="text-muted-foreground">Año</p>
						<Skeleton className="h-5 w-16" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default VehicleInfoCardDetailSkeleton;
