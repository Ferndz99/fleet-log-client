import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import type { VehicleDetail } from "../types/vehicle";
import { VehicleHeaderSkeleton } from "./VehicleHeaderDetailSkeleton";

interface VehicleHeaderProps {
	vehicle?: VehicleDetail;
	isLoading: boolean;
}

function VehicleHeaderDetail({ vehicle, isLoading }: VehicleHeaderProps) {
	if (isLoading) {
		return <VehicleHeaderSkeleton />;
	}

	// if (!vehicle) {
	// 	return null;
	// }

	return (
		<Card>
			<CardContent className="flex items-center justify-between p-6">
				<div>
					<h1 className="text-3xl font-bold">{vehicle?.patent}</h1>

					<p className="text-muted-foreground">
						{vehicle?.brand} {vehicle?.model} ({vehicle?.year})
					</p>
				</div>

				<Button size={"lg"}>Agregar registro</Button>
			</CardContent>
		</Card>
	);
}

export default VehicleHeaderDetail;
