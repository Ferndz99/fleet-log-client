import { useQuery } from "@tanstack/react-query";
import type { MembershipsParams } from "../types/memberships";
import { fetchMemberships } from "../services/memberships-api";

export function useMemberships(params: MembershipsParams) {
	return useQuery({
		queryKey: ["memberships", params],
		queryFn: () => fetchMemberships(params),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
