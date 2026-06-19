import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../services/users-api";

export function useUser(userId: number) {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => fetchUser(userId),
		staleTime: 30_000,
	});
}
