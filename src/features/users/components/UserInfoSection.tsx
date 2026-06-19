import { Pencil } from "lucide-react";
import type { User } from "../types/users";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";


interface UserInfoSectionProps {
    user?: User;
    onEdit?: () => void;
    isLoading: boolean
}


function UserInfoSection({ user, onEdit, isLoading }: UserInfoSectionProps) {

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:shrink-0">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                        <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const displayName = user?.profile?.full_name ?? user?.email;
    const initials = user?.profile
        ? `${user?.profile.first_name[0]}${user?.profile.last_name[0]}`.toUpperCase()
        : user?.email[0].toUpperCase();

    return (
        <Card>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-lg font-medium text-muted-foreground">
                        {user?.profile?.avatar ? (
                            <img
                                src={user.profile.avatar}
                                alt={displayName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-lg font-medium">{displayName}</p>
                        <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:shrink-0">
                    <Badge variant={user?.is_active ? "default" : "secondary"}>
                        {user?.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                    <Badge variant="outline">{user?.is_staff ? "Administrador" : "Usuario"}</Badge>
                    {onEdit && (
                        <Button
                            onClick={onEdit}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1.5"
                        >
                            <Pencil size={16} />
                            Editar
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default UserInfoSection