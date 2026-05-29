import { useState } from "react";
import type { Vehicle } from "../types/vehicle";
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from "@tanstack/react-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { Input } from "#/components/ui/input";

const columnHelper = createColumnHelper<Vehicle>();

const columns = [
	columnHelper.accessor("patent", {
		cell: (info) => info.getValue(),
		header: "Patente",
	}),
	columnHelper.accessor((row) => `${row.brand} ${row.model}`, {
		id: "brandModel",
		header: "Modelo",
	}),
	columnHelper.accessor("year", {
		cell: (info) => info.getValue(),
		header: "Año",
	}),
	columnHelper.accessor("created_at", {
		cell: (info) => info.getValue(),
		header: "Fecha creacion",
	}),
	columnHelper.accessor("log_count", {
		cell: (info) => info.getValue(),
		header: "Ctd. Registros",
	}),
	columnHelper.display({
		id: "actions",
		header: "Acciones",
		cell: ({ row }) => (
			<Link to="#">
				<Pencil size={20} />
			</Link>
		),
	}),
];

function VehiclesTable() {
	const [search, setSearch] = useState("");
	const [vehicles, setVehicles] = useState<Vehicle[]>([
		{
			id: 1,
			patent: "12314",
			brand: "brand 1",
			model: "model 1",
			year: 2024,
			created_at: "2025-10-10",
			log_count: 3,
		},
	]);

	const table = useReactTable({
		columns,
		data: vehicles,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Vehiculos</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Input
						placeholder="Buscar por patente, marca..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>
				</div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => {
							return (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							);
						})}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>
									No hay resultados
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default VehiclesTable;
