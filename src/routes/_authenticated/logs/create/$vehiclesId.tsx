import ThemeToggle from '#/components/layout/ThemeToggle';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { useAuth } from '#/features/auth/context/auth-context';
import CreateLogForm from '#/features/logs/components/CreateLogForm';
import { createLog } from '#/features/logs/services/logs-api';
import type { LogCreate } from '#/features/logs/types/logs';
import VehicleSummaryCard from '#/features/vehicles/components/VehicleSummaryCard';
import { useVehicle } from '#/features/vehicles/hooks/useVehicle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { Car, Loader2, LogOut } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod'

export const Route = createFileRoute('/_authenticated/logs/create/$vehiclesId')({
    component: RouteComponent,
})



const formSchema = z.object({
    title: z
        .string()
        .min(1, "El título es obligatorio")
        .max(255, "El título no puede superar los 255 caracteres"),

    detail: z
        .string()
        .min(1, "El detalle es obligatorio"),

    files: z
        .array(z.instanceof(File)),

    type: z.enum([
        "incident",
        "maintenance",
        "observation",
        "cleaning",
    ]),

    status: z.enum([
        "pending",
        "reviewed",
        "resolved",
    ]),
});


const logTypeOptions = [
    { value: "incident", label: "Incidente" },
    { value: "maintenance", label: "Mantenimiento" },
    { value: "observation", label: "Observación" },
    { value: "cleaning", label: "Limpieza" },
];

function RouteComponent() {

    // const navigate = useNavigate();
    const { vehiclesId } = Route.useParams()
    const { data, isLoading } = useVehicle(Number(vehiclesId))
    const { logout } = useAuth()
    // const queryClient = useQueryClient();

    // const mutation = useMutation({
    //     mutationFn: (data: LogCreate) => createLog(Number(vehiclesId), data),
    //     onSuccess: () => {
    //         toast.success("Registro creado con éxito!");
    //         form.reset();
    //         queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
    //         queryClient.invalidateQueries({
    //             queryKey: ["logs"],
    //         });
    //     },
    //     onError: (error) => {
    //         if (axios.isAxiosError(error)) {
    //             toast.error(error.response?.data?.detail ?? "Error al crear el registro");
    //         }
    //     }
    // })


    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         title: "",
    //         detail: "",
    //         files: [],
    //         type: "observation",
    //         status: "pending",
    //     }
    // })

    // const files = form.watch("files");

    // function onSubmit(data: z.infer<typeof formSchema>) {
    //     mutation.mutate(data)
    // }

    return (
        <div className='flex flex-col  items-center justify-center p-4 relative'>
            <div className='absolute top-4 right-8 flex items-center justify-center gap-2'>
                <Button onClick={logout} className="">
                    <LogOut />
                </Button>
                <ThemeToggle />
            </div>
            {/* Tarjeta del vehículo skeleton */}
            {isLoading && (
                <Card className="w-full max-w-xl mx-auto mb-4 shadow-sm">
                    <CardContent className="py-4">
                        <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                    </CardContent>
                </Card>
            )}

            <VehicleSummaryCard data={data} isLoading={isLoading} />
            {vehiclesId && <CreateLogForm vehicleId={Number(vehiclesId)} />}
        </div>)
}
