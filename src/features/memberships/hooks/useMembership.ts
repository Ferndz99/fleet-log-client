import { useQuery } from "@tanstack/react-query";
import { fetchMembership } from "../services/memberships-api";

export function useMembership(membershipId: number) {
	return useQuery({
		queryKey: ["membership", membershipId],
		queryFn: () => fetchMembership(membershipId),
		staleTime: 30_000,
	});
}
