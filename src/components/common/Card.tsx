// ============================================================
// src/components/common/Card.tsx
// Hộp chứa thông tin có đổ bóng và bo góc
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-bg-surface border border-border-custom rounded-custom-lg shadow-custom-sm overflow-hidden",
        hoverEffect && "hover:shadow-custom-md transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
