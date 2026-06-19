// components/AccountInfoSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "../types/users";

interface AccountInfoSectionProps {
    user?: User;
    isLoading: boolean;
}

export function AccountInfoSection({ user, isLoading }: AccountInfoSectionProps) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Información de cuenta
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Información de cuenta
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InfoItem label="Email" value={user?.email} />
                <InfoItem label="Estado" value={user?.is_active ? "Activo" : "Inactivo"} />
                <InfoItem label="Rol" value={user?.is_staff ? "Administrador" : "Usuario"} />
            </CardContent>
        </Card>
    );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="truncate text-sm">{value}</p>
        </div>
    );
}

function InfoItemSkeleton() {
    return (
        <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-24" />
        </div>
    );
}