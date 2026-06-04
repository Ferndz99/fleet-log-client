import VehiclesTable from "#/features/vehicles/components/VehiclesTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/vehicles/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<VehiclesTable />
		</div>
	);
}
