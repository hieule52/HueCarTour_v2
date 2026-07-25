// ============================================================
// src/lib/currency.ts
// Định dạng tiền tệ VND
// ============================================================

/**
 * Định dạng số thành chuỗi VND.
 * Ví dụ: formatVnd(1400000) → "1.400.000đ"
 */
export function formatVnd(amount: number): string {
  return amount.toLocaleString("vi-VN") + "đ";
}

/**
 * Định dạng dạng rút gọn.
 * Ví dụ: formatVndShort(1400000) → "1,4 triệu"
 */
export function formatVndShort(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return (Number.isInteger(millions) ? millions.toString() : millions.toFixed(1)) + " triệu";
  }
  if (amount >= 1_000) {
    return Math.round(amount / 1_000) + "K";
  }
  return amount.toLocaleString("vi-VN") + "đ";
}
