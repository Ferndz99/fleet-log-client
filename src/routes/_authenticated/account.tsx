import Navbar from '#/components/layout/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { useAuth } from '#/features/auth/context/auth-context'
import AccountActionsCard from '#/features/users/components/AccountActionsCard'
import { getInitials } from '#/lib/get-initials'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone, Settings } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/account')({
    component: RouteComponent,
})

function RouteComponent() {

    const { user } = useAuth()
    const profile = user?.profile;

    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <div className='flex-1 p-4'>
                {/* <Link to="/logs/search-vehicle">search patent</Link> */}
                <div className='mx-auto max-w-4xl grid gap-4 sm:grid-cols-[280px_1fr] items-start'>
                    <Card>
                        <CardHeader className="flex flex-col items-center gap-3 text-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profile?.avatar ?? undefined} alt={profile?.full_name} />
                                <AvatarFallback className="text-lg">
                                    {getInitials(user)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold leading-none">
                                    {profile?.full_name ?? "Usuario"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {profile?.rut}
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span className="truncate">{user?.email}</span>
                            </div>
                            {profile?.phone && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            {profile?.address && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 shrink-0" />
                                    <span className="truncate">{profile.address}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <AccountActionsCard>
                        <Button variant="outline" className="justify-start h-auto py-3">
                            <Settings className="h-4 w-4 mr-2" />
                            Configuración
                        </Button>
                    </AccountActionsCard>
                </div>
            </div>
        </div>)
}
