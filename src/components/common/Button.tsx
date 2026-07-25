// ============================================================
// src/components/common/Button.tsx
// Nút bấm có đầy đủ trạng thái tương tác và vô hiệu hóa
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-custom-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none active:scale-[0.98] transform duration-100";
  
  const variants = {
    primary: "bg-primary text-text-on-primary hover:bg-primary-hover",
    secondary: "bg-secondary text-text-on-secondary hover:bg-secondary-hover",
    outline: "border border-border-custom bg-transparent text-text-primary hover:bg-secondary hover:text-text-on-secondary hover:border-secondary transition-all duration-200",
    ghost: "bg-transparent text-text-primary hover:bg-bg-surface-muted",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs md:text-sm h-9",
    md: "px-5 py-2.5 text-sm md:text-base h-11",
    lg: "px-7 py-3 text-base md:text-lg h-13",
  };

  return (
    <button
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
