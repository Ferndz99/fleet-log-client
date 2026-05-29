import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

const defaultData: Person[] = [
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
];

const columnHelper = createColumnHelper<Person>();

const columns = [
	columnHelper.accessor("firstName", {
		cell: (info) => <span>{info.getValue().toUpperCase()}</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.lastName, {
		id: "lastName",
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Last Name</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("age", {
		header: () => "Age",
		cell: (info) => info.renderValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("visits", {
		header: () => <span>Visits</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("status", {
		header: "Status",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("progress", {
		header: "Profile Progress",
		footer: (info) => info.column.id,
	}),
];

function TableExample() {
	const [data, _setData] = useState(() => [...defaultData]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
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

					<TableFooter>
						{table.getFooterGroups().map((footerGroup) => (
							<TableRow key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
		// <div className="p-2">
		// 	<table>
		// 		<thead>
		// 			{table.getHeaderGroups().map((headerGroup) => (
		// 				<tr key={headerGroup.id}>
		// 					{headerGroup.headers.map((header) => (
		// 						<th key={header.id}>
		// 							{header.isPlaceholder
		// 								? null
		// 								: flexRender(
		// 										header.column.columnDef.header,
		// 										header.getContext(),
		// 									)}
		// 						</th>
		// 					))}
		// 				</tr>
		// 			))}
		// 		</thead>
		// 		<tbody>
		// 			{table.getRowModel().rows.map((row) => (
		// 				<tr key={row.id}>
		// 					{row.getVisibleCells().map((cell) => (
		// 						<td key={cell.id}>
		// 							{flexRender(cell.column.columnDef.cell, cell.getContext())}
		// 						</td>
		// 					))}
		// 				</tr>
		// 			))}
		// 		</tbody>
		// 		<tfoot>
		// 			{table.getFooterGroups().map((footerGroup) => (
		// 				<tr key={footerGroup.id}>
		// 					{footerGroup.headers.map((header) => (
		// 						<th key={header.id}>
		// 							{header.isPlaceholder
		// 								? null
		// 								: flexRender(
		// 										header.column.columnDef.footer,
		// 										header.getContext(),
		// 									)}
		// 						</th>
		// 					))}
		// 				</tr>
		// 			))}
		// 		</tfoot>
		// 	</table>
		// 	<div className="h-4" />
		// 	<button onClick={() => rerender()} className="border p-2">
		// 		Rerender
		// 	</button>
		// </div>
	);
}

export default TableExample;
