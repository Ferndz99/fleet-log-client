import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { UserDetail } from "../types/users";


const columnHelper = createColumnHelper<UserDetail>();


export const UserColumns = [
    columnHelper.accessor("email", { header: "Email", meta: { label: "Email" } }),
    columnHelper.accessor((row) => row.profile?.first_name ?? "-", {
        id: "profile__first_name",
        header: "Nombre",
        meta: { label: "Nombre" },
    }),
    columnHelper.accessor((row) => row.profile?.last_name ?? "-", {
        id: "profile__last_name",
        header: "Apellido",
        meta: { label: "Apellido" },
    }),
    columnHelper.accessor((row) => row.profile?.rut ?? "-", {
        id: "profile__rut",
        header: "RUT",
        meta: { label: "RUT" },
    }),
    columnHelper.accessor("is_active", {
        header: "Activo",
        meta: { label: "Activo" },
    }),
    columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <Link to="/users/$usersId" params={{ usersId: String(row.original.id) }}>
                <Pencil size={20} />
            </Link>
        ),
    }),
];