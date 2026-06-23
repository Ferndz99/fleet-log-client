import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { usePasswordResetConfirm } from "../hooks/usePasswordResetConfirm";
import type { PasswordResetConfirm } from "../types/users";
import { passwordRequirements } from "#/lib/constants";
import PasswordRequirementsList from "./PasswordRequirementsList";




const formSchema = z
    .object({
        new_password: z
            .string()
            .min(8, "La contraseña es requerida")
            .refine((value) => passwordRequirements.every((req) => req.test(value)), {
                message: "La contraseña no cumple los requisitos",
            }),
        re_new_password: z.string().min(8, "La contraseña es requerida"),
    })
    .refine((data) => data.new_password === data.re_new_password, {
        message: "Las contraseñas no coinciden",
        path: ["re_new_password"],
    });

interface UserPasswordResetConfirmFormParams {
    uid: string;
    token: string
}


function UserPasswordResetConfirmForm({ uid, token }: UserPasswordResetConfirmFormParams) {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // mode: "onChange",
        defaultValues: {
            new_password: "",
            re_new_password: "",
        },
    })

    const mutation = usePasswordResetConfirm({
        form,
        onSuccess: () => {
            navigate({ to: '/login' })
        },
        uid,
        token
    })


    function onSubmit(data: PasswordResetConfirm) {
        setShowPassword(false);
        setShowPassword2(false);
        mutation.mutate(data)
    }

    const newPassword = form.watch("new_password");
    const reNewPassword = form.watch("re_new_password");

    // Solo evalúa si tiene sentido evaluar
    const shouldCheckMatch = reNewPassword.length >= newPassword.length && reNewPassword.length > 0;
    const passwordsMatch = newPassword === reNewPassword;


    return (
        <Card className='w-full max-w-md mx-auto shadow-lg'>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">
                    Crea tu nueva contraseña
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="new_password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} >
                                    <FieldLabel htmlFor="form-password">
                                        Contraseña
                                    </FieldLabel>
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
                                    <PasswordRequirementsList password={field.value ?? ""} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="re_new_password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-re-password">
                                        Confirma la contraseña
                                    </FieldLabel>
                                    <InputGroup className="py-4 pe-1">
                                        <InputGroupInput
                                            {...field}
                                            id="form-re-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="********"
                                            autoComplete="off"
                                            type={showPassword2 ? "text" : "password"}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword2((prev) => !prev)}
                                                aria-label={
                                                    showPassword2 ? "Hide password" : "Show password"
                                                }
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword2 ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {shouldCheckMatch && (
                                        <p className={`text-sm flex items-center gap-1.5 mt-1.5 ${passwordsMatch ? "text-green-600" : "text-red-500"
                                            }`}>
                                            {passwordsMatch ? (

                                                <>
                                                    <Check className="h-3.5 w-3.5" />
                                                    Las contraseñas coinciden
                                                </>
                                            ) : (
                                                <>
                                                    <X className="h-3.5 w-3.5" />
                                                    Las contraseñas no coinciden
                                                </>
                                            )}
                                        </p>
                                    )}
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
                                    Cambiando...
                                </>
                            ) : (
                                'Cambiar contraseña'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default UserPasswordResetConfirmForm