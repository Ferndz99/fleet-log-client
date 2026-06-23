import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { ReactNode } from "react";
import { useAuth } from "#/features/auth/context/auth-context";

interface NavbarProps {
    children?: ReactNode;
}

function Navbar({ children }: NavbarProps) {


    const { logout, isAuthenticated } = useAuth()

    console.log(isAuthenticated)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4 sm:px-8">
                <Link to="/" className="font-semibold text-sm sm:text-base">
                    TuApp
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* slot variable: lo que cambia según el layout */}
                    {children}

                    {/* lo que es constante en toda la app */}
                    {
                        isAuthenticated && <Button
                            variant="ghost"
                            size="icon"
                            onClick={logout}
                            aria-label="Cerrar sesión"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>

                    }
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Navbar;