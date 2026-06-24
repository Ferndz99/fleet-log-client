import { createFileRoute, useNavigate } from "@tanstack/react-router";

import TableExample from "#/features/dashboard/components/TableExample";
import ChartExample from "#/features/dashboard/components/ChartExample";
import KpiCard from "#/features/dashboard/components/KpiCard";
import { useDashboardStats } from "#/features/dashboard/hooks/useDashboardStats";
import { AlertTriangle, Car, CircleAlert } from "lucide-react";
import LogsByTypeStatusChart from "#/features/dashboard/components/LogsByTypeStatusChart";
import type { RankingItem } from "#/features/dashboard/components/RankingTable";
import RankingTable from "#/features/dashboard/components/RankingTable";
import type { RecentLog } from "#/features/dashboard/types/dashboard";
import RecentLogsTable from "#/features/dashboard/components/RecentLogsTable";
import MediaSummaryCard from "#/features/dashboard/components/MediaSummaryCard";

export const Route = createFileRoute("/_authenticated/_dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {

	const navigate = useNavigate()


	const { data, isLoading, isError } = useDashboardStats()

	const vehicleItems: RankingItem[] = data?.top_vehicles_by_logs.map((v) => ({
		id: v.vehicle_id,
		label: `${v.brand} ${v.model}`,
		secondaryLabel: v.patent,
		count: v.log_count,
	}));

	const userItems: RankingItem[] = data?.top_users_by_logs.map((u) => ({
		id: u.user_id,
		label: u.full_name,
		secondaryLabel: u.email,
		count: u.log_count,
	}));

	const recentLogs: RecentLog[] = data?.recent_logs.map((log) => ({
		id: log.id,
		title: log.title,
		type: log.type,
		status: log.status,
		createdAt: log.created_at,
		vehiclePatent: log.vehicle.patent,
		createdByEmail: log.created_by.email,
		mediaCount: log.media_count,
	}));


	if (isError) {
		return <div>error</div>
	}

	return (
		<div className="space-y-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<KpiCard title="Vehículos totales" value={data?.summary.total_vehicles} isLoading={isLoading} icon={Car} />
				<KpiCard title="Incidentes pendientes" value={data?.summary.pending_incidents} variant="alert" icon={AlertTriangle} isLoading={isLoading} />
				<KpiCard title="Registros pendientes" value={data?.summary.pending_logs} isLoading={isLoading} icon={CircleAlert} />

			</div>

			<div className="grid gap-4 lg:grid-cols-[6fr_4fr]">
				{/* <ChartExample />
				<ChartExample /> */}
				<LogsByTypeStatusChart data={data?.logs_by_type_and_status} />
				<MediaSummaryCard totalMedia={data?.media_summary.total_media} photos={data?.media_summary.photos} videos={data?.media_summary.videos} logsWithoutMedia={data?.media_summary.logs_without_media} />
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				<RankingTable title="Vehículos con más registros" items={vehicleItems} onItemClick={(item) =>
					navigate({
						to: "/vehicles/$vehiclesId",
						params: { vehiclesId: String(item.id) },
					})
				} />
				<RankingTable title="Usuarios con más registros" items={userItems} />
			</div>
			<div>
				<RecentLogsTable logs={recentLogs} />
			</div>
		</div>
	);
}
