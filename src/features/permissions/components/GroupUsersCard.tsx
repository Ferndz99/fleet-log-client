import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card"
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useUsers } from "#/features/users/hooks/useUsers";
import { useDebounce } from "#/hooks/useDebounce";
import { PAGE_SIZE } from "#/lib/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { RequestAddRemoveUsers, User } from "../types/permissions";
import { DataTablePagination } from "#/components/DataTablePagination";
import { GroupAssignedUsers } from "./GroupAssignedUsers";
import { useGroupAddUser } from "../hooks/useGroupAddUser";
import { Button } from "#/components/ui/button";
import { useSetUsers } from "../hooks/useSetUsers";
import { Badge } from "#/components/ui/badge";



interface GroupUsersCardProps {
    defaultSelectedIds?: number[]
    users?: User[]
    groupId: number

}


function GroupUsersCard({ defaultSelectedIds = [], users, groupId }: GroupUsersCardProps) {


    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);

    const { data, isLoading } = useUsers({
        search: debouncedSearch,
        page
    })

    const showResults = debouncedSearch.trim().length > 0
    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    const form = useForm<RequestAddRemoveUsers>({
        defaultValues: {
            user_ids: defaultSelectedIds
        }
    })

    useEffect(() => {
        form.reset({ user_ids: defaultSelectedIds })
    }, [defaultSelectedIds])

    const selectedUsers = form.watch("user_ids") ?? []

    const toggleUser = (
        permissionId: number,
        checked: boolean
    ) => {
        const currentPermissions =
            form.getValues("user_ids") ?? []

        if (checked) {
            form.setValue(
                "user_ids",
                [...currentPermissions, permissionId],
                {
                    shouldDirty: true,
                }
            )

            return
        }

        form.setValue(
            "user_ids",
            currentPermissions.filter(
                (id) => id !== permissionId
            ),
            {
                shouldDirty: true,
            }
        )
    }

    const searchResults =
        data?.results.filter(
            (user) => !defaultSelectedIds.includes(user.id)
        ) ?? []


    // const mutation = useGroupAddUser(groupId)
    const mutation = useSetUsers(groupId)

    const handleFormSubmit = (values: RequestAddRemoveUsers) => {
        // mutation.mutate(values)
        mutation.mutate(values)
    }


    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <Card>

                <CardHeader>
                    <CardTitle>
                        Usuarios
                    </CardTitle>
                    <CardDescription>
                        <Input
                            placeholder="Buscar por email, nombre, apellido o rut..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:max-w-sm mt-2"
                        />
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <GroupAssignedUsers users={users ?? []} selectedUsers={selectedUsers}
                        onToggleUser={toggleUser} />

                    {showResults && (
                        <>
                            <div className="space-y-2 mt-2">
                                {searchResults.map((user) => (
                                    <FieldLabel key={user.id}>
                                        <Field orientation="horizontal" >
                                            <Checkbox
                                                checked={selectedUsers.includes(user.id)}
                                                onCheckedChange={(checked) =>
                                                    toggleUser(user.id, !!checked)
                                                }
                                            />

                                            <FieldContent>
                                                <FieldTitle className="flex justify-between items-center w-full">
                                                    {user.profile?.full_name} - {user.profile?.rut}
                                                    <Badge variant={user?.is_active ? "default" : "secondary"}>
                                                        {user?.is_active ? "Activo" : "Inactivo"}
                                                    </Badge>
                                                </FieldTitle>

                                                <FieldDescription>
                                                    {user.email}
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    </FieldLabel>
                                ))}
                            </div>

                            <DataTablePagination
                                page={page}
                                totalPages={totalPages}
                                isLoading={isLoading}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                    {/* {data?.results.map((user) => (
                    <FieldLabel key={user.id}>
                        <Field orientation="horizontal">
                            <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={(checked) =>
                                    toggleUser(user.id, !!checked)
                                }
                            />

                            <FieldContent>
                                <FieldTitle>
                                    {user.profile?.full_name}
                                </FieldTitle>

                                <FieldDescription>
                                    {user.email}
                                </FieldDescription>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                ))}
                <DataTablePagination page={page} totalPages={totalPages} isLoading={isLoading} onPageChange={setPage} /> */}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                        {selectedUsers.length} usuario(s) seleccionado(s)
                    </span>

                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Guardando..." : "Guardar usuarios"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default GroupUsersCard