// ============================================================
// src/app/dich-vu-xe-du-lich/page.tsx
// Landing page HUECARTOUR – Dịch vụ xe du lịch tại Huế
// Theme-aware: Đồng bộ 100% thương hiệu TIẾN QUỐC AUTO SPA
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Car,
  Clock,
  CheckCircle,
  Users,
  Shield,
  Star,
  CalendarCheck,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { TourCard } from "@/components/tour/TourCard";
import { BookingForm } from "@/components/booking/BookingForm";
import { getAllTours, vehicles } from "@/data/huecartour";
import { huecartourContact, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Dịch Vụ Xe Du Lịch Tại Huế – HUECARTOUR | Tiến Quốc Auto Spa",
  description:
    "Thuê xe riêng tại Huế có tài xế: đưa đón sân bay Phú Bài, tour tham quan Cố đô Huế, xe đi Đà Nẵng, Hội An, Quảng Trị, Phong Nha. Xe 4–7–16 chỗ đời mới, giá công khai.",
  alternates: {
    canonical: `${siteConfig.url}/dich-vu-xe-du-lich`,
  },
  openGraph: {
    title: "Xe Du Lịch Tại Huế – HUECARTOUR | Tiến Quốc Auto Spa",
    description:
      "Xe riêng có tài xế tại Huế: đưa đón sân bay, tour Cố đô, đi Đà Nẵng–Hội An–Phong Nha. Báo giá minh bạch, an toàn, đúng giờ.",
    images: [
      {
        url: "/assets/images/brand/huecartour.png",
        width: 1200,
        height: 630,
        alt: "HUECARTOUR – Xe du lịch riêng tại Huế",
      },
    ],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "TransportationService",
  "@id": `${siteConfig.url}/dich-vu-xe-du-lich`,
  name: "HUECARTOUR – Dịch vụ xe du lịch tại Huế",
  description:
    "Dịch vụ thuê xe riêng có tài xế tại Huế. Chuyên đưa đón sân bay Phú Bài, tour Cố đô, xe đi Đà Nẵng, Hội An, Quảng Trị, Phong Nha.",
  provider: {
    "@type": "LocalBusiness",
    name: "Tiến Quốc Auto Spa",
    url: siteConfig.url,
    telephone: huecartourContact.hotlineDisplay,
  },
  areaServed: [
    { "@type": "City", name: "Huế" },
    { "@type": "City", name: "Đà Nẵng" },
    { "@type": "City", name: "Hội An" },
  ],
};

export default function DichVuXeDuLichPage() {
  const allTours = getAllTours();

  return (
    <>
      <JsonLd data={jsonLdData} />

      <div className="flex flex-col" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Xe du lịch Huế" }]} />

        {/* ============================================================
            1. HERO — HUECARTOUR
            ============================================================ */}
        <section className="relative overflow-hidden py-16 sm:py-24" style={{ backgroundColor: "var(--page-bg)" }}>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(var(--page-primary-alt) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text side */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/images/brand/huecartour_logoIcon.png"
                    alt="HUECARTOUR Logo"
                    width={52}
                    height={52}
                    className="h-14 w-auto object-contain"
                  />
                  <div className="flex flex-col leading-none gap-1">
                    <span className="font-extrabold text-xl tracking-tight" style={{ color: "var(--page-text)" }}>
                      HUE CAR TOURS
                    </span>
                    <span className="text-[11px] uppercase tracking-widest font-bold" style={{ color: "var(--page-text-muted)" }}>
                      Xe riêng miền Trung • Tiến Quốc Auto Spa
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight" style={{ color: "var(--page-text)" }}>
                  Xe riêng có tài xế tại{" "}
                  <span className="text-gradient-blue">Huế</span>
                </h1>

                <p className="text-sm sm:text-lg leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                  Đưa đón sân bay Phú Bài, tour tham quan Cố đô, xe đi Đà Nẵng, Hội An,
                  Quảng Trị và Phong Nha. Xe đời mới 4–7–16 chỗ, tài xế kinh nghiệm,
                  báo giá công khai.
                </p>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { icon: <Shield className="w-3.5 h-3.5" />, text: "An toàn" },
                    { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Minh bạch giá" },
                    { icon: <Clock className="w-3.5 h-3.5" />, text: "Đúng giờ" },
                    { icon: <Star className="w-3.5 h-3.5 fill-current" />, text: "Hỗ trợ 24/7" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--page-text) 5%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--page-text) 10%, transparent)",
                        color: "var(--page-text)"
                      }}
                    >
                      <span style={{ color: "var(--page-primary-alt)" }}>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="#dat-xe">
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 glow-primary"
                      style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Nhận báo giá ngay
                    </Button>
                  </a>
                  <a href={`tel:${huecartourContact.hotlineRaw}`}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto font-bold flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Gọi {huecartourContact.hotlineDisplay}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Image side */}
              <div
                className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border"
                style={{ borderColor: "var(--page-border)" }}
              >
                <Image
                  src="/assets/images/brand/huecartour.png"
                  alt="HUECARTOUR – Xe riêng du lịch Huế"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ============================================================
            2. COMMIT STRIP (Thanh cam kết đồng bộ)
            ============================================================ */}
        <section
          className="py-5 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <div
              className="grid grid-cols-2 md:grid-cols-4 divide-x text-center"
              style={{ borderColor: "var(--page-border)" }}
            >
              {[
                { label: "Xe 4 – 7 – 16 chỗ", sub: "Đời mới, điều hòa" },
                { label: "Không phụ phí", sub: "Giá trọn gói" },
                { label: "Tài xế kinh nghiệm", sub: "Am hiểu địa phương" },
                { label: "Hỗ trợ 24/7", sub: "Gọi là có xe" },
              ].map((item) => (
                <div key={item.label} className="px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-bold" style={{ color: "var(--page-text)" }}>
                    {item.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--page-text-dim)" }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            3. DANH SÁCH TOUR
            ============================================================ */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="TUYẾN XE & TOUR DU LỊCH"
              title="Tất cả tuyến xe và tour tại Huế"
              description="Chọn hành trình bạn cần để xem chi tiết lịch trình, điểm dừng và bảng giá xe riêng."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {allTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            4. ĐỘI XE
            ============================================================ */}
        <section
          className="py-16 sm:py-20 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <SectionHeading
              eyebrow="ĐỘI XE"
              title="Xe đời mới, sạch sẽ và thoải mái"
              description="Đội xe đa dạng phục vụ từ cặp đôi đến đoàn khách lớn. Tất cả đều được bảo dưỡng thường xuyên tại Tiến Quốc Auto Spa."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="rounded-2xl border overflow-hidden transition-all duration-200"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <div
                    className="relative aspect-video overflow-hidden"
                    style={{ backgroundColor: "var(--page-bg)" }}
                  >
                    <Image
                      src={vehicle.imageSrc}
                      alt={vehicle.imageAlt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold" style={{ color: "var(--page-text)" }}>
                        {vehicle.name}
                      </h3>
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--page-text) 10%, transparent)",
                          color: "var(--page-text)"
                        }}
                      >
                        {vehicle.type}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                      {vehicle.description}
                    </p>
                    <div
                      className="flex items-center gap-4 pt-2 border-t text-xs font-semibold"
                      style={{ borderColor: "var(--page-border)", color: "var(--page-text-muted)" }}
                    >
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" style={{ color: "var(--page-primary-alt)" }} />
                        {vehicle.maxPassengers} khách
                      </span>
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5" style={{ color: "var(--page-primary-alt)" }} />
                        {vehicle.maxLuggage} kiện hành lý
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] px-2 py-0.5 rounded-full font-semibold border"
                          style={{
                            backgroundColor: "var(--page-bg)",
                            borderColor: "var(--page-border)",
                            color: "var(--page-text-muted)"
                          }}
                        >
                          {vehicle.amenityLabels[a as keyof typeof vehicle.amenityLabels]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            5. FORM ĐẶT XE DU LỊCH
            ============================================================ */}
        <section id="dat-xe" className="py-16 sm:py-20 border-t scroll-mt-20" style={{ backgroundColor: "var(--page-bg)", borderColor: "var(--page-border)" }}>
          <Container>
            <SectionHeading
              eyebrow="ĐẶT XE NGAY"
              title="Nhận báo giá trong vài phút"
              description="Điền thông tin hành trình — chúng tôi sẽ liên hệ xác nhận và báo giá chính xác trong thời gian sớm nhất."
            />
            <BookingForm />
          </Container>
        </section>

        {/* ============================================================
            6. THÔNG TIN LIÊN HỆ CỦOI TRANG XE DU LỊCH
            ============================================================ */}
        <section
          className="py-12 border-t"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="font-bold text-lg" style={{ color: "var(--page-text)" }}>
                  HUECARTOUR – Đặt xe trực tiếp
                </span>
                <span className="text-sm flex items-center gap-1.5 justify-center sm:justify-start font-medium" style={{ color: "var(--page-text-muted)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--page-primary-alt)" }} />
                  {huecartourContact.address}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:${huecartourContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                    style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                  >
                    <Phone className="w-4 h-4" />
                    {huecartourContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/dich-vu">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Xem dịch vụ Auto Spa
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
