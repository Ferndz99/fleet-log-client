import { useQuery } from "@tanstack/react-query";
import { fetchGroup } from "../services/permission-api";

export function useGroup(groupId: number) {
	return useQuery({
		queryKey: ["group", groupId],
		queryFn: () => fetchGroup(groupId),
		staleTime: 30_000,
	});
}
