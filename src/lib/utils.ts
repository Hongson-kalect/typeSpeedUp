import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(str: string) {
  return str?.trim()?.replace(/\s+/g, " ");
}

export function getRelativeTime(dateStr: string) {
  // Parse chuỗi ngày giờ thành Date object
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: vi,
  });
}
