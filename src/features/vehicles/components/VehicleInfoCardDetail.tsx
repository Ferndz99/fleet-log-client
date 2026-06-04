import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { VehicleDetail } from "../types/vehicle";
import VehicleInfoCardDetailSkeleton from "./VehicleInfoCardDetailSkeleton";

interface VehicleInfoCardDetailProps {
	vehicle?: VehicleDetail;
	isLoading: boolean;
}

function VehicleInfoCardDetail({
	vehicle,
	isLoading,
}: VehicleInfoCardDetailProps) {
	if (isLoading) {
		return <VehicleInfoCardDetailSkeleton />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Información del vehículo</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<p className="text-muted-foreground">Patente</p>

						<p>{vehicle?.patent}</p>
					</div>

					<div>
						<p className="text-muted-foreground">Marca</p>

						<p>{vehicle?.brand}</p>
					</div>

					<div>
						<p className="text-muted-foreground">Modelo</p>

						<p>{vehicle?.model}</p>
					</div>

					<div>
						<p className="text-muted-foreground">Año</p>

						<p>{vehicle?.year}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default VehicleInfoCardDetail;
