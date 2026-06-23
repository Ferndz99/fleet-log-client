import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useCreateInvitation } from "../hooks/useCreateInvitation";
import type { InvitationCreate } from "../types/users";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "#/components/ui/dialog";
import { Button } from "#/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Switch } from "#/components/ui/switch";


const formSchema = z.object({
    email: z.email(),
    is_staff: z.boolean()
})



function InvitationCreateForm() {

    const [open, setOpen] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            is_staff: false
        }
    })


    const mutation = useCreateInvitation({ form, onSuccess: () => setOpen(false) })

    function onSubmit(data: InvitationCreate) {
        mutation.mutate(data)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo registro
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2rem)] max-w-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear nuevo registro</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="trabajador@example.com"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="is_staff"
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-is-staff">
                                            Administrador
                                        </FieldLabel>
                                        <FieldDescription>
                                            El usuario tendrá acceso a las funciones de administración.
                                        </FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id="form-is-staff"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    {form.formState.errors.root && (
                        <p className="text-sm text-destructive mt-2">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
                        <Button type="submit" className="w-full sm:w-auto h-11" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Creando...
                                </>
                            ) : (
                                "Crear registro"
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full sm:w-auto h-11"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InvitationCreateForm