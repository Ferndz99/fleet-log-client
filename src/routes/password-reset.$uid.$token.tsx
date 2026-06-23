import UserPasswordResetConfirmForm from '#/features/users/components/UserPasswordResetConfirmForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/password-reset/$uid/$token')({
    component: RouteComponent,
})

function RouteComponent() {

    const { uid, token } = Route.useParams()


    return <div className='w-full min-h-screen flex items-center justify-center p-4'>
        <UserPasswordResetConfirmForm uid={uid} token={token} />
    </div>
}
