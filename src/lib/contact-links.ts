// ============================================================
// src/lib/contact-links.ts
// Tạo liên kết liên hệ từ dữ liệu contact
// ============================================================

import { isPlaceholderUrl } from "./utils";

/**
 * Tạo link tel: từ số điện thoại thô
 */
export function telLink(rawPhone: string): string {
  return `tel:${rawPhone}`;
}

/**
 * Tạo link mailto: từ email
 */
export function mailtoLink(email: string): string {
  return `mailto:${email}`;
}

/**
 * Tạo link WhatsApp với nội dung tin nhắn.
 * Trả null nếu URL là placeholder.
 */
export function whatsappLink(whatsappUrl: string, message?: string): string | null {
  if (isPlaceholderUrl(whatsappUrl)) return null;
  if (message) {
    return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
  }
  return whatsappUrl;
}

/**
 * Kiểm tra URL có thể dùng được (không phải placeholder)
 */
export function isValidUrl(url: string): boolean {
  return !isPlaceholderUrl(url) && (url.startsWith("http") || url.startsWith("/"));
}

/**
 * Lấy URL an toàn: nếu là placeholder, trả null
 */
export function safeUrl(url: string): string | null {
  return isValidUrl(url) ? url : null;
}
