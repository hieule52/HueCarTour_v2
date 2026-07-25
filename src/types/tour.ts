// ============================================================
// src/types/tour.ts
// Kiểu dữ liệu cho tour và dịch vụ xe
// ============================================================

import type { VehicleId } from "./vehicle";

/** Giá theo từng loại xe (VND, không có đơn vị) */
export type VehiclePricing = Partial<Record<VehicleId, number>>;

export interface TourStop {
  name: string;
  description?: string;
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  longDescription?: string;
  /** Thời gian ước tính, vd: "Cả ngày (8–10 giờ)" */
  duration: string;
  /** Điểm đón mặc định */
  pickupPoint: string;
  /** Danh sách điểm tham quan */
  stops: TourStop[];
  /** Giá theo loại xe (VND) */
  pricing: VehiclePricing;
  /** Những gì đã bao gồm trong giá */
  included: string[];
  /** Những gì chưa bao gồm */
  excluded: string[];
  /** Lưu ý về giá */
  priceNote?: string;
  /** Đường dẫn ảnh (relative to /public) */
  imageSrc: string;
  imageAlt: string;
  /** Tour nổi bật, hiển thị trên trang chủ */
  isFeatured: boolean;
  /** Thứ tự sắp xếp trong danh sách */
  order: number;
  /** Tags để lọc, vd: ["city-tour", "hue"] */
  tags: string[];
  /** Câu hỏi thường gặp riêng cho tour */
  faq?: TourFaq[];
  seo?: TourSeo;
}

export interface TourFaq {
  question: string;
  answer: string;
}

export interface TourSeo {
  title?: string;
  description?: string;
}

export interface AirportTransfer {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricing: VehiclePricing;
  imageSrc: string;
  imageAlt: string;
  isFeatured: boolean;
}
