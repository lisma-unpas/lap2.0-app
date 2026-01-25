"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getGoogleUser, signOut as signOutAction } from "@/actions/google-auth";

interface GoogleUser {
    name: string;
    email: string;
    picture?: string;
}

interface GoogleAuthContextType {
    user: GoogleUser | null;
    isConnected: boolean;
    loading: boolean;
    refresh: () => Promise<void>;
    signOut: () => Promise<void>;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const googleUser = await getGoogleUser();
            setUser(googleUser);
        } catch (error) {
            console.error("Failed to check google auth:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await signOutAction();
            setUser(null);
            // Re-verify auth status from server
            await checkAuth();
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    }, [checkAuth]);

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
