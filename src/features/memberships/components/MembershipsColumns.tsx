import { createColumnHelper } from "@tanstack/react-table";
import type { Membership } from "../types/memberships";
import { Badge } from "#/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "#/components/ui/dropdown-menu";
import { Button } from "#/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { activateMembership, deactivateMembership } from "../services/memberships-api";
import MembershipActionsCell from "./MembershipActionsCell";



const columnHelper = createColumnHelper<Membership>()


export const MembershipColumns = [
    columnHelper.accessor("user_email", { header: "Email" }),
    columnHelper.accessor("is_active", {
        header: "Activo", cell: ({ getValue }) => {
            const isActive = getValue<boolean>();

            return (
                <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "Activo" : "Inactivo"}
                </Badge>
            );
        },
    }),
    columnHelper.accessor("invited_at", { header: "Invitado el" }),
    columnHelper.accessor("joined_at", { header: "Unido el" }),
    columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <MembershipActionsCell membership={row.original} />
        ),
    })
]