import {
	createColumnHelper,
	flexRender,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel, // ← agregar
	type SortingState,
} from "@tanstack/react-table";
import type { Log } from "../types/vehicle";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { useMemo, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { ArrowUp, ArrowDown, ArrowUpDown, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";

const columnHelper = createColumnHelper<Log>();

const createColumns = (vehicleId: number) => [
	columnHelper.accessor("title", {
		cell: (info) => info.getValue(),
		header: "Titulo",
	}),
	columnHelper.accessor("created_by.email", {
		cell: (info) => info.getValue(),
		header: "Creado por",
	}),
	columnHelper.accessor("created_at", {
		cell: (info) => info.getValue(),
		header: "Creado el",
	}),
	columnHelper.accessor("status", {
		cell: (info) => info.getValue(),
		header: "Estado",
	}),
	columnHelper.accessor("type", {
		cell: (info) => info.getValue(),
		header: "Tipo",
	}),
	columnHelper.display({
		id: "actions",
		header: "Acciones",
		cell: ({ row }) => (
			<Link
				to="/vehicles/$vehiclesId/log/$logId"
				params={{
					vehiclesId: String(vehicleId),
					logId: String(row.original.id),
				}}
				className="text-primary hover:underline"
			>
				<Pencil size={20} />
			</Link>
		),
	}),
];

interface VehicleLogsTableProps {
	logs?: Log[];
	vehicleId: number;
}

function VehicleLogsTable({ logs, vehicleId }: VehicleLogsTableProps) {
	const columns = useMemo(() => createColumns(vehicleId), [vehicleId]);

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		columns,
		data: logs ?? [],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		state: {
			pagination,
			sorting,
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Registros de vehiculos</CardTitle>
				<CardDescription>{logs?.length ?? 0} Registros</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<button
												type="button"
												className="flex items-center gap-1 select-none"
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
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
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
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No hay resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
			<div className="flex items-center justify-between mt-4 p-4">
				{/* Selector de tamaño de página */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">
						Filas por página
					</span>
					<Select
						value={String(table.getState().pagination.pageSize)}
						onValueChange={(value) => table.setPageSize(Number(value))}
					>
						<SelectTrigger className="w-20 h-8">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={String(pageSize)}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Info de página */}
				<p className="text-sm text-muted-foreground">
					Página {table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount() || 1}
				</p>

				{/* Botones de navegación */}
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						«
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Siguiente
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						»
					</Button>
				</div>
			</div>
			{/* <div>
                <p>
                    {table.getPageCount()}
                </p>
				<Button
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</Button>
				<Button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</Button>
				<Button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</Button>
				<Button
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</Button>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							{pageSize}
						</option>
					))}
				</select>
			</div> */}
		</Card>
	);
}

export default VehicleLogsTable;
