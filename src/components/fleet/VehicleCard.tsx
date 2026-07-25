// ============================================================
// src/components/fleet/VehicleCard.tsx
// Thẻ hiển thị thông tin từng dòng xe (4, 7, 16 chỗ)
// ============================================================

"use client";

import React from "react";
import Image from "next/image";
import { Users, Briefcase, Snowflake, Wifi, Usb, Droplet } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import type { Vehicle, VehicleAmenity } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelectVehicle?: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelectVehicle,
}) => {
  const isPopular = vehicle.id === "car_4";

  const renderAmenityIcon = (amenity: VehicleAmenity) => {
    switch (amenity) {
      case "ac":
        return <Snowflake className="w-4 h-4 text-sky-500" />;
      case "wifi":
        return <Wifi className="w-4 h-4 text-blue-500" />;
      case "usb":
        return <Usb className="w-4 h-4 text-amber-500" />;
      case "water":
        return <Droplet className="w-4 h-4 text-indigo-500" />;
      default:
        return null;
    }
  };

  const handleQuoteClick = () => {
    if (onSelectVehicle) {
      onSelectVehicle(vehicle.id);
    }
    // Cuộn mượt đến phần form đặt xe
    const formElement = document.getElementById("dat-xe");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card className="flex flex-col h-full bg-bg-surface hover:shadow-custom-md">
      {/* Container Ảnh tỉ lệ vàng 16:10 */}
      <div className="relative w-full aspect-[16/10] bg-bg-surface-muted overflow-hidden">
        {/* Lớp nền placeholder trong khi chưa tải được ảnh thực tế */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-text-secondary/50 text-xs text-center p-4">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-primary/30" />
            <span>Hình ảnh {vehicle.name}</span>
          </div>
        </div>
        
        {/* Để tránh hiển thị ảnh lỗi (broken image) khi go-live, chỉ render Next.js Image nếu ảnh thật tồn tại */}
        <Image
          src={vehicle.imageSrc}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // Ẩn ảnh bị lỗi nếu chưa nạp được asset thật
            e.currentTarget.style.display = "none";
          }}
        />

        {isPopular && (
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 shadow-custom-sm font-bold"
          >
            Phổ biến nhất
          </Badge>
        )}
      </div>

      {/* Thông tin chi tiết */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{vehicle.name}</h3>
              <p className="text-xs text-text-secondary">{vehicle.type}</p>
            </div>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
            {vehicle.description}
          </p>

          {/* Quy cách số lượng hành khách, hành lý */}
          <div className="grid grid-cols-2 gap-3 py-2.5 border-y border-border-custom text-xs">
            <div className="flex items-center gap-2 text-text-secondary">
              <Users className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Tối đa {vehicle.maxPassengers} khách</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{vehicle.maxLuggage} kiện hành lý</span>
            </div>
          </div>

          {/* Tiện nghi kèm theo */}
          <div>
            <h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
              Tiện ích đi kèm
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {vehicle.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1.5 text-xs text-text-primary bg-bg-surface-muted/60 px-2 py-1 rounded-custom-sm border border-border-custom/50"
                  title={vehicle.amenityLabels[amenity]}
                >
                  {renderAmenityIcon(amenity)}
                  <span>{vehicle.amenityLabels[amenity]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full text-xs font-bold mt-2 hover:bg-secondary hover:text-text-on-secondary hover:border-secondary transition-all duration-200"
          onClick={handleQuoteClick}
        >
          Nhận báo giá ngay
        </Button>
      </div>
    </Card>
  );
};
