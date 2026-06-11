import ThemeToggle from '#/components/layout/ThemeToggle';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { useAuth } from '#/features/auth/context/auth-context';
import { createLog } from '#/features/logs/services/logs-api';
import type { LogCreate } from '#/features/logs/types/logs';
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

    const navigate = useNavigate();
    const { vehiclesId } = Route.useParams()
    const { data, isLoading } = useVehicle(Number(vehiclesId))
    const { logout } = useAuth()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: LogCreate) => createLog(Number(vehiclesId), data),
        onSuccess: () => {
            toast.success("Registro creado con éxito!");
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
            queryClient.invalidateQueries({
                queryKey: ["logs"],
            });
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail ?? "Error al crear el registro");
            }
        }
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            detail: "",
            files: [],
            type: "observation",
            status: "pending",
        }
    })

    const files = form.watch("files");

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutation.mutate(data)
    }

    return (
        <div className='flex flex-col min-h-[80vh] items-center justify-center p-4 relative'>
            <div className='absolute top-4 right-8 flex items-center justify-center gap-2'>
                <Button onClick={logout} className="">
                    <LogOut />
                </Button>
                <ThemeToggle />
            </div>
            {/* Tarjeta del vehículo */}
            {isLoading && (
                <Card className="w-full max-w-xl mx-auto mb-4 shadow-sm">
                    <CardContent className="py-4">
                        <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                    </CardContent>
                </Card>
            )}

            {data && (
                <Card className="w-full max-w-xl mx-auto mb-4 shadow-sm">
                    <CardContent className="py-4 flex items-center gap-4">
                        <div className="bg-muted rounded-md p-3">
                            <Car className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-lg tracking-widest">
                                {data.patent}
                            </span>
                            <div className="flex gap-3 text-sm text-muted-foreground">
                                <span>{data.brand} {data.model}</span>
                                <span>·</span>
                                <span>{data.year}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            <Card className='w-full max-w-xl mx-auto shadow-lg'>
                <CardHeader className='text-center'>
                    <CardTitle className="text-2xl">
                        Crear nuevo registro
                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <form id='form-create-log' onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name='title'
                                control={form.control}
                                render={({ field, fieldState }) =>
                                (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-title">
                                            Titulo
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id='form-title'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Daño en puerta delatera...'
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='detail'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor='form-detail'>
                                            Detalle
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id='form-detail'
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Tipo</FieldLabel>

                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}

                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione un tipo" />
                                            </SelectTrigger>

                                            <SelectContent position='popper'>
                                                {logTypeOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="files"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Archivos adjuntos
                                        </FieldLabel>

                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={(e) => {
                                                field.onChange(
                                                    Array.from(e.target.files ?? [])
                                                );
                                            }}
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                        {files.length > 0 && (
                                            <div className="flex gap-3 overflow-x-auto pb-2 mt-2 w-full">
                                                {files.map((file) => {
                                                    const url = URL.createObjectURL(file);
                                                    const isVideo = file.type.startsWith("video/");

                                                    return isVideo ? (
                                                        <video
                                                            key={file.name}
                                                            src={url}
                                                            className="shrink-0 h-32 w-32 object-cover rounded-md"
                                                            controls
                                                        />
                                                    ) : (
                                                        <img
                                                            key={file.name}
                                                            src={url}
                                                            alt={file.name}
                                                            className="shrink-0 h-32 w-32 object-cover rounded-md"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* {files.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full mt-2">
                                                {files.map((file) => {
                                                    const url = URL.createObjectURL(file);
                                                    const isVideo = file.type.startsWith("video/");

                                                    return isVideo ? (
                                                        <video
                                                            key={file.name}
                                                            src={url}
                                                            className="w-full aspect-square object-cover rounded-md"
                                                            controls
                                                        />
                                                    ) : (
                                                        <img
                                                            key={file.name}
                                                            src={url}
                                                            alt={file.name}
                                                            className="w-full aspect-square object-cover rounded-md"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )} */}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto h-11"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        Creando...
                                    </>
                                ) : (
                                    "Crear log"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full sm:w-auto h-11"
                                onClick={() => navigate({ to: "/logs/search-vehicle" })}

                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>)
}
