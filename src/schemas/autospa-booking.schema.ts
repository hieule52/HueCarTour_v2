// ============================================================
// src/schemas/autospa-booking.schema.ts
// Schema kiểm tra dữ liệu đặt lịch Auto Spa của Zod
// ============================================================

import { z } from "zod";

export const autoSpaBookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải từ 2 ký tự trở lên")
    .max(50, "Họ tên tối đa 50 ký tự")
    .transform((val) => val.trim()),
  phone: z
    .string()
    .min(10, "Số điện thoại tối thiểu 10 chữ số")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s().-]+$/, "Số điện thoại chỉ được chứa số, khoảng trắng, dấu ngoặc và dấu cộng")
    .transform((val) => val.trim()),
  carModel: z
    .string()
    .min(3, "Vui lòng nhập dòng xe của bạn (ví dụ: Toyota Vios, Mazda 3)")
    .max(100, "Dòng xe tối đa 100 ký tự")
    .transform((val) => val.trim()),
  licensePlate: z
    .string()
    .max(20, "Biển số xe tối đa 20 ký tự")
    .transform((val) => val.trim())
    .optional(),
  service: z.string().min(1, "Vui lòng chọn dịch vụ muốn sử dụng"),
  date: z
    .string()
    .min(10, "Vui lòng chọn ngày đặt lịch")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Định dạng ngày không hợp lệ (YYYY-MM-DD)"),
  time: z
    .string()
    .min(5, "Vui lòng chọn giờ hẹn")
    .regex(/^\d{2}:\d{2}$/, "Định dạng giờ không hợp lệ (HH:MM)"),
  carCondition: z
    .string()
    .min(5, "Vui lòng nhập ngắn gọn tình trạng xe hiện tại hoặc yêu cầu")
    .max(200, "Tình trạng tối đa 200 ký tự")
    .transform((val) => val.trim()),
  note: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
  // Honeypot chống spam bot
  email: z.string().max(50, "Spam detected").optional(),
});

export type AutoSpaBookingFormData = z.infer<typeof autoSpaBookingSchema>;
