"use client";

import { useState } from "react";
import { SearchLg, CheckCircle, Clock, AlertCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { getRegistrationStatus } from "@/actions/status";
import { Badge } from "@/components/base/badges/badges";

export default function CheckStatusPage() {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await getRegistrationStatus({ email: search, nim: search });
            if (res.success) {
                setResults(res.data || []);
                if (res.data?.length === 0) {
                    setError("Data pendaftaran tidak ditemukan. Pastikan Email atau NIM benar.");
                }
            } else {
                setError(res.error || "Gagal mengambil data.");
            }
        } catch (err) {
            setError("Terjadi kesalahan teknis.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'VERIFIED': return <CheckCircle className="size-5 text-success-600" />;
            case 'PENDING': return <Clock className="size-5 text-warning-600" />;
            default: return <AlertCircle className="size-5 text-error-600" />;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'VERIFIED': return 'success';
            case 'PENDING': return 'warning';
            default: return 'error';
        }
    };

    return (
        <Section>
            <Container>
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-display-sm font-semibold text-primary">Cek Status Pendaftaran</h1>
                    <p className="mt-4 text-lg text-tertiary">
                        Masukkan Email atau NIM yang Anda gunakan saat mendaftar untuk melihat status verifikasi.
                    </p>

                    <form onSubmit={handleSearch} className="mt-10 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <Input
                                placeholder="Email atau NIM..."
                                value={search}
                                onChange={(val) => setSearch(val)}
                                icon={SearchLg}
                            />
                        </div>
                        <Button type="submit" color="primary" isLoading={isLoading}>
                            Cek Status
                        </Button>
                    </form>

                    {error && (
                        <div className="mt-8 p-4 rounded-xl bg-error-50 border border-error-200 text-error-700 text-sm">
                            {error}
                        </div>
                    )}

                    {results && results.length > 0 && (
                        <div className="mt-12 space-y-6 text-left">
                            {results.map((reg) => (
                                <div key={reg.id} className="p-6 rounded-2xl border border-secondary bg-primary shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-bold text-quaternary uppercase tracking-wider">
                                                {reg.subEvent?.event?.name} — {reg.subEvent?.name}
                                            </p>
                                            <h3 className="mt-1 text-xl font-bold text-primary">{reg.fullName}</h3>
                                            <p className="text-sm text-tertiary">{reg.nim} | {reg.major}</p>
                                        </div>
                                        <Badge color={getStatusVariant(reg.status) as any} size="md">
                                            <div className="flex items-center gap-1.5">
                                                {getStatusIcon(reg.status)}
                                                {reg.status}
                                            </div>
                                        </Badge>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-secondary flex flex-wrap gap-4 items-center justify-between">
                                        <div className="text-sm text-tertiary">
                                            Terdaftar pada: {new Date(reg.createdAt).toLocaleDateString('id-ID')}
                                        </div>
                                        {reg.status === 'PENDING' && (
                                            <Button size="sm" color="secondary" href={`/payment/${reg.id}`}>
                                                Upload Bukti Pembayaran
                                            </Button>
                                        )}
                                        {reg.status === 'VERIFIED' && (
                                            <Button size="sm" color="primary">
                                                Download Ticket (PDF)
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
}
