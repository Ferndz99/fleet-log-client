import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card"
import { useDebounce } from "#/hooks/useDebounce";
import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { toOrdering } from "#/lib/to-ordering";
import { PAGE_SIZE } from "#/lib/constants";
import { DataTable } from "#/components/DataTable";
import { UserColumns } from "./UserColumns";
import { RefreshInfoButton } from "#/features/vehicles/components/RefreshVehiclesButton";
import { Input } from "#/components/ui/input";

function UsersTable() {


    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);

    const handleSortingChange: typeof setSorting = (updater) => {
        setSorting(updater);
        setPage(1);
    };

    const { data, isLoading, isError, refetch, isFetching } = useUsers({
        search: debouncedSearch,
        ordering: toOrdering(sorting),
        page
    })


    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Usuarios
                </CardTitle>
                <CardDescription>{data?.count ?? 0} usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={UserColumns}
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
                                placeholder="Buscar por email, nombre, apellido o rut..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:max-w-sm"
                            />

                            <div className="flex flex-col gap-2 md:flex-row md:ml-auto">
                                {/* <VehicleFormCreate className="w-full md:w-auto" /> */}

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
    )
}

export default UsersTable