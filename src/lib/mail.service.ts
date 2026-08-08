// ============================================================
// src/lib/mail.service.ts
// Mail Service dùng chung — Nodemailer + Gmail SMTP
// Không hard-code credentials, đọc từ process.env
// ============================================================

import nodemailer from "nodemailer";
import type { AutoSpaBookingFormData } from "@/schemas/autospa-booking.schema";
import type { BookingFormData } from "@/schemas/booking.schema";

// ----------------------------------------------------------
// Tạo transporter một lần, tái dùng cho mọi lần gửi
// ----------------------------------------------------------
function createTransporter() {
  const host = process.env.MAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.MAIL_PORT || "587", 10);
  const user = process.env.MAIL_USER?.trim();
  const rawPass = process.env.MAIL_PASSWORD || "";
  // Tự động loại bỏ khoảng trắng dư thừa trong Mật khẩu ứng dụng 16 ký tự
  const pass = rawPass.replace(/\s+/g, "");

  if (!user || !pass || pass.includes("YOUR_GMAIL_APP_PASSWORD")) {
    throw new Error(
      "Chưa cấu hình Mật khẩu ứng dụng Gmail (MAIL_PASSWORD). Vui lòng dán Mật khẩu ứng dụng 16 ký tự vào file .env.local!"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ----------------------------------------------------------
// Helper: lấy email nhận từ env (backend-only, không lộ ra frontend)
// ----------------------------------------------------------
function getRecipient(): string {
  const recipient = process.env.MAIL_TO;
  if (!recipient || !recipient.trim()) {
    throw new Error("Thiếu cấu hình MAIL_TO trong biến môi trường.");
  }
  return recipient.trim();
}

// ----------------------------------------------------------
// Helper: format ngày YYYY-MM-DD → DD/MM/YYYY
// ----------------------------------------------------------
function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

// ----------------------------------------------------------
// Helper: thời gian gửi yêu cầu (múi giờ Việt Nam)
// ----------------------------------------------------------
function getTimestamp(): string {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "full",
    timeStyle: "medium",
  });
}

// ----------------------------------------------------------
// HTML template chung cho cả 2 loại email
// ----------------------------------------------------------
function buildEmailWrapper(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0d1526;border-radius:12px;overflow:hidden;border:1px solid #1e3a5f;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d1f3c 0%,#102a4c 100%);padding:28px 32px;border-bottom:2px solid #00c8ff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#00c8ff;letter-spacing:3px;text-transform:uppercase;font-weight:700;">TIẾN QUỐC AUTO SPA</p>
                    <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;font-weight:800;line-height:1.3;">${title}</h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="width:48px;height:48px;background:linear-gradient(135deg,#168bff,#00c8ff);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                      <span style="color:#fff;font-size:24px;line-height:48px;display:block;text-align:center;">🚗</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:28px 32px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#060d1a;padding:20px 32px;border-top:1px solid #1e3a5f;text-align:center;">
              <p style="margin:0;font-size:12px;color:#4a6fa5;">
                Email tự động từ hệ thống <strong style="color:#00c8ff;">Tiến Quốc Auto Spa</strong><br />
                147 Phùng Quán, phường Thanh Thủy, TP Huế · Hotline: 036 448 3597
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ----------------------------------------------------------
// Tạo section card dùng trong body email
// ----------------------------------------------------------
function buildSection(sectionTitle: string, rows: [string, string][]): string {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 14px;color:#8ab4d4;font-size:13px;font-weight:600;white-space:nowrap;vertical-align:top;width:40%;">${label}</td>
        <td style="padding:10px 14px;color:#e8f0fe;font-size:13px;vertical-align:top;">${value}</td>
      </tr>`
    )
    .join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background-color:#111e35;border-radius:8px;overflow:hidden;border:1px solid #1e3a5f;">
      <tr>
        <td colspan="2" style="background-color:#0e1f3d;padding:10px 14px;border-bottom:1px solid #1e3a5f;">
          <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#00c8ff;">${sectionTitle}</p>
        </td>
      </tr>
      ${rowsHtml}
    </table>`;
}

// ----------------------------------------------------------
// 1. Email đặt lịch chăm sóc xe (AutoSpa)
// ----------------------------------------------------------
export async function sendAutoSpaBookingEmail(
  data: AutoSpaBookingFormData
): Promise<void> {
  const transporter = createTransporter();
  const recipient = getRecipient();
  const timestamp = getTimestamp();
  const formattedDate = formatDate(data.date);

  const bodyHtml = `
    ${buildSection("THÔNG TIN KHÁCH HÀNG", [
      ["Họ và tên", `<strong style="color:#ffffff;">${data.fullName}</strong>`],
      [
        "Số điện thoại / Zalo",
        `<a href="tel:${data.phone}" style="color:#00c8ff;font-size:16px;font-weight:800;text-decoration:none;">📞 ${data.phone}</a>`,
      ],
    ])}

    ${buildSection("THÔNG TIN XE", [
      ["Dòng xe", `<strong style="color:#ffffff;">${data.carModel}</strong>`],
      [
        "Biển số xe",
        data.licensePlate
          ? `<strong style="color:#ffffff;">${data.licensePlate}</strong>`
          : '<span style="color:#4a6fa5;font-style:italic;">Không cung cấp</span>',
      ],
    ])}

    ${buildSection("THÔNG TIN LỊCH HẸN", [
      ["Dịch vụ đăng ký", `<strong style="color:#00c8ff;">${data.service}</strong>`],
      ["Ngày hẹn", `<strong style="color:#ffffff;">${formattedDate}</strong>`],
      ["Giờ hẹn", `<strong style="color:#ffffff;">${data.time}</strong>`],
    ])}

    ${buildSection("YÊU CẦU KHÁCH HÀNG", [
      [
        "Tình trạng xe / Yêu cầu xử lý",
        `<span style="color:#e8f0fe;white-space:pre-wrap;">${data.carCondition}</span>`,
      ],
      [
        "Ghi chú thêm",
        data.note
          ? `<span style="color:#e8f0fe;white-space:pre-wrap;">${data.note}</span>`
          : '<span style="color:#4a6fa5;font-style:italic;">Không có</span>',
      ],
    ])}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background-color:#0d2a1a;border:1px solid #1a5c35;border-radius:8px;padding:14px;">
      <tr>
        <td style="padding:12px 14px;color:#6fcf97;font-size:12px;">
          ⏰ <strong>Thời gian gửi yêu cầu:</strong> ${timestamp}
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0d1f3c,#102a4c);border:1px solid #00c8ff;border-radius:8px;padding:16px;">
      <tr>
        <td style="padding:12px 14px;color:#8ab4d4;font-size:13px;text-align:center;">
          📋 <strong style="color:#ffffff;">Vui lòng liên hệ khách hàng để xác nhận lịch hẹn.</strong><br />
          <a href="tel:${data.phone}" style="display:inline-block;margin-top:12px;background:linear-gradient(135deg,#168bff,#00c8ff);color:#ffffff;padding:10px 28px;border-radius:6px;font-weight:800;font-size:14px;text-decoration:none;">📞 Gọi ${data.phone}</a>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `"Tiến Quốc Auto Spa" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `[TIẾN QUỐC AUTO SPA] Lịch chăm sóc xe mới - ${data.fullName}`,
    html: buildEmailWrapper("THÔNG BÁO LỊCH CHĂM SÓC XE MỚI", bodyHtml),
  });
}

// ----------------------------------------------------------
// 2. Email đặt xe du lịch (HueCarTour)
// ----------------------------------------------------------
export async function sendCarBookingEmail(
  data: BookingFormData
): Promise<void> {
  const transporter = createTransporter();
  const recipient = getRecipient();
  const timestamp = getTimestamp();
  const formattedDate = formatDate(data.date);

  const bodyHtml = `
    ${buildSection("THÔNG TIN KHÁCH HÀNG", [
      ["Họ và tên", `<strong style="color:#ffffff;">${data.fullName}</strong>`],
      [
        "Số điện thoại / Zalo",
        `<a href="tel:${data.phone}" style="color:#00c8ff;font-size:16px;font-weight:800;text-decoration:none;">📞 ${data.phone}</a>`,
      ],
    ])}

    ${buildSection("THÔNG TIN CHUYẾN ĐI", [
      ["Điểm đón", `<strong style="color:#ffffff;">${data.pickupPoint}</strong>`],
      ["Điểm đến / Lộ trình", `<strong style="color:#ffffff;">${data.destination}</strong>`],
      ["Ngày đi", `<strong style="color:#ffffff;">${formattedDate}</strong>`],
      ["Giờ đón", `<strong style="color:#ffffff;">${data.time}</strong>`],
    ])}

    ${buildSection("THÔNG TIN XE", [
      ["Loại xe", `<strong style="color:#00c8ff;">${data.vehicleType}</strong>`],
      ["Số hành khách", `<strong style="color:#ffffff;">${data.passengers} người</strong>`],
      [
        "Tour quan tâm",
        data.tourInterest
          ? `<strong style="color:#ffffff;">${data.tourInterest}</strong>`
          : '<span style="color:#4a6fa5;font-style:italic;">Không chỉ định</span>',
      ],
    ])}

    ${buildSection("YÊU CẦU RIÊNG", [
      [
        "Ghi chú lịch trình",
        data.note
          ? `<span style="color:#e8f0fe;white-space:pre-wrap;">${data.note}</span>`
          : '<span style="color:#4a6fa5;font-style:italic;">Không có yêu cầu riêng</span>',
      ],
    ])}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background-color:#0d2a1a;border:1px solid #1a5c35;border-radius:8px;">
      <tr>
        <td style="padding:12px 14px;color:#6fcf97;font-size:12px;">
          ⏰ <strong>Thời gian gửi yêu cầu:</strong> ${timestamp}
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0d1f3c,#102a4c);border:1px solid #00c8ff;border-radius:8px;">
      <tr>
        <td style="padding:16px 14px;color:#8ab4d4;font-size:13px;text-align:center;">
          📋 <strong style="color:#ffffff;">Vui lòng liên hệ khách hàng để tư vấn và báo giá.</strong><br />
          <a href="tel:${data.phone}" style="display:inline-block;margin-top:12px;background:linear-gradient(135deg,#168bff,#00c8ff);color:#ffffff;padding:10px 28px;border-radius:6px;font-weight:800;font-size:14px;text-decoration:none;">📞 Gọi ${data.phone}</a>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `"Tiến Quốc Auto Spa" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `[TIẾN QUỐC AUTO SPA] Yêu cầu đặt xe mới - ${data.fullName}`,
    html: buildEmailWrapper("THÔNG BÁO YÊU CẦU ĐẶT XE DU LỊCH", bodyHtml),
  });
}
