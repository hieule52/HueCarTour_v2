// ============================================================
// src/components/common/IconButton.tsx
// Nút chỉ chứa icon, tối ưu hóa cho công cụ đọc màn hình
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "primary" | "secondary";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  "aria-label": ariaLabel,
  className,
  size = "md",
  variant = "ghost",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-custom-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98] transform duration-100";
  
  const variants = {
    primary: "bg-primary text-text-on-primary hover:bg-primary-hover",
    secondary: "bg-secondary text-text-on-secondary hover:bg-secondary-hover",
    outline: "border border-border-custom bg-transparent text-text-primary hover:bg-bg-surface-muted",
    ghost: "bg-transparent text-text-primary hover:bg-bg-surface-muted",
  };

  const sizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  };

  return (
    <button
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...props}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
    </button>
  );
};
