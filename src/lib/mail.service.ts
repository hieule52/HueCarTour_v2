// ============================================================
// src/lib/mail.service.ts
// Mail Service dùng chung — Nodemailer + Gmail SMTP
// HTML Email Templates — Brand: TIẾN QUỐC AUTO SPA
// Inline CSS, table-based layout, Gmail/Outlook/Apple Mail compatible
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
// Helper: giá trị muted khi không có dữ liệu
// ----------------------------------------------------------
function muted(text: string): string {
  return `<span style="color:#7895B2;font-style:italic;">${text}</span>`;
}

// ===========================================================
// EMAIL LAYOUT BUILDER
// title: tiêu đề thông báo (màu trắng, to, bold)
// brandLabel: dòng label thương hiệu trên title (màu cyan)
// subLabel: dòng phụ nhỏ giữa brandLabel và title (ví dụ: HUE CAR TOUR)
// bodyHtml: nội dung phần thân email
// ===========================================================
function buildEmailWrapper(
  title: string,
  bodyHtml: string,
  subLabel?: string
): string {
  const subLabelHtml = subLabel
    ? `<p style="margin:4px 0 6px;font-size:11px;color:#C7D7E8;letter-spacing:2px;font-weight:600;text-transform:uppercase;">${subLabel}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#E8EFF7;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E8EFF7;padding:24px 12px;">
    <tr>
      <td align="center">

        <!-- Container card -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:10px;overflow:hidden;border:1px solid #C7D7E8;">

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="background-color:#082B50;padding:28px 28px 24px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <!-- Brand label -->
                    <p style="margin:0 0 4px;font-size:10px;color:#38BDF8;letter-spacing:3px;text-transform:uppercase;font-weight:700;">TIẾN QUỐC AUTO SPA</p>
                    ${subLabelHtml}
                    <!-- Main title -->
                    <h1 style="margin:0;font-size:20px;color:#FFFFFF;font-weight:800;line-height:1.35;">${title}</h1>
                  </td>
                  <!-- Icon box -->
                  <td style="vertical-align:top;padding-left:16px;width:52px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#0B3158;border-radius:10px;width:48px;height:48px;text-align:center;vertical-align:middle;">
                          <span style="font-size:22px;line-height:1;">🚗</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider line -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td style="height:2px;background-color:#38BDF8;border-radius:2px;"></td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ===== BODY ===== -->
          <tr>
            <td style="background-color:#F8FBFF;padding:24px 20px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="background-color:#F1F5F9;border-top:1px solid #C7D7E8;padding:18px 20px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#64748B;">
                Email tự động từ hệ thống &bull;
                <strong style="color:#087EA4;font-weight:700;">TIẾN QUỐC AUTO SPA</strong>
              </p>
              <p style="margin:0;font-size:11px;color:#64748B;">
                147 Phùng Quán, TP Huế &bull; Hotline: <span style="color:#087EA4;font-weight:600;">036 448 3597</span>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`;
}

// ===========================================================
// SECTION BUILDER
// Tạo một card section với tiêu đề và các dòng label/value
// ===========================================================
function buildSection(
  sectionTitle: string,
  rows: [string, string][]
): string {
  const rowsHtml = rows
    .map(
      ([label, value], index) => `
      <tr>
        <td colspan="2" style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr style="background-color:${index % 2 === 0 ? "#FFFFFF" : "#F8FBFF"};">
              <!-- Label -->
              <td style="padding:10px 14px;color:#456B82;font-size:12px;font-weight:600;vertical-align:top;width:38%;border-right:1px solid #EEF4FF;">
                ${label}
              </td>
              <!-- Value -->
              <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:700;vertical-align:top;">
                ${value}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;border-radius:8px;overflow:hidden;border:1px solid #C7D7E8;">
      <!-- Section header -->
      <tr>
        <td colspan="2" style="background-color:#EEF4FF;padding:10px 14px;border-bottom:1px solid #C7D7E8;">
          <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#087EA4;">${sectionTitle}</p>
        </td>
      </tr>
      ${rowsHtml}
    </table>`;
}

// ===========================================================
// TIMESTAMP BLOCK
// ===========================================================
function buildTimestampBlock(timestamp: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;border-radius:8px;overflow:hidden;border:1px solid #86D1A5;background-color:#DDF7E8;">
      <tr>
        <td style="padding:12px 16px;">
          <p style="margin:0;font-size:12px;color:#047857;font-weight:700;">
            ⏰ Thời gian gửi yêu cầu:
          </p>
          <p style="margin:4px 0 0;font-size:13px;color:#166534;font-weight:600;">
            ${timestamp}
          </p>
        </td>
      </tr>
    </table>`;
}

// ===========================================================
// CTA BLOCK
// highlightPhrase: cụm từ sẽ được highlight màu cyan trong message
// ===========================================================
function buildCtaBlock(
  phone: string,
  message: string,
  highlightPhrase: string,
  customerEmail?: string
): string {
  // Escape và replace highlight phrase
  const safeMessage = message.replace(
    highlightPhrase,
    `<strong style="color:#38BDF8;">${highlightPhrase}</strong>`
  );

  const emailButtonHtml = customerEmail
    ? `<a href="mailto:${customerEmail}"
         style="display:inline-block;background-color:#FFFFFF;color:#082B50;border:2px solid #C7D7E8;padding:10px 22px;border-radius:6px;font-weight:800;font-size:13px;text-decoration:none;margin-left:10px;">
         ✉ Trả lời Email
       </a>`
    : "";

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #0B3158;background-color:#082B50;">
      <tr>
        <td style="padding:18px 16px;text-align:center;">
          <p style="margin:0 0 14px;font-size:13px;color:#FFFFFF;line-height:1.6;">
            📋 ${safeMessage}
          </p>
          <!-- Buttons row -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td>
                <a href="tel:${phone}"
                   style="display:inline-block;background-color:#38BDF8;color:#071827;padding:11px 26px;border-radius:6px;font-weight:800;font-size:14px;text-decoration:none;">
                  📞 Gọi ${phone}
                </a>
              </td>
              ${customerEmail ? `<td style="padding-left:10px;">${emailButtonHtml}</td>` : ""}
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

// ===========================================================
// 1. Email đặt lịch chăm sóc xe — AUTO SPA
// ===========================================================
export async function sendAutoSpaBookingEmail(
  data: AutoSpaBookingFormData
): Promise<void> {
  const transporter = createTransporter();
  const recipient = getRecipient();
  const timestamp = getTimestamp();
  const formattedDate = formatDate(data.date);

  const bodyHtml = `
    ${buildSection("THÔNG TIN KHÁCH HÀNG", [
      ["Họ và tên", `<strong style="color:#0F172A;font-weight:700;">${data.fullName}</strong>`],
      [
        "Số điện thoại / Zalo",
        `<a href="tel:${data.phone}" style="color:#0891B2;font-size:15px;font-weight:800;text-decoration:none;">📞 ${data.phone}</a>`,
      ],
    ])}

    ${buildSection("THÔNG TIN XE", [
      ["Dòng xe", `<strong style="color:#0F172A;font-weight:700;">${data.carModel}</strong>`],
      [
        "Biển số xe",
        data.licensePlate && data.licensePlate.trim() !== ""
          ? `<strong style="color:#0F172A;font-weight:700;">${data.licensePlate}</strong>`
          : muted("Không cung cấp"),
      ],
    ])}

    ${buildSection("THÔNG TIN LỊCH HẸN", [
      ["Dịch vụ đăng ký", `<strong style="color:#0891B2;font-weight:700;">${data.service}</strong>`],
      ["Ngày hẹn", `<strong style="color:#0F172A;font-weight:700;">${formattedDate}</strong>`],
      ["Giờ hẹn", `<strong style="color:#0F172A;font-weight:700;">${data.time}</strong>`],
    ])}

    ${buildSection("YÊU CẦU KHÁCH HÀNG", [
      [
        "Tình trạng xe / Yêu cầu xử lý",
        `<span style="color:#1F2937;font-weight:600;white-space:pre-wrap;">${data.carCondition}</span>`,
      ],
      [
        "Ghi chú thêm",
        data.note && data.note.trim() !== ""
          ? `<span style="color:#1F2937;font-weight:600;white-space:pre-wrap;">${data.note}</span>`
          : muted("Không có"),
      ],
    ])}

    ${buildTimestampBlock(timestamp)}

    ${buildCtaBlock(
      data.phone,
      "Vui lòng liên hệ khách hàng để xác nhận lịch hẹn.",
      "xác nhận lịch hẹn"
    )}
  `;

  await transporter.sendMail({
    from: `"Tiến Quốc Auto Spa" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `[AUTO SPA] Lịch chăm sóc xe mới — ${data.fullName} · ${data.phone}`,
    html: buildEmailWrapper("THÔNG BÁO LỊCH CHĂM SÓC XE MỚI", bodyHtml),
  });
}

// ===========================================================
// 2. Email đặt xe du lịch — HUE CAR TOUR
// ===========================================================
export async function sendCarBookingEmail(
  data: BookingFormData
): Promise<void> {
  const transporter = createTransporter();
  const recipient = getRecipient();
  const timestamp = getTimestamp();
  const formattedDate = formatDate(data.date);

  const bodyHtml = `
    ${buildSection("THÔNG TIN KHÁCH HÀNG", [
      ["Họ và tên", `<strong style="color:#0F172A;font-weight:700;">${data.fullName}</strong>`],
      [
        "Số điện thoại / Zalo",
        `<a href="tel:${data.phone}" style="color:#0891B2;font-size:15px;font-weight:800;text-decoration:none;">📞 ${data.phone}</a>`,
      ],
    ])}

    ${buildSection("THÔNG TIN CHUYẾN ĐI", [
      ["Điểm đón", `<strong style="color:#0F172A;font-weight:700;">${data.pickupPoint}</strong>`],
      ["Điểm đến / Lộ trình", `<strong style="color:#0F172A;font-weight:700;">${data.destination}</strong>`],
      ["Ngày đi", `<strong style="color:#0F172A;font-weight:700;">${formattedDate}</strong>`],
      ["Giờ đón", `<strong style="color:#0F172A;font-weight:700;">${data.time}</strong>`],
    ])}

    ${buildSection("THÔNG TIN XE", [
      ["Loại xe yêu cầu", `<strong style="color:#0891B2;font-weight:700;">${data.vehicleType}</strong>`],
      ["Số hành khách", `<strong style="color:#0F172A;font-weight:700;">${data.passengers} người</strong>`],
    ])}

    ${buildSection("THÔNG TIN TOUR", [
      [
        "Tour quan tâm",
        data.tourInterest && data.tourInterest.trim() !== ""
          ? `<strong style="color:#0F172A;font-weight:700;">${data.tourInterest}</strong>`
          : muted("Chưa chọn"),
      ],
    ])}

    ${buildSection("YÊU CẦU RIÊNG", [
      [
        "Ghi chú lịch trình / Yêu cầu riêng",
        data.note && data.note.trim() !== ""
          ? `<span style="color:#1F2937;font-weight:600;white-space:pre-wrap;">${data.note}</span>`
          : muted("Không có yêu cầu riêng"),
      ],
    ])}

    ${buildTimestampBlock(timestamp)}

    ${buildCtaBlock(
      data.phone,
      "Vui lòng liên hệ khách hàng để tư vấn và báo giá.",
      "tư vấn và báo giá"
    )}
  `;

  await transporter.sendMail({
    from: `"Tiến Quốc Auto Spa" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `[HUE CAR TOUR] Yêu cầu đặt xe mới — ${data.fullName} · ${data.phone}`,
    html: buildEmailWrapper(
      "YÊU CẦU ĐẶT XE DU LỊCH MỚI",
      bodyHtml,
      "HUE CAR TOUR"
    ),
  });
}
