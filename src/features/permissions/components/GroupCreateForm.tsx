import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod"
import { useCreateGroup } from "../hooks/useCreateGroup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "#/components/ui/dialog";
import { Button } from "#/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";




const formSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(255, "El nombre no puede superar los 255 caracteres"),
})

type GroupFormValues = z.infer<typeof formSchema>;

function GroupCreateForm() {

    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const mutation = useCreateGroup({
        form,
        onSuccess: () => setOpen(false),
    })

    function onSubmit(data: GroupFormValues) {
        mutation.mutate(data);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo grupo
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2rem)] max-w-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear nuevo grupo</DialogTitle>
                    <DialogDescription>
                        Aqui puedes crear un nuevo grupo para organizar tus permisos y usuarios.
                    </DialogDescription>
                </DialogHeader>


                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-name">
                                        Nombre
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Administradores, Auditoria, Operarios..."
                                        autoComplete="off"
                                        autoCapitalize="on"
                                    />
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
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
                        <Button type="submit" className="w-full sm:w-auto h-11" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Creando...
                                </>
                            ) : (
                                "Crear grupo"
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

export default GroupCreateForm