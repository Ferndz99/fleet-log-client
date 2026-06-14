import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "#/features/auth/components/LoginForm";
import ThemeToggle from "#/components/layout/ThemeToggle";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative min-h-screen flex justify-center items-start lg:items-center pt-24 lg:pt-0">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
			<LoginForm />
		</div>
	);
}
