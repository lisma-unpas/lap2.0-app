"use client";

import { useEffect, useState, memo, useCallback } from "react";
import {
    Users01 as Users,
    CheckCircle,
    Clock,
    SearchRefraction,
    Eye,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Clipboard,
    RefreshCw01,
    File02
} from "@untitledui/icons";
import {
    getRegistrations,
    updateRegistrationStatus,
    getDashboardStats,
    syncRegistrations,
    getSpreadsheetUrl
} from "@/actions/admin";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Table, TableCard } from "@/components/application/table/table";
import { Select } from "@/components/base/select/select";
import { Tooltip } from "@/components/base/tooltip/tooltip";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNIT_CONFIG } from "@/constants/units";
import { cx } from "@/utils/cx";
import type { Selection } from "react-aria-components";
import { TableBody } from "react-aria-components";
import { useToast } from "@/context/toast-context";
import { Modal as SharedModal } from "@/components/shared/modals/modal/index";

export default function RegistrationsClient() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [spreadsheetUrl, setSpreadsheetUrl] = useState("");

    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        getSpreadsheetUrl().then(setSpreadsheetUrl);
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        const res = await syncRegistrations();
        if (res.success) {
            toastSuccess("Berhasil", `${res.count} data pendaftaran berhasil disinkronkan ke spreadsheet`);
        } else {
            toastError("Gagal", res.message || "Gagal sinkronisasi");
        }
        setIsSyncing(false);
    };

    const handleViewSpreadsheet = () => {
        if (spreadsheetUrl) {
            window.open(spreadsheetUrl, "_blank");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            if (isInitialLoading === false) setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (isInitialLoading) {
            fetchInitialData();
        } else {
            fetchData();
        }
    }, [page, filter, debouncedSearch]);

    async function fetchInitialData() {
        setIsInitialLoading(true);
        await fetchData(true);
        setIsInitialLoading(false);
    }

    const fetchData = useCallback(async (isInitial = false) => {
        if (!isInitial) setIsLoading(true);
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
        } else if (!regRes.success) {
            toastError("Kesalahan", regRes.message || "Gagal mengambil data");
        }
        if (statsRes.success) setStats(statsRes.data?.registrations);
        if (!isInitial) setIsLoading(false);
    }, [debouncedSearch, filter, page, toastError]);

    const handleStatusUpdate = useCallback(async (id: string, status: string) => {
        setUpdatingStatusId(id);
        const res = await updateRegistrationStatus(id, status as any);
        if (res.success) {
            toastSuccess("Berhasil", `Status diperbarui ke ${status}`);
            await fetchData();
        } else {
            toastError("Gagal", res.message || "Gagal memperbarui status");
        }
        setUpdatingStatusId(null);
    }, [fetchData, toastSuccess, toastError]);

    const handleFilterChange = useCallback((selection: Selection) => {
        if (selection === "all") return;
        const selectedValue = Array.from(selection)[0] as string;
        if (selectedValue) {
            setFilter(selectedValue);
            setPage(1);
        }
    }, []);

    const handleExpand = useCallback((id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    }, []);

    const handleViewDetail = useCallback((reg: any) => {
        setSelectedRegistration(reg);
    }, []);

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-display-sm font-bold text-primary">Registration Management</h1>
                        <p className="text-md text-tertiary">Review and verify user registrations</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            size="md"
                            color="secondary"
                            iconLeading={RefreshCw01}
                            onClick={handleSync}
                            isLoading={isSyncing}
                        >
                            Sync Spreadsheet
                        </Button>
                        <Button
                            size="md"
                            color="secondary"
                            iconLeading={File02}
                            onClick={handleViewSpreadsheet}
                        >
                            View Spreadsheet
                        </Button>
                    </div>
                </div>

                {/* Specific Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Submissions"
                        value={stats?.total}
                        icon={<Users className="text-brand-500 size-6" />}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Pending Review"
                        value={stats?.pending}
                        icon={<Clock className="text-amber-600 size-6" />}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Verified"
                        value={stats?.verified}
                        icon={<CheckCircle className="text-success-600 size-6" />}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Rejected"
                        value={stats?.rejected}
                        icon={<AlertCircle className="text-error-600 size-6" />}
                        isLoading={isInitialLoading}
                    />
                </div>

                <TableCard.Root>
                    <TableCard.Header
                        title="Registration List"
                        badge={totalCount}
                        description="Manage and verify registrations."
                        contentTrailing={
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <Input
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(val) => setSearch(val)}
                                    icon={SearchRefraction}
                                    size="sm"
                                    className="grow sm:w-64"
                                />
                                <div className="overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                                    <ButtonGroup
                                        size="sm"
                                        selectedKeys={[filter]}
                                        onSelectionChange={handleFilterChange}
                                        className="w-max"
                                    >
                                        {["ALL", "PENDING", "VERIFIED", "REJECTED"].map((s) => (
                                            <ButtonGroupItem id={s} key={s}>{s}</ButtonGroupItem>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            </div>
                        }
                    />

                    <div className={cx((isLoading || isInitialLoading) && "transition-opacity")}>
                        <Table size="sm">
                            <Table.Header>
                                <Table.Head label="Applicant" isRowHeader />
                                <Table.Head label="Unit & Event" className="hidden md:table-cell" />
                                <Table.Head label="Status" />
                                <Table.Head label="Price" className="hidden md:table-cell" />
                                <Table.Head label="Action" className="hidden md:table-cell text-right" />
                                <Table.Head label="" className="md:hidden w-10 px-4" />
                            </Table.Header>
                            <TableBody>
                                {isInitialLoading ? (
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell><div className="h-10 w-40 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell"><div className="h-10 w-32 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-8 w-20 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell"><div className="h-8 w-24 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell text-right"><div className="h-10 w-24 bg-secondary animate-pulse rounded ml-auto" /></Table.Cell>
                                            <Table.Cell className="md:hidden"><div className="h-8 w-8 bg-secondary animate-pulse rounded ml-auto" /></Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    registrations.map((reg) => (
                                        <RegistrationRow
                                            key={reg.id}
                                            reg={reg}
                                            isExpanded={expandedId === reg.id}
                                            onExpand={handleExpand}
                                            onViewDetail={handleViewDetail}
                                            onStatusUpdate={handleStatusUpdate}
                                            isUpdating={updatingStatusId === reg.id}
                                        />
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {!isInitialLoading && (
                        <PaginationCardDefault
                            page={page}
                            total={Math.ceil(totalCount / limit)}
                            onPageChange={setPage}
                        />
                    )}
                </TableCard.Root>

                <RegistrationDetailModal
                    registration={selectedRegistration}
                    onClose={() => setSelectedRegistration(null)}
                />
            </Container>
        </Section>
    );
}

const RegistrationRow = memo(({
    reg,
    isExpanded,
    onExpand,
    onViewDetail,
    onStatusUpdate,
    isUpdating
}: {
    reg: any;
    isExpanded: boolean;
    onExpand: (id: string) => void;
    onViewDetail: (reg: any) => void;
    onStatusUpdate: (id: string, status: string) => void;
    isUpdating: boolean;
}) => {
    const config = UNIT_CONFIG[reg.unitId.toLowerCase()] || { name: reg.unitId };

    const actions = (
        <div className="flex items-center gap-2">
            {reg.paymentProof && (
                <Tooltip title="View Proof">
                    <Button size="sm" color="tertiary" iconLeading={Eye} onClick={() => window.open(reg.paymentProof, '_blank')} className="size-8 p-0" />
                </Tooltip>
            )}
            <Tooltip title="View Details">
                <Button
                    size="sm"
                    color="tertiary"
                    iconLeading={Clipboard}
                    onClick={() => onViewDetail(reg)}
                    className="size-8 p-0"
                />
            </Tooltip>
            <div className="w-28">
                <Select
                    size="sm"
                    selectedKey={reg.status}
                    isLoading={isUpdating}
                    onSelectionChange={(key) => onStatusUpdate(reg.id, key as string)}
                >
                    <Select.Item id="PENDING">Pending</Select.Item>
                    <Select.Item id="VERIFIED">Verify</Select.Item>
                    <Select.Item id="REJECTED">Reject</Select.Item>
                </Select>
            </div>
        </div>
    );

    return (
        <>
            <Table.Row>
                <Table.Cell>
                    <div className="flex flex-col">
                        <span className="font-semibold text-primary">{reg.fullName}</span>
                        <span className="text-xs text-tertiary">{reg.email}</span>
                        <span className="text-[10px] text-quaternary mt-0.5 md:hidden">{reg.phoneNumber}</span>
                    </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                    <div className="flex flex-col text-xs">
                        <span className="font-bold text-brand-secondary">{config.name}</span>
                        <span className="text-tertiary">{reg.subEventName}</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <StatusBadge status={reg.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                    <span className="font-mono text-xs">Rp {reg.totalPrice.toLocaleString('id-ID')}</span>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell text-right">
                    <div className="flex items-center justify-start">
                        {actions}
                    </div>
                </Table.Cell>
                <Table.Cell className="md:hidden text-right p-0 pr-4">
                    <Button
                        size="sm"
                        color="tertiary"
                        iconLeading={isExpanded ? ChevronUp : ChevronDown}
                        onClick={() => onExpand(reg.id)}
                        className="size-8 p-0"
                    />
                </Table.Cell>
            </Table.Row>
            {isExpanded && (
                <Table.Row className="bg-secondary_subtle">
                    <Table.Cell colSpan={6} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:hidden flex flex-col gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Phone & Applied</p>
                                    <p className="text-sm text-primary">{reg.phoneNumber}</p>
                                    <p className="text-sm text-primary">{new Date(reg.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Unit & Event</p>
                                    <span className="text-xs font-bold text-brand-secondary uppercase">{config.name}</span>
                                    <p className="text-sm font-medium text-primary">{reg.subEventName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Total</p>
                                    <span className="text-sm font-mono font-medium text-primary bg-primary px-2 py-1 rounded border border-secondary shadow-xs">
                                        Rp {reg.totalPrice.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="pt-2 border-t border-secondary">
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-3">Verification Action</p>
                                    {actions}
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-quaternary mb-4">Detailed Form Data</h4>
                                <div className="space-y-2">
                                    {Object.entries(reg.detailedData || {}).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-secondary pb-1">
                                            <span className="text-xs text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="text-xs font-medium text-primary">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-quaternary">Additional Info</h4>
                                <div className="bg-primary p-4 rounded-lg border border-secondary">
                                    <p className="text-xs text-tertiary">Phone: <span className="text-primary font-medium">{reg.phoneNumber}</span></p>
                                    <p className="text-xs text-tertiary mt-1">Code: <span className="text-primary font-mono">{reg.registrationCode}</span></p>
                                    <p className="text-xs text-tertiary mt-1">Applied: <span className="text-primary">{new Date(reg.createdAt).toLocaleString()}</span></p>
                                </div>

                                {reg.tickets && reg.tickets.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-quaternary mb-2">Issued Tickets ({reg.tickets.length})</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {reg.tickets.map((t: any) => (
                                                <Badge key={t.id} color={t.isUsed ? "success" : "blue"} size="sm">
                                                    {t.ticketCode}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="md:hidden">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-quaternary mb-4 mt-6">Detailed Form Data</h4>
                                    <div className="space-y-2">
                                        {Object.entries(reg.detailedData || {}).map(([key, value]) => (
                                            <div key={key} className="flex justify-between border-b border-secondary pb-1">
                                                <span className="text-xs text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-xs font-medium text-primary">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Table.Cell>
                </Table.Row>
            )}
        </>
    );
});

const RegistrationDetailModal = memo(({
    registration,
    onClose
}: {
    registration: any;
    onClose: () => void;
}) => {
    if (!registration) return null;

    return (
        <SharedModal
            isOpen={!!registration}
            onOpenChange={(open) => !open && onClose()}
            title="Detail Registrasi"
            description={`Informasi lengkap untuk pendaftaran ${registration?.fullName}`}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-bold text-quaternary uppercase">Unit</p>
                        <p className="text-sm font-semibold text-primary">{UNIT_CONFIG[registration?.unitId.toLowerCase()]?.name || registration?.unitId}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-quaternary uppercase">Event</p>
                        <p className="text-sm font-semibold text-primary">{registration?.subEventName}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-quaternary uppercase mb-2">Data Isi Form</p>
                    <div className="bg-secondary_alt rounded-lg border border-secondary overflow-hidden">
                        {Object.entries(registration?.detailedData || {}).map(([key, value], idx) => {
                            const strValue = String(value);
                            const isDriveLink = strValue.includes("drive.google.com");
                            const links = isDriveLink ? strValue.split(",") : [strValue];
                            const isDescription = key.toLowerCase() === "description";

                            return (
                                <div key={key} className={cx(
                                    "p-3",
                                    idx !== 0 && "border-t border-secondary",
                                    isDescription ? "flex flex-col gap-2" : "flex justify-between items-start"
                                )}>
                                    <span className="text-xs text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <div className={cx("flex flex-col gap-1", !isDescription && "items-end max-w-[60%]")}>
                                        {isDriveLink ? (
                                            links.map((link, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => window.open(link.trim(), "_blank")}
                                                    className="text-xs font-bold text-brand-600 hover:underline"
                                                >
                                                    Link Drive {links.length > 1 ? i + 1 : ""}
                                                </button>
                                            ))
                                        ) : (
                                            <span className={cx("text-xs font-bold text-primary", isDescription && "whitespace-pre-wrap leading-relaxed px-1")}>
                                                {strValue}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {registration?.paymentProof && (
                    <div>
                        <p className="text-xs font-bold text-quaternary uppercase mb-2">Bukti Pembayaran</p>
                        <Button
                            className="w-full"
                            size="sm"
                            color="secondary"
                            onClick={() => window.open(registration.paymentProof, "_blank")}
                        >
                            Buka Bukti Bayar
                        </Button>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <Button color="primary" onClick={onClose}>
                        Tutup
                    </Button>
                </div>
            </div>
        </SharedModal>
    );
});

const StatCard = memo(({ title, value, icon, isLoading }: any) => {
    return (
        <div className="bg-primary p-6 rounded-lg border border-secondary shadow-sm">
            <div className="flex items-center gap-4">
                <div className={cx("p-3 rounded-lg bg-secondary_alt ring-1 ring-secondary text-primary")}>
                    {icon}
                </div>
                <div>
                    <p className="text-xs font-medium text-tertiary uppercase tracking-wider">{title}</p>
                    {isLoading ? (
                        <div className="h-8 w-16 bg-secondary animate-pulse rounded-lg mt-1" />
                    ) : (
                        <h3 className="text-2xl font-bold text-primary mt-1">{value || 0}</h3>
                    )}
                </div>
            </div>
        </div>
    );
});

const StatusBadge = memo(({ status }: { status: string }) => {
    switch (status) {
        case "PENDING": return <Badge size="sm" color="warning">Pending</Badge>;
        case "VERIFIED": return <Badge size="sm" color="success">Verified</Badge>;
        case "REJECTED": return <Badge size="sm" color="error">Rejected</Badge>;
        default: return <Badge size="sm" color="gray">{status}</Badge>;
    }
});
