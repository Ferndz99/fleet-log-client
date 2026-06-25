import BackButton from '#/components/BackButton'
import { useMembership } from '#/features/memberships/hooks/useMembership'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/_dashboard/memberships/$membershipId',
)({
    component: RouteComponent,
})

function RouteComponent() {

    const { membershipId } = Route.useParams()
    const { data, isLoading } = useMembership(Number(membershipId))


    return (
        <div>
            <BackButton fallbackTo='/memberships/' />
        </div>
    )
}
