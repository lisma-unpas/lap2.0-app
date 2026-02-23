export function formatDateTime(date: Date | string | number | null | undefined) {
    if (!date) return "-";
    const formatted = new Date(date).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).replace(/\./g, ":");

    return `${formatted} WIB`;
}

export function formatDate(date: Date | string | number | null | undefined) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function parseSafeDate(date: any): Date | null {
    if (!date) return null;
    if (date instanceof Date) return isNaN(date.getTime()) ? null : date;

    let dateStr = String(date);
    if (dateStr.startsWith("$D")) {
        dateStr = dateStr.substring(2);
    }

    // Check if it's already a valid ISO string or has timezone
    if (dateStr.includes('Z') || dateStr.includes('+')) {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? null : d;
    }

    // Handle local floating date strings (expected from our UI: YYYY-MM-DDTHH:mm)
    // and append local timezone (Jakarta UTC+7)
    try {
        if (dateStr.length >= 10) {
            const hasTime = dateStr.includes('T');
            const normalizedStr = hasTime ? dateStr : `${dateStr}T00:00`;
            const d = new Date(`${normalizedStr}+07:00`);
            if (!isNaN(d.getTime())) return d;
        }
    } catch (e) {
        // Fallback
    }

    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}
