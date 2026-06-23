import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react"
import { useValidateInvitationToken } from "../hooks/useValidateInvitationToken"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from "#/components/ui/input"
import { useNavigate } from "@tanstack/react-router"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAcceptInvitation } from "../hooks/useAcceptInvitation"
import { Button } from "#/components/ui/button"
import type { InvitationAccept, InvitationAcceptBasic } from "../types/users"
import { formatRut } from "#/lib/rut"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { useState } from "react"
import { capitalizeFirst } from "#/lib/text"


const formSchema = z.object({
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    profile: z.object({
        first_name: z.string().min(1, 'El nombre es requerido'),
        last_name: z.string().min(1, 'El apellido paterno es requerido'),
        second_last_name: z.string().min(1, 'El apellido materno es requerido'),
        rut: z.string().min(1, 'El RUT es requerido'),
        phone: z.string().min(1, 'El teléfono es requerido'),
        birth_date: z.string().min(1, 'La fecha de nacimiento es requerida'),
        avatar: z
            .instanceof(File, { message: 'Debes seleccionar una imagen' })
            .refine((file) => file.size <= 5 * 1024 * 1024, 'La imagen debe pesar menos de 5MB')
            .refine(
                (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
                'Solo se permiten imágenes JPG, PNG o WEBP',
            ),
        address: z.string().min(1, 'La dirección es requerida'),
    }),
})





function UserCreateForm({ token }: { token: string }) {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);


    const { isLoading, isError } = useValidateInvitationToken(token)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            profile: {
                first_name: '',
                last_name: '',
                second_last_name: '',
                rut: '',
                phone: '',
                birth_date: '',
                avatar: undefined as unknown as File,
                address: '',
            },
        },
    })

    const mutation = useAcceptInvitation({
        form,
        onSuccess: () => {
            navigate({ to: '/login' })
        },
        token
    })

    function onSubmit(data: InvitationAcceptBasic) {
        setShowPassword(false);
        const fullPhone = `+56${data.profile.phone}`;
        mutation.mutate({
            ...data,
            profile: {
                ...data.profile,
                phone: fullPhone,
            },
        });
    }

    if (isLoading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <Loader2 className='animate-spin w-4 h-4' />
            </div>
        )
    }

    if (isError) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center gap-2'>
                <AlertCircle className='w-6 h-6 text-destructive' />
                <p>Esta invitación no es válida, ya fue usada o expiró.</p>
                {/* opcional, solo si te interesa loggear o mostrar detalle */}
                {/* <p className='text-xs text-muted-foreground'>{error.message}</p> */}
            </div>
        )
    }



    return (
        // <Card className="w-full max-w-lg">
        //     <CardHeader>
        //         <CardTitle>Completa tu registro</CardTitle>
        //         <CardDescription>
        //             Ingresa tus datos para activar tu cuenta y aceptar la invitación.
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <form onSubmit={form.handleSubmit(onSubmit)}>
        //             <FieldGroup>
        //                 <Controller
        //                     name="password"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-password">
        //                                 Contraseña
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-password"
        //                                 type="password"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="********"
        //                                 autoComplete="new-password"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.first_name"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-first-name">
        //                                 Nombre
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-first-name"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="Juan"
        //                                 autoComplete="given-name"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.last_name"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-last-name">
        //                                 Apellido paterno
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-last-name"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="Pérez"
        //                                 autoComplete="family-name"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.second_last_name"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-second-last-name">
        //                                 Apellido materno
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-second-last-name"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="González"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.rut"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-rut">
        //                                 RUT
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-rut"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="12.345.678-9"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.phone"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-phone">
        //                                 Teléfono
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-phone"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="+56 9 1234 5678"
        //                                 autoComplete="tel"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.birth_date"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-birth-date">
        //                                 Fecha de nacimiento
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-birth-date"
        //                                 type="date"
        //                                 aria-invalid={fieldState.invalid}
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.address"
        //                     control={form.control}
        //                     render={({ field, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-address">
        //                                 Dirección
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-address"
        //                                 aria-invalid={fieldState.invalid}
        //                                 placeholder="Av. Siempre Viva 742"
        //                                 autoComplete="street-address"
        //                             />
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />

        //                 <Controller
        //                     name="profile.avatar"
        //                     control={form.control}
        //                     render={({ field: { value, onChange, ...field }, fieldState }) => (
        //                         <Field data-invalid={fieldState.invalid}>
        //                             <FieldLabel htmlFor="form-avatar">
        //                                 Foto de perfil
        //                             </FieldLabel>
        //                             <Input
        //                                 {...field}
        //                                 id="form-avatar"
        //                                 type="file"
        //                                 accept="image/jpeg,image/png,image/webp"
        //                                 aria-invalid={fieldState.invalid}
        //                                 onChange={(e) => onChange(e.target.files?.[0])}
        //                             />
        //                             <FieldDescription>
        //                                 Sube una foto de perfil (JPG, PNG o WEBP, máx. 5MB).
        //                             </FieldDescription>
        //                             {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        //                         </Field>
        //                     )}
        //                 />
        //             </FieldGroup>

        //             {form.formState.errors.root && (
        //                 <p className="text-sm text-destructive mt-2">
        //                     {form.formState.errors.root.message}
        //                 </p>
        //             )}

        //             <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
        //                 <Button
        //                     type="submit"
        //                     className="w-full sm:w-auto h-11"
        //                     disabled={mutation.isPending}
        //                 >
        //                     {mutation.isPending ? (
        //                         <>
        //                             <Loader2 className="animate-spin w-4 h-4" />
        //                             Creando...
        //                         </>
        //                     ) : (
        //                         'Crear cuenta'
        //                     )}
        //                 </Button>
        //             </div>
        //         </form>
        //     </CardContent>
        // </Card>

        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Completa tu registro</CardTitle>
                <CardDescription>
                    Ingresa tus datos para activar tu cuenta y aceptar la invitación.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-full">
                                    <FieldLabel htmlFor="form-password">
                                        Contraseña
                                    </FieldLabel>
                                    {/* <Input
                                        {...field}
                                        id="form-password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="********"
                                        autoComplete="new-password"
                                    /> */}
                                    <InputGroup className="py-4 pe-1">
                                        <InputGroupInput
                                            {...field}
                                            id="form-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="********"
                                            autoComplete="off"
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.first_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-first-name">
                                        Nombre
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-first-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Juan"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        onChange={(e) => {
                                            field.onChange(capitalizeFirst(e.target.value));
                                        }}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.last_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-last-name">
                                        Apellido paterno
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-last-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Pérez"
                                        autoCapitalize="on"
                                        onChange={(e) => {
                                            field.onChange(capitalizeFirst(e.target.value));
                                        }}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.second_last_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-second-last-name">
                                        Apellido materno
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-second-last-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="González"
                                        autoCapitalize="on"
                                        onChange={(e) => {
                                            field.onChange(capitalizeFirst(e.target.value));
                                        }}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.rut"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rut">
                                        RUT
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rut"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="12.345.678-9"
                                        maxLength={12}
                                        onChange={(e) => {
                                            const formatted = formatRut(e.target.value);
                                            field.onChange(formatted);
                                        }}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-phone">
                                        Teléfono
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupAddon>+56</InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            id="form-phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="9 1234 5678"
                                            autoComplete="tel"
                                            maxLength={9}
                                            onChange={(e) => {
                                                // Solo permite dígitos, sin el +56
                                                const onlyDigits = e.target.value.replace(/\D/g, "");
                                                field.onChange(onlyDigits);
                                            }}
                                        />
                                    </InputGroup>
                                    {/* <Input
                                        {...field}
                                        id="form-phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+56 9 1234 5678"
                                        autoComplete="tel"
                                    /> */}
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.birth_date"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-birth-date">
                                        Fecha de nacimiento
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-birth-date"
                                        type="date"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-full">
                                    <FieldLabel htmlFor="form-address">
                                        Dirección
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-address"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Av. Siempre Viva 742"
                                        autoComplete="street-address"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="profile.avatar"
                            control={form.control}
                            render={({ field: { value, onChange, ...field }, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-full">
                                    <FieldLabel htmlFor="form-avatar">
                                        Foto de perfil
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-avatar"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => onChange(e.target.files?.[0])}
                                    />
                                    <FieldDescription>
                                        Sube una foto de perfil (JPG, PNG o WEBP, máx. 5MB).
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {form.formState.errors.root && (
                        <p className="text-sm text-destructive mt-2">
                            {form.formState.errors.root.message}
                        </p>
                    )}

                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-6">
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
                                'Crear cuenta'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    )
}

export default UserCreateForm