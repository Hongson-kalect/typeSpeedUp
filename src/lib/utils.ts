import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatString(str: string) {
  if (typeof str !== "string") return str;

  return str.trim().replace(/\s+/g, " ");
}
