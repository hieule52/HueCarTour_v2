// ============================================================
// src/app/api/autospa-booking/route.ts
// Route Handler tiếp nhận lịch đặt xe chăm sóc Tiến Quốc Auto Spa
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { autoSpaBookingSchema } from "@/schemas/autospa-booking.schema";
import { buildAutoSpaMessage } from "@/lib/booking-message";
import { isRateLimited } from "@/lib/rate-limit";
import { autospaContact } from "@/data/site";
import { whatsappLink } from "@/lib/contact-links";

export async function POST(req: NextRequest) {
  try {
    // 1. Kiểm tra Content-Type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Yêu cầu phải ở định dạng JSON" },
        { status: 400 }
      );
    }

    // 2. Chống Spam: Rate Limiting theo IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
    
    // Giới hạn 3 yêu cầu trong 1 phút
    const limitReach = isRateLimited(ip, { intervalMs: 60000, maxRequests: 3 });
    if (limitReach) {
      return NextResponse.json(
        { error: "Bạn đang gửi yêu cầu quá nhanh. Vui lòng thử lại sau 1 phút." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 3. Chống Spam: Honeypot check
    if (body.email && body.email.trim() !== "") {
      return NextResponse.json(
        { error: "Spam detected!" },
        { status: 400 }
      );
    }

    // 4. Validate Zod phía server
    const parsed = autoSpaBookingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // 5. Tạo nội dung tin nhắn và liên kết WhatsApp
    const messageText = buildAutoSpaMessage(validData);
    
    // Auto Spa Contact không có whatsappUrl mặc định riêng trong site.ts,
    // nhưng ta có thể tạo link WhatsApp từ hotline của Auto Spa.
    const spaWhatsappUrl = `https://wa.me/${autospaContact.hotlineRaw}`;
    const waUrl = whatsappLink(spaWhatsappUrl, messageText);

    return NextResponse.json({
      success: true,
      messageText,
      whatsappUrl: waUrl,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
