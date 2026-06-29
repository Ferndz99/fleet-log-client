import { useEffect, useMemo } from "react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"
import type { Permission } from "../types/permissions"
import { useForm } from "react-hook-form"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "#/components/ui/field"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { useGroupAddPermissions } from "../hooks/useGroupAddPermissions"
import { useSetPermissions } from "../hooks/useSetPermissions"


type GroupPermissionsFormValues = {
    permission_ids: number[]
}

interface GroupPermissionsCardProps {
    permissions: Permission[]
    defaultSelectedIds?: number[]
    isLoading: boolean
    groupId: number
}








export type PermissionsByAppLabel = Record<string, Permission[]>

export function groupPermissionsByAppLabel(
    permissions: Permission[]
): PermissionsByAppLabel {
    return permissions.reduce<PermissionsByAppLabel>((acc, permission) => {
        const key = permission.app_label

        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(permission)

        return acc
    }, {})
}









export function GroupPermissionsCard({
    permissions,
    defaultSelectedIds = [],
    isLoading,
    groupId
}: GroupPermissionsCardProps) {
    const groupedPermissions = useMemo(
        () => groupPermissionsByAppLabel(permissions),
        [permissions]
    )

    const form = useForm<GroupPermissionsFormValues>({
        defaultValues: {
            permission_ids: defaultSelectedIds,
        },
    })

    useEffect(() => {
        form.reset({ permission_ids: defaultSelectedIds })
    }, [defaultSelectedIds])

    const selectedPermissions = form.watch("permission_ids") ?? []

    const togglePermission = (
        permissionId: number,
        checked: boolean
    ) => {
        const currentPermissions =
            form.getValues("permission_ids") ?? []

        if (checked) {
            form.setValue(
                "permission_ids",
                [...currentPermissions, permissionId],
                {
                    shouldDirty: true,
                }
            )

            return
        }

        form.setValue(
            "permission_ids",
            currentPermissions.filter(
                (id) => id !== permissionId
            ),
            {
                shouldDirty: true,
            }
        )
    }

    // const mutation = useGroupAddPermissions(groupId)
    const mutation = useSetPermissions(groupId)

    const handleFormSubmit = (values: GroupPermissionsFormValues) => {
        // mutation.mutate(values)
        mutation.mutate(values)
    }

    if (isLoading) {
        return <Skeleton className="w-full max-h-55" />
    }

    const permissionIds = permissions.map(
        (permission) => permission.id
    )
    // const allSelected = permissionIds.every(
    //     (id) => selectedPermissions.includes(id)
    // )

    const toggleSectionPermissions = (
        sectionPermissionIds: number[],
        checked: boolean
    ) => {
        const current = form.getValues("permission_ids") ?? []

        if (checked) {
            form.setValue(
                "permission_ids",
                [...new Set([
                    ...current,
                    ...sectionPermissionIds,
                ])],
                { shouldDirty: true }
            )

            return
        }

        form.setValue(
            "permission_ids",
            current.filter(
                id => !sectionPermissionIds.includes(id)
            ),
            { shouldDirty: true }
        )
    }

    // const selectedCount = permissionIds.filter(
    //     (id) => selectedPermissions.includes(id)
    // ).length

    // const allSelected = selectedCount === permissionIds.length

    // const partiallySelected =
    //     selectedCount > 0 &&
    //     selectedCount < permissionIds.length

    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Permisos
                    </CardTitle>
                    <CardDescription>
                        Lista de todos los permisos del sistema agrupados por modelo. Se puede marcar 1 o mas permisos para cada grupo.
                    </CardDescription>
                </CardHeader>

                <CardContent className="overflow-y-auto">
                    <Accordion
                        type="multiple"
                        className="space-y-2"
                    >
                        {Object.entries(groupedPermissions).map(
                            ([appLabel, permissions]) => {

                                console.log(appLabel)


                                const sectionPermissionIds = permissions.map(
                                    permission => permission.id
                                )


                                const selectedCount = sectionPermissionIds.filter(
                                    (id) => selectedPermissions.includes(id)
                                ).length

                                const allSelected =
                                    selectedCount === sectionPermissionIds.length

                                const partiallySelected =
                                    selectedCount > 0 &&
                                    selectedCount < sectionPermissionIds.length

                                return (

                                    <AccordionItem
                                        key={appLabel}
                                        value={appLabel}
                                    >
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium capitalize">
                                                    {appLabel}
                                                </span>

                                                <span className="text-muted-foreground text-xs">
                                                    (
                                                    {
                                                        permissions.length
                                                    }
                                                    )
                                                </span>
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent className="space-y-2 max-h-55  overflow-y-auto">
                                            <FieldLabel>
                                                <Field orientation="horizontal">
                                                    <Checkbox
                                                        checked={
                                                            allSelected
                                                                ? true
                                                                : partiallySelected
                                                                    ? "indeterminate"
                                                                    : false
                                                        }
                                                        onCheckedChange={(checked) =>
                                                            toggleSectionPermissions(
                                                                sectionPermissionIds,
                                                                !!checked
                                                            )
                                                        }
                                                    />

                                                    <FieldContent>
                                                        <FieldTitle>
                                                            Seleccionar todos
                                                        </FieldTitle>

                                                        <FieldDescription>
                                                            Marcar o desmarcar todos los permisos
                                                            de esta sección.
                                                        </FieldDescription>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                            {
                                                permissions.map((permission) => (
                                                    <FieldLabel key={permission.id}>
                                                        <Field orientation="horizontal">
                                                            <Checkbox checked={selectedPermissions.includes(
                                                                permission.id
                                                            )} onCheckedChange={(
                                                                checked
                                                            ) =>
                                                                togglePermission(
                                                                    permission.id,
                                                                    !!checked
                                                                )
                                                            } />
                                                            <FieldContent>
                                                                <FieldTitle>{permission.name}</FieldTitle>
                                                                <FieldDescription>
                                                                    {permission.codename}
                                                                </FieldDescription>
                                                            </FieldContent>
                                                        </Field>
                                                    </FieldLabel>
                                                ))
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })}
                    </Accordion>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                        {selectedPermissions.length} permiso(s) seleccionado(s)
                    </span>

                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Guardando..." : "Guardar permisos"}
                    </Button>
                </CardFooter>
            </Card>
        </form >


        // <Card >
        //     <CardHeader>
        //         <CardTitle>
        //             Permisos
        //         </CardTitle>
        //         <CardDescription>
        //             Lista de todos los permisos del sistema agrupados por modelo. Se puede marcar 1 o mas permisos para cada grupo.
        //         </CardDescription>
        //     </CardHeader>

        //     <CardContent className="overflow-y-auto">
        //         <Accordion
        //             type="multiple"
        //             className="space-y-2"
        //         >
        //             {Object.entries(groupedPermissions).map(
        //                 ([model, permissions]) => (
        //                     <AccordionItem
        //                         key={model}
        //                         value={model}
        //                     >
        //                         <AccordionTrigger>
        //                             <div className="flex items-center gap-2">
        //                                 <span className="font-medium capitalize">
        //                                     {model}
        //                                 </span>

        //                                 <span className="text-muted-foreground text-xs">
        //                                     (
        //                                     {
        //                                         permissions.length
        //                                     }
        //                                     )
        //                                 </span>
        //                             </div>
        //                         </AccordionTrigger>

        //                         <AccordionContent className="space-y-2 max-h-[220px]  overflow-y-auto">
        //                             {
        //                                 permissions.map((permission) => (
        //                                     <FieldLabel key={permission.id}>
        //                                         <Field orientation="horizontal">
        //                                             <Checkbox checked={selectedPermissions.includes(
        //                                                 permission.id
        //                                             )} onCheckedChange={(
        //                                                 checked
        //                                             ) =>
        //                                                 togglePermission(
        //                                                     permission.id,
        //                                                     !!checked
        //                                                 )
        //                                             } />
        //                                             <FieldContent>
        //                                                 <FieldTitle>{permission.name}</FieldTitle>
        //                                                 <FieldDescription>
        //                                                     {permission.codename}
        //                                                 </FieldDescription>
        //                                             </FieldContent>
        //                                         </Field>
        //                                     </FieldLabel>
        //                                 ))
        //                             }
        //                         </AccordionContent>
        //                     </AccordionItem>
        //                 )
        //             )}
        //         </Accordion>
        //     </CardContent>

        //     <CardFooter>

        //     </CardFooter>
        // </Card>
    )
}