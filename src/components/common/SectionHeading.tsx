// ============================================================
// src/components/common/SectionHeading.tsx
// Tiêu đề phân đoạn chuẩn hóa theo style guidelines
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  description,
  align = "center",
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
        <span className="text-xs md:text-sm font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
