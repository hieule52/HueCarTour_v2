// ============================================================
// src/data/site.ts
// Cấu hình toàn cục website — Nguồn sự thật duy nhất
// Thương hiệu chính: TIẾN QUỐC AUTO SPA
// Thương hiệu phụ: HUECARTOUR (dịch vụ xe du lịch bổ sung)
// ============================================================

import type { SiteConfig, NavigationItem, SocialLink } from "@/types/site";

// ----------------------------------------------------------
// Site metadata — TIẾN QUỐC AUTO SPA là thương hiệu chính
// ----------------------------------------------------------
export const siteConfig: SiteConfig = {
  name: "tienquocautospa",
  displayName: "Tiến Quốc Auto Spa",
  slogan: "Xe đẹp hơn - Bền lâu hơn - An tâm trên mọi hành trình",
  description:
    "Tiến Quốc Auto Spa cung cấp dịch vụ bảo dưỡng, sửa chữa, vệ sinh nội thất, đánh bóng, phủ ceramic và chăm sóc ô tô tại Huế. Liên hệ 036 448 3597 để được kiểm tra và tư vấn.",
  url: "https://huecartours.com",
  locale: "vi_VN",
  ogImage: "/assets/images/seo/tien-quoc-auto-spa-og.webp",
};

// ----------------------------------------------------------
// Navigation chính — ưu tiên Auto Spa
// "Xe du lịch" = entry point vào HUECARTOUR (không phải /tours cũ)
// ----------------------------------------------------------
export const mainNav: NavigationItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Quy trình", href: "/#quy-trinh" },
  { label: "Đặt lịch", href: "/#dat-lich" },
  { label: "Xe du lịch", href: "/dich-vu-xe-du-lich" },
  { label: "Liên hệ", href: "/lien-he" },
];

// ----------------------------------------------------------
// Tiến Quốc Auto Spa — thông tin liên hệ chính
// ----------------------------------------------------------
export const autospaContact = {
  hotlineDisplay: "036 448 3597",
  hotlineRaw: "0364483597",
  contactName: "Tiến Quốc Auto Spa",
  address: "147 Phùng Quán, phường Thanh Thủy, TP Huế",
  facebookUrl: "https://www.facebook.com/quoc.tien.5811877?locale=vi_VN",
  zaloUrl: "REPLACE_WITH_AUTOSPA_ZALO_URL",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.4!2d107.5698!3d16.4637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a1276b726513%3A0x4f6d30e2f9c7a5a8!2s147%20Ph%C3%B9ng%20Qu%C3%A1n%2C%20Thanh%20Th%E1%BB%A7y%2C%20Hu%E1%BA%BF%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s",
  googleMapsDirectionUrl: "https://maps.app.goo.gl/e8ZZ1yZJSDCmLSs88",
  workingHours: {
    days: "Tất cả các ngày trong tuần",
    hours: "07:30 – 18:00",
  },
} as const;

// ----------------------------------------------------------
// HUECARTOUR — thông tin liên hệ dịch vụ xe du lịch phụ
// ⚠️ Thay thế REPLACE_WITH_... trước khi go-live
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
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.4!2d107.5698!3d16.4637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a1276b726513%3A0x4f6d30e2f9c7a5a8!2s147%20Ph%C3%B9ng%20Qu%C3%A1n%2C%20Thanh%20Th%E1%BB%A7y%2C%20Hu%E1%BA%BF%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s",
  googleMapsDirectionUrl: "https://maps.app.goo.gl/e8ZZ1yZJSDCmLSs88",
} as const;

// ----------------------------------------------------------
// Social links — Auto Spa (thương hiệu chính)
// ----------------------------------------------------------
export const autospaSocialLinks: SocialLink[] = [
  {
    platform: "facebook",
    label: "Facebook Tiến Quốc Auto Spa",
    url: autospaContact.facebookUrl,
    isPlaceholder: false,
  },
  {
    platform: "zalo",
    label: "Zalo Auto Spa",
    url: autospaContact.zaloUrl,
    isPlaceholder: true,
  },
];

// ----------------------------------------------------------
// Social links — HUECARTOUR (dịch vụ phụ)
// ----------------------------------------------------------
export const huecartourSocialLinks: SocialLink[] = [
  {
    platform: "facebook",
    label: "Facebook",
    url: huecartourContact.facebookUrl,
    isPlaceholder: false,
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
    isPlaceholder: false,
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    url: huecartourContact.whatsappUrl,
    isPlaceholder: true,
  },
];

// ----------------------------------------------------------
// Trust items — trang chủ Auto Spa
// ----------------------------------------------------------
export const trustItems = [
  {
    label: "Kỹ thuật viên chuyên nghiệp",
    subLabel: "Được đào tạo bài bản",
    icon: "user-check",
  },
  {
    label: "Quy trình minh bạch",
    subLabel: "Kiểm tra trước khi báo giá",
    icon: "clipboard-check",
  },
  {
    label: "07:30 – 18:00",
    subLabel: "Mở cửa tất cả các ngày",
    icon: "clock",
  },
  {
    label: "Tư vấn theo nhu cầu",
    subLabel: "Không ép mua dịch vụ",
    icon: "headset",
  },
] as const;

// ----------------------------------------------------------
// Global FAQ — Auto Spa (trang chủ)
// ----------------------------------------------------------
export const globalFaq = [
  {
    question: "Tiến Quốc Auto Spa cung cấp những dịch vụ nào?",
    answer:
      "Chúng tôi cung cấp đầy đủ dịch vụ chăm sóc ô tô: rửa xe chi tiết, vệ sinh nội thất, vệ sinh khoang máy, đánh bóng sơn, phủ ceramic, dán phim cách nhiệt, phủ gầm và nâng cấp đèn LED. Liên hệ để được tư vấn phù hợp với xe của bạn.",
  },
  {
    question: "Làm thế nào để đặt lịch tại Tiến Quốc Auto Spa?",
    answer:
      "Bạn có thể đặt lịch qua form trên website, gọi hotline 036 448 3597 hoặc nhắn Zalo. Chúng tôi sẽ xác nhận lịch hẹn và tư vấn dịch vụ phù hợp với tình trạng xe của bạn.",
  },
  {
    question: "Thời gian thực hiện mỗi dịch vụ là bao lâu?",
    answer:
      "Tùy loại dịch vụ: rửa xe chi tiết 1–2 giờ, vệ sinh nội thất 2–4 giờ, đánh bóng sơn nửa ngày đến 1 ngày, phủ ceramic 1–2 ngày. Chúng tôi sẽ thông báo thời gian dự kiến khi nhận xe.",
  },
  {
    question: "Giá dịch vụ có cố định không?",
    answer:
      "Giá phụ thuộc vào tình trạng xe, dòng xe và gói dịch vụ chọn. Chúng tôi kiểm tra xe trực tiếp và báo giá trước khi thực hiện. Không phát sinh chi phí ngoài giá đã thống nhất.",
  },
  {
    question: "Xe của tôi có cần đặt lịch trước không?",
    answer:
      "Nên đặt lịch trước để đảm bảo có chỗ và thời gian phục vụ tốt nhất. Với xe cần dịch vụ nhanh, bạn có thể gọi trực tiếp để kiểm tra tình trạng chỗ trong ngày.",
  },
  {
    question: "Tiến Quốc Auto Spa có dịch vụ xe du lịch không?",
    answer:
      "Có. Ngoài dịch vụ chăm sóc xe, chúng tôi còn cung cấp dịch vụ xe du lịch tại Huế qua HUECARTOUR – bao gồm xe riêng theo tuyến, đưa đón sân bay Phú Bài và các tour tham quan. Xem chi tiết tại trang Xe du lịch.",
  },
] as const;
