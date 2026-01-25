"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { signOut as signOutAction } from "@/actions/google-auth";

interface GoogleUser {
    name: string;
    email: string;
    picture?: string;
}

interface GoogleAuthContextType {
    user: GoogleUser | null;
    isConnected: boolean;
    loading: boolean;
    refresh: () => void; // Changed to void as it's no longer async
    signOut: () => Promise<void>;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(() => {
        if (typeof window === "undefined") return;

        try {
            const cachedUser = localStorage.getItem("google_user");
            const expiry = localStorage.getItem("google_auth_expiry");

            if (cachedUser && expiry) {
                if (Date.now() < parseInt(expiry)) {
                    setUser(JSON.parse(cachedUser));
                } else {
                    localStorage.removeItem("google_user");
                    localStorage.removeItem("google_auth_expiry");
                    localStorage.removeItem("gdrive_tokens");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to check google auth:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await signOutAction(); // Call server action to be safe, though it might not do much now
            localStorage.removeItem("google_user");
            localStorage.removeItem("google_auth_expiry");
            localStorage.removeItem("gdrive_tokens"); // Clear gdrive tokens on sign out
            setUser(null);
            // Removed checkAuth() call after signOutAction() as local state is updated directly
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    }, []); // Dependency array is empty as it no longer depends on checkAuth

    useEffect(() => {
        checkAuth();

        const handleFocus = () => {
            checkAuth();
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [checkAuth]);

    return (
        <GoogleAuthContext.Provider value={{
            user,
            isConnected: !!user,
            loading,
            refresh: checkAuth,
            signOut
        }}>
            {children}
        </GoogleAuthContext.Provider>
    );
}

export function useGoogleAuthContext() {
    const context = useContext(GoogleAuthContext);
    if (context === undefined) {
        throw new Error("useGoogleAuthContext must be used within a GoogleAuthProvider");
    }
    return context;
}
