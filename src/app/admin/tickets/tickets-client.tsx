"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle,
    Clock,
    SearchRefraction,
    Ticket01 as TicketIcon,
    ChevronDown,
    ChevronUp
} from "@untitledui/icons";
import { getTickets, getDashboardStats } from "@/actions/admin";
import { markTicketAsUsed, revertTicketUsage } from "@/actions/check-in";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { TableBody } from "react-aria-components";
import { useToast } from "@/context/toast-context";
import { cx } from "@/utils/cx";

export default function TicketsClient() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            if (!isInitialLoading) setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (isInitialLoading) {
            fetchInitialData();
        } else {
            fetchData();
        }
    }, [page, debouncedSearch]);

    async function fetchInitialData() {
        setIsInitialLoading(true);
        await fetchData(true);
        setIsInitialLoading(false);
    }

    async function fetchData(isInitial = false) {
        if (!isInitial) setIsLoading(true);
        const [ticketRes, statsRes] = await Promise.all([
            getTickets({
                search: debouncedSearch,
                page,
                limit
            }),
            getDashboardStats()
        ]);

        if (ticketRes.success && ticketRes.data) {
            setTickets(ticketRes.data);
            setTotalCount(ticketRes.total || 0);
        }
        if (statsRes.success) setStats(statsRes.data?.tickets);
        if (!isInitial) setIsLoading(false);
    }

    async function handleCheckIn(ticketCode: string) {
        setUpdatingId(ticketCode);
        const res = await markTicketAsUsed(ticketCode);
        if (res.success) {
            toastSuccess("Berhasil", "Check-in berhasil!");
            await fetchData();
        } else {
            toastError("Gagal", res.error || "Gagal melakukan check-in");
        }
        setUpdatingId(null);
    }

    async function handleRevertCheckIn(ticketCode: string) {
        setUpdatingId(ticketCode);
        const res = await revertTicketUsage(ticketCode);
        if (res.success) {
            toastSuccess("Berhasil", "Check-in dibatalkan!");
            await fetchData();
        } else {
            toastError("Gagal", res.error || "Gagal membatalkan check-in");
        }
        setUpdatingId(null);
    }

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                <div className="mb-10">
                    <h1 className="text-display-sm font-bold text-primary">Ticket & Check-in</h1>
                    <p className="text-md text-tertiary">Manage ticket verification and attendance</p>
                </div>

                {/* Ticket Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Total Tickets Issued"
                        value={stats?.total}
                        icon={<TicketIcon className="text-brand-500 size-6" />}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Attended"
                        value={stats?.used}
                        icon={<CheckCircle className="text-success-600 size-6" />}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Not Attended"
                        value={stats?.unused}
                        icon={<Clock className="text-amber-600 size-6" />}
                        isLoading={isInitialLoading}
                    />
                </div>

                <TableCard.Root>
                    <TableCard.Header
                        title="Ticket List"
                        badge={totalCount}
                        contentTrailing={
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <Input
                                    placeholder="Search ticket code or name..."
                                    value={search}
                                    onChange={(val) => setSearch(val)}
                                    icon={SearchRefraction}
                                    size="sm"
                                    className="grow sm:w-64"
                                />
                            </div>
                        }
                    />

                    <div className={cx((isLoading || isInitialLoading) && "transition-opacity")}>
                        <Table size="sm">
                            <Table.Header>
                                <Table.Head label="Ticket Code" isRowHeader />
                                <Table.Head label="Attendee" className="hidden md:table-cell" />
                                <Table.Head label="Issued Date" className="hidden md:table-cell" />
                                <Table.Head label="Status" />
                                <Table.Head label="Action" className="hidden md:table-cell text-right" />
                                <Table.Head label="" className="md:hidden w-10 px-4" />
                            </Table.Header>
                            <TableBody>
                                {isInitialLoading ? (
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell><div className="h-4 w-32 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell"><div className="h-10 w-48 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell"><div className="h-4 w-24 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-6 w-28 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell className="hidden md:table-cell text-right"><div className="h-9 w-24 bg-secondary animate-pulse rounded ml-auto" /></Table.Cell>
                                            <Table.Cell className="md:hidden"><div className="h-8 w-8 bg-secondary animate-pulse rounded ml-auto" /></Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    tickets.flatMap((ticket) => {
                                        const isExpanded = expandedId === ticket.id;

                                        const actions = (
                                            <div className="flex justify-start gap-2 items-center">
                                                {!ticket.isUsed ? (
                                                    <Button
                                                        size="sm"
                                                        color="primary"
                                                        onClick={() => handleCheckIn(ticket.ticketCode)}
                                                        isLoading={updatingId === ticket.ticketCode}
                                                    >
                                                        Check In
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <span className="text-xs text-success-600 font-bold whitespace-nowrap">Checked In</span>
                                                        <Button
                                                            size="sm"
                                                            color="tertiary"
                                                            className="text-[10px] h-7 px-2"
                                                            onClick={() => handleRevertCheckIn(ticket.ticketCode)}
                                                            isLoading={updatingId === ticket.ticketCode}
                                                        >
                                                            Revert
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        );

                                        return [
                                            <Table.Row key={ticket.id}>
                                                <Table.Cell>
                                                    <div className="flex flex-col">
                                                        <span className="font-mono font-bold text-sm tracking-widest">{ticket.ticketCode}</span>
                                                        <span className="text-[10px] text-tertiary mt-0.5 md:hidden">{ticket.registration.fullName}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="hidden md:table-cell">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{ticket.registration.fullName}</span>
                                                        <span className="text-xs text-tertiary">{ticket.registration.email}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="hidden md:table-cell">
                                                    <span className="text-xs text-tertiary">{new Date(ticket.issuedAt).toLocaleDateString()}</span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge color={ticket.isUsed ? "success" : "gray"}>
                                                        {ticket.isUsed ? "Check-in" : "Valid"}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell className="hidden md:table-cell text-right">
                                                    {actions}
                                                </Table.Cell>
                                                <Table.Cell className="md:hidden text-right p-0 pr-4">
                                                    <Button
                                                        size="sm"
                                                        color="tertiary"
                                                        iconLeading={isExpanded ? ChevronUp : ChevronDown}
                                                        onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
                                                        className="size-8 p-0"
                                                    />
                                                </Table.Cell>
                                            </Table.Row>,
                                            ...(isExpanded ? [
                                                <Table.Row key={`${ticket.id}-detail`} className="md:hidden bg-secondary_subtle">
                                                    <Table.Cell colSpan={6} className="px-5 py-6">
                                                        <div className="flex flex-col gap-5">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Attendee Info</p>
                                                                <p className="text-sm font-medium text-primary">{ticket.registration.fullName}</p>
                                                                <p className="text-xs text-tertiary">{ticket.registration.email}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-1.5">Issued At</p>
                                                                <p className="text-sm text-primary">{new Date(ticket.issuedAt).toLocaleString()}</p>
                                                            </div>
                                                            <div className="pt-2 border-t border-secondary">
                                                                <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider mb-3">Attendance Action</p>
                                                                {actions}
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ] : [])
                                        ];
                                    })
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
            </Container>
        </Section>
    );
}

function StatCard({ title, value, icon, isLoading }: any) {
    return (
        <div className="bg-primary p-6 rounded-lg border border-secondary shadow-sm">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary_alt ring-1 ring-secondary text-primary">
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
}
