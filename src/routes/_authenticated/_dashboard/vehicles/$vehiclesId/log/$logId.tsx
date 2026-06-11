import BackButton from "#/components/BackButton";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Calendar } from "#/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { Skeleton } from "#/components/ui/skeleton";
import VehicleLogDetail from "#/features/vehicles/components/VehicleLogDetail";
import VehicleLogDetailSkeleton from "#/features/vehicles/components/VehicleLogDetailSkeleton";
import VehicleLogMediaGallery from "#/features/vehicles/components/VehicleLogMediaGallery";
import VehicleLogMetadata from "#/features/vehicles/components/VehicleLogMetadata";
import { useLog } from "#/features/vehicles/hooks/useLog";
import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute(
	"/_authenticated/_dashboard/vehicles/$vehiclesId/log/$logId",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { vehiclesId, logId } = Route.useParams();

	const { data, isLoading, error, isError } = useLog(
		Number(vehiclesId),
		Number(logId),
	);

	if (isLoading || isError) {
		return <VehicleLogDetailSkeleton />;
	}

	return (
		<div className="space-y-4">
			<BackButton fallbackTo={`/vehicles/${vehiclesId}`} />
			<div className="grid gap-4 lg:grid-cols-5">
				<div className="lg:col-span-3 h-full">
					<VehicleLogDetail log={data} />
				</div>
				<div className="lg:col-span-2">
					<VehicleLogMetadata log={data} />
				</div>
			</div>
			<VehicleLogMediaGallery files={data?.media_files} />
		</div>
	);
}
