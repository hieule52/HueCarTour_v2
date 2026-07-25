// ============================================================
// src/app/not-found.tsx
// Trang thông báo không tìm thấy đường dẫn (404 Page Not Found)
// ============================================================

import React from "react";
import Link from "next/link";
import { MoveLeft, AlertTriangle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-bg-app">
      <Container className="text-center py-16 flex flex-col items-center">
        <div className="w-16 h-16 rounded-custom-full bg-secondary/15 flex items-center justify-center text-secondary mb-6 animate-bounce">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-primary mb-3">
          404
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
          Không tìm thấy trang yêu cầu
        </h2>
        
        <p className="text-sm sm:text-base text-text-secondary max-w-md mb-8 leading-relaxed">
          Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi. Vui lòng quay trở lại Trang chủ để tiếp tục tham quan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button className="flex items-center gap-2 font-semibold">
              <MoveLeft className="w-4 h-4" />
              Quay lại Trang chủ
            </Button>
          </Link>
          
          <Link href="/auto-spa">
            <Button variant="outline" className="font-semibold">
              Tiến Quốc Auto Spa
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
