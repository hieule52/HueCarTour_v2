// ============================================================
// src/components/autospa/AutoSpaBookingForm.tsx
// Biểu mẫu đặt lịch chăm sóc xe Auto Spa chuyên nghiệp
// ============================================================

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Phone, Car, Sparkles, AlertCircle, Copy, Check, Send } from "lucide-react";
import { autoSpaBookingSchema, type AutoSpaBookingFormData } from "@/schemas/autospa-booking.schema";
import { autospaServices } from "@/data/autospa";
import { autospaContact } from "@/data/site";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

export const AutoSpaBookingForm: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    messageText: string;
    whatsappUrl: string | null;
  } | null>(null);

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
      service: "Bảo dưỡng định kỳ",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      carCondition: "",
      note: "",
      email: "", // Honeypot field
    },
  });

  const onSubmit = async (data: AutoSpaBookingFormData) => {
    setApiError(null);
    setSuccessData(null);
    try {
      const response = await fetch("/api/autospa-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gửi lịch hẹn thất bại. Vui lòng thử lại.");
      }

      setSuccessData({
        messageText: result.messageText,
        whatsappUrl: result.whatsappUrl,
      });
      reset();
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
    <div className="w-full bg-bg-surface border border-border-custom rounded-custom-lg shadow-custom-lg p-6 sm:p-8" id="spa-booking-form">
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center">
        Đặt Lịch Chăm Sóc Xe Chuyên Nghiệp
      </h3>

      <div aria-live="polite">
        {apiError && (
          <div className="mb-6 p-4 rounded-custom-md bg-state-error/15 border border-state-error/20 text-state-error text-sm flex gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}
      </div>

      {successData ? (
        // UI thành công và hướng dẫn chuyển đổi
        <div className="space-y-6" aria-live="polite">
          <div className="p-4 rounded-custom-md bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 text-sm flex gap-2.5">
            <Sparkles className="w-5 h-5 text-secondary flex-shrink-0" />
            <div>
              <p className="font-bold mb-1">Nội dung đặt lịch đã được khởi tạo!</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Chi tiết thông tin xe và dịch vụ đặt hẹn đã sẵn sàng. Hãy gửi qua Zalo hoặc gửi WhatsApp trực tiếp để kỹ thuật viên Tiến Quốc Auto Spa liên hệ xác nhận giờ rảnh.
              </p>
            </div>
          </div>

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
              <Button disabled variant="outline" className="text-sm font-bold border-gray-600 text-gray-400">
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
              Hoặc gọi hotline trực tiếp để đặt giờ nhanh:{" "}
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                className="font-bold text-primary hover:underline"
              >
                {autospaContact.hotlineDisplay}
              </a>
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs text-text-secondary hover:text-text-primary"
              onClick={() => setSuccessData(null)}
            >
              Đặt lịch xe khác
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot field (hidden) */}
          <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
            <label htmlFor="email_spa">Email</label>
            <input
              id="email_spa"
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

          {/* Dòng xe & Biển số xe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="carModel" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Car className="w-4 h-4 text-primary" />
                Dòng xe (ví dụ: Toyota Vios, Mazda 3) <span className="text-state-error">*</span>
              </label>
              <input
                id="carModel"
                type="text"
                placeholder="Nhập dòng xe của bạn"
                className={cn(
                  "w-full h-11 px-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
                  errors.carModel ? "border-state-error" : "border-border-custom"
                )}
                {...register("carModel")}
              />
              {errors.carModel && (
                <p className="text-[11px] font-semibold text-state-error">{errors.carModel.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="licensePlate" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                Biển số xe (không bắt buộc)
              </label>
              <input
                id="licensePlate"
                type="text"
                placeholder="Ví dụ: 75A-123.45"
                className={cn(
                  "w-full h-11 px-3.5 border border-border-custom rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none"
                )}
                {...register("licensePlate")}
              />
              {errors.licensePlate && (
                <p className="text-[11px] font-semibold text-state-error">{errors.licensePlate.message}</p>
              )}
            </div>
          </div>

          {/* Dịch vụ Auto Spa */}
          <div className="space-y-1.5">
            <label htmlFor="service" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              Dịch vụ đăng ký <span className="text-state-error">*</span>
            </label>
            <select
              id="service"
              className={cn(
                "w-full h-11 px-3.5 border border-border-custom rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none"
              )}
              {...register("service")}
            >
              {autospaServices.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Khác">Dịch vụ khác / Cần tư vấn thêm</option>
            </select>
          </div>

          {/* Ngày hẹn & Giờ hẹn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="date" className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Ngày hẹn <span className="text-state-error">*</span>
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
                Giờ hẹn mong muốn <span className="text-state-error">*</span>
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

          {/* Tình trạng xe hiện tại */}
          <div className="space-y-1.5">
            <label htmlFor="carCondition" className="text-xs sm:text-sm font-bold text-text-primary">
              Tình trạng xe hiện tại hoặc yêu cầu xử lý <span className="text-state-error">*</span>
            </label>
            <textarea
              id="carCondition"
              rows={3}
              placeholder="Ví dụ: Xe bị bụi bẩn nhiều, móp nhẹ cản trước, hoặc sơn xe bị xước nhẹ cần đánh bóng..."
              className={cn(
                "w-full p-3.5 border rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none resize-none",
                errors.carCondition ? "border-state-error" : "border-border-custom"
              )}
              {...register("carCondition")}
            />
            {errors.carCondition && (
              <p className="text-[11px] font-semibold text-state-error">{errors.carCondition.message}</p>
            )}
          </div>

          {/* Ghi chú thêm */}
          <div className="space-y-1.5">
            <label htmlFor="note" className="text-xs sm:text-sm font-bold text-text-primary">
              Ghi chú thêm (nếu có)
            </label>
            <textarea
              id="note"
              rows={2}
              placeholder="Nhập ghi chú hoặc thời gian đặc biệt..."
              className="w-full p-3.5 border border-border-custom rounded-custom-md text-sm bg-bg-surface focus:border-border-focus focus:outline-none resize-none"
              {...register("note")}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full font-bold h-12 text-sm sm:text-base mt-2"
          >
            Đăng Ký Đặt Lịch Chăm Sóc Xe
          </Button>
        </form>
      )}
    </div>
  );
};
