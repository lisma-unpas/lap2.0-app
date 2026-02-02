"use client";

import { useEffect, useState } from "react";
import {
    Settings02,
    Save01,
    ChevronDown,
} from "@untitledui/icons";
import { getUnitSettings, updateUnitSettings } from "@/actions/admin";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNIT_CONFIG } from "@/constants/units";
import { useToast } from "@/context/toast-context";
import { cx } from "@/utils/cx";
import { DateField } from "@/components/base/input/date-field";
import { parseDateTime } from "@internationalized/date";

function toLocalISOString(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const safeParseDateTime = (val: string) => {
    try {
        if (!val) return null;
        // If it's just a date (YYYY-MM-DD), append time
        if (val.length === 10) val += "T00:00";
        return parseDateTime(val);
    } catch (e) {
        return null;
    }
};

export default function SettingsClient() {
    // unitId -> categoryName -> limit
    const [settings, setSettings] = useState<Record<string, Record<string, number>>>({});
    const [unitDates, setUnitDates] = useState<Record<string, { startDate: string; endDate: string; eventDate: string }>>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [saveQueue, setSaveQueue] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        fetchInitialData();
    }, []);

    async function fetchInitialData() {
        setIsInitialLoading(true);
        const res = await getUnitSettings();
        if (res.success && res.data) {
            const mapped: Record<string, Record<string, number>> = {};
            const dates: Record<string, { startDate: string; endDate: string; eventDate: string }> = {};

            res.data.forEach((curr: any) => {
                if (!mapped[curr.unitId]) mapped[curr.unitId] = {};
                mapped[curr.unitId][curr.categoryName] = curr.limit;

                // Capture dates and ensure we don't overwrite valid dates with nulls from other records
                const existing = dates[curr.unitId] || { startDate: "", endDate: "", eventDate: "" };

                if (curr.startDate || curr.endDate || curr.eventDate) {
                    dates[curr.unitId] = {
                        startDate: curr.startDate ? toLocalISOString(new Date(curr.startDate)) : existing.startDate,
                        endDate: curr.endDate ? toLocalISOString(new Date(curr.endDate)) : existing.endDate,
                        eventDate: curr.eventDate ? toLocalISOString(new Date(curr.eventDate)) : existing.eventDate
                    };
                }
            });
            setSettings(mapped);
            setUnitDates(dates);
        }
        setIsInitialLoading(false);
    }

    useEffect(() => {
        if (saveQueue.length > 0 && !isProcessing) {
            const nextUnitId = saveQueue[0];
            executeSave(nextUnitId);
        }
    }, [saveQueue, isProcessing]);

    async function executeSave(unitId: string) {
        setIsProcessing(true);
        const unitCategories = getUnitCategories(unitId);
        const settingsToUpdate = unitCategories.map(cat => ({
            categoryName: cat,
            limit: settings[unitId]?.[cat] ?? 100
        }));

        const dates = unitDates[unitId];
        const res = await updateUnitSettings(unitId, settingsToUpdate, {
            startDate: dates?.startDate || null,
            endDate: dates?.endDate || null,
            eventDate: dates?.eventDate || null
        });

        if (res.success) {
            toastSuccess("Berhasil", `Semua limit untuk ${UNIT_CONFIG[unitId].name} diperbarui.`);
        } else {
            toastError("Gagal", res.message || "Gagal memperbarui limit.");
        }

        setSaveQueue(prev => prev.filter(id => id !== unitId));
        setIsProcessing(false);
    }

    async function handleSaveUnit(unitId: string) {
        if (saveQueue.includes(unitId)) return;
        setSaveQueue(prev => [...prev, unitId]);
    }

    const units = Object.keys(UNIT_CONFIG);

    function getUnitCategories(unitId: string) {
        const unit = UNIT_CONFIG[unitId];
        const categories = new Set<string>();

        const getFieldOptions = (fields: any[]) => {
            const sesiField = fields.find((f: any) => f.id === "sesi");
            const categoryField = fields.find((f: any) => f.id === "category");

            const sesiOptions = sesiField?.options || [];
            const categoryOptions = categoryField?.options ? categoryField.options.map((o: any) => o.value || o) : [];

            return { sesiOptions, categoryOptions };
        };

        const addCategory = (subEventName: string | null, sesi?: string, category?: string) => {
            const parts = [];
            if (subEventName && subEventName !== unit.name) parts.push(subEventName);
            if (sesi) parts.push(sesi);
            if (category) parts.push(category);
            categories.add(parts.join(" - ") || unit.name);
        };

        // 1. If has subEventConfigs, iterate them
        if (unit.subEventConfigs) {
            Object.keys(unit.subEventConfigs).forEach(seName => {
                const config = unit.subEventConfigs[seName];
                const { sesiOptions, categoryOptions } = getFieldOptions(config.fields || []);

                if (sesiOptions.length > 0 && categoryOptions.length > 0) {
                    sesiOptions.forEach((s: string) => categoryOptions.forEach((c: string) => addCategory(seName, s, c)));
                } else if (sesiOptions.length > 0) {
                    sesiOptions.forEach((s: string) => addCategory(seName, s));
                } else if (categoryOptions.length > 0) {
                    categoryOptions.forEach((c: string) => addCategory(seName, undefined, c));
                } else {
                    addCategory(seName);
                }
            });
        }
        // 2. Otherwise use root formFields
        else if (unit.formFields) {
            const { sesiOptions, categoryOptions } = getFieldOptions(unit.formFields);
            if (sesiOptions.length > 0 && categoryOptions.length > 0) {
                sesiOptions.forEach((s: string) => categoryOptions.forEach((c: string) => addCategory(null, s, c)));
            } else if (sesiOptions.length > 0) {
                sesiOptions.forEach((s: string) => addCategory(null, s));
            } else if (categoryOptions.length > 0) {
                categoryOptions.forEach((c: string) => addCategory(null, undefined, c));
            } else {
                addCategory(null);
            }
        }
        // 3. Fallback to subEvents
        else if (unit.subEvents) {
            unit.subEvents.forEach((se: string) => addCategory(se));
        }
        // 4. Absolute fallback
        else {
            addCategory(null);
        }

        return Array.from(categories);
    }

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                <div className="mb-10">
                    <h1 className="text-display-sm font-bold text-primary">System Settings</h1>
                    <p className="text-md text-tertiary">Configure registration limits and system parameters</p>
                </div>

                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Settings02 className="size-6 text-brand-500" />
                        <h2 className="text-xl font-bold text-primary">Registration Capacity Limits</h2>
                    </div>

                    <p className="bg-utility-blue-50 border border-utility-blue-100 p-4 rounded-lg text-sm text-utility-blue-700 mb-8">
                        The registration form will automatically close if the number of <strong>Verified</strong> or <strong>Pending</strong> registrations reaches the limit for a specific category.
                    </p>

                    <div className="space-y-6">
                        {isInitialLoading ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="bg-primary p-6 rounded-2xl border border-secondary animate-pulse h-48" />
                            ))
                        ) : (
                            units.map((unitId) => {
                                const unit = UNIT_CONFIG[unitId];
                                const categories = getUnitCategories(unitId);

                                return (
                                    <div key={unitId} className="bg-primary rounded-2xl border border-secondary shadow-sm overflow-hidden">
                                        <div className="p-4 border-b border-secondary flex items-center justify-between bg-secondary/5">
                                            <div>
                                                <h3 className="font-bold text-lg text-primary">{unit.name}</h3>
                                                <p className="text-xs text-tertiary">Unit ID: {unitId} • {categories.length} Categories Total</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                iconLeading={Save01}
                                                onClick={() => handleSaveUnit(unitId)}
                                                isLoading={saveQueue.includes(unitId)}
                                                className="min-w-[120px]"
                                            >
                                                {saveQueue.includes(unitId) ? "In Queue..." : "Save Unit"}
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4 bg-secondary_alt/30 border-b border-secondary">
                                            <div className="flex-1">
                                                <DateField
                                                    label="Pendaftaran Dibuka"
                                                    value={safeParseDateTime(unitDates[unitId]?.startDate || "")}
                                                    onChange={(val) => setUnitDates(prev => ({
                                                        ...prev,
                                                        [unitId]: { ...(prev[unitId] || { startDate: "", endDate: "", eventDate: "" }), startDate: val ? val.toString() : "" }
                                                    }))}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <DateField
                                                    label="Pendaftaran Ditutup"
                                                    value={safeParseDateTime(unitDates[unitId]?.endDate || "")}
                                                    onChange={(val) => setUnitDates(prev => ({
                                                        ...prev,
                                                        [unitId]: { ...(prev[unitId] || { startDate: "", endDate: "", eventDate: "" }), endDate: val ? val.toString() : "" }
                                                    }))}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <DateField
                                                    label="Tanggal Pelaksanaan Event"
                                                    value={safeParseDateTime(unitDates[unitId]?.eventDate || "")}
                                                    onChange={(val) => setUnitDates(prev => ({
                                                        ...prev,
                                                        [unitId]: { ...(prev[unitId] || { startDate: "", endDate: "", eventDate: "" }), eventDate: val ? val.toString() : "" }
                                                    }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="divide-y divide-secondary">
                                            {categories.map((cat) => (
                                                <div key={cat} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-secondary/20">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-2 rounded-full bg-secondary" />
                                                        <span className="text-sm font-medium text-primary">
                                                            {cat}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                                        <div className="w-28">
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                value={settings[unitId]?.[cat]?.toString() || (cat === "TOTAL" ? "500" : "100")}
                                                                onChange={(val) => setSettings(prev => ({
                                                                    ...prev,
                                                                    [unitId]: {
                                                                        ...(prev[unitId] || {}),
                                                                        [cat]: parseInt(val) || 0
                                                                    }
                                                                }))}
                                                                size="sm"
                                                                aria-label={`Limit for ${cat}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
