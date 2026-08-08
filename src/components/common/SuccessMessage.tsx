// ============================================================
// src/components/common/SuccessMessage.tsx
// Component hiển thị thông báo gửi yêu cầu thành công dùng chung
// Thiết kế gọn gàng, căn giữa, đồng bộ dark/light theme của website
// ============================================================

import React from "react";
import { Check } from "lucide-react";
import { Button } from "./Button";

export type SuccessMessageProps = {
  title?: string;
  description?: string;
  actionLabel: string;
  onReset: () => void;
};

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = "Gửi yêu cầu thành công!",
  description = "Tiến Quốc Auto Spa đã nhận được thông tin của bạn.\nChuyên viên sẽ liên hệ với bạn trong thời gian sớm nhất.",
  actionLabel,
  onReset,
}) => {
  return (
    <div
      className="w-full max-w-lg mx-auto py-8 px-6 text-center flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300"
      aria-live="polite"
    >
      {/* Icon check màu xanh lá nổi bật trong hình tròn */}
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-custom-sm">
        <Check className="w-8 h-8 stroke-[2.5]" />
      </div>

      {/* Tiêu đề và nội dung mô tả */}
      <div className="space-y-2.5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-line max-w-md mx-auto">
          {description}
        </p>
      </div>

      {/* Nút hành động duy nhất */}
      <Button
        onClick={onReset}
        variant="primary"
        className="font-bold px-8 h-11 text-sm sm:text-base shadow-custom-sm mt-2"
      >
        {actionLabel}
      </Button>
    </div>
  );
};
