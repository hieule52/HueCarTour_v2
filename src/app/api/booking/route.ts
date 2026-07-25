// ============================================================
// src/app/api/booking/route.ts
// Route Handler tiếp nhận thông tin đặt xe của HUECARTOUR
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { bookingFormSchema } from "@/schemas/booking.schema";
import { buildBookingMessage } from "@/lib/booking-message";
import { isRateLimited } from "@/lib/rate-limit";
import { huecartourContact } from "@/data/site";
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
    
    // Giới hạn tối đa 3 yêu cầu trong 1 phút (60000ms)
    const limitReach = isRateLimited(ip, { intervalMs: 60000, maxRequests: 3 });
    if (limitReach) {
      return NextResponse.json(
        { error: "Bạn đang gửi yêu cầu quá nhanh. Vui lòng thử lại sau 1 phút." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 3. Chống Spam: Honeypot check
    // Nếu robot tự động điền trường ẩn 'email', chặn đứng yêu cầu
    if (body.email && body.email.trim() !== "") {
      return NextResponse.json(
        { error: "Spam detected!" },
        { status: 400 }
      );
    }

    // 4. Validate dữ liệu Zod phía server
    const parsed = bookingFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // 5. Tạo nội dung tin nhắn và liên kết WhatsApp
    const messageText = buildBookingMessage(validData);
    const waUrl = whatsappLink(huecartourContact.whatsappUrl, messageText);

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
