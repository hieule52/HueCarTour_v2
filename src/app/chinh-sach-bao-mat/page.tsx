// ============================================================
// src/app/chinh-sach-bao-mat/page.tsx
// Trang chính sách bảo mật thông tin khách hàng
// ============================================================

import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Khách Hàng | HUE CAR TOURS",
  description:
    "Chính sách bảo mật thông tin cá nhân của khách hàng khi đăng ký đặt xe du lịch hoặc đặt lịch dịch vụ chăm sóc xe hơi tại Huế.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Chính sách bảo mật" }]} />

      <Container cleanWidth>
        <SectionHeading
          title="Chính sách bảo mật thông tin"
          className="mb-8 text-left items-start"
        />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed space-y-6">
          <p>
            Chào mừng bạn đến với <strong>HUE CAR TOURS & TIẾN QUỐC AUTO SPA</strong>. Chúng tôi tôn trọng quyền riêng tư của khách hàng và cam kết bảo vệ thông tin cá nhân mà bạn cung cấp cho chúng tôi thông qua website này.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            1. Thu thập thông tin cá nhân
          </h3>
          <p>
            Khi bạn sử dụng các biểu mẫu yêu cầu đặt xe du lịch hoặc đặt lịch Auto Spa trên website của chúng tôi, chúng tôi có thể thu thập các thông tin cá nhân sau:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Họ và tên của bạn.</li>
            <li>Số điện thoại hoặc thông tin tài khoản Zalo liên hệ.</li>
            <li>Thông tin lộ trình di chuyển (điểm đón, điểm đến) hoặc thông tin xe (dòng xe, biển số).</li>
            <li>Thông tin lịch hẹn (ngày đi, giờ đón).</li>
            <li>Các ghi chú và yêu cầu đặc biệt khác.</li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            2. Mục đích sử dụng thông tin
          </h3>
          <p>
            Thông tin thu thập từ bạn được sử dụng riêng cho các mục đích:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Tạo nội dung tin nhắn và hỗ trợ bạn gửi thông tin đặt xe, đặt lịch nhanh chóng qua Zalo hoặc WhatsApp.</li>
            <li>Liên hệ trực tiếp để xác nhận thời gian, địa điểm đón trả hoặc lịch sửa chữa, báo giá cụ thể.</li>
            <li>Cải thiện và nâng cao chất lượng dịch vụ của nhà xe và garage.</li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            3. Bảo mật thông tin
          </h3>
          <p>
            Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn. Website của chúng tôi không sử dụng cơ sở dữ liệu lưu trữ trực tuyến lâu dài cho thông tin biểu mẫu của bạn, mọi yêu cầu được chuyển đổi trực tiếp thành tin nhắn liên hệ gửi đi để giảm thiểu tối đa nguy cơ rò rỉ dữ liệu.
          </p>
          <p>
            Chúng tôi không chia sẻ, bán hoặc chuyển nhượng thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào ngoại trừ tài xế phục vụ chuyến đi của bạn để phục vụ việc đưa đón.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-text-primary mt-6">
            4. Thay đổi chính sách
          </h3>
          <p>
            Chúng tôi có quyền cập nhật chính sách bảo mật này bất kỳ lúc nào để phù hợp với quy định của pháp luật và sự thay đổi dịch vụ. Bản cập nhật mới nhất sẽ được đăng tải trực tiếp tại đây.
          </p>
        </div>
      </Container>
    </div>
  );
}
