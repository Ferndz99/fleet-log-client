import UsersTable from '#/features/users/components/UsersTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/users/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div><UsersTable /></div>
}
