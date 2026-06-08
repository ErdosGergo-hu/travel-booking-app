import type { TFunction } from "i18next";

export function formatDate(value: string | undefined): string {
  if (typeof value === "undefined") {
    return "";
  }
  return new Date(value).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(date: Date, t: TFunction): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}${t("timeAgo.seconds")}`;
  if (diff < 3600) return `${Math.floor(diff / 60)}${t("timeAgo.minutes")}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${t("timeAgo.hours")}`;
  return date.toLocaleDateString();
}

export function timeLeft(endDate: Date): string {
  const diff = Math.floor((endDate.getTime() - Date.now()) / 1000);

  if (diff <= 0) {
    return "Ended";
  }

  const days = Math.floor(diff / 86400);

  const hours = Math.floor((diff % 86400) / 3600);

  const minutes = Math.floor((diff % 3600) / 60);

  const seconds = diff % 60;

  if (diff < 60) {
    return `${seconds}s`;
  }

  if (diff < 3600) {
    return `${minutes}m ${seconds}s`;
  }

  if (diff < 86400) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
