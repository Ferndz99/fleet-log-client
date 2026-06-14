import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "#/features/auth/context/auth-context";
import { handleApiErrors } from "#/lib/handle-api-errors";
import { cn } from "#/lib/utils";

const formSchema = z.object({
	email: z.email("Formato de email invalido").min(1, "El email es requerido"),
	password: z
		.string()
		.min(1, "La contraseña es requerida")
		.min(8, "La contraseña debe tener al menos 8 caracteres"),
});

function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const { login } = useAuth();

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await login(data.email, data.password);
		} catch (error) {
			handleApiErrors(error, form);
		}
	}

	return (
		<Card className={cn("w-full max-w-sm", form.formState.errors.root && "border border-destructive/50 rounded-md")}>
			<CardHeader>
				<CardTitle className="mx-auto text-3xl">Inicio de sesion</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					id="form-login"
					onSubmit={form.handleSubmit(onSubmit)}
					className="p-2.5"
				>
					<FieldGroup className="space-y-2">
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
											<UserRound className="cursor-default" />
										</InputGroupAddon>
									</InputGroup>
									{/* <Input
										{...field}
										id="form-email"
										aria-invalid={fieldState.invalid}
										placeholder="worker1@example.com"
										autoComplete="off"
										className="py-4.5"
									/> */}
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<div className="flex items-center">
										<FieldLabel htmlFor="form-password">Password</FieldLabel>
										<Link
											to="/"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>

									<InputGroup className="py-4 pe-1">
										<InputGroupInput
											{...field}
											id="form-password"
											aria-invalid={fieldState.invalid}
											placeholder=""
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

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>

								// <Field data-invalid={fieldState.invalid}>
								// 	<div className="flex items-center">
								// 		<FieldLabel htmlFor="form-password">Password</FieldLabel>

								// 		<Link
								// 			to="/"
								// 			className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								// 		>
								// 			Forgot your password?
								// 		</Link>
								// 	</div>

								// 	<div className="relative">
								// 		<Input
								// 			{...field}
								// 			id="form-password"
								// 			aria-invalid={fieldState.invalid}
								// 			placeholder=""
								// 			autoComplete="off"
								// 			className="py-4.5 pr-10"
								// 			type={showPassword ? "text" : "password"}
								// 		/>
								// 		<button
								// 			type="button"
								// 			onClick={() => setShowPassword((prev) => !prev)}
								// 			className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
								// 			aria-label={
								// 				showPassword ? "Hide password" : "Show password"
								// 			}
								// 		>
								// 			{showPassword ? (
								// 				<EyeOff className="h-4 w-4" />
								// 			) : (
								// 				<Eye className="h-4 w-4" />
								// 			)}
								// 		</button>
								// 	</div>

								// 	{fieldState.invalid && (
								// 		<FieldError errors={[fieldState.error]} />
								// 	)}
								// </Field>

								// <Field data-invalid={fieldState.invalid}>
								// 	<div className="flex items-center">
								// 		<FieldLabel htmlFor="form-password">Password</FieldLabel>

								// 		<Link
								// 			to="/"
								// 			className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								// 		>
								// 			Forgot your password?
								// 		</Link>
								// 	</div>

								// 	<Input
								// 		{...field}
								// 		id="form-password"
								// 		aria-invalid={fieldState.invalid}
								// 		placeholder=""
								// 		autoComplete="off"
								// 		className="py-4.5"
								// 		type="password"
								// 	/>
								// 	{fieldState.invalid && (
								// 		<FieldError errors={[fieldState.error]} />
								// 	)}
								// </Field>
							)}
						/>
						<Field>
							{form.formState.errors.root && (
								<p className="text-sm text-destructive text-center">
									{form.formState.errors.root.message}
								</p>
							)}
							<Button
								className="cursor-pointer p-4.5"
								type="submit"
								disabled={form.formState.isSubmitting}

							>
								{form.formState.isSubmitting ? (
									<>
										<Loader2 className="animate-spin w-4 h-4" />
										Iniciando sesión...
									</>
								) : (
									"Iniciar sesión"
								)}
							</Button>
							{/* <Button variant="outline" type="button">
								Login with Google
							</Button> */}
							{/* <FieldDescription className="text-center">
								Don't have an account? <Link to="/">Sign up</Link>
							</FieldDescription> */}
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

export default LoginForm;
