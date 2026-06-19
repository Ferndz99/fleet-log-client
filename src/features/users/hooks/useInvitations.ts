import { useQuery } from "@tanstack/react-query";
import type { InvitationsParams } from "../types/users";
import { fetchInvitations } from "../services/users-api";

export function useInvitations(params: InvitationsParams) {
	return useQuery({
		queryKey: ["invitations", params],
		queryFn: () => fetchInvitations(params),
		placeholderData: (prev) => prev,
		staleTime: 30_000,
		enabled: !!params.email,
	});
}
