import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "#/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mt-20">
			<LoginForm/>
		</div>
	);
}
