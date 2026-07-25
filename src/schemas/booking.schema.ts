// ============================================================
// src/schemas/booking.schema.ts
// Schema kiểm tra dữ liệu đặt xe của Zod
// ============================================================

import { z } from "zod";

export const bookingFormSchema = z.object({
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
  pickupPoint: z
    .string()
    .min(5, "Vui lòng nhập chi tiết địa điểm đón")
    .max(150, "Địa điểm đón tối đa 150 ký tự")
    .transform((val) => val.trim()),
  destination: z
    .string()
    .min(3, "Vui lòng nhập điểm đến hoặc lộ trình mong muốn")
    .max(150, "Điểm đến tối đa 150 ký tự")
    .transform((val) => val.trim()),
  date: z
    .string()
    .min(10, "Vui lòng chọn ngày đi")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Định dạng ngày không hợp lệ (YYYY-MM-DD)"),
  time: z
    .string()
    .min(5, "Vui lòng chọn giờ đón")
    .regex(/^\d{2}:\d{2}$/, "Định dạng giờ không hợp lệ (HH:MM)"),
  vehicleType: z.string().min(1, "Vui lòng chọn loại xe"),
  passengers: z
    .number({ message: "Vui lòng nhập số hành khách" })
    .int("Số lượng hành khách phải là số nguyên")
    .min(1, "Số hành khách tối thiểu là 1")
    .max(50, "Vui lòng liên hệ trực tiếp cho đoàn trên 50 người"),
  tourInterest: z.string().max(100, "Tên tour tối đa 100 ký tự").optional(),
  note: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
  // Honeypot chống spam bot
  email: z.string().max(50, "Spam detected").optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
