import GroupTable from '#/features/permissions/components/GroupTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/permissions/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>
    <GroupTable />
  </div>
}
