import { useQuery } from "@tanstack/react-query";
import type { PermissionsParams } from "../types/permissions";
import { fetchPermissions } from "../services/permission-api";

export function usePermissions(params?: PermissionsParams) {
	return useQuery({
		queryKey: ["permissions", params],
		queryFn: () => fetchPermissions(params),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
	});
}
