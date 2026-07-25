// ============================================================
// src/components/common/Badge.tsx
// Component hiển thị thẻ tag nhãn thông tin nhỏ
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "neutral";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "neutral",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center rounded-custom-full px-2.5 py-0.5 text-xs font-semibold select-none border";

  const variants = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    secondary: "bg-secondary/10 border-secondary/20 text-text-primary",
    success: "bg-state-success/10 border-state-success/20 text-state-success",
    neutral: "bg-bg-surface-muted border-border-custom text-text-secondary",
  };

  return (
    <span className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
