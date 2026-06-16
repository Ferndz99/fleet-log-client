import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from 'zod'
import { useCreateLog } from "../hooks/useCreateLog";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Field, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Loader2 } from "lucide-react";



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

type LogFormValues = z.infer<typeof formSchema>;


interface CreateLogFormProps {
    vehicleId: number
}

function CreateLogForm({ vehicleId }: CreateLogFormProps) {

    const navigate = useNavigate();


    const form = useForm<LogFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            detail: "",
            files: [],
            type: "observation",
            status: "pending",
        }
    })


    const mutation = useCreateLog({
        vehicleId,
        form,
    });


    const files = form.watch("files");

    function onSubmit(data: LogFormValues) {
        mutation.mutate(data);
    }


    return (
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
    )
}

export default CreateLogForm