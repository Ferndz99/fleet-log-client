import { useQuery } from "@tanstack/react-query";
import type { UsersParams } from "../types/users";
import { fetchUsers } from "../services/users-api";

export function useUsers(params: UsersParams) {
	return useQuery({
		queryKey: ["users", params],
		queryFn: () => fetchUsers(params),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
