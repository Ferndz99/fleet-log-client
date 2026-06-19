// components/InvitationHistorySection.tsx
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { InvitationDetail } from "../types/users";
import { Card, CardContent } from "#/components/ui/card";



interface InvitationHistorySectionProps {
    invitations?: InvitationDetail[];
    isLoading: boolean;
}

export function InvitationHistorySection({
    invitations,
    isLoading,
}: InvitationHistorySectionProps) {
    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Skeleton className="h-5 w-48" />
                </CardContent>
            </Card>
        );
    }

    const count = invitations?.length ?? 0;

    return (
        <Card>
            <CardContent>
                <Accordion type="single" collapsible>
                    <AccordionItem value="invitations">
                        <AccordionTrigger className="text-sm font-medium text-muted-foreground">
                            Historial de invitaciones ({count})
                        </AccordionTrigger>
                        <AccordionContent>
                            {count === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Este usuario no tiene invitaciones registradas.
                                </p>
                            ) : (
                                <ul className="flex flex-col gap-3">
                                    {invitations!.map((invitation) => (
                                        <InvitationItem key={invitation.id} invitation={invitation} />
                                    ))}
                                </ul>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
        // <Accordion type="single" collapsible>
        //     <AccordionItem value="invitations">
        //         <AccordionTrigger className="text-sm font-medium text-muted-foreground">
        //             Historial de invitaciones ({count})
        //         </AccordionTrigger>
        //         <AccordionContent>
        //             {count === 0 ? (
        //                 <p className="text-sm text-muted-foreground">
        //                     Este usuario no tiene invitaciones registradas.
        //                 </p>
        //             ) : (
        //                 <ul className="flex flex-col gap-3">
        //                     {invitations!.map((invitation) => (
        //                         <InvitationItem key={invitation.id} invitation={invitation} />
        //                     ))}
        //                 </ul>
        //             )}
        //         </AccordionContent>
        //     </AccordionItem>
        // </Accordion>
    );
}

function InvitationItem({ invitation }: { invitation: InvitationDetail }) {
    const isExpired =
        invitation.status === "PENDING" && new Date(invitation.expires_at) < new Date();

    const statusLabel = isExpired
        ? "Expirada"
        : invitation.status === "ACCEPTED"
            ? "Aceptada"
            : invitation.status === "REJECTED"
                ? "Rechazada"
                : "Pendiente";

    const statusVariant = isExpired
        ? "secondary"
        : invitation.status === "ACCEPTED"
            ? "default"
            : invitation.status === "REJECTED"
                ? "destructive"
                : "outline";

    const createdAt = new Intl.DateTimeFormat("es-CL", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(invitation.created_at.replace(" ", "T")));

    return (
        <li className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                    {invitation.is_staff && <Badge variant="outline">Administrador</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                    Invitado por {invitation.invited_by_email}
                </p>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right">{createdAt}</p>
        </li>
        // <li className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
        //     <div className="flex flex-col gap-1">
        //         <div className="flex items-center gap-2">
        //             <Badge variant={statusVariant}>{statusLabel}</Badge>
        //             {invitation.is_staff && <Badge variant="outline">Administrador</Badge>}
        //         </div>
        //         <p className="text-xs text-muted-foreground">
        //             Invitado por {invitation.invited_by_email}
        //         </p>
        //     </div>
        //     <p className="text-xs text-muted-foreground sm:text-right">{createdAt}</p>
        // </li>
    );
}