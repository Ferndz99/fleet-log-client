import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useGroups } from "../hooks/useGroups";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import TableInfoPopover from "#/components/TableInfoPopover";
import { DataTable } from "#/components/DataTable";
import { GroupColumns } from "./GroupColumns";
import { PAGE_SIZE } from "#/lib/constants";
import { useDebounce } from "#/hooks/useDebounce";
import { toOrdering } from "#/lib/to-ordering";
import { Input } from "#/components/ui/input";
import { RefreshInfoButton } from "#/features/vehicles/components/RefreshVehiclesButton";
import GroupCreateForm from "./GroupCreateForm";





function GroupTable() {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);


    const handleSortingChange: typeof setSorting = (updater) => {
        setSorting(updater);
        setPage(1);
    };




    const { data, isLoading, isError, refetch, isFetching } = useGroups({
        search: debouncedSearch,
        ordering: toOrdering(sorting),
        page
    })

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Grupos
                    <TableInfoPopover title="¿Qué muestra esta tabla?" description="Esta tabla muestra los grupos que administran los permisos del sistema." />
                </CardTitle>
                <CardDescription>{data?.count ?? 0} grupos registrados</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={GroupColumns}
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
                                placeholder="Buscar por email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:max-w-sm"
                            />

                            <div className="flex flex-col gap-2 md:flex-row md:ml-auto">
                                <GroupCreateForm />
                                <RefreshInfoButton refetch={refetch} isFetching={isFetching} />

                            </div>

                        </div>
                    }
                />
            </CardContent>
        </Card>
    )
}

export default GroupTable