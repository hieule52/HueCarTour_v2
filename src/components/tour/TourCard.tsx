// ============================================================
// src/components/tour/TourCard.tsx
// Thẻ hiển thị thông tin Tour du lịch
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
    
    // Gửi event để Form đặt xe lắng nghe nếu đang ở cùng trang chủ
    window.dispatchEvent(new Event("selected_tour_changed"));

    const formElement = document.getElementById("dat-xe");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#dat-xe";
    }
  };

  return (
    <Card className="flex flex-col h-full bg-bg-surface hover:shadow-custom-md">
      <Link href={`/dich-vu-xe-du-lich/${tour.slug}`} className="flex flex-col h-full group">
        {/* Khu vực hình ảnh */}
        <div className="relative w-full aspect-[4/3] bg-bg-surface-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-text-secondary/50 text-xs text-center p-4">
            <div className="flex flex-col items-center gap-1.5">
              <MapPin className="w-7 h-7 text-primary/30" />
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
            <Badge variant="primary" className="absolute top-3 left-3 font-semibold uppercase tracking-wider text-[9px]">
              {tour.tags[0] === "city-tour" ? "City Tour" : "Liên Tỉnh"}
            </Badge>
          )}
        </div>

        {/* Nội dung text */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-3">
            {/* Thời gian & Điểm đón */}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {tour.duration}
              </span>
            </div>

            {/* Tiêu đề dễ quét */}
            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {tour.name}
            </h3>

            {/* Mô tả ngắn */}
            <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">
              {tour.description}
            </p>

            {/* Các điểm dừng tiêu biểu */}
            {displayStops.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {displayStops.map((stop, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[10px] font-semibold text-text-primary bg-bg-surface-muted px-2 py-0.5 rounded-custom-sm border border-border-custom/50"
                  >
                    {stop.name}
                  </span>
                ))}
                {tour.stops.length > 3 && (
                  <span className="text-[10px] text-text-secondary font-medium self-center pl-1">
                    +{tour.stops.length - 3} điểm nữa
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bảng giá và Nút thao tác */}
          <div className="space-y-3.5 pt-3 border-t border-border-custom">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-text-secondary">Giá xe riêng từ:</span>
              <span className="text-base sm:text-lg font-extrabold text-primary">
                {minPrice ? formatVnd(minPrice) : "Liên hệ"}
              </span>
            </div>

            {/* 2 Nút CTA theo tiêu chuẩn */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold h-9 hover:bg-secondary hover:text-text-on-secondary hover:border-secondary transition-all duration-200"
                onClick={handleQuoteClick}
              >
                Nhận báo giá
              </Button>
              <div className="w-full">
                {/* Nút chính dẫn trực tiếp vào trang chi tiết */}
                <Button
                  className="w-full text-xs font-bold h-9 flex items-center justify-center gap-1"
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
