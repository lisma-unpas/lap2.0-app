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
