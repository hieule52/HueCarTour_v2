// ============================================================
// src/app/lien-he/page.tsx
// Trang Liên Hệ & Bản Đồ vị trí của cả hai thương hiệu
// ============================================================

import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Car } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GoogleMap } from "@/components/common/GoogleMap";
import { Card } from "@/components/common/Card";
import { huecartourContact, autospaContact } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên Hệ - HUE CAR TOURS & TIẾN QUỐC AUTO SPA",
  description:
    "Thông tin liên hệ hotline, địa chỉ văn phòng xe du lịch HueCarTour và trung tâm bảo dưỡng ô tô Tiến Quốc Auto Spa tại Huế.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Liên hệ" }]} />

      <Container>
        <SectionHeading
          eyebrow="THÔNG TIN KẾT NỐI"
          title="Liên hệ với chúng tôi"
          description="Quý khách có nhu cầu đặt xe du lịch riêng hoặc đặt lịch chăm sóc, bảo dưỡng xe ô tô tại Huế vui lòng chọn thương hiệu cần kết nối."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Brand A: HUE CAR TOURS */}
          <Card className="p-6 sm:p-8 bg-bg-surface border-border-custom space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border-custom text-primary">
                <Car className="w-6 h-6 text-secondary" />
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                  HUE CAR TOURS
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Chuyên cung cấp dịch vụ thuê xe du lịch riêng có tài xế tại Huế, đưa đón sân bay Phú Bài và liên tỉnh miền Trung.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Văn phòng:</span>
                    <span>{huecartourContact.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Hotline đặt xe du lịch:</span>
                    <a
                      href={`tel:${huecartourContact.hotlineRaw}`}
                      className="font-bold text-primary text-base hover:underline"
                    >
                      {huecartourContact.hotlineDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Email:</span>
                    <a href={`mailto:${huecartourContact.email}`} className="hover:underline">
                      {huecartourContact.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border-custom mt-6">
              <GoogleMap
                embedUrl={huecartourContact.googleMapsEmbedUrl}
                directionUrl={huecartourContact.googleMapsDirectionUrl}
                address={huecartourContact.address}
                title="Bản đồ Hue Car Tours"
              />
            </div>
          </Card>

          {/* Brand B: TIẾN QUỐC AUTO SPA */}
          <Card className="p-6 sm:p-8 bg-bg-surface border-border-custom space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border-custom text-primary">
                <Wrench className="w-6 h-6 text-secondary" />
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                  TIẾN QUỐC AUTO SPA
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Trung tâm dịch vụ bảo dưỡng định kỳ, sửa chữa và chăm sóc xe hơi chuyên sâu hàng đầu tại thành phố Huế.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Garage:</span>
                    <span>{autospaContact.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Hotline đặt lịch hẹn:</span>
                    <a
                      href={`tel:${autospaContact.hotlineRaw}`}
                      className="font-bold text-primary text-base hover:underline"
                    >
                      {autospaContact.hotlineDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Thời gian mở cửa:</span>
                    <span>{autospaContact.workingHours.days}</span>
                    <span className="block text-xs font-semibold text-text-primary">
                      {autospaContact.workingHours.hours}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border-custom mt-6">
              <GoogleMap
                embedUrl={autospaContact.googleMapsEmbedUrl}
                directionUrl={autospaContact.googleMapsDirectionUrl}
                address={autospaContact.address}
                title="Bản đồ Tiến Quốc Auto Spa"
              />
            </div>
          </Card>

        </div>
      </Container>
    </div>
  );
}

// Cần import Wrench ở đầu trang để tránh lỗi
import { Wrench } from "lucide-react";
