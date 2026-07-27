// ============================================================
// src/app/dich-vu-xe-du-lich/page.tsx
// Landing page HUECARTOUR – Dịch vụ xe du lịch tại Huế
// Theme HueCarTour (light/premium) — dark text on cream background
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Car,
  Clock,
  MapPin,
  CheckCircle,
  Users,
  Shield,
  Star,
  CalendarCheck,
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

      {/* Wrap trong theme-huecartour để override CSS tokens sang light */}
      <div className="theme-huecartour flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Xe du lịch Huế" },
          ]}
        />

        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="relative overflow-hidden bg-[#F7F6F1] py-16 sm:py-24">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#172236 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
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
                    <span className="font-extrabold text-xl tracking-tight text-[#172236]">
                      HUE CAR TOURS
                    </span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#667085]">
                      Xe riêng miền Trung
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-[#101828] leading-[1.1] tracking-tight">
                  Xe riêng có tài xế tại{" "}
                  <span className="text-[#172236]">Huế</span>
                </h1>

                <p className="text-[#667085] text-sm sm:text-lg leading-relaxed">
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
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#172236] bg-white border border-[#E4E7EC] px-3 py-1.5 rounded-full shadow-sm"
                    >
                      <span className="text-[#172236]">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="#dat-xe">
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto font-bold flex items-center gap-2"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Nhận báo giá ngay
                    </Button>
                  </a>
                  <a href={`tel:${huecartourContact.hotlineRaw}`}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto font-bold flex items-center gap-2 border-[#172236]/20 text-[#172236] hover:bg-[#172236] hover:text-white"
                    >
                      <Phone className="w-4 h-4" />
                      Gọi {huecartourContact.hotlineDisplay}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E4E7EC]">
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
            COMMIT STRIP
            ============================================================ */}
        <section className="bg-[#172236] py-5">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 text-center">
              {[
                { label: "Xe 4 – 7 – 16 chỗ", sub: "Đời mới, điều hòa" },
                { label: "Không phụ phí", sub: "Giá trọn gói" },
                { label: "Tài xế kinh nghiệm", sub: "Am hiểu địa phương" },
                { label: "Hỗ trợ 24/7", sub: "Gọi là có xe" },
              ].map((item) => (
                <div key={item.label} className="px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-white text-xs sm:text-sm font-bold">{item.label}</span>
                  <span className="text-[#94A3B8] text-[10px] sm:text-xs">{item.sub}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            DANH SÁCH TOUR
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-[#F7F6F1]">
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
            ĐỘI XE
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-y border-[#E4E7EC]">
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
                  className="rounded-2xl border border-[#E4E7EC] bg-white overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-[#F2F4F7] overflow-hidden">
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
                      <h3 className="text-base font-bold text-[#101828]">{vehicle.name}</h3>
                      <span className="text-xs font-semibold text-[#667085] bg-[#F2F4F7] px-2 py-0.5 rounded-full">
                        {vehicle.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">{vehicle.description}</p>
                    <div className="flex items-center gap-4 pt-2 border-t border-[#E4E7EC] text-xs text-[#667085]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {vehicle.maxPassengers} khách
                      </span>
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5" />
                        {vehicle.maxLuggage} kiện hành lý
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] bg-[#F2F4F7] border border-[#E4E7EC] text-[#172236] px-2 py-0.5 rounded-full font-medium"
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
            FORM ĐẶT XE
            ============================================================ */}
        <section id="dat-xe" className="py-16 sm:py-20 bg-[#F7F6F1] border-t border-[#E4E7EC] scroll-mt-20">
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
            THÔNG TIN LIÊN HỆ
            ============================================================ */}
        <section className="py-12 bg-[#172236]">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-white font-bold text-lg">
                  HUECARTOUR – Đặt xe trực tiếp
                </span>
                <span className="text-[#94A3B8] text-sm flex items-center gap-1.5 justify-center sm:justify-start">
                  <MapPin className="w-3.5 h-3.5" />
                  {huecartourContact.address}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:${huecartourContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4" />
                    {huecartourContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Auto Spa
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
