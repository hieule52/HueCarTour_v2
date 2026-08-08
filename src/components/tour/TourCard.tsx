// ============================================================
// src/components/tour/TourCard.tsx
// Thẻ hiển thị thông tin Tour du lịch — High Contrast
// ============================================================

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { formatVnd } from "@/lib/currency";
import type { Tour } from "@/types/tour";

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  // Lấy giá thấp nhất (thường là xe 4 chỗ) để hiển thị kiểu "chỉ từ..."
  const minPrice = tour.pricing.car_4 || tour.pricing.car_7 || tour.pricing.car_16;

  // Lấy các điểm tham quan chính (tối đa 3 điểm) hiển thị tóm gọn
  const displayStops = tour.stops.slice(0, 3);

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Tránh kích hoạt Link bao ngoài
    // Lưu thông tin tour quan tâm vào localStorage để Form đặt xe tự động nạp
    localStorage.setItem("selected_tour_interest", tour.name);

    // Gửi event để Form đặt xe lắng nghe nếu đang ở cùng trang
    window.dispatchEvent(new Event("selected_tour_changed"));

    const formElement = document.getElementById("dat-xe");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#dat-xe";
    }
  };

  return (
    <Card className="flex flex-col h-full bg-white border border-[#E4E7EC] hover:shadow-md transition-shadow">
      <Link href={`/dich-vu-xe-du-lich/${tour.slug}`} className="flex flex-col h-full group">
        {/* Khu vực hình ảnh */}
        <div className="relative w-full aspect-[4/3] bg-[#F2F4F7] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 text-xs text-center p-4">
            <div className="flex flex-col items-center gap-1.5">
              <MapPin className="w-7 h-7 text-[#172236]/40" />
              <span className="font-semibold">{tour.shortName || tour.name}</span>
            </div>
          </div>
          <Image
            src={tour.imageSrc}
            alt={tour.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Badge nhãn lọc tag đầu tiên */}
          {tour.tags.length > 0 && (
            <Badge variant="primary" className="absolute top-3 left-3 font-bold uppercase tracking-wider text-[9px] bg-[#172236] text-white">
              {tour.tags[0] === "city-tour" ? "City Tour" : "Liên Tỉnh"}
            </Badge>
          )}
        </div>

        {/* Nội dung text */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-3">
            {/* Thời gian & Điểm đón */}
            <div className="flex items-center gap-3 text-xs text-[#475569] font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#172236] flex-shrink-0" />
                {tour.duration}
              </span>
            </div>

            {/* Tiêu đề dễ quét */}
            <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] group-hover:text-[#172236] transition-colors leading-snug line-clamp-2">
              {tour.name}
            </h3>

            {/* Mô tả ngắn */}
            <p className="text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed">
              {tour.description}
            </p>

            {/* Các điểm dừng tiêu biểu */}
            {displayStops.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {displayStops.map((stop, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[10px] font-semibold text-[#1E293B] bg-[#F1F5F9] px-2 py-0.5 rounded-custom-sm border border-[#CBD5E1]"
                  >
                    {stop.name}
                  </span>
                ))}
                {tour.stops.length > 3 && (
                  <span className="text-[10px] text-[#475569] font-medium self-center pl-1">
                    +{tour.stops.length - 3} điểm nữa
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bảng giá và Nút thao tác */}
          <div className="space-y-3.5 pt-3 border-t border-[#E4E7EC]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#475569] font-medium">Giá xe riêng từ:</span>
              <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
                {minPrice ? formatVnd(minPrice) : "Liên hệ"}
              </span>
            </div>

            {/* 2 Nút CTA theo tiêu chuẩn */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold h-9 border-[#0F172A]/30 text-[#0F172A] hover:bg-[#172236] hover:text-white hover:border-[#172236] transition-all duration-200"
                onClick={handleQuoteClick}
              >
                Nhận báo giá
              </Button>
              <div className="w-full">
                <Button
                  className="w-full text-xs font-bold h-9 flex items-center justify-center gap-1 bg-[#172236] text-white hover:bg-[#0F172A]"
                >
                  Chi tiết
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
