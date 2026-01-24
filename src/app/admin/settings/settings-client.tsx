"use client";

import { useEffect, useState } from "react";
import {
    Settings02,
    Save01,
} from "@untitledui/icons";
import { getUnitSettings, updateUnitSetting } from "@/actions/admin";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNIT_CONFIG } from "@/constants/units";
import { useToast } from "@/context/toast-context";

export default function SettingsClient() {
    const [settings, setSettings] = useState<Record<string, number>>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState<string | null>(null);

    const { toastSuccess, toastError } = useToast();

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
        const res = await getUnitSettings();
        if (res.success && res.data) {
            const mapped = res.data.reduce((acc: any, curr: any) => {
                acc[curr.unitId] = curr.limit;
                return acc;
            }, {});
            setSettings(mapped);
        }
        if (!isInitial) setIsLoading(false);
    }

    async function handleSave(unitId: string) {
        setIsSaving(unitId);
        const limit = settings[unitId] || 100;
        const res = await updateUnitSetting(unitId, limit);
        if (res.success) {
            toastSuccess("Berhasil", `Limit untuk ${unitId} diperbarui.`);
        } else {
            toastError("Gagal", res.message || "Gagal memperbarui limit.");
        }
        setIsSaving(null);
    }

    const units = Object.keys(UNIT_CONFIG);

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                <div className="mb-10">
                    <h1 className="text-display-sm font-bold text-primary">System Settings</h1>
                    <p className="text-md text-tertiary">Configure registration limits and system parameters</p>
                </div>

                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Settings02 className="size-6 text-brand-500" />
                        <h2 className="text-xl font-bold text-primary">Registration Capacity Limits</h2>
                    </div>

                    <p className="bg-utility-blue-50 border border-utility-blue-100 p-4 rounded-lg text-sm text-utility-blue-700 mb-8">
                        The registration form for a unit will automatically close if the number of <strong>Verified</strong> or <strong>Pending</strong> registrations reaches the limit. Rejected registrations are not counted.
                    </p>

                    <div className="space-y-4">
                        {isInitialLoading ? (
                            [1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-primary p-4 rounded-2xl border border-secondary flex justify-between items-center gap-4">
                                    <div className="flex-1">
                                        <div className="h-5 w-40 bg-secondary animate-pulse rounded-lg mb-2" />
                                        <div className="h-3 w-20 bg-secondary animate-pulse rounded-lg" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-9 w-32 bg-secondary animate-pulse rounded-lg" />
                                        <div className="h-9 w-24 bg-secondary animate-pulse rounded-lg" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            units.map((unitId) => {
                                const unit = UNIT_CONFIG[unitId];
                                return (
                                    <div key={unitId} className="bg-primary p-4 rounded-2xl border border-secondary shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-primary">{unit.name}</h3>
                                            <p className="text-xs text-tertiary">Unit ID: {unitId}</p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="w-32">
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={settings[unitId]?.toString() || "100"}
                                                    onChange={(val) => setSettings(prev => ({ ...prev, [unitId]: parseInt(val) || 0 }))}
                                                    size="sm"
                                                    aria-label={`Limit for ${unit.name}`}
                                                />
                                            </div>
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                iconLeading={Save01}
                                                onClick={() => handleSave(unitId)}
                                                isLoading={isSaving === unitId}
                                            >
                                                Save
                                            </Button>
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
