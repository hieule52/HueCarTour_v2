// ============================================================
// src/app/page.tsx
// Trang chủ TIẾN QUỐC AUTO SPA — Server Component
// SEO: LocalBusiness + AutoRepair + FAQPage
// THEME-AWARE: Dark/Light mode via CSS variables
// OPTIMIZED: Giảm nội dung trùng lặp, mobile-friendly
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Sparkles,
  ShieldCheck,
  Clock,
  UserCheck,
  Receipt,
  Award,
  Car,
  CalendarCheck,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Truck,
  ScanSearch,
  Settings,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { GoogleMap } from "@/components/common/GoogleMap";
import { JsonLd } from "@/components/common/JsonLd";
import { AutoSpaBookingForm } from "@/components/autospa/AutoSpaBookingForm";
import {
  getFeaturedServices,
  autospaProcess,
  autospaWhyItems,
  autospaPackages,
  autospaFaq,
  autospaBrand,
} from "@/data/autospa";
import { getFeaturedTours } from "@/data/huecartour";
import { autospaContact, siteConfig, globalFaq } from "@/data/site";

// ============================================================
// METADATA — SEO Auto Spa
// ============================================================
export const metadata: Metadata = {
  title:
    "Tiến Quốc Auto Spa | Bảo dưỡng, sửa chữa và chăm sóc ô tô tại Huế",
  description:
    "Tiến Quốc Auto Spa cung cấp dịch vụ bảo dưỡng, sửa chữa, vệ sinh nội thất, đánh bóng, phủ ceramic và chăm sóc ô tô tại Huế. Liên hệ 036 448 3597 để được kiểm tra và tư vấn.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tiến Quốc Auto Spa | Chăm sóc ô tô chuyên nghiệp tại Huế",
    description:
      "Dịch vụ bảo dưỡng, sửa chữa, vệ sinh nội thất, đánh bóng và phủ ceramic ô tô tại Huế. Kỹ thuật viên lành nghề, báo giá minh bạch.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Tiến Quốc Auto Spa – Trung tâm chăm sóc ô tô tại Huế",
      },
    ],
  },
};

// ============================================================
// JSON-LD Structured Data
// ============================================================
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "AutoRepair"],
      "@id": `${siteConfig.url}/#business`,
      name: "Tiến Quốc Auto Spa",
      description: autospaBrand.description,
      url: siteConfig.url,
      telephone: autospaContact.hotlineDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: "147 Phùng Quán",
        addressLocality: "Huế",
        addressRegion: "Thừa Thiên Huế",
        addressCountry: "VN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "07:30",
        closes: "18:00",
      },
      sameAs: [autospaContact.facebookUrl],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dịch vụ chăm sóc ô tô",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bảo dưỡng định kỳ" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vệ sinh nội thất" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Phủ ceramic" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Đánh bóng sơn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dán phim cách nhiệt" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: globalFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

// ============================================================
// ICON MAP (server-safe)
// ============================================================
const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  clock: Clock,
  "user-check": UserCheck,
  receipt: Receipt,
  award: Award,
  car: Car,
  truck: Truck,
  "scan-search": ScanSearch,
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

function ServiceIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Wrench;
  return <Icon className="w-6 h-6" />;
}

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function HomePage() {
  const featuredServices = getFeaturedServices(6);
  const featuredTours = getFeaturedTours(3);

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={jsonLdData} />

      <div className="flex flex-col" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>

        {/* ============================================================
            1. HERO — Tiến Quốc Auto Spa
            ============================================================ */}
        <section
          className="relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background — theme-aware */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(135deg, var(--page-hero-bg-from) 0%, var(--page-hero-bg-via) 50%, var(--page-hero-bg-to) 100%)"
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.12)_0%,transparent_60%)] z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,200,255,0.06)_0%,transparent_50%)] z-0 pointer-events-none" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(var(--page-primary) 1px, transparent 1px), linear-gradient(90deg, var(--page-primary) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          <Container className="relative z-10 py-16 sm:py-24 md:py-32">
            <div className="max-w-3xl flex flex-col gap-5">
              {/* Eyebrow */}
              <span
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-custom-full w-fit"
                style={{
                  color: "var(--page-primary-alt)",
                  backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--page-primary) 30%, transparent)"
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--page-primary-alt)" }} />
                TRUNG TÂM CHĂM SÓC Ô TÔ TẠI HUẾ
              </span>

              {/* H1 — duy nhất trên trang */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]"
                style={{ color: "var(--page-text)" }}
              >
                Bảo dưỡng đúng,{" "}
                <span className="text-gradient-blue">chăm xe kỹ</span>,{" "}
                <br className="hidden sm:inline" />
                lái xe an tâm
              </h1>

              {/* Mô tả — ngắn gọn cho mobile */}
              <p
                className="text-sm sm:text-lg max-w-2xl leading-relaxed font-normal"
                style={{ color: "var(--page-text-muted)" }}
              >
                Kỹ thuật viên lành nghề, thiết bị chuyên dụng, báo giá minh bạch trước khi thực hiện.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a href="#dat-lich">
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto glow-primary"
                    style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Đặt lịch kiểm tra xe
                  </Button>
                </a>
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto font-bold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
              </div>

              {/* Info pills — giữ nguyên, quan trọng cho SEO */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: <MapPin className="w-3.5 h-3.5" />, text: "147 Phùng Quán, TP Huế" },
                  { icon: <Clock className="w-3.5 h-3.5" />, text: "07:30 – 18:00 hàng ngày" },
                  { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Báo giá minh bạch" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-custom-full font-medium"
                    style={{
                      color: "var(--page-text-muted)",
                      backgroundColor: "color-mix(in srgb, var(--page-text) 5%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--page-text) 10%, transparent)"
                    }}
                  >
                    <span style={{ color: "var(--page-primary-alt)" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ============================================================
            2. THANH CAM KẾT — Rút gọn, không lặp giờ mở cửa
            ============================================================ */}
        <section
          className="border-y"
          style={{ borderColor: "var(--page-border)", backgroundColor: "var(--page-surface)" }}
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x" style={{ borderColor: "var(--page-border)" }}>
              {[
                { icon: <UserCheck className="w-5 h-5" />, label: "Kỹ thuật viên chuyên nghiệp", sub: "Đào tạo bài bản" },
                { icon: <Receipt className="w-5 h-5" />, label: "Báo giá minh bạch", sub: "Kiểm tra trước khi làm" },
                { icon: <ShieldCheck className="w-5 h-5" />, label: "Cam kết chất lượng", sub: "Không phát sinh chi phí" },
                { icon: <Star className="w-5 h-5" />, label: "500+ khách hài lòng", sub: "Tất cả các ngày trong tuần" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 sm:p-5"
                >
                  <div
                    className="w-10 h-10 rounded-custom-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                      color: "var(--page-primary-alt)"
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold leading-tight" style={{ color: "var(--page-text)" }}>
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-xs mt-0.5 font-medium" style={{ color: "var(--page-text-dim)" }}>
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            3. DỊCH VỤ NỔI BẬT
            ============================================================ */}
        <section id="dich-vu" className="py-16 sm:py-20 md:py-24 scroll-mt-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="DỊCH VỤ CỦA CHÚNG TÔI"
              title="Dịch vụ chăm sóc ô tô toàn diện"
              description="Từ rửa xe chi tiết, vệ sinh nội thất đến phủ ceramic, dán phim cách nhiệt — mọi nhu cầu chăm sóc xe."
              darkTheme={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/dich-vu/${service.slug}`}
                  className="group p-5 rounded-custom-lg flex flex-col gap-4 transition-all duration-200 hover:border-[color-mix(in_srgb,var(--page-primary-alt)_50%,transparent)]"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    border: "1px solid var(--page-border)"
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-custom-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                        color: "var(--page-primary-alt)"
                      }}
                    >
                      <ServiceIcon name={service.iconName} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-base font-bold leading-tight" style={{ color: "var(--page-text)" }}>
                        {service.name}
                      </h3>
                      <span className="text-xs font-medium" style={{ color: "var(--page-text-dim)" }}>
                        {service.priceLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                    {service.description}
                  </p>
                  <div
                    className="flex items-center justify-between mt-auto pt-3 border-t"
                    style={{ borderColor: "var(--page-border)" }}
                  >
                    <ul className="flex flex-col gap-1">
                      {service.items.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 text-[11px]"
                          style={{ color: "var(--page-text-muted)" }}
                        >
                          <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: "var(--page-primary-alt)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ArrowRight
                      className="w-4 h-4 flex-shrink-0 transition-all group-hover:translate-x-1"
                      style={{ color: "var(--page-primary)" }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/dich-vu">
                <Button
                  variant="outline"
                  className="font-bold flex items-center justify-center gap-2 mx-auto"
                >
                  Xem tất cả dịch vụ
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* ============================================================
            4. LÝ DO LỰA CHỌN
            ============================================================ */}
        <section
          className="py-16 sm:py-20 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <SectionHeading
              eyebrow="TẠI SAO CHỌN CHÚNG TÔI"
              title="Cam kết chất lượng tốt nhất tại Huế"
              description="Chúng tôi chăm sóc xe của bạn như chăm sóc xe của chính mình."
              darkTheme={false}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {autospaWhyItems.map((item) => {
                const Icon = iconMap[item.iconName] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-custom-lg border transition-colors"
                    style={{
                      backgroundColor: "var(--page-bg)",
                      borderColor: "var(--page-border)"
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-custom-md flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                        color: "var(--page-primary-alt)"
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold mb-2" style={{ color: "var(--page-text)" }}>
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ============================================================
            5. QUY TRÌNH TIẾP NHẬN
            ============================================================ */}
        <section id="quy-trinh" className="py-16 sm:py-20 scroll-mt-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="QUY TRÌNH LÀM VIỆC"
              title="5 bước tiếp nhận chuyên nghiệp"
              description="Minh bạch từng bước — bạn biết rõ xe đang được làm gì và chi phí bao nhiêu."
              darkTheme={false}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {autospaProcess.map((step) => {
                const Icon = iconMap[step.iconName] ?? Wrench;
                return (
                  <div
                    key={step.step}
                    className="relative flex flex-col gap-3 p-5 rounded-custom-lg border"
                    style={{
                      backgroundColor: "var(--page-surface-2)",
                      borderColor: "var(--page-border)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-extrabold text-gradient-blue">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <div
                        className="w-8 h-8 rounded-custom-md flex items-center justify-center"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                          color: "var(--page-primary-alt)"
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold leading-tight" style={{ color: "var(--page-text)" }}>
                      {step.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--page-text-muted)" }}>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ============================================================
            6. GÓI DỊCH VỤ
            ============================================================ */}
        <section
          className="py-16 sm:py-20 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <SectionHeading
              eyebrow="GÓI DỊCH VỤ ĐỀ XUẤT"
              title="Chọn gói phù hợp"
              description="Liên hệ để nhận báo giá theo dòng xe và tình trạng thực tế."
              darkTheme={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {autospaPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="relative flex flex-col p-6 rounded-custom-lg border"
                  style={{
                    backgroundColor: "var(--page-bg)",
                    borderColor: pkg.isPopular ? "var(--page-primary-alt)" : "var(--page-border)"
                  }}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className="text-xs font-extrabold px-4 py-1 rounded-custom-full flex items-center gap-1"
                        style={{
                          backgroundColor: "var(--page-primary-alt)",
                          color: "var(--page-bg)"
                        }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        Phổ biến nhất
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--page-text)" }}>
                    {pkg.name}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                    {pkg.description}
                  </p>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {pkg.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-text-muted)" }}>
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "var(--page-primary-alt)" }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="flex flex-col gap-3 pt-4 border-t"
                    style={{ borderColor: "var(--page-border)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--page-text-dim)" }}>
                      {pkg.priceLabel}
                    </span>
                    <a href="#dat-lich">
                      <Button
                        variant={pkg.isPopular ? "secondary" : "outline"}
                        className="w-full font-bold"
                      >
                        Đặt lịch gói này
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            7. HÌNH ẢNH THỰC TẾ (Gallery)
            ============================================================ */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="HÌNH ẢNH THỰC TẾ"
              title="Kết quả từ garage của chúng tôi"
              description="Hình ảnh xe trước và sau khi chăm sóc tại Tiến Quốc Auto Spa."
              darkTheme={false}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/assets/images/autospa/ruaxe.png", alt: "Rửa xe chi tiết tại Tiến Quốc Auto Spa Huế" },
                { src: "/assets/images/autospa/VeSinhNoiThat.png", alt: "Vệ sinh nội thất ô tô chuyên sâu" },
                { src: "/assets/images/autospa/VeSinhKhoanMay.png", alt: "Vệ sinh khoang máy ô tô" },
                { src: "/assets/images/autospa/DanPhim.png", alt: "Dán phim cách nhiệt cao cấp" },
                { src: "/assets/images/autospa/PhuSon.png", alt: "Phủ sơn bảo vệ gầm ô tô" },
                { src: "/assets/images/autospa/BocDa.png", alt: "Bọc da ghế và sàn 360 độ" },
              ].map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-video rounded-custom-lg overflow-hidden border"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            8. FORM ĐẶT LỊCH AUTO SPA
            ============================================================ */}
        <section
          id="dat-lich"
          className="py-16 sm:py-20 border-y scroll-mt-20"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container cleanWidth>
            <AutoSpaBookingForm />
          </Container>
        </section>

        {/* ============================================================
            9. ĐÁNH GIÁ KHÁCH HÀNG
            ============================================================ */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="Ý KIẾN KHÁCH HÀNG"
              title="Khách hàng nói gì về chúng tôi"
              description="Sự hài lòng của quý khách là động lực để chúng tôi không ngừng cải thiện."
              darkTheme={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: "Anh Hoàng Minh",
                  type: "Phủ Ceramic",
                  text: "Xe được phủ Ceramic và chăm sóc nội thất cực kỳ kỹ lưỡng. Thợ tay nghề cao, bóng như gương. Rất hài lòng!",
                },
                {
                  name: "Chị Lan Phương",
                  type: "Vệ sinh nội thất",
                  text: "Đem xe đi vệ sinh nội thất chuyên sâu, ghế da sạch bóng, mùi khử hết hoàn toàn. Giá hợp lý, nhân viên nhiệt tình.",
                },
                {
                  name: "Anh Văn Tùng",
                  type: "Bảo dưỡng định kỳ",
                  text: "Làm việc rất bài bản. Kiểm tra xe xong mới báo giá, không ép dịch vụ thêm. Tin tưởng và đã giới thiệu nhiều bạn bè.",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="p-5 rounded-custom-lg space-y-4 border"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <div className="flex text-yellow-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed italic font-normal" style={{ color: "var(--page-text-muted)" }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div
                    className="border-t pt-3 flex items-center justify-between text-xs"
                    style={{ borderColor: "var(--page-border)" }}
                  >
                    <span className="font-bold" style={{ color: "var(--page-text)" }}>{review.name}</span>
                    <span className="font-medium" style={{ color: "var(--page-text-dim)" }}>{review.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            10. SECTION PHỤ — HUECARTOUR
            ============================================================ */}
        <section
          className="py-16 sm:py-20 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Text side */}
              <div className="flex flex-col gap-5">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-custom-full w-fit"
                  style={{
                    color: "var(--page-accent)",
                    backgroundColor: "color-mix(in srgb, var(--page-accent) 10%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--page-accent) 20%, transparent)"
                  }}
                >
                  DỊCH VỤ BỔ SUNG
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: "var(--page-text)" }}>
                  Cần xe du lịch tại Huế?
                </h2>
                <p className="text-sm sm:text-base leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                  Bên cạnh chăm sóc ô tô, chúng tôi hỗ trợ xe du lịch, đưa đón sân bay và tour riêng tại Huế qua{" "}
                  <strong style={{ color: "var(--page-accent)" }}>HUECARTOUR</strong>.
                </p>

                {/* 3 tour nổi bật */}
                <div className="flex flex-col gap-2.5">
                  {featuredTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/dich-vu-xe-du-lich/${tour.slug}`}
                      className="flex items-center justify-between p-3.5 rounded-custom-md transition-colors group hover:border-[color-mix(in_srgb,var(--page-accent)_40%,transparent)]"
                      style={{
                        backgroundColor: "var(--page-bg)",
                        border: "1px solid var(--page-border)"
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="text-sm font-bold transition-colors"
                          style={{ color: "var(--page-text)" }}
                        >
                          {tour.name}
                        </span>
                        <span className="text-xs font-medium" style={{ color: "var(--page-text-dim)" }}>
                          {tour.duration}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4" style={{ color: "var(--page-text-dim)" }} />
                    </Link>
                  ))}
                </div>

                {/* CTA đơn giản hơn — chỉ 1 nút */}
                <Link href="/dich-vu-xe-du-lich">
                  <Button
                    variant="outline"
                    className="font-bold w-full sm:w-auto"
                    style={{
                      borderColor: "color-mix(in srgb, var(--page-accent) 40%, transparent)",
                      color: "var(--page-accent)"
                    }}
                  >
                    Xem dịch vụ xe du lịch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Image side */}
              <div
                className="relative rounded-custom-lg overflow-hidden aspect-video lg:aspect-square border"
                style={{ borderColor: "var(--page-border)" }}
              >
                <Image
                  src="/assets/images/brand/huecartour.png"
                  alt="HUECARTOUR – Dịch vụ xe du lịch tại Huế"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-custom-full"
                    style={{
                      color: "var(--page-accent)",
                      backgroundColor: "color-mix(in srgb, var(--page-accent) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--page-accent) 20%, transparent)"
                    }}
                  >
                    HUECARTOUR
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ============================================================
            11. FAQ
            ============================================================ */}
        <section id="faq" className="py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <SectionHeading
              eyebrow="GIẢI ĐÁP THẮC MẮC"
              title="Câu hỏi thường gặp"
              description="Giải đáp nhanh các thắc mắc phổ biến nhất."
              darkTheme={false}
            />
            <FaqAccordion items={autospaFaq} />
          </Container>
        </section>

        {/* ============================================================
            12. LIÊN HỆ & GOOGLE MAPS — Compact, không lặp nút call
            ============================================================ */}
        <section
          id="lien-he"
          className="py-14 sm:py-20 border-t scroll-mt-20"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <SectionHeading
              eyebrow="KẾT NỐI VỚI CHÚNG TÔI"
              title="Tìm chúng tôi tại đây"
              darkTheme={false}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Contact info box — compact */}
              <div
                className="p-5 sm:p-6 rounded-custom-lg space-y-5 border"
                style={{
                  backgroundColor: "var(--page-surface-2)",
                  borderColor: "var(--page-border)"
                }}
              >
                <h3 className="text-base font-extrabold pb-3 border-b" style={{ color: "var(--page-text)", borderColor: "var(--page-border)" }}>
                  Tiến Quốc Auto Spa
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--page-text-muted)" }}>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                    <span>{autospaContact.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                    <a
                      href={`tel:${autospaContact.hotlineRaw}`}
                      className="font-bold text-base transition-colors"
                      style={{ color: "var(--page-primary-alt)" }}
                    >
                      {autospaContact.hotlineDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                    <div className="flex flex-col">
                      <span className="font-semibold" style={{ color: "var(--page-text)" }}>
                        {autospaContact.workingHours.hours}
                      </span>
                      <span className="text-xs" style={{ color: "var(--page-text-dim)" }}>
                        {autospaContact.workingHours.days}
                      </span>
                    </div>
                  </li>
                </ul>

                {/* Chỉ 1 CTA: Chỉ đường (vì Call và Đặt lịch đã có floating/bottom nav) */}
                <a
                  href={autospaContact.googleMapsDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full font-bold flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Xem trên Google Maps
                  </Button>
                </a>
              </div>

              {/* Google Maps */}
              <div className="lg:col-span-2">
                <GoogleMap
                  embedUrl={autospaContact.googleMapsEmbedUrl}
                  directionUrl={autospaContact.googleMapsDirectionUrl}
                  address={autospaContact.address}
                  title="Tiến Quốc Auto Spa – 147 Phùng Quán, TP Huế"
                />
              </div>
            </div>
          </Container>
        </section>

      </div>
    </>
  );
}
