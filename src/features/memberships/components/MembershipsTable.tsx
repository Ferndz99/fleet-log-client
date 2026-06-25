import { useDebounce } from "#/hooks/useDebounce";
import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useMemberships } from "../hooks/useMemberships";
import { toOrdering } from "#/lib/to-ordering";
import { PAGE_SIZE } from "#/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { DataTable } from "#/components/DataTable";
import { MembershipColumns } from "./MembershipsColumns";
import { RefreshInfoButton } from "#/features/vehicles/components/RefreshVehiclesButton";
import { Input } from "#/components/ui/input";
import TableInfoPopover from "#/components/TableInfoPopover";

function MembershipsTable() {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);

    const handleSortingChange: typeof setSorting = (updater) => {
        setSorting(updater);
        setPage(1);
    };

    const { data, isLoading, isError, refetch, isFetching } = useMemberships({
        search: debouncedSearch,
        ordering: toOrdering(sorting),
        page
    })

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Membresias
                    <TableInfoPopover title="¿Qué muestra esta tabla?" description="Esta tabla muestra las membresías activas del sistema.
                        Aqui puedes activar o desactivar usuarios."/>
                </CardTitle>
                <CardDescription>{data?.count ?? 0} usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={MembershipColumns}
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

                            <RefreshInfoButton refetch={refetch} isFetching={isFetching} />
                        </div>
                    }
                />
            </CardContent>
        </Card>
    )
}

export default MembershipsTable