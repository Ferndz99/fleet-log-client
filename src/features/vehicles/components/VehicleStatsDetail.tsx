import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { VehicleStatsDetailSkeleton } from "./VehicleStatsDetailSkeleton";

interface VehicleStatsProps {
	logCount?: number;
	lastActivity?: string;
	isLoading: boolean;
}

function VehicleStatsDetail({
	logCount,
	lastActivity,
	isLoading,
}: VehicleStatsProps) {
	if (isLoading) {
		return <VehicleStatsDetailSkeleton />;
	}

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Total registros</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-3xl font-bold">{logCount}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Última actividad</CardTitle>
				</CardHeader>

				<CardContent>
					<p>{lastActivity}</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default VehicleStatsDetail;
