// ============================================================
// src/types/vehicle.ts
// Kiểu dữ liệu cho đội xe
// ============================================================

export type VehicleId = "car_4" | "car_7" | "car_16";

export type VehicleAmenity =
  | "ac"
  | "wifi"
  | "usb"
  | "water"
  | "newspaper"
  | "childSeat";

export interface Vehicle {
  id: VehicleId;
  name: string;
  /** Loại xe, vd: "Sedan / SUV nhỏ" */
  type: string;
  seats: number;
  /** Số hành khách tối đa (= seats - 1 cho tài xế) */
  maxPassengers: number;
  /** Số kiện hành lý */
  maxLuggage: number;
  amenities: VehicleAmenity[];
  /** Nhãn tiện ích đọc được */
  amenityLabels: Record<VehicleAmenity, string>;
  /** Đường dẫn ảnh (relative to /public) */
  imageSrc: string;
  imageAlt: string;
  isFeatured?: boolean;
  /** Mô tả ngắn */
  description: string;
}
