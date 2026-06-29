import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestAddRemoveUsers } from "../types/permissions";
import { addUserToGroup } from "../services/permission-api";
import { toast } from "sonner";



export function useGroupAddUser(groupId: number) {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (payload: RequestAddRemoveUsers) => addUserToGroup(groupId, payload),
        onSuccess: () => {
            toast.success("Usuario(s) agregados con exito!");
            queryClient.invalidateQueries({ queryKey: ["group"] });
        },
        onError: () => {
            toast.error("Error al guardar usuario(s)");
        },
    })
}