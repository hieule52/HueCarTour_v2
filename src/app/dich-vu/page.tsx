// ============================================================
// src/app/dich-vu/page.tsx
// Trang danh sách dịch vụ Tiến Quốc Auto Spa
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  CalendarCheck,
  Phone,
  Wrench,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Receipt,
  Award,
  Car,
  Truck,
  Settings,
  Star,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { getAllServices } from "@/data/autospa";
import { autospaContact, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Dịch Vụ Chăm Sóc Ô Tô Tại Huế | Tiến Quốc Auto Spa",
  description:
    "Tiến Quốc Auto Spa cung cấp đầy đủ dịch vụ chăm sóc ô tô tại Huế: rửa xe chi tiết, vệ sinh nội thất, khoang máy, đánh bóng, phủ ceramic, dán phim, phủ gầm và nhiều hơn nữa.",
  alternates: {
    canonical: `${siteConfig.url}/dich-vu`,
  },
  openGraph: {
    title: "Dịch Vụ Auto Spa Tại Huế | Tiến Quốc Auto Spa",
    description:
      "Đầy đủ dịch vụ chăm sóc ô tô tại Huế: vệ sinh, đánh bóng, phủ ceramic, dán phim cách nhiệt. Kỹ thuật viên lành nghề, báo giá minh bạch.",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/dich-vu`,
  name: "Dịch vụ chăm sóc ô tô Tiến Quốc Auto Spa",
  provider: {
    "@type": "LocalBusiness",
    name: "Tiến Quốc Auto Spa",
    url: siteConfig.url,
  },
  areaServed: { "@type": "City", name: "Huế" },
};

const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  "user-check": UserCheck,
  receipt: Receipt,
  award: Award,
  car: Car,
  truck: Truck,
  settings: Settings,
  cpu: Settings,
  wind: Sparkles,
  shield: ShieldCheck,
  sun: Star,
  layers: Sparkles,
  palette: Star,
  zap: Star,
  tv: Settings,
  music: Star,
};

export default function DichVuPage() {
  const services = getAllServices();

  return (
    <>
      <JsonLd data={jsonLdData} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Dịch vụ Auto Spa" }]}
        />

        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <Container className="relative z-10">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-bold tracking-widest text-[#00C8FF] uppercase">
                TIẾN QUỐC AUTO SPA
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Dịch vụ chăm sóc ô tô toàn diện tại Huế
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Từ vệ sinh cơ bản đến nâng cấp toàn diện — kỹ thuật viên lành nghề, thiết bị
                chuyên dụng, báo giá minh bạch trước khi thi công.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/#dat-lich">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto border-slate-700 text-slate-300 hover:border-[#168BFF] hover:text-[#00C8FF]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Đặt lịch
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="pb-20">
          <Container>
            <SectionHeading
              eyebrow="TẤT CẢ DỊCH VỤ"
              title="Chọn dịch vụ phù hợp với xe của bạn"
              description="Liên hệ để được tư vấn và kiểm tra xe trực tiếp trước khi nhận báo giá chính xác."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.iconName] ?? Wrench;
                return (
                  <div
                    key={service.id}
                    className="group flex flex-col bg-bg-surface-2 border border-border-custom rounded-custom-lg overflow-hidden hover:border-[#168BFF]/40 transition-all duration-200"
                  >
                    {/* Service image */}
                    <div className="relative aspect-video overflow-hidden bg-[#050A12]">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 to-transparent" />
                      {service.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold text-white bg-[#168BFF] px-2.5 py-1 rounded-custom-full uppercase tracking-wide">
                            Nổi bật
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="flex flex-col gap-4 p-6 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-custom-md bg-[#168BFF]/15 flex items-center justify-center text-[#00C8FF] flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <h2 className="text-base font-bold text-white leading-tight">
                            {service.name}
                          </h2>
                          <span className="text-xs text-slate-500">{service.priceLabel}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Items list */}
                      <ul className="flex flex-col gap-1.5">
                        {service.items.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs text-slate-500"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-[#168BFF] flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTAs */}
                      <div className="flex gap-3 pt-2 border-t border-border-custom mt-auto">
                        <Link
                          href={`/dich-vu/${service.slug}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full text-xs font-bold border-slate-700 text-slate-300 hover:border-[#168BFF] hover:text-[#00C8FF] flex items-center justify-center gap-1.5"
                          >
                            Xem chi tiết
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Link href="/#dat-lich" className="flex-1">
                          <Button
                            variant="secondary"
                            className="w-full text-xs font-bold flex items-center justify-center gap-1.5"
                          >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            Đặt lịch
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 bg-[#07111F] border-t border-slate-800">
          <Container>
            <div className="text-center flex flex-col items-center gap-4 max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-white">
                Không chắc dịch vụ nào phù hợp?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gọi hotline hoặc nhắn Zalo — kỹ thuật viên sẽ tư vấn miễn phí
                sau khi kiểm tra tình trạng xe của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/#dat-lich">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto border-slate-700 text-slate-300 hover:border-[#168BFF] hover:text-[#00C8FF]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Đặt lịch kiểm tra xe
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
