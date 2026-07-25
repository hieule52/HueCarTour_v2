// ============================================================
// src/types/autospa.ts
// Kiểu dữ liệu cho Tiến Quốc Auto Spa
// ============================================================

export interface AutoSpaService {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  /** Đường dẫn ảnh (relative to /public) */
  imageSrc: string;
  imageAlt: string;
  /** Tên icon từ lucide-react */
  iconName: string;
  /** Danh sách các hạng mục dịch vụ */
  items: string[];
  /** Nhãn giá hiển thị, vd: "Liên hệ báo giá" */
  priceLabel: string;
  /** Hiển thị nổi bật */
  featured: boolean;
  /** Thứ tự hiển thị */
  order: number;
}

export interface AutoSpaProcessStep {
  step: number;
  title: string;
  description: string;
  /** Tên icon từ lucide-react */
  iconName: string;
}

export interface AutoSpaWhyItem {
  title: string;
  description: string;
  iconName: string;
}

export interface AutoSpaFaq {
  question: string;
  answer: string;
}

export interface AutoSpaPackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  priceLabel: string;
  isPopular?: boolean;
}
