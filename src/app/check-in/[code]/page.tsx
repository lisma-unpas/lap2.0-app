import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { getAdminSession } from "@/actions/auth";
import { getTicketDetails, markTicketAsUsed } from "@/actions/check-in";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CheckCircle, AlertTriangle, User01, Calendar, Ticket01, XCircle, LogIn01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { UNIT_CONFIG } from "@/constants/units";

export const metadata: Metadata = {
    ...openSharedMetadata("Check-In Tiket"),
};

interface CheckInPageProps {
    params: Promise<{ code: string }>;
}

export default async function CheckInPage({ params }: CheckInPageProps) {
    const { code } = await params;
    const admin = await getAdminSession();
    const ticketRes = await getTicketDetails(code);

    if (!admin) {
        return (
            <Section className="min-h-screen flex items-center justify-center bg-secondary_alt/30">
                <Container>
                    <div className="max-w-md mx-auto text-center p-12 rounded-[40px] bg-primary shadow-2xl border border-secondary">
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

    if (!ticketRes.success || !ticketRes.data) {
        return (
            <Section className="min-h-screen flex items-center justify-center bg-secondary_alt/30">
                <Container>
                    <div className="max-w-md mx-auto text-center p-12 rounded-[40px] bg-primary shadow-2xl border border-secondary">
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

    const ticket = ticketRes.data;
    const reg = ticket.registration;
    const config = UNIT_CONFIG[reg.unitId.toLowerCase()] || { name: reg.unitId };

    const handleCheckIn = async () => {
        "use server";
        await markTicketAsUsed(code);
    };

    return (
        <Section className="min-h-screen bg-secondary_alt/30 py-20">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-primary rounded-[48px] shadow-2xl border border-secondary overflow-hidden">
                        {/* Header Status */}
                        <div className={`p-8 text-white ${ticket.isUsed ? 'bg-error-solid' : 'bg-success-solid'} text-center`}>
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-md">
                                {ticket.isUsed ? <XCircle className="size-10" /> : <CheckCircle className="size-10" />}
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">
                                {ticket.isUsed ? 'TIKET SUDAH DIGUNAKAN' : 'TIKET VALID'}
                            </h2>
                            <p className="mt-2 text-white/80 font-mono tracking-widest">{ticket.ticketCode}</p>
                        </div>

                        {/* Ticket Info */}
                        <div className="p-10 space-y-10">
                            {/* User details */}
                            <div className="flex gap-6 items-start">
                                <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 text-brand-secondary flex items-center justify-center shrink-0">
                                    <User01 className="size-7" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-quaternary tracking-widest">Detail Peserta</p>
                                    <h3 className="text-2xl font-bold text-primary">{reg.fullName}</h3>
                                    <p className="text-md text-tertiary">Email: {reg.email}</p>
                                    <p className="text-md text-tertiary">WhatsApp: {reg.phoneNumber}</p>
                                </div>
                            </div>

                            <hr className="border-secondary" />

                            {/* Event details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                        <p className="text-sm font-bold text-primary">Reg: {new Date(reg.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                        <p className="text-xs text-tertiary italic">Tiket Dibuat: {new Date(ticket.issuedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6">
                                {!ticket.isUsed ? (
                                    <form action={handleCheckIn}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="lg"
                                            className="w-full h-16 text-xl rounded-2xl shadow-xl shadow-success-solid/20"
                                        >
                                            Konfirmasi Check-In
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="p-4 rounded-2xl bg-error-50 border border-error-100 text-center">
                                        <p className="text-error-700 font-bold">
                                            ⚠️ Peringatan: Tiket ini telah discan sebelumnya.
                                            <br />
                                            Hubungi panitia jika ada duplikasi.
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
