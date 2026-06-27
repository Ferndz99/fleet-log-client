// components/AccountInfoSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserDetail } from "../types/users";
import { useGroups } from "#/features/permissions/hooks/useGroups";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxValue } from "#/components/ui/combobox";
import { useSetGroupsUsers } from "#/features/permissions/hooks/useSetGroupsUsers";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RequestAddGroupsToUser, User } from "#/features/permissions/types/permissions";
import { Button } from "#/components/ui/button";
import { useEffect, useMemo } from "react";

interface AccountInfoSectionProps {
    user?: User;
    isLoading: boolean;
}

export const assignGroupsSchema = z.object({
    group_ids: z.array(z.number()),
});


export function AccountInfoSection({ user, isLoading }: AccountInfoSectionProps) {


    const { data } = useGroups()

    const groups = data?.results

    const mutation = useSetGroupsUsers(user?.id)

    const selectedGroupIds = useMemo(() => {
        if (!user?.groups || !groups) return [];

        return groups
            .filter((group) => user.groups.includes(group.name))
            .map((group) => group.id);
    }, [user?.groups, groups]);

    useEffect(() => {
        if (groups && user?.groups) {
            form.setValue("group_ids", selectedGroupIds);
        }
    }, [selectedGroupIds]);

    const form = useForm<z.infer<typeof assignGroupsSchema>>({
        resolver: zodResolver(assignGroupsSchema),
        defaultValues: {
            group_ids: [],
        }
    })

    function onSubmit(data: RequestAddGroupsToUser) {
        mutation.mutate(data)
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Información de cuenta
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Información de cuenta
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <InfoItem label="Email" value={user?.email} />
                <InfoItem label="Estado" value={user?.is_active ? "Activo" : "Inactivo"} />
                <InfoItem label="Rol" value={user?.is_staff ? "Administrador" : "Usuario"} />

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="col-span-full flex flex-col gap-1.5 sm:col-span-1"
                >
                    <span className="text-xs text-muted-foreground">Grupos</span>

                    <div className="flex items-start gap-2">
                        <Controller
                            control={form.control}
                            name="group_ids"
                            render={({ field }) => (
                                <Combobox
                                    items={groups}
                                    multiple
                                    itemToStringValue={(id) =>
                                        groups?.find((g) => g.id === id)?.name ?? ""
                                    }
                                    value={field.value}
                                    onValueChange={field.onChange}

                                >
                                    <ComboboxInput placeholder="Seleccionar grupos" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(group) => (
                                                <ComboboxItem key={group.id} value={group.id}>
                                                    {group.name}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            )}
                        />

                        <Button type="submit" size="sm">
                            Guardar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="text-sm font-medium text-muted-foreground">
        //             Información de cuenta
        //         </CardTitle>
        //     </CardHeader>
        //     <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        //         <InfoItem label="Email" value={user?.email} />
        //         <InfoItem label="Estado" value={user?.is_active ? "Activo" : "Inactivo"} />
        //         <InfoItem label="Rol" value={user?.is_staff ? "Administrador" : "Usuario"} />

        //         <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto">
        //             <Controller
        //                 control={form.control}
        //                 name="group_ids"
        //                 render={({ field }) => (
        //                     <Combobox
        //                         items={groups}
        //                         multiple
        //                         itemToStringValue={(id) =>
        //                             groups?.find((g) => g.id === id)?.name ?? ""  // busca el nombre para mostrarlo en el input
        //                         }
        //                         value={field.value}
        //                         onValueChange={field.onChange}
        //                     >
        //                         <ComboboxInput placeholder="Select a framework" />
        //                         <ComboboxContent>
        //                             <ComboboxEmpty>No items found.</ComboboxEmpty>
        //                             <ComboboxList>
        //                                 {(group) => (
        //                                     <ComboboxItem key={group.id} value={group.id}>
        //                                         {group.name}
        //                                     </ComboboxItem>
        //                                 )}
        //                             </ComboboxList>
        //                         </ComboboxContent>
        //                     </Combobox>
        //                 )}

        //             />
        //             <Button type="submit">Guardar</Button>
        //         </form>
        //     </CardContent>
        // </Card>
    );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="truncate text-sm">{value}</p>
        </div>
    );
}

function InfoItemSkeleton() {
    return (
        <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-24" />
        </div>
    );
}