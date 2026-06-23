import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { cn } from "#/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, Mail, UserRound } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z, { email } from "zod"
import { useRequestPasswordReset } from "../hooks/useRequestPasswordReset"
import type { PasswordReset } from "../types/users"




const formSchema = z.object({
    email: z.email("Formato de email invalido").min(1, "El email es requerido"),
})

function UserPasswordResetForm() {

    const navigate = useNavigate();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })


    const mutation = useRequestPasswordReset({
        form,
        onSuccess: () => {
            navigate({ to: '/login' })
        },
    })

    function onSubmit(data: PasswordReset) {
        mutation.mutate(data);
    }

    return (
        <Card className={cn("w-full max-w-md", form.formState.errors.root && "border border-destructive/50 rounded-md")}>
            <CardHeader>
                <CardTitle className="mx-auto text-3xl">Recuperacion de contraseña</CardTitle>
                <CardDescription>
                    Ingresa tu email y te llegara un enlace de recuperacion de contraseña
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-email">Email</FieldLabel>
                                    <InputGroup className="">
                                        <InputGroupInput
                                            {...field}
                                            id="form-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="worker1@example.com"
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            type="email"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <Mail className="cursor-default" />
                                            {/* <UserRound className="cursor-default" /> */}
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
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
                                    Enviando...
                                </>
                            ) : (
                                "Enviar"
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full sm:w-auto h-11"
                            onClick={() => navigate({ to: "/login" })}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default UserPasswordResetForm