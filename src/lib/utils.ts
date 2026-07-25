// ============================================================
// src/lib/utils.ts
// Utility functions dùng chung
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Kết hợp Tailwind class với clsx + tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Kiểm tra URL có phải placeholder không.
 * Placeholder có dạng "REPLACE_WITH_..."
 */
export function isPlaceholderUrl(url: string): boolean {
  return url.startsWith("REPLACE_WITH_");
}

/**
 * Rút gọn chuỗi nếu vượt quá maxLength, thêm "..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Tạo slug từ chuỗi tiếng Việt
 */
export function slugify(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
