import { Button } from "#/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";


interface VehicleFormCreateProps {
    className?: string;
}

const VEHICLE_BRANDS = [
    "Chevrolet", "Ford", "Toyota", "Honda", "Nissan",
    "Volkswagen", "Hyundai", "Kia", "Renault", "Peugeot",
    "Fiat", "Mercedes-Benz", "BMW", "Audi", "Jeep",
    "Mitsubishi", "Suzuki", "Mazda", "Subaru", "Volvo",
    "Otro",
];

const formSchema = z.object({
    patent: z.string().min(1, "La patente es requerida"),
    brand: z.string().min(1, "La marca es requerida"),
    model: z.string().min(1, "El modelo es requerido"),
    year: z.number().min(1900, "Año inválido")
        .max(new Date().getFullYear(), "Año inválido"),
})

function VehicleFormCreate({ className }: VehicleFormCreateProps) {

    const [isOther, setIsOther] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patent: "",
            brand: "",
            model: "",
            year: 0,
        },
    })


    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);

    }

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset();      // ← limpia el formulario al cerrar
            setIsOther(false); // ← resetea el estado del select
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <form id="form-create-vehicle" onSubmit={form.handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    <Button className={className}>
                        Agregar Vehiculo
                    </Button>
                </DialogTrigger>
                <DialogContent className="
		top-[10vh]
		translate-y-0
		sm:top-1/2
		sm:-translate-y-1/2
	">
                    <DialogHeader>
                        <DialogTitle>
                            Creacion de vehiculo
                        </DialogTitle>
                        <DialogDescription>
                            Creacion de vehiculo
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="patent"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-patent">
                                        Patente
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-patent"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="ABCD12"
                                        autoComplete="off"
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* <Controller
                            name="brand"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-brand">
                                        Marca
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-brand"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="ABCD12"
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        /> */}
                        <Controller
                            name="brand"
                            control={form.control}
                            render={({ field, fieldState }) => {


                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-brand">Marca</FieldLabel>

                                        <Select
                                            value={isOther ? "Otro" : field.value}
                                            onValueChange={(value) => {
                                                if (value === "Otro") {
                                                    setIsOther(true);
                                                    field.onChange("");
                                                } else {
                                                    setIsOther(false);
                                                    field.onChange(value);
                                                }
                                            }}
                                        >
                                            <SelectTrigger id="form-brand" aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Selecciona una marca" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {VEHICLE_BRANDS.map((brand) => (
                                                    <SelectItem key={brand} value={brand}>
                                                        {brand}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {isOther && (
                                            <Input
                                                {...field}
                                                id="form-brand-other"
                                                placeholder="Escribe la marca"
                                                autoComplete="off"
                                                aria-invalid={fieldState.invalid}
                                                className="mt-2"
                                            />
                                        )}
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <Controller
                            name="model"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-model">
                                        Modelo
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-model"
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
                            name="year"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-year">
                                        Año
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-year"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="2022"
                                        autoComplete="off"
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" >Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" form="form-create-vehicle" >Guardar</Button>
                        </DialogFooter>

                    </FieldGroup>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default VehicleFormCreate