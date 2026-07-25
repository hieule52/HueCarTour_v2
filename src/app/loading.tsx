// ============================================================
// src/app/loading.tsx
// Trạng thái tải trang chung (Loading State)
// ============================================================

import React from "react";
import { Container } from "@/components/common/Container";

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-bg-app">
      <Container className="flex flex-col items-center justify-center gap-4 text-center">
        {/* Premium animated spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-custom-full border-4 border-primary/10" />
          <div className="absolute inset-0 rounded-custom-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-bold text-text-secondary tracking-wider animate-pulse">
          ĐANG TẢI DỮ LIỆU...
        </p>
      </Container>
    </div>
  );
}
