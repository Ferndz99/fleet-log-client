import BackButton from "#/components/BackButton";
import VehicleHeaderDetail from "#/features/vehicles/components/VehicleHeaderDetail";
import VehicleInfoCardDetail from "#/features/vehicles/components/VehicleInfoCardDetail";
import VehicleLogsTable from "#/features/vehicles/components/VehicleLogsTable";
import VehicleStatsDetail from "#/features/vehicles/components/VehicleStatsDetail";
import { useVehicle } from "#/features/vehicles/hooks/useVehicle";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/vehicles/$vehiclesId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { vehiclesId } = Route.useParams();
	const matchRoute = useMatchRoute();
	const isChildRoute = matchRoute({ to: "/vehicles/$vehiclesId/log/$logId" });

	const { data, isLoading, error, refetch, isFetching, isError } = useVehicle(Number(vehiclesId));

	if (isChildRoute) return <Outlet />;

	if (error) return <div>Error al cargar el vehículo</div>;

	return (
		<div className="space-y-4">
			<BackButton fallbackTo="/vehicles/" />
			<VehicleHeaderDetail vehicle={data} isLoading={isLoading} />
			<VehicleStatsDetail
				logCount={data?.logs.length}
				lastActivity={data?.logs[0]?.created_at}
				isLoading={isLoading}
			/>
			<VehicleInfoCardDetail vehicle={data} isLoading={isLoading} />
			<VehicleLogsTable logs={data?.logs} vehicleId={Number(vehiclesId)} refetch={refetch} isFetching={isFetching} isLoading={isLoading} isError={isError} />
		</div>
	);
}
