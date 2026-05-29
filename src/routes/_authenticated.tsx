import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppSidebar from "#/components/layout/sidebar/AppSidebar";
import ThemeToggle from "#/components/layout/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col flex-1">
				<header className="flex items-center justify-between gap-2 border-b px-4 h-16">
					<SidebarTrigger />
					<ThemeToggle />
				</header>
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
