// ============================================================
// src/components/booking/BookingForm.tsx
// Biểu mẫu đặt xe du lịch / yêu cầu báo giá chuyên nghiệp
// ============================================================

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Phone, MapPin, Users, Info, Copy, Check, Send, Car } from "lucide-react";
import { bookingFormSchema, type BookingFormData } from "@/schemas/booking.schema";
import { vehicles } from "@/data/huecartour";
import { huecartourContact } from "@/data/site";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

export const BookingForm: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    messageText: string;
    whatsappUrl: string | null;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      pickupPoint: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
      time: "08:00",
      vehicleType: "car_4",
      passengers: 1,
      tourInterest: "",
      note: "",
      email: "", // Honeypot field
    },
  });

  // Theo dõi loại xe đã chọn để gợi ý số lượng hành khách tương ứng
  const selectedVehicle = watch("vehicleType");

  useEffect(() => {
    // Tự động đồng bộ số hành khách tối đa gợi ý khi đổi xe
    const veh = vehicles.find((v) => v.id === selectedVehicle);
    if (veh) {
      setValue("passengers", veh.maxPassengers);
    }
  }, [selectedVehicle, setValue]);

  // Đọc tour quan tâm từ localStorage nếu khách bấm "Nhận báo giá" từ card
  useEffect(() => {
    const handleTourChange = () => {
      const selectedTour = localStorage.getItem("selected_tour_interest");
      if (selectedTour) {
        setValue("tourInterest", selectedTour);
        setValue("destination", selectedTour); // Đặt luôn điểm đến là tên tour
        localStorage.removeItem("selected_tour_interest");
      }
    };

    handleTourChange(); // Kiểm tra ngay khi mount
    window.addEventListener("selected_tour_changed", handleTourChange);
    return () => {
      window.removeEventListener("selected_tour_changed", handleTourChange);
    };
  }, [setValue]);

  const onSubmit = async (data: BookingFormData) => {
    setApiError(null);
    setSuccessData(null);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
      }

      // Xử lý thành công
      setSuccessData({
        messageText: result.messageText,
        whatsappUrl: result.whatsappUrl,
      });
      reset(); // Xóa sạch dữ liệu form sau khi submit thành công
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Đã xảy ra lỗi kết nối hệ thống.";
      setApiError(errMsg);
    }
  };

  const copyToClipboard = () => {
    if (successData?.messageText) {
      navigator.clipboard.writeText(successData.messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full bg-bg-surface border border-border-custom rounded-custom-lg shadow-custom-sm p-6 sm:p-8" id="dat-xe-form">
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center">
        Yêu Cầu Báo Giá & Đặt Xe Du Lịch
      </h3>

      <div aria-live="polite">
        {apiError && (
          <div className="mb-6 p-4 rounded-custom-md bg-state-error/10 border border-state-error/20 text-state-error text-sm flex gap-2.5">
            <Info className="w-5 h-5 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}
      </div>

      {successData ? (
        // UI Hiển thị kết quả thành công & Hướng dẫn chuyển đổi gửi Zalo/WhatsApp
        <div className="space-y-6" aria-live="polite">
          <div className="p-4 rounded-custom-md bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm flex gap-2.5">
            <Info className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-bold mb-1">Yêu cầu đã được khởi tạo thành công!</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Nội dung chi tiết lịch trình của bạn đã được tạo sẵn bên dưới. Hãy chọn gửi qua WhatsApp hoặc Sao chép để gửi qua Zalo cho nhà xe để nhận báo giá tức thì.
              </p>
            </div>
          </div>

          {/* Hộp chứa tin nhắn mẫu */}
          <div className="relative p-4 rounded-custom-md border border-border-custom bg-bg-surface-muted text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
            {successData.messageText}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {successData.whatsappUrl ? (
              <a
                href={successData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-custom-md bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors focus-visible:outline-2"
              >
                <Send className="w-4 h-4" />
                Gửi qua WhatsApp
              </a>
            ) : (
              <Button disabled variant="outline" className="text-sm font-bold">
                WhatsApp chưa cấu hình
              </Button>
            )}

            <Button
              onClick={copyToClipboard}
              variant="secondary"
              className="text-sm font-bold flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã sao chép!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao chép gửi Zalo
                </>
              )}
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-text-secondary">
              Hoặc bạn có thể gọi hotline trực tiếp để báo giá nhanh:{" "}
              <a
                href={`tel:${huecartourContact.hotlineRaw}`}
                className="font-bold text-primary hover:underline"
              >
                {huecartourContact.hotlineDisplay}
              </a>
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => setSuccessData(null)}
            >
              Tạo yêu cầu mới
            </Button>
          </div>
        </div>
      ) : (
        // Form nhập liệu
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot field (hidden from view) */}
          <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("email")}
            />
          </div>

          {/* Họ tên & Số điện thoại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                Họ và tên <span className="text-state-error">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.fullName ? "border-state-error" : "border-border-custom"
                )}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-[11px] font-semibold text-state-error">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-primary" />
                Số điện thoại / Zalo <span className="text-state-error">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ví dụ: 0905123456"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.phone ? "border-state-error" : "border-border-custom"
                )}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-state-error">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Điểm đón & Điểm đến */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="pickupPoint" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                Điểm đón <span className="text-state-error">*</span>
              </label>
              <input
                id="pickupPoint"
                type="text"
                placeholder="Ví dụ: Khách sạn hoặc Sân bay Phú Bài"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.pickupPoint ? "border-state-error" : "border-border-custom"
                )}
                {...register("pickupPoint")}
              />
              {errors.pickupPoint && (
                <p className="text-[11px] font-semibold text-state-error">{errors.pickupPoint.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="destination" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                Điểm đến / Lộ trình <span className="text-state-error">*</span>
              </label>
              <input
                id="destination"
                type="text"
                placeholder="Ví dụ: Đà Nẵng, Lăng Cô hoặc City Tour"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.destination ? "border-state-error" : "border-border-custom"
                )}
                {...register("destination")}
              />
              {errors.destination && (
                <p className="text-[11px] font-semibold text-state-error">{errors.destination.message}</p>
              )}
            </div>
          </div>

          {/* Ngày đi & Giờ đón */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="date" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Ngày đi <span className="text-state-error">*</span>
              </label>
              <input
                id="date"
                type="date"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.date ? "border-state-error" : "border-border-custom"
                )}
                {...register("date")}
              />
              {errors.date && (
                <p className="text-[11px] font-semibold text-state-error">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="time" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Giờ đón <span className="text-state-error">*</span>
              </label>
              <input
                id="time"
                type="time"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.time ? "border-state-error" : "border-border-custom"
                )}
                {...register("time")}
              />
              {errors.time && (
                <p className="text-[11px] font-semibold text-state-error">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Loại xe & Số hành khách */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="vehicleType" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Car className="w-4 h-4 text-primary" />
                Loại xe yêu cầu <span className="text-state-error">*</span>
              </label>
              <select
                id="vehicleType"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.vehicleType ? "border-state-error" : "border-border-custom"
                )}
                {...register("vehicleType")}
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.type})
                  </option>
                ))}
              </select>
              {errors.vehicleType && (
                <p className="text-[11px] font-semibold text-state-error">{errors.vehicleType.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="passengers" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                Số hành khách <span className="text-state-error">*</span>
              </label>
              <input
                id="passengers"
                type="number"
                min={1}
                max={50}
                placeholder="Số người đi xe"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.passengers ? "border-state-error" : "border-border-custom"
                )}
                {...register("passengers", { valueAsNumber: true })}
              />
              {errors.passengers && (
                <p className="text-[11px] font-semibold text-state-error">{errors.passengers.message}</p>
              )}
            </div>
          </div>

          {/* Tour quan tâm (Không bắt buộc) */}
          <div className="space-y-1.5">
            <label htmlFor="tourInterest" className="text-xs sm:text-sm font-bold text-text-primary">
              Tour bạn quan tâm (nếu có)
            </label>
            <input
              id="tourInterest"
              type="text"
              placeholder="Ví dụ: Huế City Tour 3 Điểm"
              className={cn(
                "w-full h-11 px-3.5 border border-border-custom rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none"
              )}
              {...register("tourInterest")}
            />
          </div>

          {/* Ghi chú thêm */}
          <div className="space-y-1.5">
            <label htmlFor="note" className="text-xs sm:text-sm font-bold text-text-primary">
              Ghi chú lịch trình hoặc yêu cầu riêng
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder="Ví dụ: Có em bé đi cùng, cần ghế trẻ em, hoặc đón lúc sáng sớm..."
              className={cn(
                "w-full p-3.5 border border-border-custom rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none resize-none"
              )}
              {...register("note")}
            />
            {errors.note && (
              <p className="text-[11px] font-semibold text-state-error">{errors.note.message}</p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full font-bold h-12 text-sm sm:text-base mt-2"
          >
            Tạo nội dung đặt xe & Nhận báo giá
          </Button>
        </form>
      )}
    </div>
  );
};
