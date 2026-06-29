import { createColumnHelper } from "@tanstack/react-table";
import type { Group } from "../types/permissions";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";




const columnHelper = createColumnHelper<Group>()

export const GroupColumns = [
    columnHelper.accessor("name", { header: "Nombre" }),
    columnHelper.accessor("permission_count", { header: "Cantidad permisos" }),
    columnHelper.accessor("users_count", { header: "Cantidad usuarios" }),
    columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <Link to="/permissions/$groupId" params={{ groupId: String(row.original.id) }}>
                <Eye size={20} />
            </Link>
        ),
    }),
]

