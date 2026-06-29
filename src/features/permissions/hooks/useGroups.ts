import { useQuery } from "@tanstack/react-query";
import type { GroupParams } from "../types/permissions";
import { fetchGroups } from "../services/permission-api";

export function useGroups(params?: GroupParams) {
	return useQuery({
		queryKey: ["groups", params],
		queryFn: () => fetchGroups(params),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
