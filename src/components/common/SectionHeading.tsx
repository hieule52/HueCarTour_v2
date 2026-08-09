// ============================================================
// src/components/common/SectionHeading.tsx
// Tiêu đề phân đoạn chuẩn hóa theo style guidelines
// Đảm bảo tương phản cao (High Contrast) trên cả nền sáng và nền tối
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
  darkTheme?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  description,
  align = "center",
  darkTheme,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14 flex flex-col gap-2 md:gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs md:text-sm font-bold tracking-widest uppercase transition-colors",
            darkTheme === true
              ? "text-[#38BDF8]"
              : "text-[#0284C7] dark:text-[#38BDF8]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight transition-colors",
          darkTheme === true
            ? "text-[#F8FAFC]"
            : "text-[#0F172A] dark:text-[#F8FAFC]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-normal transition-colors",
            darkTheme === true
              ? "text-[#CBD5E1]"
              : "text-[#475569] dark:text-[#CBD5E1]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
