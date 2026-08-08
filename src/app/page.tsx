// ============================================================
// src/app/page.tsx
// Trang chủ TIẾN QUỐC AUTO SPA — Server Component
// SEO: LocalBusiness + AutoRepair + FAQPage
// High Contrast Dark Theme — Đảm bảo chữ trắng/slate sáng rõ nét 100%
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

      <div className="flex flex-col bg-[#050A12] text-[#F8FAFC]">

        {/* ============================================================
            1. HERO — Tiến Quốc Auto Spa
            ============================================================ */}
        <section
          className="relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#030810] via-[#050A12] to-[#07111F] z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.15)_0%,transparent_60%)] z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,200,255,0.08)_0%,transparent_50%)] z-0 pointer-events-none" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#168BFF 1px, transparent 1px), linear-gradient(90deg, #168BFF 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          <Container className="relative z-10 py-20 sm:py-28 md:py-36">
            <div className="max-w-3xl flex flex-col gap-6">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#38BDF8] uppercase bg-[#168BFF]/15 border border-[#168BFF]/30 px-4 py-2 rounded-custom-full w-fit">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                TRUNG TÂM CHĂM SÓC Ô TÔ TẠI HUẾ
              </span>

              {/* H1 — duy nhất trên trang */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15]"
              >
                Bảo dưỡng đúng,{" "}
                <span className="text-gradient-blue">chăm xe kỹ</span>,{" "}
                <br className="hidden sm:inline" />
                lái xe an tâm
              </h1>

              {/* Mô tả */}
              <p className="text-sm sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed font-normal">
                {autospaBrand.description} Kỹ thuật viên lành nghề, thiết bị chuyên dụng,
                báo giá minh bạch trước khi thực hiện.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="#dat-lich">
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto bg-[#38BDF8] text-[#020617] hover:bg-[#60A5FA] glow-primary"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Đặt lịch kiểm tra xe
                  </Button>
                </a>
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto font-bold text-[#F8FAFC] border-slate-700 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi {autospaContact.hotlineDisplay}
                  </Button>
                </a>
              </div>

              {/* Info pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: <MapPin className="w-3.5 h-3.5" />, text: "147 Phùng Quán, TP Huế" },
                  { icon: <Clock className="w-3.5 h-3.5" />, text: "07:30 – 18:00" },
                  { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Tất cả các ngày trong tuần" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 text-xs text-[#CBD5E1] bg-white/5 border border-white/10 px-3 py-1.5 rounded-custom-full font-medium"
                  >
                    <span className="text-[#38BDF8]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ============================================================
            2. THANH CAM KẾT
            ============================================================ */}
        <section className="border-y border-slate-800 bg-[#07111F]">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-800">
              {[
                { icon: <UserCheck className="w-5 h-5" />, label: "Kỹ thuật viên chuyên nghiệp", sub: "Được đào tạo bài bản" },
                { icon: <Receipt className="w-5 h-5" />, label: "Báo giá minh bạch", sub: "Kiểm tra trước khi làm" },
                { icon: <Clock className="w-5 h-5" />, label: "07:30 – 18:00", sub: "Mở cửa tất cả các ngày" },
                { icon: <ShieldCheck className="w-5 h-5" />, label: "Cam kết chất lượng", sub: "Không phát sinh chi phí" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 p-5 sm:p-6"
                >
                  <div className="w-10 h-10 rounded-custom-full bg-[#168BFF]/15 flex items-center justify-center text-[#38BDF8] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] leading-tight">{item.label}</span>
                    <span className="text-[10px] sm:text-xs text-[#94A3B8] mt-0.5 font-medium">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            3. DỊCH VỤ NỔI BẬT
            ============================================================ */}
        <section id="dich-vu" className="py-16 sm:py-20 md:py-24 scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="DỊCH VỤ CỦA CHÚNG TÔI"
              title="Dịch vụ chăm sóc ô tô toàn diện"
              description="Từ rửa xe chi tiết, vệ sinh nội thất đến phủ ceramic, dán phim cách nhiệt — mọi nhu cầu chăm sóc xe đều được đáp ứng chuyên nghiệp."
              darkTheme={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/dich-vu/${service.slug}`}
                  className="group p-6 bg-[#0E1726] border border-slate-800 rounded-custom-lg flex flex-col gap-4 hover:border-[#38BDF8]/50 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-custom-lg bg-[#168BFF]/15 flex items-center justify-center text-[#38BDF8] flex-shrink-0 group-hover:bg-[#168BFF]/25 transition-colors">
                      <ServiceIcon name={service.iconName} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#F8FAFC] leading-tight">
                        {service.name}
                      </h3>
                      <span className="text-xs text-[#94A3B8] font-medium">
                        {service.priceLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/80">
                    <ul className="flex flex-col gap-1">
                      {service.items.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]"
                        >
                          <CheckCircle className="w-3 h-3 text-[#38BDF8] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ArrowRight className="w-4 h-4 text-[#60A5FA] group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/dich-vu">
                <Button
                  variant="outline"
                  className="font-bold flex items-center justify-center gap-2 mx-auto border-slate-700 text-[#F8FAFC] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#1E293B]"
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
        <section className="py-16 sm:py-20 bg-[#07111F] border-y border-slate-800">
          <Container>
            <SectionHeading
              eyebrow="TẠI SAO CHỌN CHÚNG TÔI"
              title="Cam kết chất lượng dịch vụ tốt nhất tại Huế"
              description="Tiến Quốc Auto Spa không chỉ rửa xe – chúng tôi chăm sóc xe của bạn như chăm sóc xe của chính mình."
              darkTheme={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {autospaWhyItems.map((item) => {
                const Icon = iconMap[item.iconName] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="p-6 rounded-custom-lg border border-slate-800 bg-[#050A12] hover:border-[#38BDF8]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-custom-md bg-[#168BFF]/15 flex items-center justify-center text-[#38BDF8] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#F8FAFC] mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
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
        <section id="quy-trinh" className="py-16 sm:py-20 scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="QUY TRÌNH LÀM VIỆC"
              title="Tiếp nhận chuyên nghiệp, minh bạch từng bước"
              description="5 bước quy trình chuẩn giúp bạn biết rõ xe mình đang được làm gì, chi phí bao nhiêu và hoàn thành khi nào."
              darkTheme={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4">
              {autospaProcess.map((step) => {
                const Icon = iconMap[step.iconName] ?? Wrench;
                return (
                  <div key={step.step} className="relative flex flex-col gap-4 p-5 bg-[#0E1726] border border-slate-800 rounded-custom-lg">
                    {/* Step number */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-extrabold text-gradient-blue">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <div className="w-8 h-8 rounded-custom-md bg-[#168BFF]/15 flex items-center justify-center text-[#38BDF8]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#F8FAFC] leading-tight">{step.title}</h4>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ============================================================
            6. GÓI DỊCH VỤ
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-[#07111F] border-y border-slate-800">
          <Container>
            <SectionHeading
              eyebrow="GÓI DỊCH VỤ ĐỀ XUẤT"
              title="Chọn gói phù hợp với nhu cầu của bạn"
              description="Từ chăm sóc cơ bản hàng tuần đến gói nâng cấp toàn diện — liên hệ để nhận báo giá theo dòng xe."
              darkTheme={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {autospaPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col p-6 rounded-custom-lg border ${
                    pkg.isPopular
                      ? "border-[#38BDF8] bg-[#050A12]"
                      : "border-slate-800 bg-[#050A12]/80"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#38BDF8] text-[#020617] text-xs font-extrabold px-4 py-1 rounded-custom-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Phổ biến nhất
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{pkg.name}</h3>
                  <p className="text-sm text-[#CBD5E1] mb-4 leading-relaxed font-normal">{pkg.description}</p>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {pkg.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                        <CheckCircle className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                    <span className="text-sm text-[#94A3B8] font-medium">{pkg.priceLabel}</span>
                    <a href="#dat-lich">
                      <Button
                        variant={pkg.isPopular ? "secondary" : "outline"}
                        className={`w-full font-bold ${
                          pkg.isPopular
                            ? "bg-[#38BDF8] text-[#020617] hover:bg-[#60A5FA]"
                            : "border-slate-700 text-[#F8FAFC] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#1E293B]"
                        }`}
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
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="HÌNH ẢNH THỰC TẾ"
              title="Kết quả từ garage của chúng tôi"
              description="Hình ảnh xe trước và sau khi chăm sóc tại Tiến Quốc Auto Spa."
              darkTheme={true}
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
                  className="relative aspect-video rounded-custom-lg overflow-hidden bg-[#0E1726] border border-slate-800"
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
          className="py-16 sm:py-20 bg-[#07111F] border-y border-slate-800 scroll-mt-20"
        >
          <Container cleanWidth>
            <AutoSpaBookingForm />
          </Container>
        </section>

        {/* ============================================================
            9. ĐÁNH GIÁ KHÁCH HÀNG
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Ý KIẾN KHÁCH HÀNG"
              title="Khách hàng nói gì về chúng tôi"
              description="Sự hài lòng của quý khách là động lực lớn nhất để chúng tôi không ngừng nâng cao chất lượng dịch vụ."
              darkTheme={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Anh Hoàng Minh",
                  type: "Phủ Ceramic",
                  text: "Xe mình được phủ Ceramic và chăm sóc nội thất cực kỳ kỹ lưỡng. Thợ tay nghề cao, làm xong bóng như gương. Rất hài lòng với dịch vụ ở đây.",
                },
                {
                  name: "Chị Lan Phương",
                  type: "Vệ sinh nội thất",
                  text: "Mình đem xe đi vệ sinh nội thất chuyên sâu, ghế da sạch bóng, mùi khử hết hoàn toàn. Giá hợp lý, nhân viên nhiệt tình. Sẽ quay lại lần sau.",
                },
                {
                  name: "Anh Văn Tùng",
                  type: "Bảo dưỡng định kỳ",
                  text: "Tiến Quốc Auto Spa làm việc rất bài bản. Kiểm tra xe xong mới báo giá, không ép dịch vụ thêm. Mình tin tưởng và đã giới thiệu cho nhiều bạn bè.",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="p-6 bg-[#0E1726] border border-slate-800 rounded-custom-lg space-y-4"
                >
                  <div className="flex text-[#FACC15] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed italic font-normal">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F8FAFC]">{review.name}</span>
                    <span className="text-[#94A3B8] font-medium">{review.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================================================
            10. SECTION PHỤ — HUECARTOUR (Dịch vụ bổ sung)
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-[#07111F] border-y border-slate-800">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text side */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-bold tracking-widest text-[#FACC15] uppercase bg-[#FACC15]/10 border border-[#FACC15]/20 px-3.5 py-1.5 rounded-custom-full w-fit">
                  DỊCH VỤ BỔ SUNG
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] leading-tight">
                  Cần xe du lịch tại Huế?
                </h2>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
                  Bên cạnh dịch vụ chăm sóc và bảo dưỡng ô tô, chúng tôi còn hỗ trợ
                  xe du lịch, đưa đón sân bay và tour riêng tại Huế qua{" "}
                  <strong className="text-[#FACC15]">HUECARTOUR</strong>.
                </p>

                {/* 3 tour nổi bật */}
                <div className="flex flex-col gap-3">
                  {featuredTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/dich-vu-xe-du-lich/${tour.slug}`}
                      className="flex items-center justify-between p-3.5 bg-[#050A12] border border-slate-800 rounded-custom-md hover:border-[#FACC15]/40 transition-colors group"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                          {tour.name}
                        </span>
                        <span className="text-xs text-[#94A3B8] font-medium">{tour.duration}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#FACC15] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/dich-vu-xe-du-lich">
                    <Button
                      variant="outline"
                      className="font-bold border-[#FACC15]/40 text-[#FACC15] hover:bg-[#FACC15]/10 hover:border-[#FACC15] w-full sm:w-auto"
                    >
                      Xem dịch vụ xe du lịch
                    </Button>
                  </Link>
                  <a href={`tel:${autospaContact.hotlineRaw}`}>
                    <Button
                      variant="outline"
                      className="font-bold border-slate-700 text-[#F8FAFC] hover:border-slate-500 w-full sm:w-auto"
                    >
                      Liên hệ đặt xe
                    </Button>
                  </a>
                </div>
              </div>

              {/* Image side */}
              <div className="relative rounded-custom-lg overflow-hidden aspect-video lg:aspect-square border border-slate-800">
                <Image
                  src="/assets/images/brand/huecartour.png"
                  alt="HUECARTOUR – Dịch vụ xe du lịch tại Huế"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold text-[#FACC15] uppercase tracking-widest bg-[#FACC15]/10 border border-[#FACC15]/20 px-3 py-1 rounded-custom-full">
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
        <section id="faq" className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="GIẢI ĐÁP THẮC MẮC"
              title="Câu hỏi thường gặp"
              description="Giải đáp nhanh các thắc mắc phổ biến nhất từ khách hàng khi sử dụng dịch vụ chăm sóc xe tại Huế."
              darkTheme={true}
            />
            <FaqAccordion items={autospaFaq} />
          </Container>
        </section>

        {/* ============================================================
            12. LIÊN HỆ & GOOGLE MAPS
            ============================================================ */}
        <section id="lien-he" className="py-16 sm:py-20 bg-[#07111F] border-t border-slate-800 scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="KẾT NỐI VỚI CHÚNG TÔI"
              title="Thông tin liên hệ"
              darkTheme={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Contact info box */}
              <div className="p-6 sm:p-8 bg-[#0E1726] border border-slate-800 rounded-custom-lg space-y-6">
                <h3 className="text-lg font-extrabold text-[#F8FAFC] pb-3 border-b border-slate-800">
                  Tiến Quốc Auto Spa
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#F8FAFC] block">Địa chỉ:</span>
                      <span>{autospaContact.address}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#F8FAFC] block">Hotline:</span>
                      <a
                        href={`tel:${autospaContact.hotlineRaw}`}
                        className="font-bold text-[#38BDF8] text-base hover:text-[#60A5FA] transition-colors"
                      >
                        {autospaContact.hotlineDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#F8FAFC] block">Giờ làm việc:</span>
                      <span>{autospaContact.workingHours.hours}</span>
                      <span className="block text-xs text-[#94A3B8] font-medium">
                        {autospaContact.workingHours.days}
                      </span>
                    </div>
                  </li>
                </ul>

                {/* Action buttons */}
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-800">
                  <a href={`tel:${autospaContact.hotlineRaw}`}>
                    <Button variant="secondary" className="w-full font-bold flex items-center justify-center gap-2 bg-[#38BDF8] text-[#020617] hover:bg-[#60A5FA]">
                      <Phone className="w-4 h-4" />
                      Gọi ngay
                    </Button>
                  </a>
                  <a
                    href={autospaContact.googleMapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full font-bold border-slate-700 text-[#F8FAFC] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#1E293B] flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Xem trên Maps
                    </Button>
                  </a>
                </div>
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
