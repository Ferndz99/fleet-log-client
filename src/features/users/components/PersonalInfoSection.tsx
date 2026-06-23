// components/PersonalInfoSection.tsx
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Profile } from "../types/users";

interface PersonalInfoSectionProps {
    profile?: Profile | null;
    isLoading: boolean;
}

export function PersonalInfoSection({ profile, isLoading }: PersonalInfoSectionProps) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Información personal
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <InfoItemSkeleton />
                    <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-3 w-40" />
                </CardFooter>
            </Card>
        );
    }

    if (!profile) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Información personal
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Este usuario no tiene un perfil asociado.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const birthDate = new Intl.DateTimeFormat("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(profile.birth_date));

    const updatedAt = new Intl.DateTimeFormat("es-CL", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(profile.updated_at.replace(" ", "T")));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Información personal
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <InfoItem label="Nombre" value={profile.first_name} />
                <InfoItem label="Apellido" value={profile.last_name} />
                <InfoItem label="Segundo apellido" value={profile.second_last_name} />
                <InfoItem label="RUT" value={profile.rut} />
                <InfoItem label="Teléfono" value={profile.phone} />
                <InfoItem label="Fecha de nacimiento" value={birthDate} />
                <div className="min-w-0 sm:col-span-2 md:col-span-3">
                    <p className="text-xs text-muted-foreground">Dirección</p>
                    <p className="text-sm">{profile.address}</p>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Última actualización: {updatedAt}
                </p>
            </CardFooter>
        </Card>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
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