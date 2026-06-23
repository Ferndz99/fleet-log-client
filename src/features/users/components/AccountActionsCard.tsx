import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Search, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AccountFeature {
    label: string;
    description: string;
    to: string;
    icon: LucideIcon;
}

const accountFeatures: AccountFeature[] = [
    {
        label: "Buscar vehículo",
        description: "Busca y crea registros de patentes",
        to: "/logs/search-vehicle",
        icon: Search,
    },
    // futuras features se agregan aquí, sin tocar el layout
];


interface AccountActionsCardProps {
    children?: ReactNode; // botones/enlaces que no siguen el patrón estándar
}

function AccountActionsCard({ children }: AccountActionsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Accesos rápidos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
                {accountFeatures.map((feature) => (
                    <Link
                        key={feature.to}
                        to={feature.to}
                        className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                        <div className="rounded-md bg-muted p-2">
                            <feature.icon className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                {feature.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {feature.description}
                            </p>
                        </div>
                    </Link>
                ))}
                {children}
            </CardContent>
        </Card>
    );
}

export default AccountActionsCard;