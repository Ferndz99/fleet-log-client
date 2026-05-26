import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, SearchIcon, UserRound } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
	email: z.email(),
	password: z.string(),
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

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}

	return (
		<Card className="w-full sm:max-w-sm mx-auto">
			<CardHeader>
				<CardTitle className="mx-auto text-3xl">Login</CardTitle>
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
									<InputGroup className="py-4">
										<InputGroupInput
											{...field}
											id="form-email"
											aria-invalid={fieldState.invalid}
											placeholder="worker1@example.com"
											autoComplete="off"
										/>
										<InputGroupAddon align="inline-end">
											<UserRound className="cursor-default"/>
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
							<Button
								className="cursor-pointer p-4.5"
								type="submit"
								form="form-login"
								
							>
								Login
							</Button>
							{/* <Button variant="outline" type="button">
								Login with Google
							</Button> */}
							<FieldDescription className="text-center">
								Don't have an account? <Link to="/">Sign up</Link>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

export default LoginForm;
