import UserCreateForm from '#/features/users/components/UserCreateForm'
import { useInvitations } from '#/features/users/hooks/useInvitations'
import { useValidateInvitationToken } from '#/features/users/hooks/useValidateInvitationToken'
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Loader2 } from 'lucide-react'
import z from 'zod'



const searchSchema = z.object({
    token: z.string().optional(),
})

export const Route = createFileRoute('/accept-invitation')({
    component: RouteComponent,
    validateSearch: searchSchema
})




function RouteComponent() {

    const { token } = Route.useSearch()

    if (!token) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center gap-2'>
                <AlertCircle className='w-6 h-6 text-destructive' />
                <p>El enlace de invitación no es válido o está incompleto.</p>
            </div>
        )
    }

    return <div className='w-full h-screen flex flex-col justify-center items-center p-4'><UserCreateForm token={token} /></div>
}
