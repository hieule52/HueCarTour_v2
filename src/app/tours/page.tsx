// ============================================================
// src/app/tours/page.tsx
// Trang danh sách toàn bộ 11 Tour du lịch & tuyến đường xe du lịch
// ============================================================

import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { TourCard } from "@/components/tour/TourCard";
import { getAllTours } from "@/data/huecartour";

export const metadata: Metadata = {
  title: "Danh Sách Tour Du Lịch Và Tuyến Xe Riêng Giá Tốt",
  description:
    "Tổng hợp 11 tour tham quan Cố đô Huế, xe đi Đà Nẵng, Hội An, Quảng Trị, Phong Nha. Xe riêng đời mới 4-7-16 chỗ kèm tài xế.",
};

export default function ToursPage() {
  const allTours = getAllTours();

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Tất cả các tour" }]} />

      <Container>
        {/* Tiêu đề trang dùng SectionHeading đúng chuẩn */}
        <SectionHeading
          eyebrow="DANH MỤC HÀNH TRÌNH"
          title="Tất cả các Tour du lịch & Tuyến xe riêng"
          description="Khám phá miền Trung trọn vẹn với bảng giá xe riêng công khai minh bạch. Chọn hành trình bạn muốn để xem chi tiết hoặc liên hệ nhận tư vấn nhanh."
          className="mb-8"
        />

        {/* Lưới hiển thị 3 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </Container>
    </div>
  );
}
