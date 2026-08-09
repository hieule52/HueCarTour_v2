// ============================================================
// src/components/tour/TourCard.tsx
// Thẻ hiển thị thông tin Tour du lịch — Theme-aware (Auto Spa & Car Tour Sync)
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
  const minPrice = tour.pricing.car_4 || tour.pricing.car_7 || tour.pricing.car_16;
  const displayStops = tour.stops.slice(0, 3);

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("selected_tour_interest", tour.name);
    window.dispatchEvent(new Event("selected_tour_changed"));

    const formElement = document.getElementById("dat-xe");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#dat-xe";
    }
  };

  return (
    <Card className="flex flex-col h-full bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 hover:border-[#0EA5E9] dark:hover:border-[#38BDF8] transition-all duration-200">
      <Link href={`/dich-vu-xe-du-lich/${tour.slug}`} className="flex flex-col h-full group">
        {/* Khu vực hình ảnh */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-[#07101F] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs text-center p-4">
            <div className="flex flex-col items-center gap-1.5">
              <MapPin className="w-7 h-7 opacity-40 text-[#0EA5E9] dark:text-[#38BDF8]" />
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

          {/* Badge tag */}
          {tour.tags.length > 0 && (
            <Badge variant="primary" className="absolute top-3 left-3 font-bold uppercase tracking-wider text-[9px] bg-[#0F172A] dark:bg-[#1E293B] text-white dark:text-[#38BDF8] border border-transparent dark:border-slate-700">
              {tour.tags[0] === "city-tour" ? "City Tour" : "Liên Tỉnh"}
            </Badge>
          )}
        </div>

        {/* Nội dung text */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-3">
            {/* Thời gian */}
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#0EA5E9] dark:text-[#38BDF8] flex-shrink-0" />
                {tour.duration}
              </span>
            </div>

            {/* Tiêu đề */}
            <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#0EA5E9] dark:group-hover:text-[#38BDF8] transition-colors leading-snug line-clamp-2">
              {tour.name}
            </h3>

            {/* Mô tả ngắn */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] line-clamp-2 leading-relaxed">
              {tour.description}
            </p>

            {/* Điểm dừng */}
            {displayStops.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {displayStops.map((stop, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[10px] font-semibold text-slate-700 dark:text-[#CBD5E1] bg-slate-100 dark:bg-[#07101F] px-2 py-0.5 rounded-custom-sm border border-slate-200 dark:border-slate-800"
                  >
                    {stop.name}
                  </span>
                ))}
                {tour.stops.length > 3 && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium self-center pl-1">
                    +{tour.stops.length - 3} điểm nữa
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bảng giá và Nút thao tác */}
          <div className="space-y-3.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Giá xe riêng từ:</span>
              <span className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-[#38BDF8]">
                {minPrice ? formatVnd(minPrice) : "Liên hệ"}
              </span>
            </div>

            {/* 2 Nút CTA */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold h-9 border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#0EA5E9] dark:hover:bg-[#38BDF8] hover:text-white dark:hover:text-[#020617] hover:border-[#0EA5E9] dark:hover:border-[#38BDF8] transition-all duration-200"
                onClick={handleQuoteClick}
              >
                Nhận báo giá
              </Button>
              <div className="w-full">
                <Button
                  className="w-full text-xs font-bold h-9 flex items-center justify-center gap-1 bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#020617] hover:bg-[#0284C7] dark:hover:bg-[#60A5FA]"
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
