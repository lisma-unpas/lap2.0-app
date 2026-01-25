'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from "@/actions/auth";
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';
import { Form } from '@/components/base/form/form';
import { AlertFloating } from '@/components/application/alerts/alerts';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { BackgroundPattern } from '@/components/shared-assets/background-patterns';
import { Lock01, Eye, EyeOff } from '@untitledui/icons';
import { PasswordInput } from '@/components/base/input/input-password';
import { useToast } from '@/context/toast-context';

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(1, 'Password wajib diisi'),
});

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    const { toastSuccess, toastError } = useToast();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setServerError(null);
        setShowAlert(false);

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const result = await adminLogin(formData);

            if (result.success) {
                toastSuccess("Berhasil", "Login berhasil! Mengalihkan ke dashboard...");
                router.push('/admin/dashboard');
            } else {
                setServerError(result.message || "Login gagal.");
                toastError("Gagal", result.message || "Login gagal.");
                setShowAlert(true);
                setIsLoading(false);
            }
        } catch (err) {
            setServerError("Terjadi kesalahan sistem.");
            setShowAlert(true);
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen overflow-hidden bg-primary px-4 py-12 md:px-8 md:pt-24 flex items-center justify-center">
            <div className="mx-auto flex w-full max-w-md flex-col gap-8">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="relative">
                        <FeaturedIcon color="gray" theme="modern" size="xl" className="z-10">
                            <Lock01 className="size-7" />
                        </FeaturedIcon>
                        <BackgroundPattern
                            size="lg"
                            pattern="grid"
                            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block text-secondary/30"
                        />
                    </div>

                    <div className="z-10 flex flex-col gap-2 md:gap-3">
                        <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">
                            Admin LISMA
                        </h1>
                        <p className="self-stretch text-md text-tertiary">
                            Masuk ke dashboard admin untuk mengelola pendaftaran
                        </p>
                    </div>
                </div>

                {serverError && showAlert && (
                    <div className="z-10">
                        <AlertFloating
                            color="error"
                            title="Gagal Masuk"
                            description={serverError}
                            confirmLabel="Coba Lagi"
                            onConfirm={() => setShowAlert(false)}
                            onClose={() => setShowAlert(false)}
                        />
                    </div>
                )}

                <Form onSubmit={handleSubmit(onSubmit)} className="z-10 flex flex-col gap-6">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                isRequired
                                hideRequiredIndicator
                                label="Email Admin"
                                type="email"
                                placeholder="admin@lisma-unpas.com"
                                value={field.value}
                                onChange={field.onChange}
                                isInvalid={!!errors.email}
                                hint={errors.email?.message}
                                size="md"
                                autoComplete="email"
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                isRequired
                                hideRequiredIndicator
                                label="Password"
                                placeholder="••••••••"
                                value={field.value}
                                onChange={field.onChange}
                                isInvalid={!!errors.password}
                                hint={errors.password?.message}
                            />
                        )}
                    />

                    <div className="z-10 flex flex-col gap-4 mt-2">
                        <Button type="submit" size="lg" isLoading={isLoading} className="w-full">
                            Masuk ke Dashboard
                        </Button>
                    </div>
                </Form>

                <div className="z-10 flex justify-center gap-1 text-center">
                    <p className="text-sm text-tertiary">
                        Kembali ke{' '}
                        <a href="/" className="text-brand-secondary font-semibold hover:underline">
                            Beranda
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
