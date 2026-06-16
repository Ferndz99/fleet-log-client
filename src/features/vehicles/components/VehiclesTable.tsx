import { type SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "#/components/DataTable";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { useDebounce } from "#/hooks/useDebounce";
import { toOrdering } from "#/lib/to-ordering";
import { useVehicles } from "../hooks/useVehicles";
import { RefreshInfoButton } from "./RefreshVehiclesButton";
import VehicleFormCreate from "./VehicleFormCreate";
import { VehicleColumns } from "./vehicleColumns";


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

	const { data, isLoading, isError, refetch, isFetching } = useVehicles({
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
						<div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
							<Input
								placeholder="Buscar por patente, modelo o marca..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full md:max-w-sm"
							/>

							<div className="flex flex-col gap-2 md:flex-row md:ml-auto">
								<VehicleFormCreate className="w-full md:w-auto" />

								<RefreshInfoButton
									refetch={refetch}
									isFetching={isFetching}
									className="w-full md:w-auto"
								/>
							</div>
						</div>
					}
				/>
			</CardContent>
		</Card>
	);
}

export default VehiclesTable;
