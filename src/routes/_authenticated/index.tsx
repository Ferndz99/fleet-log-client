import { createFileRoute } from "@tanstack/react-router";

import TableExample from "#/features/dashboard/components/TableExample";
import ChartExample from "#/features/dashboard/components/ChartExample";
import KpiCard from "#/features/dashboard/components/KpiCard";

export const Route = createFileRoute("/_authenticated/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<KpiCard />
				<KpiCard />
				<KpiCard />
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<ChartExample />
				<ChartExample />
			</div>
			<div>
				<TableExample />
			</div>
		</div>
	);
}
