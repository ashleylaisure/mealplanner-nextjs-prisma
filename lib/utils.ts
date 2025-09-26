import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toStringSafe(value: string | number | null | undefined | unknown): string {
  return value == null ? "" : String(value);
}

export function toNumberSafe(value: string | number | undefined | null | unknown): number {
  if (value == null) return 0;
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
}
