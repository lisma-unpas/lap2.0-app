"use client";

import { useGoogleAuthContext } from "@/context/google-auth-context";

export function useGoogleAuth() {
    return useGoogleAuthContext();
}
