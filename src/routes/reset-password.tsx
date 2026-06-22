import UserPasswordResetForm from '#/features/users/components/UserPasswordResetForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-password')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className='w-full min-h-screen flex items-center justify-center p-4'><UserPasswordResetForm /></div>
}
