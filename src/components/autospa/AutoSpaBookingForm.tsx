// ============================================================
// src/components/autospa/AutoSpaBookingForm.tsx
// Biểu mẫu đặt lịch Auto Spa chuyên nghiệp — Theme-aware
// ============================================================

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Phone, Car, AlertCircle } from "lucide-react";
import { autoSpaBookingSchema, type AutoSpaBookingFormData } from "@/schemas/autospa-booking.schema";
import { autospaServices } from "@/data/autospa";
import { Button } from "../common/Button";
import { SuccessMessage } from "../common/SuccessMessage";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export const AutoSpaBookingForm: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isDark } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AutoSpaBookingFormData>({
    resolver: zodResolver(autoSpaBookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      carModel: "",
      licensePlate: "",
      service: autospaServices[0]?.name || "Rửa xe chi tiết",
      date: new Date().toISOString().split("T")[0],
      time: "08:30",
      carCondition: "",
      note: "",
      website_url: "", // Honeypot field (tránh Chrome Autofill tự điền)
    },
  });

  const onSubmit = async (data: AutoSpaBookingFormData) => {
    setApiError(null);
    try {
      const response = await fetch("/api/autospa-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau hoặc gọi hotline 036 448 3597."
        );
      }

      // Chỉ chuyển sang success state khi email đã gửi thành công
      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      // Giữ nguyên dữ liệu đã nhập nếu bị lỗi gửi
      const errMsg =
        err instanceof Error
          ? err.message
          : "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau hoặc gọi hotline 036 448 3597.";
      setApiError(errMsg);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    reset();
    const el = document.getElementById("spa-booking-form");
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
      id="spa-booking-form"
    >
      <h3
        className={cn(
          "text-xl sm:text-2xl font-extrabold mb-6 text-center",
          isDark ? "text-[#F8FAFC]" : "text-gray-900"
        )}
      >
        Đặt Lịch Chăm Sóc Xe Chuyên Nghiệp
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
          actionLabel="Tạo lịch hẹn mới"
          onReset={handleResetForm}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot field (hidden) */}
          <div
            className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website_url_spa">Website</label>
            <input
              id="website_url_spa"
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

          {/* Dòng xe & Biển số xe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="carModel"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Car className="w-4 h-4 text-[#38BDF8]" />
                Dòng xe <span className="text-red-400">*</span>
              </label>
              <input
                id="carModel"
                type="text"
                placeholder="Ví dụ: Toyota Vios, Mazda 3, Ford Ranger..."
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                  errors.carModel && "border-red-500"
                )}
                {...register("carModel")}
              />
              {errors.carModel && (
                <p className="text-[11px] font-semibold text-red-400">
                  {errors.carModel.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="licensePlate"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Car className="w-4 h-4 text-[#38BDF8]" />
                Biển số xe (không bắt buộc)
              </label>
              <input
                id="licensePlate"
                type="text"
                placeholder="Ví dụ: 75A-123.45"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none",
                  isDark
                    ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                    : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300"
                )}
                {...register("licensePlate")}
              />
            </div>
          </div>

          {/* Chọn Dịch Vụ */}
          <div className="space-y-1.5">
            <label
              htmlFor="service"
              className={cn(
                "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                isDark ? "text-[#F8FAFC]" : "text-gray-700"
              )}
            >
              <Car className="w-4 h-4 text-[#38BDF8]" />
              Dịch vụ cần làm <span className="text-red-400">*</span>
            </label>
            <select
              id="service"
              className={cn(
                "w-full h-11 px-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
                isDark
                  ? "bg-[#050A12] text-[#F8FAFC] border-slate-700"
                  : "bg-gray-50 text-gray-900 border-gray-300",
                errors.service && "border-red-500"
              )}
              {...register("service")}
            >
              {autospaServices.map((svc) => (
                <option
                  key={svc.id}
                  value={svc.name}
                  className={isDark ? "bg-[#050A12] text-[#F8FAFC]" : "bg-white text-gray-900"}
                >
                  {svc.name} ({svc.priceLabel})
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-[11px] font-semibold text-red-400">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Ngày đặt & Giờ hẹn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="date"
                className={cn(
                  "text-xs sm:text-sm font-bold flex items-center gap-1.5",
                  isDark ? "text-[#F8FAFC]" : "text-gray-700"
                )}
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                Ngày hẹn <span className="text-red-400">*</span>
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
                Giờ hẹn <span className="text-red-400">*</span>
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
          </div>

          {/* Tình trạng xe hiện tại */}
          <div className="space-y-1.5">
            <label
              htmlFor="carCondition"
              className={cn(
                "text-xs sm:text-sm font-bold",
                isDark ? "text-[#F8FAFC]" : "text-gray-700"
              )}
            >
              Tình trạng xe hiện tại hoặc yêu cầu xử lý{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              id="carCondition"
              rows={3}
              placeholder="Ví dụ: Xe bị bụi bẩn nhiều, móp nhẹ cản trước, hoặc sơn xe bị xước nhẹ cần đánh bóng..."
              className={cn(
                "w-full p-3.5 border rounded-custom-md text-sm focus:border-[#38BDF8] focus:outline-none resize-none",
                isDark
                  ? "bg-[#050A12] text-[#F8FAFC] placeholder:text-[#94A3B8] border-slate-700"
                  : "bg-gray-50 text-gray-900 placeholder:text-gray-400 border-gray-300",
                errors.carCondition && "border-red-500"
              )}
              {...register("carCondition")}
            />
            {errors.carCondition && (
              <p className="text-[11px] font-semibold text-red-400">
                {errors.carCondition.message}
              </p>
            )}
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
              Ghi chú thêm (nếu có)
            </label>
            <textarea
              id="note"
              rows={2}
              placeholder="Nhập ghi chú hoặc thời gian đặc biệt..."
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
            {isSubmitting ? "Đang gửi yêu cầu..." : "Đăng Ký Đặt Lịch Chăm Sóc Xe"}
          </Button>
        </form>
      )}
    </div>
  );
};
