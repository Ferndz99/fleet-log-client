import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { LogOut, Search, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import ThemeToggle from '#/components/layout/ThemeToggle'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group'
import { Separator } from '#/components/ui/separator'
import { useAuth } from '#/features/auth/context/auth-context'
import { useVehicleByPatent } from '#/features/vehicles/hooks/useVehicleByPatent'
import Navbar from '#/components/layout/Navbar'

export const Route = createFileRoute('/_authenticated/logs/search-vehicle')({
    component: RouteComponent,
})


const formSchema = z.object({
    patent: z.string().min(1, "La patente es requerida").transform((val) => val.toUpperCase())
})

function RouteComponent() {

    const navigate = useNavigate();
    const [patent, setPatent] = useState<string>("");

    const { logout } = useAuth()

    const { isLoading, isError, data } = useVehicleByPatent(patent);

    useEffect(() => {
        if (data) {
            navigate({ to: `/logs/create/${data.id}` });
        }
        if (isError) {
            form.setError("patent", { message: "Vehículo no encontrado" });
            setPatent("");
        }
    }, [data, isError]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patent: ""
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        setPatent(data.patent);
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar>
                <Link to="/account">
                    <UserCircle />
                </Link>
            </Navbar>
            <div className='flex flex-1 items-center justify-center p-4 relative'>
                {/* <div className='absolute top-4 right-8 flex items-center justify-center gap-2'>

                <Link to="/account">
                    <UserCircle/>
                </Link>
                <Button onClick={logout} className="">
                    <LogOut />
                </Button>
                <ThemeToggle />
            </div> */}
                <Card className='w-full max-w-md mx-auto shadow-lg'>
                    <CardHeader className='text-center'>
                        <CardTitle className="text-2xl">
                            Crear nuevo registro
                        </CardTitle>
                        <CardDescription>
                            Ingrese la patente del vehículo para continuar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="form-search-patent"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup>
                                <Controller
                                    name='patent'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='form-patent'>
                                                Patente
                                            </FieldLabel>
                                            <InputGroup className='h-9'>
                                                <InputGroupInput
                                                    {...field}
                                                    id='form-patent'
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="AABB12, DD1234"
                                                    autoComplete="off"
                                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                    className=""
                                                    autoCapitalize='characters'
                                                    inputMode='search'
                                                    spellCheck={false}
                                                    autoCorrect="off"
                                                />
                                                <InputGroupAddon align='inline-end'>
                                                    <Search className="cursor-default" />
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <div className='mt-6 space-y-4'>
                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Buscando..." : "Buscar vehículo"}
                                </Button>
                                <Separator />
                                <div className="">
                                    <Button
                                        variant="outline"
                                        className="w-full h-11"
                                    >
                                        Escanear código QR
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
