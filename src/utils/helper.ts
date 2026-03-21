import { CATEGORY_ICONS } from "./constants";

export const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

export const getIcon = (name: string) => CATEGORY_ICONS[name] || "📦";

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};