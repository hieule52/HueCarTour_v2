// ============================================================
// src/components/booking/BookingForm.tsx
// Biểu mẫu đặt xe du lịch / yêu cầu báo giá chuyên nghiệp — High Contrast
// ============================================================

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Phone, MapPin, Users, AlertCircle, Car } from "lucide-react";
import { bookingFormSchema, type BookingFormData } from "@/schemas/booking.schema";
import { vehicles } from "@/data/huecartour";
import { Button } from "../common/Button";
import { SuccessMessage } from "../common/SuccessMessage";
import { cn } from "@/lib/utils";

export const BookingForm: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
      website_url: "", // Honeypot field (tránh Chrome Autofill tự điền)
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
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp Tiến Quốc Auto Spa."
        );
      }

      // Chỉ chuyển sang success state khi email đã thực sự gửi thành công
      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      // Khi thất bại: Giữ nguyên toàn bộ dữ liệu khách đã nhập, không reset form
      const errMsg =
        err instanceof Error
          ? err.message
          : "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp Tiến Quốc Auto Spa.";
      setApiError(errMsg);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    reset();
    const el = document.getElementById("dat-xe-form");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="w-full bg-white border border-[#CBD5E1] rounded-custom-lg shadow-sm p-6 sm:p-8"
      id="dat-xe-form"
    >
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-6 text-center">
        Yêu Cầu Báo Giá & Đặt Xe Du Lịch
      </h3>

      <div aria-live="polite">
        {apiError && (
          <div className="mb-6 p-4 rounded-custom-md bg-red-50 border border-red-200 text-red-700 text-sm flex gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            <span>{apiError}</span>
          </div>
        )}
      </div>

      {isSuccess ? (
        <SuccessMessage
          actionLabel="Tạo yêu cầu mới"
          onReset={handleResetForm}
        />
      ) : (
        // Form nhập liệu
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot field (hidden from view) */}
          <div
            className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website_url_booking">Website</label>
            <input
              id="website_url_booking"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website_url")}
            />
          </div>

          {/* Họ tên & Số điện thoại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#172236]" />
                Họ và tên <span className="text-red-600">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.fullName ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#172236]" />
                Số điện thoại / Zalo <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ví dụ: 0905123456"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.phone ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Điểm đón & Điểm đến */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="pickupPoint"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#172236]" />
                Điểm đón <span className="text-red-600">*</span>
              </label>
              <input
                id="pickupPoint"
                type="text"
                placeholder="Ví dụ: Khách sạn hoặc Sân bay Phú Bài"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.pickupPoint ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("pickupPoint")}
              />
              {errors.pickupPoint && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.pickupPoint.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="destination"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#172236]" />
                Điểm đến / Lộ trình <span className="text-red-600">*</span>
              </label>
              <input
                id="destination"
                type="text"
                placeholder="Ví dụ: Đà Nẵng, Lăng Cô hoặc City Tour"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.destination ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("destination")}
              />
              {errors.destination && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.destination.message}
                </p>
              )}
            </div>
          </div>

          {/* Ngày đi & Giờ đón */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="date"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-[#172236]" />
                Ngày đi <span className="text-red-600">*</span>
              </label>
              <input
                id="date"
                type="date"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.date ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("date")}
              />
              {errors.date && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="time"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4 text-[#172236]" />
                Giờ đón <span className="text-red-600">*</span>
              </label>
              <input
                id="time"
                type="time"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.time ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("time")}
              />
              {errors.time && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* Loại xe & Số hành khách */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="vehicleType"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <Car className="w-4 h-4 text-[#172236]" />
                Loại xe yêu cầu <span className="text-red-600">*</span>
              </label>
              <select
                id="vehicleType"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] border-[#CBD5E1] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
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
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.vehicleType.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="passengers"
                className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-[#172236]" />
                Số hành khách <span className="text-red-600">*</span>
              </label>
              <input
                id="passengers"
                type="number"
                min={1}
                max={50}
                placeholder="Số người đi xe"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]",
                  errors.passengers ? "border-red-500" : "border-[#CBD5E1]"
                )}
                {...register("passengers", { valueAsNumber: true })}
              />
              {errors.passengers && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.passengers.message}
                </p>
              )}
            </div>
          </div>

          {/* Tour quan tâm (Không bắt buộc) */}
          <div className="space-y-1.5">
            <label
              htmlFor="tourInterest"
              className="text-xs sm:text-sm font-bold text-[#0F172A]"
            >
              Tour bạn quan tâm (nếu có)
            </label>
            <input
              id="tourInterest"
              type="text"
              placeholder="Ví dụ: Huế City Tour 3 Điểm"
              className="w-full h-11 px-3.5 border border-[#CBD5E1] rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none"
              {...register("tourInterest")}
            />
          </div>

          {/* Ghi chú thêm */}
          <div className="space-y-1.5">
            <label
              htmlFor="note"
              className="text-xs sm:text-sm font-bold text-[#0F172A]"
            >
              Ghi chú lịch trình hoặc yêu cầu riêng
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder="Ví dụ: Có em bé đi cùng, cần ghế trẻ em, hoặc đón lúc sáng sớm..."
              className="w-full p-3.5 border border-[#CBD5E1] rounded-custom-md text-sm bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F172A] focus:outline-none resize-none"
              {...register("note")}
            />
            {errors.note && (
              <p className="text-[11px] font-semibold text-red-600">
                {errors.note.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full font-bold h-12 text-sm sm:text-base mt-2 bg-[#172236] text-white hover:bg-[#0F172A] disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi yêu cầu..." : "Tạo nội dung đặt xe & Nhận báo giá"}
          </Button>
        </form>
      )}
    </div>
  );
};
