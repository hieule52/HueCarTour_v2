// ============================================================
// src/lib/booking-message.ts
// Tạo nội dung tin nhắn từ form đặt xe / Auto Spa
// ============================================================

import type { BookingFormData } from "@/schemas/booking.schema";
import type { AutoSpaBookingFormData } from "@/schemas/autospa-booking.schema";

/**
 * Tạo nội dung tin nhắn cho yêu cầu đặt xe.
 * Dùng để gửi qua WhatsApp, Zalo hoặc cho phép sao chép.
 */
export function buildBookingMessage(data: BookingFormData): string {
  const lines = [
    "🚗 *YÊU CẦU ĐẶT XE – HUE CAR TOURS*",
    "━━━━━━━━━━━━━━━━━━━━",
    `👤 Họ tên: ${data.fullName}`,
    `📞 Điện thoại/Zalo: ${data.phone}`,
    `📍 Điểm đón: ${data.pickupPoint}`,
    `🏁 Điểm đến: ${data.destination}`,
    `📅 Ngày: ${data.date}`,
    `⏰ Giờ: ${data.time}`,
    `🚙 Loại xe: ${data.vehicleType}`,
    `👥 Số hành khách: ${data.passengers}`,
  ];

  if (data.tourInterest) {
    lines.push(`🗺️ Tour quan tâm: ${data.tourInterest}`);
  }
  if (data.note) {
    lines.push(`📝 Ghi chú: ${data.note}`);
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("Gửi từ huecartours.com");

  return lines.join("\n");
}

/**
 * Tạo nội dung tin nhắn cho yêu cầu đặt lịch Auto Spa.
 */
export function buildAutoSpaMessage(data: AutoSpaBookingFormData): string {
  const lines = [
    "🔧 *ĐẶT LỊCH – TIẾN QUỐC AUTO SPA*",
    "━━━━━━━━━━━━━━━━━━━━",
    `👤 Họ tên: ${data.fullName}`,
    `📞 Điện thoại/Zalo: ${data.phone}`,
    `🚗 Dòng xe: ${data.carModel}`,
  ];

  if (data.licensePlate) {
    lines.push(`🔖 Biển số: ${data.licensePlate}`);
  }

  lines.push(
    `🛠️ Dịch vụ: ${data.service}`,
    `📅 Ngày: ${data.date}`,
    `⏰ Giờ: ${data.time}`,
    `📊 Tình trạng xe: ${data.carCondition}`
  );

  if (data.note) {
    lines.push(`📝 Ghi chú: ${data.note}`);
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("Gửi từ huecartours.com");

  return lines.join("\n");
}
