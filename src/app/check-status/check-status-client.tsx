"use client";

import { useState, useEffect, useRef } from "react";
import { SearchLg, CheckCircle, Clock, AlertCircle, ShoppingBag01, ArrowRight, Ticket01, Download01, XClose, Copy07, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { getRegistrationStatus } from "@/actions/status";
import { Badge } from "@/components/base/badges/badges";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { useClipboard } from "@/hooks/use-clipboard";
import { UNIT_CONFIG } from "@/constants/units";
import { cx } from "@/utils/cx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CheckStatusClient() {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);
    const [localRegistrations, setLocalRegistrations] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [selectedRegistration, setSelectedRegistration] = useState<any | null>(null);
    const [activeTicketIndex, setActiveTicketIndex] = useState(0);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [origin, setOrigin] = useState("");

    const ticketRef = useRef<HTMLDivElement>(null);
    const { copy, copied } = useClipboard();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('lisma_registrations') || '[]');
        setLocalRegistrations(saved);
        setOrigin(window.location.origin);

        // Auto-search if code in URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            setSearch(code);
            handleSearch(undefined, code);
        }
    }, []);

    const handleSearch = async (e?: React.FormEvent, manualSearch?: string) => {
        if (e) e.preventDefault();
        const query = (manualSearch || search).trim();
        if (!query) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await getRegistrationStatus({ code: query.toUpperCase() });
            if (res.success) {
                setResults(res.data || []);
                if (res.data?.length === 0) {
                    setError("Data pendaftaran tidak ditemukan. Pastikan Kode Pendaftaran benar.");
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

    const handleDownloadPDF = async () => {
        if (!ticketRef.current) return;
        setIsDownloading(true);

        try {
            const canvas = await html2canvas(ticketRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width / 2, canvas.height / 2],
            });

            pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`Ticket-${selectedRegistration.tickets[activeTicketIndex].ticketCode}.pdf`);
        } catch (err) {
            console.error("PDF Error:", err);
        } finally {
            setIsDownloading(false);
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

    const openTicket = (reg: any) => {
        setSelectedRegistration(reg);
        setActiveTicketIndex(0);
        setIsTicketModalOpen(true);
    };

    return (
        <Section className="py-12 min-h-[80vh]">
            <Container>
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-display-sm font-bold text-primary">Cek Status & Tiket</h1>
                    <p className="mt-4 text-lg text-tertiary max-w-xl mx-auto">
                        Masukkan <strong>Kode Pendaftaran</strong> Anda untuk melihat status verifikasi pembayaran dan mengunduh tiket.
                    </p>

                    <form onSubmit={(e) => handleSearch(e)} className="mt-10 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <Input
                                placeholder="CONTOH: ABCD-1234-EFGH"
                                value={search}
                                onChange={(val) => setSearch(val)}
                                icon={SearchLg}
                                size="md"
                                className="font-mono uppercase tracking-widest text-center"
                            />
                        </div>
                        <Button type="submit" color="primary" isLoading={isLoading} size="md" className="px-8 font-bold">
                            Cek Status
                        </Button>
                    </form>

                    {error && (
                        <div className="mt-8 p-4 rounded-2xl bg-error-50 border border-error-100 text-error-700 text-sm flex items-center gap-3">
                            <AlertCircle className="size-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    {results && results.length > 0 && (
                        <div className="mt-12 space-y-6 text-left">
                            <div className="flex items-center justify-between mb-2 px-2">
                                <h2 className="text-lg font-bold text-primary">Hasil Pencarian</h2>
                                <Badge color="gray" size="md">{results.length} Item Ditemukan</Badge>
                            </div>
                            {results.map((reg) => {
                                const config = UNIT_CONFIG[reg.unitId.toLowerCase()] || { name: reg.unitId };
                                return (
                                    <div key={reg.id} className="p-6 rounded-2xl border border-secondary bg-primary shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em]">
                                                    {config.name} — {reg.subEventName}
                                                </p>
                                                <h3 className="text-xl font-bold text-primary">{reg.fullName}</h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <code className="px-2.5 py-1 rounded-lg bg-secondary_alt text-xs font-mono font-bold text-tertiary border border-secondary">
                                                        {reg.registrationCode}
                                                    </code>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <Badge color={getStatusVariant(reg.status) as any} size="md" className="h-10 px-4 text-sm font-bold">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(reg.status)}
                                                        {reg.status}
                                                    </div>
                                                </Badge>
                                                {reg.status === 'VERIFIED' && (
                                                    <Button size="sm" color="primary" className="gap-2 font-bold" onClick={() => openTicket(reg)}>
                                                        <Ticket01 className="size-4" />
                                                        Lihat {reg.tickets?.length || 0} Tiket
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-secondary flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-quaternary tracking-wider">Tanggal Daftar</p>
                                                    <p className="text-sm font-medium text-tertiary">{new Date(reg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-quaternary tracking-wider">Jenis Pendaftaran</p>
                                                    <p className="text-sm font-medium text-tertiary">Online Registration</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {reg.status === 'PENDING' && (
                                                    <p className="text-xs text-warning-700 italic font-medium px-3 py-1.5 rounded-full bg-warning-50 border border-warning-100">
                                                        Menunggu Verifikasi Pembayaran
                                                    </p>
                                                )}
                                                {reg.status === 'REJECTED' && (
                                                    <Button size="sm" color="link-destructive" className="text-xs font-bold">
                                                        Hubungi Panitia
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {localRegistrations.length > 0 && !results && !isLoading && (
                        <div className="mt-12 text-left bg-secondary_alt/50 p-8 rounded-lg md:rounded-[32px] border border-secondary/50">
                            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2.5">
                                <ShoppingBag01 className="size-5.5 text-brand-secondary" />
                                Riwayat Pendaftaran
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {localRegistrations.map((reg, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSearch(reg.code);
                                            handleSearch(undefined, reg.code);
                                        }}
                                        className="p-5 rounded-2xl border border-secondary bg-primary hover:bg-white hover:border-brand-solid hover:shadow-lg transition-all flex items-center justify-between text-left group"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-quaternary uppercase tracking-widest">{reg.unit || "Unit Lisma"}</p>
                                            <p className="font-bold text-primary line-clamp-1">{reg.date ? new Date(reg.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : "Pendaftaran Terbaru"}</p>
                                            <p className="text-xs font-mono font-bold text-brand-secondary bg-brand-primary/5 px-2 py-0.5 rounded-lg inline-block mt-1">{reg.code}</p>
                                        </div>
                                        <ArrowRight className="size-5 text-tertiary group-hover:text-brand-solid group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>

            {/* Ticket Modal */}
            <ModalOverlay isOpen={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
                <Modal className="max-w-md w-full overflow-hidden rounded-lg md:rounded-[32px] p-0 border-none shadow-2xl">
                    <Dialog className="p-0 outline-none">
                        {selectedRegistration && selectedRegistration.tickets && selectedRegistration.tickets.length > 0 && (
                            <div className="relative bg-primary">
                                {(() => {
                                    const ticket = selectedRegistration.tickets[activeTicketIndex];
                                    const config = UNIT_CONFIG[selectedRegistration.unitId.toLowerCase()] || { name: selectedRegistration.unitId };

                                    return (
                                        <>
                                            {/* Scrollable Area for PDF Content */}
                                            <div ref={ticketRef} className="bg-white">
                                                <div className="bg-brand-solid p-8 text-white text-center rounded-b-[40px] shadow-lg">
                                                    <h3 className="text-xl font-bold tracking-tight">E-TICKET RESMI</h3>
                                                    <p className="text-brand-primary-100 text-sm mt-1 uppercase tracking-[0.2em] font-bold">{config.name}</p>
                                                    <div className="mt-8 flex justify-center">
                                                        <div className="bg-white p-4 rounded-lg shadow-2xl border-4 border-white">
                                                            <img
                                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`${origin}/check-in/${ticket.ticketCode}`)}`}
                                                                alt="Ticket QR"
                                                                className="w-48 h-48"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 font-mono font-bold text-lg tracking-wider opacity-90">
                                                        {ticket.ticketCode}
                                                    </div>
                                                </div>

                                                <div className="p-8 space-y-8">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-1 text-left">
                                                            <p className="text-[10px] text-quaternary uppercase font-bold tracking-widest">Nama Peserta</p>
                                                            <p className="font-bold text-primary truncate">{selectedRegistration.fullName}</p>
                                                        </div>
                                                        <div className="space-y-1 text-left">
                                                            <p className="text-[10px] text-quaternary uppercase font-bold tracking-widest">Kategori</p>
                                                            <p className="font-bold text-primary truncate">{selectedRegistration.subEventName}</p>
                                                        </div>
                                                        <div className="space-y-1 text-left">
                                                            <p className="text-[10px] text-quaternary uppercase font-bold tracking-widest">Tanggal Daftar</p>
                                                            <p className="font-bold text-primary">{new Date(selectedRegistration.createdAt).toLocaleDateString('id-ID')}</p>
                                                        </div>
                                                        <div className="space-y-1 text-left">
                                                            <p className="text-[10px] text-quaternary uppercase font-bold tracking-widest">Status Tiket</p>
                                                            <div className="flex items-center gap-1.5 text-success-600 font-bold">
                                                                <CheckCircle className="size-4" />
                                                                AKTIF
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 rounded-2xl bg-secondary_alt border border-secondary space-y-3 text-left">
                                                        <p className="text-[11px] font-bold text-primary uppercase">Instruksi Check-in</p>
                                                        <ul className="text-xs text-tertiary space-y-2 list-disc list-inside">
                                                            <li>Tunjukkan QR Code ini kepada panitia saat di lokasi.</li>
                                                            <li>Tiket bersifat personal dan hanya bisa digunakan sekali.</li>
                                                            <li>Bawa identitas (KTM/KTP) sesuai nama yang terdaftar.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Controls (Not Printed) */}
                                            <div className="p-8 pt-0 space-y-4">
                                                {/* Pagination for Tickets */}
                                                {selectedRegistration.tickets.length > 1 && (
                                                    <div className="flex items-center justify-between bg-secondary_alt p-3 rounded-2xl border border-secondary mb-4">
                                                        <Button
                                                            size="sm"
                                                            color="tertiary"
                                                            iconLeading={ChevronLeft}
                                                            disabled={activeTicketIndex === 0}
                                                            onClick={() => setActiveTicketIndex(activeTicketIndex - 1)}
                                                            className="size-8 p-0"
                                                        />
                                                        <span className="text-xs font-bold text-primary">Tiket {activeTicketIndex + 1} dari {selectedRegistration.tickets.length}</span>
                                                        <Button
                                                            size="sm"
                                                            color="tertiary"
                                                            iconTrailing={ChevronRight}
                                                            disabled={activeTicketIndex === selectedRegistration.tickets.length - 1}
                                                            onClick={() => setActiveTicketIndex(activeTicketIndex + 1)}
                                                            className="size-8 p-0"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-3">
                                                    <Button
                                                        color="primary"
                                                        size="md"
                                                        className="w-full gap-2 rounded-2xl shadow-lg shadow-brand-solid/20 font-bold"
                                                        onClick={handleDownloadPDF}
                                                        isLoading={isDownloading}
                                                    >
                                                        <Download01 className="size-5" />
                                                        Download E-Ticket (PDF)
                                                    </Button>
                                                    <Button
                                                        color="tertiary"
                                                        size="md"
                                                        className="w-full font-bold"
                                                        onClick={() => setIsTicketModalOpen(false)}
                                                    >
                                                        Tutup
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}

                                <button
                                    onClick={() => setIsTicketModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all"
                                >
                                    <XClose className="size-5" />
                                </button>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </Section>
    );
}
