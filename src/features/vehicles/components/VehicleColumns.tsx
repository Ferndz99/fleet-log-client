import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import type { Vehicle } from "../types/vehicle";

const columnHelper = createColumnHelper<Vehicle>();

export const VehicleColumns = [
    columnHelper.accessor("patent", { header: "Patente", meta: { label: "Patente" } }),
    columnHelper.accessor((row) => `${row.brand} ${row.model}`, {
        id: "brand",
        header: "Modelo",
    }),
    columnHelper.accessor("year", { header: "Año" }),
    columnHelper.accessor("created_at", { header: "Fecha creación", meta: { label: "Fecha creación", hiddenOnMobile: true }, }),
    columnHelper.accessor("log_count", { header: "Ctd. Registros" }),
    columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <Link to="/vehicles/$vehiclesId" params={{ vehiclesId: String(row.original.id) }}>
                <Pencil size={20} />
            </Link>
        ),
    }),
];

// const COLUMN_MAP = { brandModel: "brand" }; en caso de tener un ID compuesto. Pasar a la funcion toOrdering(sorting, COLUMN_MAP); en el componente de tabla de alguna entidad, tambien se puede pasar toOrdering(sorting); en caso de no tener columnas compuestas