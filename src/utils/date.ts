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
