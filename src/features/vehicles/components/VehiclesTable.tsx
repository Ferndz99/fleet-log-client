import { useEffect, useState } from "react";
import type { Vehicle } from "../types/vehicle";
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
	type SortingState,
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
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from "lucide-react";
import { Input } from "#/components/ui/input";
import { useVehicles } from "../hooks/useVehicles";
import { Button } from "#/components/ui/button";
import VehicleFormCreate from "./VehicleFormCreate";

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
			<Link
				to="/vehicles/$vehiclesId"
				params={{
					vehiclesId: String(row.original.id),
				}}
				className="text-primary hover:underline"
			>
				<Pencil size={20} />
			</Link>
		),
	}),
];

const PAGE_SIZE = 10;

function toOrdering(sorting: SortingState): string {
	if (!sorting.length) return "";
	const { id, desc } = sorting[0];
	return desc ? `-${id}` : id;
}

function VehiclesTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 400);
		return () => clearTimeout(timer);
	}, [search]);

	const handleSortingChange: typeof setSorting = (updater) => {
		setSorting(updater);
		setPage(1);
	};

	const { data, isLoading, isError } = useVehicles({
		search: debouncedSearch,
		ordering: toOrdering(sorting),
		page,
	});

	const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

	// @ts-expect-error
	const table = useReactTable({
		columns,
		data: data?.results ?? [],
		getCoreRowModel: getCoreRowModel(),
		manualSorting: true,
		onSortingChange: handleSortingChange,
		state: { sorting },
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Vehículos</CardTitle>
				<CardDescription>
					{data?.count ?? 0} vehículos registrados
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center mb-4">
					<div className="w-full max-w-md">
						<Input
							placeholder="Buscar por patente, modelo o marca..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className=""
						/>
					</div>
					{/* <Button size={"lg"}>Agregar vehiculo</Button> */}
					<VehicleFormCreate/>
				</div>

				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											// Columna ordenable → button
											<button
												type="button"
												className="flex items-center gap-1 cursor-pointer select-none"
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{header.column.getIsSorted() === "asc" && (
													<ArrowUp size={14} />
												)}
												{header.column.getIsSorted() === "desc" && (
													<ArrowDown size={14} />
												)}
												{!header.column.getIsSorted() && (
													<ArrowUpDown
														size={14}
														className="text-muted-foreground"
													/>
												)}
											</button>
										) : (
											// Columna no ordenable → span plano
											<span>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											</span>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="text-center">
									Cargando...
								</TableCell>
							</TableRow>
						) : isError ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="text-center text-destructive"
								>
									Error al cargar los vehículos
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows.length ? (
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
								<TableCell colSpan={columns.length} className="text-center">
									No hay resultados
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				{/* Paginación */}
				<div className="flex items-center justify-between mt-4">
					<p className="text-sm text-muted-foreground">
						Página {page} de {totalPages || 1}
					</p>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage(1)}
							disabled={page === 1 || isLoading}
						>
							«
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => p - 1)}
							disabled={page === 1 || isLoading}
						>
							Anterior
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => p + 1)}
							disabled={page === totalPages || totalPages === 0 || isLoading}
						>
							Siguiente
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage(totalPages)}
							disabled={page === totalPages || totalPages === 0 || isLoading}
						>
							»
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default VehiclesTable;
