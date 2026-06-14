import { useState } from "react";
import { type SortingState } from "@tanstack/react-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { useVehicles } from "../hooks/useVehicles";
import VehicleFormCreate from "./VehicleFormCreate";
import { useDebounce } from "#/hooks/useDebounce";
import { DataTable } from "#/components/DataTable";
import { VehicleColumns } from "./vehicleColumns";
import { toOrdering } from "#/lib/to-ordering";


const PAGE_SIZE = 10;

// function toOrdering(sorting: SortingState): string {
// 	if (!sorting.length) return "";
// 	const { id, desc } = sorting[0];
// 	return desc ? `-${id}` : id;
// }

function VehiclesTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const debouncedSearch = useDebounce(search);

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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Vehículos</CardTitle>
				<CardDescription>{data?.count ?? 0} vehículos registrados</CardDescription>
			</CardHeader>
			<CardContent>

				<DataTable
					columns={VehicleColumns}
					data={data?.results ?? []}
					isLoading={isLoading}
					isError={isError}
					sorting={sorting}
					onSortingChange={handleSortingChange}
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
					toolbar={
						<>
							<Input
								placeholder="Buscar por patente, modelo o marca..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full sm:max-w-md h-10 sm:h-9"
							/>
							<VehicleFormCreate className="w-full sm:w-auto" />
						</>
					}
				/>
			</CardContent>
		</Card>
	);
}

export default VehiclesTable;
