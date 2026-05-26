import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h2>Hello "/login"!</h2>
		</div>
	);
}
