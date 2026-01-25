"use client";

import { useEffect, useState } from "react";
import {
    Users01 as Users,
    CheckCircle,
    Clock,
    BarChart11,
    ArrowRight,
} from "@untitledui/icons";
import { getRegistrations, getTickets, getDashboardStats } from "@/actions/admin";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Table, TableCard } from "@/components/application/table/table";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNIT_CONFIG } from "@/constants/units";
import { cx } from "@/utils/cx";
import { TableBody } from "react-aria-components";

export default function DashboardClient({
    initialStats = null
}: {
    initialStats?: any
}) {
    const [stats, setStats] = useState<any>(initialStats);
    const [recentRegs, setRecentRegs] = useState<any[]>([]);
    const [recentTickets, setRecentTickets] = useState<any[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    async function fetchInitialData() {
        setIsInitialLoading(true);
        await fetchData(true);
        setIsInitialLoading(false);
    }

    async function fetchData(isInitial = false) {
        if (!isInitial) setIsLoading(true);

        const [statsRes, regRes, ticketRes] = await Promise.all([
            getDashboardStats(),
            getRegistrations({ limit: 5 }),
            getTickets({ limit: 5 })
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (regRes.success) setRecentRegs(regRes.data || []);
        if (ticketRes.success) setRecentTickets(ticketRes.data || []);

        if (!isInitial) setIsLoading(false);
    }

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-display-sm font-bold text-primary">Overview Dashboard</h1>
                        <p className="text-md text-tertiary">Quick look at your event statistics</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Registrations"
                        value={stats?.registrations?.total}
                        icon={<Users className="text-brand-500 size-6" />}
                        subtitle={`${stats?.registrations?.pending ?? 0} pending`}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Verified Tickets"
                        value={stats?.tickets?.total}
                        icon={<CheckCircle className="text-success-600 size-6" />}
                        subtitle={`${stats?.tickets?.used ?? 0} checked in`}
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Total Revenue"
                        value={stats ? `Rp ${(stats.revenue || 0).toLocaleString('id-ID')}` : null}
                        icon={<BarChart11 className="text-brand-500 size-6" />}
                        subtitle="From verified regs"
                        isLoading={isInitialLoading}
                    />
                    <StatCard
                        title="Check-in Rate"
                        value={stats ? `${stats.tickets?.total > 0 ? Math.round((stats.tickets.used / stats.tickets.total) * 100) : 0}%` : null}
                        icon={<Clock className="text-amber-600 size-6" />}
                        subtitle="Attendance progress"
                        isLoading={isInitialLoading}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Recent Registrations Preview */}
                    <TableCard.Root>
                        <TableCard.Header
                            title="Recent Registrations"
                            description="Latest 5 submissions"
                            contentTrailing={
                                <Button href="/admin/registrations" size="sm" color="secondary" iconTrailing={ArrowRight}>
                                    View All
                                </Button>
                            }
                        />
                        <Table size="sm">
                            <Table.Header>
                                <Table.Head label="Name" isRowHeader />
                                <Table.Head label="Unit" />
                                <Table.Head label="Status" />
                            </Table.Header>
                            <TableBody>
                                {isInitialLoading ? (
                                    [1, 2, 3, 4, 5].map((i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell><div className="h-8 w-32 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-6 w-20 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-6 w-16 bg-secondary animate-pulse rounded" /></Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    recentRegs.map((reg) => (
                                        <Table.Row key={reg.id}>
                                            <Table.Cell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-primary">{reg.fullName}</span>
                                                    <span className="text-[10px] text-tertiary">{reg.email}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge size="sm" color="gray">
                                                    {UNIT_CONFIG[reg.unitId.toLowerCase()]?.name || reg.unitId}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <RegStatusBadge status={reg.status} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableCard.Root>

                    {/* Recent Tickets Preview */}
                    <TableCard.Root>
                        <TableCard.Header
                            title="Recent Tickets Issued"
                            description="Latest 5 verified tickets"
                            contentTrailing={
                                <Button href="/admin/tickets" size="sm" color="secondary" iconTrailing={ArrowRight}>
                                    View All
                                </Button>
                            }
                        />
                        <Table size="sm">
                            <Table.Header>
                                <Table.Head label="Code" isRowHeader />
                                <Table.Head label="Attendee" />
                                <Table.Head label="Used" />
                            </Table.Header>
                            <TableBody>
                                {isInitialLoading ? (
                                    [1, 2, 3, 4, 5].map((i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell><div className="h-8 w-24 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-8 w-32 bg-secondary animate-pulse rounded" /></Table.Cell>
                                            <Table.Cell><div className="h-6 w-12 bg-secondary animate-pulse rounded" /></Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    recentTickets.map((ticket) => (
                                        <Table.Row key={ticket.id}>
                                            <Table.Cell>
                                                <span className="font-mono text-xs font-bold">{ticket.ticketCode}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="text-sm">{ticket.registration.fullName}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge color={ticket.isUsed ? "success" : "gray"}>
                                                    {ticket.isUsed ? "Yes" : "No"}
                                                </Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableCard.Root>
                </div>
            </Container>
        </Section>
    );
}

function StatCard({ title, value, icon, subtitle, isLoading }: any) {
    return (
        <div className="bg-primary p-6 rounded-lg border border-secondary shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-secondary_alt ring-1 ring-secondary text-primary">
                    {icon}
                </div>
            </div>
            <p className="text-sm font-medium text-tertiary">{title}</p>
            {isLoading ? (
                <div className="h-8 w-32 bg-secondary animate-pulse rounded-lg mt-1" />
            ) : (
                <h3 className="text-display-xs font-bold text-primary mt-1 tracking-tight">{value || 0}</h3>
            )}
            {isLoading ? (
                <div className="h-4 w-24 bg-secondary animate-pulse rounded-lg mt-2" />
            ) : (
                <p className="text-[10px] text-quaternary mt-2 uppercase font-bold tracking-[0.15em]">{subtitle}</p>
            )}
        </div>
    );
}

function RegStatusBadge({ status }: { status: string }) {
    switch (status) {
        case "PENDING": return <Badge size="sm" color="warning">Pending</Badge>;
        case "VERIFIED": return <Badge size="sm" color="success">Verified</Badge>;
        case "REJECTED": return <Badge size="sm" color="error">Rejected</Badge>;
        default: return <Badge size="sm" color="gray">{status}</Badge>;
    }
}
