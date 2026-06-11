import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/_authenticated")({
	// beforeLoad: () => {
	// 	if (typeof window === "undefined") return;
	// 	const token = localStorage.getItem("access_token");
	// 	if (!token) {
	// 		throw redirect({ to: "/login" });
	// 	}
	// },
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			navigate({ to: "/login", replace: true });
		} else {
			setChecking(false);
		}
	}, []);

	if (checking) return (
		<div className="flex min-h-screen items-center justify-center">
			<Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
		</div>
	);
	return (
		<Outlet />
	);
}
