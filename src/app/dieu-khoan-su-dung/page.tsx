// ============================================================
// src/app/dieu-khoan-su-dung/page.tsx
// Trang điều khoản sử dụng dịch vụ xe du lịch và chăm sóc xe
// ============================================================

import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng Dịch Vụ | HUE CAR TOURS",
  description:
    "Các quy định, điều khoản sử dụng dịch vụ thuê xe du lịch HueCarTour và đặt lịch bảo dưỡng ô tô Tiến Quốc Auto Spa.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Điều khoản sử dụng" }]} />

      <Container cleanWidth>
        <SectionHeading
          title="Điều khoản sử dụng dịch vụ"
          className="mb-8 text-left items-start"
        />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed space-y-6">
          <p>
            Chào mừng bạn đến với <strong>HUE CAR TOURS & TIẾN QUỐC AUTO SPA</strong>. Việc bạn truy cập và sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn đồng ý tuân thủ các điều khoản dưới đây.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            1. Quy định đặt dịch vụ
          </h3>
          <p>
            Khách hàng có trách nhiệm cung cấp thông tin liên hệ, lịch trình và loại xe chính xác. Chúng tôi không chịu trách nhiệm cho các vấn đề phát sinh (trễ chuyến bay, sai điểm đón) do cung cấp thông tin sai lệch từ phía người đặt xe.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            2. Báo giá và Thanh toán
          </h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Các báo giá trên website mang tính chất tham khảo chung. Báo giá cuối cùng sẽ được xác nhận thông qua trao đổi trực tiếp qua điện thoại hoặc tin nhắn Zalo/WhatsApp.</li>
            <li>Chúng tôi cam kết báo giá trọn gói minh bạch, không phụ phí phát sinh mập mờ trong suốt hành trình đã chốt trước đó.</li>
            <li>Khách hàng thanh toán tiền mặt hoặc chuyển khoản trực tiếp cho tài xế sau khi hoàn thành chuyến đi. Đối với Auto Spa, thanh toán tại garage sau khi nghiệm thu xe sạch sẽ.</li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            3. Quy định hủy chuyến
          </h3>
          <p>
            Nếu có nhu cầu thay đổi lịch trình hoặc hủy chuyến xe du lịch, hủy lịch hẹn Auto Spa, quý khách vui lòng thông báo cho chúng tôi qua hotline trước ít nhất 02 giờ so với giờ hẹn khởi hành. Việc hủy chuyến sớm giúp chúng tôi sắp xếp điều phối tài xế và kỹ thuật viên hiệu quả hơn.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            4. Trách nhiệm của khách hàng
          </h3>
          <p>
            Hành khách có trách nhiệm giữ gìn vệ sinh chung trên xe du lịch và trong khu vực garage. Không mang các chất dễ cháy nổ, hàng cấm hoặc vật nuôi khi chưa có sự thỏa thuận trước với tài xế nhà xe.
          </p>
        </div>
      </Container>
    </div>
  );
}
