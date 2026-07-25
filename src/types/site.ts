// ============================================================
// src/types/site.ts
// Kiểu dữ liệu dùng chung cho toàn bộ website
// ============================================================

export interface SiteConfig {
  name: string;
  displayName: string;
  slogan: string;
  description: string;
  url: string;
  locale: string;
  /** OG image path (relative to /public) */
  ogImage: string;
}

export interface ContactInfo {
  /** Hotline hiển thị cho người dùng, vd: "0566 075 075" */
  hotlineDisplay: string;
  /** Số điện thoại thô để tạo tel: link, vd: "0566075075" */
  hotlineRaw: string;
  email: string;
  address: string;
  /** Placeholder nếu chưa có URL: "REPLACE_WITH_..." */
  facebookUrl: string;
  zaloUrl: string;
  messengerUrl: string;
  whatsappUrl: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionUrl: string;
}

export interface WorkingHours {
  days: string;   // vd: "Thứ 2 - Chủ nhật"
  hours: string;  // vd: "07:30 - 18:00"
}

export type NavigationItem = {
  label: string;
  href: string;
  /** Có mở tab mới không */
  external?: boolean;
};

export type SocialLink = {
  platform: "facebook" | "zalo" | "messenger" | "whatsapp" | "youtube" | "tiktok";
  label: string;
  url: string;
  /** true nếu URL chưa được cung cấp (placeholder) */
  isPlaceholder?: boolean;
};
