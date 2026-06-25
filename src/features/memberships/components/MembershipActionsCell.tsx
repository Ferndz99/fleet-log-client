import { Button } from "#/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "#/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useActivateMembership } from "../hooks/useActivateMembership";
import { useDeactivateMembership } from "../hooks/useDeactivateMembership";
import type { Membership } from "../types/memberships";

function MembershipActionsCell({
    membership,
}: {
    membership: Membership;
}) {


    const activateMutation = useActivateMembership(membership.id)
    const deactivateMutation = useDeactivateMembership(membership.id)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {membership.is_active ? (
                    <DropdownMenuItem
                        onClick={() =>
                            deactivateMutation.mutate()
                        }
                    >
                        Desactivar
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={() =>
                            activateMutation.mutate()
                        }
                    >
                        Activar
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default MembershipActionsCell