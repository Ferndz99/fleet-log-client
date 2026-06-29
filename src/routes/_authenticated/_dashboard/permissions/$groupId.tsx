import BackButton from '#/components/BackButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { GroupPermissionsCard } from '#/features/permissions/components/GroupPermissionsCard'
import GroupUsersCard from '#/features/permissions/components/GroupUsersCard'
import { useGroup } from '#/features/permissions/hooks/useGroup'
import { usePermissions } from '#/features/permissions/hooks/usePermissions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/_dashboard/permissions/$groupId',
)({
    component: RouteComponent,
})

function RouteComponent() {

    const { groupId } = Route.useParams()

    const { data } = useGroup(Number(groupId))
    const { data: permissions, isLoading: isLoadingPermissions } = usePermissions()

    return (
        <div className='space-y-4'>
            <BackButton fallbackTo='/permissions/' />

            <Card>
                <CardHeader>
                    <CardTitle>Grupo</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold">
                            {data?.name}
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            ID: {data?.id}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className='grid lg:grid-cols-2 gap-4'>

                <GroupPermissionsCard permissions={permissions ?? []} isLoading={isLoadingPermissions} defaultSelectedIds={data?.permissions_ids} groupId={Number(groupId)} />


                <GroupUsersCard defaultSelectedIds={data?.users_ids} users={data?.users ?? []} groupId={Number(groupId)}/>
            </div>

        </div>
    )
}
