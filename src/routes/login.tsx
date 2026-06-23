import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "#/features/auth/components/LoginForm";
import ThemeToggle from "#/components/layout/ThemeToggle";
import Navbar from "#/components/layout/Navbar";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* <div className="absolute top-4 right-4">
				<ThemeToggle />
			</div> */}
			<Navbar />
			<div className='flex-1 p-4 flex items-center justify-center'>
				<LoginForm />
			</div>
		</div>
	);
}
