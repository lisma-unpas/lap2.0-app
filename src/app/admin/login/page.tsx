import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { Suspense } from "react";
import AdminLoginClient from "./admin-login-client";

export const metadata: Metadata = {
  ...openSharedMetadata("Login Admin"),
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <section className="min-h-screen overflow-hidden bg-primary px-4 py-12 md:px-8 md:pt-24 flex items-center justify-center">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="flex flex-col items-center gap-6 text-center text-primary">
            <div className="h-14 w-14 animate-pulse rounded-lg bg-secondary"></div>
            <div className="h-8 w-48 animate-pulse rounded bg-secondary"></div>
          </div>
        </div>
      </section>
    }>
      <AdminLoginClient />
    </Suspense>
  );
}
