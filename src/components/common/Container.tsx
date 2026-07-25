// ============================================================
// src/components/common/Container.tsx
// Component bố cục container căn giữa, giới hạn chiều rộng
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Giới hạn hẹp hơn cho các trang đọc nội dung hoặc biểu mẫu */
  cleanWidth?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  cleanWidth = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        cleanWidth ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
