"use client";

import React, { useState, useEffect } from "react";
import { getTicketDetails, markTicketAsUsed } from "@/actions/check-in";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CheckCircle, AlertTriangle, User01, Calendar, Ticket01, XCircle, LogIn01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { UNIT_CONFIG } from "@/constants/units";
import { formatDateTime } from "@/utils/date";
import { useParams, useRouter } from "next/navigation";

export default function CheckInPage() {
    const params = useParams();
    const router = useRouter();
    const code = params?.code as string;

    const [admin, setAdmin] = useState<any>(null);
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [wasAlreadyUsed, setWasAlreadyUsed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            if (!code) return;

            // Check admin session from localStorage
            const userStr = localStorage.getItem("admin_user");
            const expiryStr = localStorage.getItem("admin_expiry");

            if (!userStr || !expiryStr || Date.now() > parseInt(expiryStr)) {
                setLoading(false);
                return;
            }

            const adminUser = JSON.parse(userStr);
            setAdmin(adminUser);

            try {
                // Fetch ticket details
                let res = await getTicketDetails(code);

                if (res.success && res.data) {
                    const alreadyUsed = res.data.isUsed;
                    setWasAlreadyUsed(alreadyUsed);
                    setTicket(res.data);

                    // Auto check-in if valid and not used
                    if (!alreadyUsed && !isProcessing) {
                        setIsProcessing(true);
                        await markTicketAsUsed(code);
                        // Refresh data
                        const refreshRes = await getTicketDetails(code);
                        if (refreshRes.success) setTicket(refreshRes.data);
                        setIsProcessing(false);
                    }
                } else {
                    setError(res.error || "Tiket tidak ditemukan");
                }
            } catch (err) {
                setError("Terjadi kesalahan sistem");
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetch();
    }, [code]);

    if (loading) {
        return (
            <Section className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-tertiary">Memverifikasi tiket...</div>
            </Section>
        );
    }

    if (!admin) {
        return (
            <Section className="min-h-screen flex items-center justify-center bg-secondary_alt/30">
                <Container>
                    <div className="max-w-md mx-auto text-center p-12 rounded-lg bg-primary shadow-md border border-secondary">
                        <FeaturedIcon color="error" theme="modern" size="xl" className="mx-auto mb-6">
                            <AlertTriangle className="size-8" />
                        </FeaturedIcon>
                        <h1 className="text-2xl font-bold text-primary">Akses Terbatas</h1>
                        <p className="mt-4 text-tertiary">
                            Halaman ini hanya dapat diakses oleh Panitia/Admin LISMA melalui login resmi.
                        </p>
                        <div className="mt-10 flex flex-col gap-3">
                            <Button href="/admin/login" color="primary" iconLeading={LogIn01} size="lg">
                                Login sebagai Admin
                            </Button>
                            <Button href="/" color="secondary" size="lg">
                                Kembali ke Beranda
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (error || !ticket) {
        return (
            <Section className="min-h-screen flex items-center justify-center bg-secondary_alt/30">
                <Container>
                    <div className="max-w-md mx-auto text-center p-12 rounded-lg bg-primary shadow-md border border-secondary">
                        <FeaturedIcon color="gray" theme="modern" size="xl" className="mx-auto mb-6">
                            <XCircle className="size-8" />
                        </FeaturedIcon>
                        <h1 className="text-2xl font-bold text-primary">Tiket Tidak Valid</h1>
                        <p className="mt-4 text-tertiary">
                            Kode tiket **{code}** tidak ditemukan dalam database kami. Pastikan scan kode yang benar.
                        </p>
                        <Button href="/admin/dashboard" className="mt-10" color="secondary" size="lg">
                            Kembali ke Dashboard
                        </Button>
                    </div>
                </Container>
            </Section>
        );
    }

    const reg = ticket.registration;
    const config = UNIT_CONFIG[reg.unitId.toLowerCase()] || { name: reg.unitId };

    return (
        <Section className="min-h-screen bg-secondary_alt/30">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-primary rounded-lg shadow-md border border-secondary overflow-hidden">
                        {/* Header Status */}
                        <div className={`p-4 md:p-6 text-white ${wasAlreadyUsed ? 'bg-error-solid' : 'bg-success-solid'} text-center`}>
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-md">
                                {wasAlreadyUsed ? <XCircle className="size-10" /> : <CheckCircle className="size-10" />}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                                {wasAlreadyUsed ? 'TIKET SUDAH DIGUNAKAN' : 'CHECK-IN BERHASIL'}
                            </h2>
                            <p className="mt-2 text-white/80 font-mono tracking-widest text-sm md:text-base">{ticket.ticketCode}</p>
                        </div>

                        {/* Ticket Info */}
                        <div className="p-2 md:p-6 space-y-4 md:space-y-10">
                            {/* User details */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-2">
                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-lg bg-brand-500/10 text-brand-600 hidden md:flex items-center justify-center shrink-0">
                                    <User01 className="size-6 md:size-7" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-quaternary tracking-widest">Detail Peserta</p>
                                    <h3 className="text-xl md:text-2xl font-bold text-primary">{reg.fullName}</h3>
                                    <p className="text-sm md:text-md text-tertiary">Email: {reg.email}</p>
                                    <p className="text-sm md:text-md text-tertiary">WhatsApp: {reg.phoneNumber}</p>
                                </div>
                            </div>

                            <hr className="border-secondary mx-2" />

                            {/* Event details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-2">
                                <div className="flex gap-4 items-start">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                                        <Ticket01 className="size-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-quaternary tracking-widest">Event & Kategori</p>
                                        <p className="font-bold text-primary text-lg">{config.name}</p>
                                        <Badge color="gray" size="md">{reg.subEventName}</Badge>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                                        <Calendar className="size-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-quaternary tracking-widest">Waktu Pendaftaran</p>
                                        <p className="text-sm font-bold text-primary">Reg: {formatDateTime(new Date(reg.createdAt))}</p>
                                        <p className="text-xs text-tertiary italic">Tiket Dibuat: {formatDateTime(new Date(ticket.issuedAt))}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 md:pt-6 p-2">
                                {wasAlreadyUsed ? (
                                    <div className="p-4 rounded-lg bg-error-50 border border-error-100 text-center">
                                        <p className="text-error-700 font-bold">
                                            ⚠️ Peringatan: Tiket ini telah discan sebelumnya.
                                            <br />
                                            Hubungi panitia jika ada duplikasi.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg bg-success-50 border border-success-100 text-center">
                                        <p className="text-success-700 font-bold">
                                            Tiket berhasil diverifikasi dan ditandai sebagai hadir.
                                        </p>
                                    </div>
                                )}

                                <Button href="/admin/dashboard" className="mt-4 w-full" color="secondary" size="lg">
                                    Selesai & Tutup
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
