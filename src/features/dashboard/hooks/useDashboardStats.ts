import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/dashboard-api";

export function useDashboardStats() {
	return useQuery({
		queryKey: ["stats"],
		queryFn: () => fetchDashboardStats(),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
