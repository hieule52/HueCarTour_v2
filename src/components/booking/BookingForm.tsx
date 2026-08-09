// ============================================================
// src/components/booking/BookingForm.tsx
// Biểu mẫu đặt xe du lịch — Theme-aware (Auto Spa & Car Tour Sync)
// ============================================================

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Car,
  MapPin,
  Users,
  AlertCircle,
} from "lucide-react";
import { bookingFormSchema, type BookingFormData } from "@/schemas/booking.schema";
import { tours, vehicles } from "@/data/huecartour";
import { Button } from "../common/Button";
import { SuccessMessage } from "../common/SuccessMessage";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const tourOptions = tours.map((t) => t.name);

export const BookingForm: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isDark } = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
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
      vehicleType: vehicles[0]?.name || "Xe 4 chỗ",
      passengers: 2,
      tourInterest: tourOptions[0] || "",
      note: "",
      website_url: "",
    },
  });

  useEffect(() => {
    const handleTourChange = () => {
      const savedTour = localStorage.getItem("selected_tour_interest");
      if (savedTour && tourOptions.includes(savedTour)) {
        setValue("tourInterest", savedTour);
      }
    };

    handleTourChange();
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

      setIsSuccess(true);
      reset();
      localStorage.removeItem("selected_tour_interest");
    } catch (err: unknown) {
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
      className={cn(
        "w-full border rounded-custom-lg shadow-xl p-6 sm:p-8 transition-colors duration-300",
        isDark
          ? "bg-[#0E1726] border-slate-800"
          : "bg-white border-gray-200"
      )}
      id="dat-xe-form"
    >
      <h3
        className={cn(
          "text-xl sm:text-2xl font-extrabold mb-6 text-center",
          isDark ? "text-[#F8FAFC]" : "text-gray-900"
        )}
      >
        Yêu Cầu Báo Giá & Đặt Xe Du Lịch
      </h3>

      <div aria-live="polite">
        {apiError && (
          <div className="mb-6 p-4 rounded-custom-md bg-red-950/40 border border-red-800 text-red-300 text-sm flex gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot field (hidden) */}
          <div
            className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website_url_tour">Website</label>
            <input
              id="website_url_tour"
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
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <User className="w-4 h-4 text-[#38BDF8]" />
                Họ và tên <span className="text-red-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                  errors.fullName && "border-red-500"
                )}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Phone className="w-4 h-4 text-[#38BDF8]" />
                Số điện thoại / Zalo <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ví dụ: 0905123456"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                  errors.phone && "border-red-500"
                )}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Tuyến xe / Tour & Loại xe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="tourInterest"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                Tuyến xe / Tour quan tâm
              </label>
              <select
                id="tourInterest"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                    : "bg-gray-50 text-gray-900 border-gray-300",
                  errors.tourInterest && "border-red-500"
                )}
                {...register("tourInterest")}
              >
                {tourOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className={isDark ? "bg-[#050A12] text-[#F8FAFC]" : "bg-white text-gray-900"}
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="vehicleType"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Car className="w-4 h-4 text-[#38BDF8]" />
                Loại xe <span className="text-red-400">*</span>
              </label>
              <select
                id="vehicleType"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                    : "bg-gray-50 text-gray-900 border-gray-300",
                  errors.vehicleType && "border-red-500"
                )}
                {...register("vehicleType")}
              >
                {vehicles.map((v) => (
                  <option
                    key={v.id}
                    value={v.name}
                    className={isDark ? "bg-[#050A12] text-[#F8FAFC]" : "bg-white text-gray-900"}
                  >
                    {v.name} ({v.type})
                  </option>
                ))}
              </select>
              {errors.vehicleType && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.vehicleType.message}
                </p>
              )}
            </div>
          </div>

          {/* Điểm đón & Điểm đến */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="pickupPoint"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                Điểm đón <span className="text-red-400">*</span>
              </label>
              <input
                id="pickupPoint"
                type="text"
                placeholder="Ví dụ: Sân bay Phú Bài / Khách sạn Silk Path Huế"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                  errors.pickupPoint && "border-red-500"
                )}
                {...register("pickupPoint")}
              />
              {errors.pickupPoint && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.pickupPoint.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="destination"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                Điểm đến <span className="text-red-400">*</span>
              </label>
              <input
                id="destination"
                type="text"
                placeholder="Ví dụ: Trung tâm Huế / Khách sạn tại Hội An"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                  errors.destination && "border-red-500"
                )}
                {...register("destination")}
              />
              {errors.destination && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.destination.message}
                </p>
              )}
            </div>
          </div>

          {/* Ngày đi, Giờ đón & Số hành khách */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="date"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                Ngày đi <span className="text-red-400">*</span>
              </label>
              <input
                id="date"
                type="date"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                    : "bg-gray-50 text-gray-900 border-gray-300",
                  errors.date && "border-red-500"
                )}
                {...register("date")}
              />
              {errors.date && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="time"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Clock className="w-4 h-4 text-[#38BDF8]" />
                Giờ đón <span className="text-red-400">*</span>
              </label>
              <input
                id="time"
                type="time"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                    : "bg-gray-50 text-gray-900 border-gray-300",
                  errors.time && "border-red-500"
                )}
                {...register("time")}
              />
              {errors.time && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.time.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="passengers"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Users className="w-4 h-4 text-[#38BDF8]" />
                Số hành khách <span className="text-red-400">*</span>
              </label>
              <input
                id="passengers"
                type="number"
                min={1}
                max={50}
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                    : "bg-gray-50 text-gray-900 border-gray-300",
                  errors.passengers && "border-red-500"
                )}
                {...register("passengers", { valueAsNumber: true })}
              />
              {errors.passengers && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.passengers.message}
                </p>
              )}
            </div>
          </div>

          {/* Ghi chú thêm */}
          <div className="space-y-1.5">
            <label
              htmlFor="note"
              className={cn(
                "text-xs sm:text-sm font-bold",
                isDark ? "text-[#F8FAFC]" : "text-gray-700"
              )}
            >
              Ghi chú hành trình hoặc yêu cầu đặc biệt (ghế trẻ em, mã chuyến bay...)
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder="Nhập ghi chú thêm cho tài xế..."
              className={cn(
                "w-full p-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none resize-none",
                isDark
                  ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                  : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300"
              )}
              {...register("note")}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full font-bold h-12 text-sm sm:text-base mt-2 bg-[#38BDF8] text-[#020617] hover:bg-[#60A5FA] disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi Yêu Cầu Đặt Xe & Báo Giá"}
          </Button>
        </form>
      )}
    </div>
  );
};
