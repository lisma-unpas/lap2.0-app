"use client";

import { useEffect, useState } from "react";
import {
    Users01 as Users,
    CheckCircle,
    Clock,
    BarChart11,
    SearchRefraction,
    FilterLines,
    LogOut01 as LogOut,
    Eye,
    ChevronDown,
    ChevronUp
} from "@untitledui/icons";
import { getRegistrations, updateRegistrationStatus, getDashboardStats } from "@/actions/admin";
import { adminLogout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Table, TableCard } from "@/components/application/table/table";
import { Select } from "@/components/base/select/select";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { toast } from "sonner";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { cx } from "@/utils/cx";
import type { Selection } from "react-aria-components";
import { TableBody } from "react-aria-components";

export default function DashboardClient({
    initialData = [],
    initialStats = null,
    initialTotal = 0
}: {
    initialData?: any[],
    initialStats?: any,
    initialTotal?: number
}) {
    const [registrations, setRegistrations] = useState<any[]>(initialData);
    const [stats, setStats] = useState<any>(initialStats);
    const [totalCount, setTotalCount] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [isLoading, setIsLoading] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const router = useRouter();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to first page on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [page, filter, debouncedSearch]);

    async function fetchData() {
        setIsLoading(true);
        const [regRes, statsRes] = await Promise.all([
            getRegistrations({
                search: debouncedSearch,
                status: filter,
                page,
                limit
            }),
            getDashboardStats()
        ]);

        if (regRes.success && regRes.data) {
            setRegistrations(regRes.data);
            setTotalCount(regRes.total || 0);
        }
        if (statsRes.success) setStats(statsRes.data);
        setIsLoading(false);
    }

    async function handleStatusUpdate(id: string, status: string) {
        setUpdatingStatusId(id);
        const res = await updateRegistrationStatus(id, status as any);
        if (res.success) {
            toast.success(`Status diperbarui ke ${status}`);
            await fetchData();
        } else {
            toast.error(res.message);
        }
        setUpdatingStatusId(null);
    }

    async function handleLogout() {
        await adminLogout();
        router.push("/admin/login");
        toast.success("Berhasil keluar.");
    }

    const handleFilterChange = (selection: Selection) => {
        if (selection === "all") return;
        const selectedValue = Array.from(selection)[0] as string;
        if (selectedValue) {
            setFilter(selectedValue);
            setPage(1); // Reset to first page on filter change
        }
    };

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-display-sm font-bold text-primary">Dashboard Admin</h1>
                        <p className="text-md text-tertiary">Kelola semua pendaftaran Lisma Art Parade 2.0</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button color="secondary" onClick={fetchData} isLoading={isLoading}>Refresh Data</Button>
                        <Button color="secondary-destructive" iconLeading={LogOut} onClick={handleLogout}>Log Out</Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Pendaftar"
                        value={stats?.total || 0}
                        icon={<Users className="text-brand-500 size-6" />}
                        subtitle="Pendaftaran masuk"
                    />
                    <StatCard
                        title="Perlu Verifikasi"
                        value={stats?.pending || 0}
                        icon={<Clock className="text-amber-600 size-6" />}
                        subtitle="Status Pending"
                    />
                    <StatCard
                        title="Terverifikasi"
                        value={stats?.verified || 0}
                        icon={<CheckCircle className="text-success-600 size-6" />}
                        subtitle="Pembayaran sah"
                    />
                    <StatCard
                        title="Revenue (Verified)"
                        value={`Rp ${(stats?.revenue || 0).toLocaleString('id-ID')}`}
                        icon={<BarChart11 className="text-brand-500 size-6" />}
                        subtitle="Total dana masuk"
                    />
                </div>

                {/* Table Section */}
                <TableCard.Root>
                    <TableCard.Header
                        title="Daftar Pendaftaran"
                        badge={totalCount}
                        description="Kelola pendaftaran."
                        contentTrailing={
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <Input
                                    placeholder="Cari..."
                                    value={search}
                                    onChange={(val) => setSearch(val)}
                                    icon={SearchRefraction}
                                    size="sm"
                                    className="grow sm:w-64"
                                    aria-label="Cari pendaftaran"
                                />
                                <div className="overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                                    <ButtonGroup
                                        size="sm"
                                        selectedKeys={[filter]}
                                        onSelectionChange={handleFilterChange}
                                        className="w-max"
                                        aria-label="Filter status pendaftaran"
                                    >
                                        {["ALL", "PENDING", "VERIFIED", "REJECTED"].map((s) => (
                                            <ButtonGroupItem id={s} key={s}>
                                                {s}
                                            </ButtonGroupItem>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            </div>
                        }
                    />

                    <Table size="sm">
                        <Table.Header>
                            <Table.Head label="Pendaftar" />
                            <Table.Head label="Unit & Lomba" className="hidden md:table-cell" />
                            <Table.Head label="Status" />
                            <Table.Head label="Total" className="hidden md:table-cell" />
                            <Table.Head label="Aksi" className="hidden md:table-cell text-right" />
                            <Table.Head label="" className="md:hidden w-10 px-4" />
                        </Table.Header>
                        <TableBody>
                            {registrations.flatMap((reg) => {
                                const isExpanded = expandedId === reg.id;
                                const actions = (
                                    <div className="flex items-center gap-3">
                                        {reg.paymentProof && (
                                            <Tooltip title="Lihat Bukti Bayar" placement="top">
                                                <Button
                                                    size="sm"
                                                    color="tertiary"
                                                    iconLeading={Eye}
                                                    onClick={() => window.open(reg.paymentProof, '_blank')}
                                                    className="size-9 p-0"
                                                    aria-label="Lihat Bukti Bayar"
                                                />
                                            </Tooltip>
                                        )}
                                        <div className="w-32">
                                            <Select
                                                size="sm"
                                                placeholder="Status"
                                                selectedKey={reg.status}
                                                isLoading={updatingStatusId === reg.id}
                                                onSelectionChange={(key) => handleStatusUpdate(reg.id, key as string)}
                                            >
                                                {[
                                                    { id: "PENDING", label: "Pending" },
                                                    { id: "VERIFIED", label: "Verify" },
                                                    { id: "REJECTED", label: "Reject" }
                                                ].map((opt) => (
                                                    <Select.Item key={opt.id} id={opt.id}>
                                                        {opt.label}
                                                    </Select.Item>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                );

                                return [
                                    <Table.Row key={reg.id}>
                                        <Table.Cell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-primary">{reg.fullName}</span>
                                                <span className="text-xs text-tertiary">{reg.email}</span>
                                                <span className="text-[10px] text-quaternary mt-0.5 md:hidden">{reg.phoneNumber}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="hidden md:table-cell">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-brand-secondary uppercase tracking-tight">{reg.subEvent.event.name}</span>
                                                <span className="text-sm font-medium text-primary">{reg.subEvent.name}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <StatusBadge status={reg.status} />
                                        </Table.Cell>
                                        <Table.Cell className="hidden md:table-cell">
                                            <span className="text-sm font-mono font-medium text-primary">
                                                Rp {reg.totalPrice.toLocaleString('id-ID')}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell className="hidden md:table-cell text-right">
                                            <div className="flex items-center justify-end">
                                                {actions}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="md:hidden text-right p-0 pr-4">
                                            <Button
                                                size="sm"
                                                color="tertiary"
                                                iconLeading={isExpanded ? ChevronUp : ChevronDown}
                                                onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                                                className="size-8 p-0"
                                                aria-label={isExpanded ? "Sembunyikan detail" : "Lihat detail"}
                                            />
                                        </Table.Cell>
                                    </Table.Row>,
                                    ...(isExpanded ? [
                                        <Table.Row key={`${reg.id}-detail`} className="md:hidden bg-secondary_alt/50">
                                            <Table.Cell colSpan={6} className="px-5 py-6">
                                                <div className="flex flex-col gap-5">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Email & HP</p>
                                                        <p className="text-sm text-primary">{reg.email}</p>
                                                        <p className="text-sm text-primary">{reg.phoneNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Unit & Lomba</p>
                                                        <span className="text-xs font-bold text-brand-secondary uppercase">{reg.subEvent.event.name}</span>
                                                        <p className="text-sm font-medium text-primary">{reg.subEvent.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Total</p>
                                                        <span className="text-sm font-mono font-medium text-primary bg-primary px-2 py-1 rounded border border-secondary shadow-xs">
                                                            Rp {reg.totalPrice.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <div className="pt-2 border-t border-secondary">
                                                        <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-3">Aksi Verifikasi</p>
                                                        {actions}
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ] : [])
                                ];
                            })}
                        </TableBody>
                    </Table>

                    {registrations.length === 0 && (
                        <div className="px-6 py-20 text-center text-tertiary">
                            <div className="mb-2">
                                <SearchRefraction className="size-10 mx-auto text-quaternary opacity-20" />
                            </div>
                            <p className="italic">Tidak ada data pendaftaran yang ditemukan.</p>
                        </div>
                    )}

                    <PaginationCardDefault
                        page={page}
                        total={Math.ceil(totalCount / limit)}
                        onPageChange={(p) => setPage(p)}
                    />
                </TableCard.Root>
            </Container>
        </Section>
    );
}

function StatCard({ title, value, icon, subtitle }: any) {
    return (
        <div className="bg-primary p-6 rounded-3xl border border-secondary shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-brand-secondary/5">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-secondary_alt ring-1 ring-secondary">
                    {icon}
                </div>
            </div>
            <p className="text-sm font-medium text-tertiary">{title}</p>
            <h3 className="text-display-xs font-bold text-primary mt-1 tracking-tight">{value}</h3>
            <p className="text-[10px] text-quaternary mt-2 uppercase font-bold tracking-[0.15em]">{subtitle}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "PENDING":
            return <Badge size="sm" color="warning">Pending</Badge>;
        case "VERIFIED":
            return <Badge size="sm" color="success">Verified</Badge>;
        case "REJECTED":
            return <Badge size="sm" color="error">Rejected</Badge>;
        default:
            return <Badge size="sm" color="gray">{status}</Badge>;
    }
}
