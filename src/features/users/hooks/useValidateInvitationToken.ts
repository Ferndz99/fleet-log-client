import { useQuery } from "@tanstack/react-query";
import { validateInvitationToken } from "../services/users-api";

export function useValidateInvitationToken(token: string) {
	return useQuery({
		queryKey: ["validation", token],
		queryFn: () => validateInvitationToken(token),
		enabled: !!token, // no ejecuta si no hay token
		staleTime: Infinity, // nunca se marca como stale → no refetch automático
		refetchOnMount: false, // no vuelve a pedir si el componente se remonta
		refetchOnWindowFocus: false, // no vuelve a pedir al volver a la pestaña
		retry: false,
	});
}
