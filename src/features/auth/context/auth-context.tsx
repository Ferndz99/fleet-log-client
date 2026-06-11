import { useNavigate } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth-api";

type User = {
    id: string;
    email: string;
    is_staff: boolean;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    status: AuthStatus;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<AuthStatus>("loading");
    const navigate = useNavigate();

    // Se llama una vez al montar para restaurar la sesión
    const initAuth = useCallback(async () => {
        if (typeof window === "undefined") {  // ← guard SSR
            setStatus("unauthenticated");
            return;
        }
        const token = localStorage.getItem("access_token");
        if (!token) {
            setStatus("unauthenticated");
            return;
        }

        try {
            const me = await authService.getCurrentUser(); // el interceptor refresca si expira
            setUser(me);
            setStatus("authenticated");
        } catch {
            localStorage.removeItem("access_token");
            setUser(null);
            setStatus("unauthenticated");
        }
    }, []);

    // Reemplaza el useEffect con pathname — TanStack Router maneja el guard en beforeLoad
    // useState(() => { initAuth(); });
    useEffect(() => {
        initAuth();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const data = await authService.login(email, password);
        localStorage.setItem("access_token", data.access);

        const me = await authService.getCurrentUser();
        setUser(me);

        setStatus("authenticated"); // ← agrega esto
        navigate({ to: me.is_staff ? "/" : "/logs/search-vehicle" });
    }, [navigate]);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
            localStorage.removeItem("access_token");
        } finally {
            setUser(null);
            setStatus("unauthenticated");
            navigate({ to: "/login" });
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, status, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};