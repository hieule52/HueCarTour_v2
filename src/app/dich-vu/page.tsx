// ============================================================
// src/app/dich-vu/page.tsx
// Trang danh sách dịch vụ Tiến Quốc Auto Spa — Theme-aware
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

      <div className="flex flex-col" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Dịch vụ Auto Spa" }]} />

        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <Container className="relative z-10">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--page-primary-alt)" }}>
                TIẾN QUỐC AUTO SPA
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "var(--page-text)" }}>
                Dịch vụ chăm sóc ô tô toàn diện tại Huế
              </h1>
              <p className="text-sm sm:text-base leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                Từ vệ sinh cơ bản đến nâng cấp toàn diện — kỹ thuật viên lành nghề, thiết bị
                chuyên dụng, báo giá minh bạch trước khi thi công.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto glow-primary"
                    style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/#dat-lich">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
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
        <section className="pb-20" style={{ backgroundColor: "var(--page-bg)" }}>
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
                    className="group flex flex-col rounded-custom-lg overflow-hidden border transition-all duration-200"
                    style={{
                      backgroundColor: "var(--page-surface-2)",
                      borderColor: "var(--page-border)"
                    }}
                  >
                    {/* Service image */}
                    <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "var(--page-bg)" }}>
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {service.featured && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-custom-full uppercase tracking-wide"
                            style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                          >
                            Nổi bật
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="flex flex-col gap-4 p-6 flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-custom-md flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                            color: "var(--page-primary-alt)"
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <h2 className="text-base font-bold leading-tight" style={{ color: "var(--page-text)" }}>
                            {service.name}
                          </h2>
                          <span className="text-xs font-medium" style={{ color: "var(--page-text-dim)" }}>{service.priceLabel}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                        {service.description}
                      </p>

                      {/* Items list */}
                      <ul className="flex flex-col gap-1.5">
                        {service.items.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "var(--page-text-muted)" }}
                          >
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTAs */}
                      <div className="flex gap-3 pt-2 border-t mt-auto" style={{ borderColor: "var(--page-border)" }}>
                        <Link
                          href={`/dich-vu/${service.slug}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full text-xs font-bold flex items-center justify-center gap-1.5"
                          >
                            Xem chi tiết
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Link href="/#dat-lich" className="flex-1">
                          <Button
                            variant="secondary"
                            className="w-full text-xs font-bold flex items-center justify-center gap-1.5"
                            style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
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
        <section
          className="py-14 border-t"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <div className="text-center flex flex-col items-center gap-4 max-w-xl mx-auto">
              <h3 className="text-2xl font-bold" style={{ color: "var(--page-text)" }}>
                Không chắc dịch vụ nào phù hợp?
              </h3>
              <p className="text-sm leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                Gọi hotline hoặc nhắn Zalo — kỹ thuật viên sẽ tư vấn miễn phí
                sau khi kiểm tra tình trạng xe của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                    style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
                <Link href="/#dat-lich">
                  <Button
                    variant="outline"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
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
