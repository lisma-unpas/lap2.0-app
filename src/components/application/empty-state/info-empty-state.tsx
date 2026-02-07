"use client";

import { EmptyState } from "@/components/application/empty-state/empty-state";
import { SearchRefraction } from "@untitledui/icons";

export function InfoEmptyState() {
    return (
        <div className="mt-20 py-6 px-6">
            <EmptyState size="lg">
                <EmptyState.Header pattern="circle">
                    <EmptyState.FeaturedIcon icon={SearchRefraction} color="gray" />
                </EmptyState.Header>
                <EmptyState.Content>
                    <EmptyState.Title>Belum ada informasi</EmptyState.Title>
                    <EmptyState.Description>
                        Kembali lagi nanti untuk update terbaru seputar LAP 2.0.
                    </EmptyState.Description>
                </EmptyState.Content>
            </EmptyState>
        </div>
    );
}
