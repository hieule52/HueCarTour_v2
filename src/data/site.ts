// ============================================================
// src/data/site.ts
// Cấu hình toàn cục website — nguồn sự thật duy nhất
// ============================================================

import type { SiteConfig, NavigationItem, SocialLink } from "@/types/site";

// ----------------------------------------------------------
// Site metadata
// ----------------------------------------------------------
export const siteConfig: SiteConfig = {
  name: "huecartour",
  displayName: "HUE CAR TOURS",
  slogan: "Xe riêng tại Huế - An toàn, minh bạch, đúng giờ",
  description:
    "Dịch vụ xe du lịch riêng tại Huế: đưa đón sân bay Phú Bài, thuê xe theo tuyến, tour tham quan Huế – Đà Nẵng – Hội An – Phong Nha. Tài xế địa phương kinh nghiệm, giá minh bạch, đúng giờ.",
  url: "https://huecartours.com",
  locale: "vi_VN",
  ogImage: "/assets/images/seo/og-huecartour.jpg",
};

// ----------------------------------------------------------
// Navigation
// ----------------------------------------------------------
export const mainNav: NavigationItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Tour", href: "/tours" },
  { label: "Đặt xe", href: "/#dat-xe" },
  { label: "Đội xe", href: "/#doi-xe" },
  { label: "Auto Spa", href: "/auto-spa" },
  { label: "Liên hệ", href: "/lien-he" },
];

// ----------------------------------------------------------
// HUECARTOUR — thông tin liên hệ
// ⚠️  Thay thế các placeholder REPLACE_WITH_... trước khi go-live
// ----------------------------------------------------------
export const huecartourContact = {
  hotlineDisplay: "036 448 3597",
  hotlineRaw: "0364483597",
  contactName: "Mr. QUỐC",
  email: "huecartours@gmail.com",
  address: "147 Phùng Quán, phường Thanh Thủy, TP Huế",
  facebookUrl: "https://www.facebook.com/quoc.tien.5811877?locale=vi_VN",
  zaloUrl: "REPLACE_WITH_ZALO_URL",
  messengerUrl: "https://www.facebook.com/quoc.tien.5811877?locale=vi_VN",
  whatsappUrl: "REPLACE_WITH_WHATSAPP_URL",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.4!2d107.5698!3d16.4637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a1276b726513%3A0x4f6d30e2f9c7a5a8!2s147%20Ph%C3%B9ng%20Qu%C3%A1n%2C%20Thanh%20Th%E1%BB%A7y%2C%20Hu%E1%BA%BF%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s",
  googleMapsDirectionUrl: "https://maps.app.goo.gl/e8ZZ1yZJSDCmLSs88",
} as const;

// ----------------------------------------------------------
// Auto Spa — thông tin liên hệ
// ----------------------------------------------------------
export const autospaContact = {
  hotlineDisplay: "036 448 3597",
  hotlineRaw: "0364483597",
  address: "147 Phùng Quán, phường Thanh Thủy, TP Huế",
  facebookUrl: "https://www.facebook.com/quoc.tien.5811877?locale=vi_VN",
  zaloUrl: "REPLACE_WITH_AUTOSPA_ZALO_URL",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.4!2d107.5698!3d16.4637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a1276b726513%3A0x4f6d30e2f9c7a5a8!2s147%20Ph%C3%B9ng%20Qu%C3%A1n%2C%20Thanh%20Th%E1%BB%A7y%2C%20Hu%E1%BA%BF%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s",
  googleMapsDirectionUrl: "https://maps.app.goo.gl/e8ZZ1yZJSDCmLSs88",
  workingHours: {
    days: "Thứ 2 – Chủ nhật",
    hours: "07:30 – 18:00",
  },
} as const;

// ----------------------------------------------------------
// Social links — HUECARTOUR
// Trường isPlaceholder = true để render disabled state trong dev
// ----------------------------------------------------------
export const huecartourSocialLinks: SocialLink[] = [
  {
    platform: "facebook",
    label: "Facebook",
    url: huecartourContact.facebookUrl,
    isPlaceholder: true,
  },
  {
    platform: "zalo",
    label: "Zalo",
    url: huecartourContact.zaloUrl,
    isPlaceholder: true,
  },
  {
    platform: "messenger",
    label: "Messenger",
    url: huecartourContact.messengerUrl,
    isPlaceholder: true,
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    url: huecartourContact.whatsappUrl,
    isPlaceholder: true,
  },
];

// ----------------------------------------------------------
// Trust items — thanh cam kết trang chủ
// ----------------------------------------------------------
export const trustItems = [
  { label: "Báo giá rõ ràng", icon: "receipt" },
  { label: "Không phụ phí ẩn", icon: "shield-check" },
  { label: "Tài xế đúng giờ", icon: "clock" },
  { label: "Hỗ trợ nhanh", icon: "headset" },
] as const;

// ----------------------------------------------------------
// Global FAQ — Huecartour
// ----------------------------------------------------------
export const globalFaq = [
  {
    question: "Tôi có thể đặt xe trước bao lâu?",
    answer:
      "Bạn nên đặt xe ít nhất 24 giờ trước chuyến đi để đảm bảo có xe phù hợp. Với tour dài ngày hoặc nhóm lớn, nên đặt trước 2–3 ngày.",
  },
  {
    question: "Giá tour đã bao gồm phí tham quan chưa?",
    answer:
      "Giá tour bao gồm: xe, tài xế, xăng dầu, phí cầu đường và nước uống miễn phí. Vé tham quan tại các điểm đến chưa được bao gồm và do khách tự thanh toán.",
  },
  {
    question: "Xe có điều hòa không?",
    answer:
      "Tất cả xe trong đội đều có điều hòa, Wi-Fi và cổng sạc USB. Xe 7 chỗ và 16 chỗ phù hợp cho gia đình và nhóm đông.",
  },
  {
    question: "Tôi có thể thay đổi lịch trình không?",
    answer:
      "Có, bạn có thể điều chỉnh lịch trình linh hoạt với tài xế. Tuy nhiên, nếu thêm điểm tham quan hoặc quãng đường, phí phát sinh sẽ được tính thêm.",
  },
  {
    question: "Thanh toán như thế nào?",
    answer:
      "Chúng tôi nhận thanh toán tiền mặt sau chuyến đi. Không yêu cầu đặt cọc, không phụ phí ẩn. Giá đã thỏa thuận là giá cuối cùng.",
  },
  {
    question: "Có hỗ trợ tiếng Anh không?",
    answer:
      "Tài xế có thể giao tiếp cơ bản bằng tiếng Anh. Nếu cần thuyết minh viên nói tiếng Anh chuyên nghiệp, vui lòng đặt trước khi đặt xe.",
  },
] as const;
