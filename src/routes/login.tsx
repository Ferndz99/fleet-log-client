import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "#/features/auth/components/LoginForm";
import ThemeToggle from "#/components/layout/ThemeToggle";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative min-h-screen flex items-center justify-center p-4">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
			<LoginForm />
		</div>
	);
}
