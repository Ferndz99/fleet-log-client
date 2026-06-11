import AppSidebar from '#/components/layout/sidebar/AppSidebar'
import ThemeToggle from '#/components/layout/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar'
import { useAuth } from '#/features/auth/context/auth-context'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_authenticated/_dashboard')({
    component: RouteComponent,
})

function RouteComponent() {

    const { user, status } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    // useEffect(() => {
    //     if (loading) return;
    //     if (!user) return;

    //     if (!user?.is_staff) {
    //         navigate({ to: "/logs/search-vehicle", replace: true });
    //         return;
    //     }

    //     setChecking(false);
    // }, [loading, user]);

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            navigate({ to: "/login", replace: true });
            return;
        }
        if (!user?.is_staff) {
            navigate({ to: "/logs/search-vehicle", replace: true });
            return;
        }
        setChecking(false);
    }, [status, user]);

    if (checking) return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
        </div>
    );

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
    )
}
