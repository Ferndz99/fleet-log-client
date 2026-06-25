import MembershipsTable from '#/features/memberships/components/MembershipsTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/memberships/')(
    {
        component: RouteComponent,
    },
)

function RouteComponent() {
    return <div><MembershipsTable /></div>
}
