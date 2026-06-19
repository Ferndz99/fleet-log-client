import BackButton from '#/components/BackButton'
import { AccountInfoSection } from '#/features/users/components/AccountInfoSection'
import { InvitationHistorySection } from '#/features/users/components/InvitationHistorySection'
import { PersonalInfoSection } from '#/features/users/components/PersonalInfoSection'
import UserInfoSection from '#/features/users/components/UserInfoSection'
import { useInvitations } from '#/features/users/hooks/useInvitations'
import { useUser } from '#/features/users/hooks/useUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/_dashboard/users/$userId',
)({
    component: RouteComponent,
})

function RouteComponent() {


    const { userId } = Route.useParams()
    const { data, isLoading } = useUser(Number(userId))

    const { data: invitationsData, isLoading: isLoadingInvitations } = useInvitations(
        { email: data?.email ?? "" },
    )

    return <div className='space-y-4'>
        <BackButton fallbackTo='/users/' />
        <UserInfoSection user={data} isLoading={isLoading} />
        <AccountInfoSection user={data} isLoading={isLoading} />
        <PersonalInfoSection profile={data?.profile} isLoading={isLoading} />
        <InvitationHistorySection
            invitations={invitationsData?.results}
            isLoading={isLoadingInvitations}
        />
    </div>
}
