// ============================================================
// src/app/dich-vu/[slug]/page.tsx
// Trang chi tiết dịch vụ Auto Spa
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  CalendarCheck,
  Home,
  ChevronRight,
  Wrench,
  Sparkles,
  ShieldCheck,
  Receipt,
  Award,
  Car,
  Truck,
  Settings,
  Star,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { JsonLd } from "@/components/common/JsonLd";
import {
  getServiceBySlug,
  getAllServices,
  autospaProcess,
} from "@/data/autospa";
import { autospaContact, siteConfig } from "@/data/site";

// ============================================================
// Static params
// ============================================================
export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

// ============================================================
// Metadata
// ============================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Dịch vụ không tồn tại | Tiến Quốc Auto Spa",
    };
  }

  return {
    title: `${service.name} Tại Huế | Tiến Quốc Auto Spa`,
    description:
      service.longDescription ?? service.description,
    alternates: {
      canonical: `${siteConfig.url}/dich-vu/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Tiến Quốc Auto Spa Huế`,
      description: service.description,
      images: [
        {
          url: service.imageSrc,
          alt: service.imageAlt,
        },
      ],
    },
  };
}

const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
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

// ============================================================
// Page
// ============================================================
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const ServiceIcon = iconMap[service.iconName] ?? Wrench;

  // Related services — same featured group, exclude current
  const allServices = getAllServices();
  const related = allServices
    .filter((s) => s.slug !== slug && s.featured)
    .slice(0, 3);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/dich-vu/${service.slug}`,
        name: service.name,
        description: service.longDescription ?? service.description,
        provider: {
          "@type": "LocalBusiness",
          name: "Tiến Quốc Auto Spa",
          url: siteConfig.url,
          telephone: autospaContact.hotlineDisplay,
        },
        areaServed: { "@type": "City", name: "Huế" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dịch vụ",
            item: `${siteConfig.url}/dich-vu`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `${siteConfig.url}/dich-vu/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <nav
          aria-label="Điều hướng phân cấp"
          className="border-b border-slate-800 bg-[#07111F]"
        >
          <Container>
            <ol className="flex items-center gap-1.5 py-3 text-xs text-slate-500 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-[#00C8FF] transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li>
                <Link href="/dich-vu" className="hover:text-[#00C8FF] transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-white font-medium" aria-current="page">
                {service.name}
              </li>
            </ol>
          </Container>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <Container className="relative z-10 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Text */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-custom-lg bg-[#168BFF]/15 flex items-center justify-center text-[#00C8FF]">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-[#00C8FF] uppercase">
                    Tiến Quốc Auto Spa
                  </span>
                </div>

                {/* H1 — duy nhất */}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {service.name}
                </h1>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {service.longDescription ?? service.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/#dat-lich">
                    <Button
                      variant="secondary"
                      className="font-bold flex items-center gap-2 w-full sm:w-auto"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Đặt lịch dịch vụ này
                    </Button>
                  </Link>
                  <a href={`tel:${autospaContact.hotlineRaw}`}>
                    <Button
                      variant="outline"
                      className="font-bold flex items-center gap-2 w-full sm:w-auto border-slate-700 text-slate-300 hover:border-[#168BFF] hover:text-[#00C8FF]"
                    >
                      <Phone className="w-4 h-4" />
                      Gọi {autospaContact.hotlineDisplay}
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 bg-[#07111F] border border-slate-800 rounded-custom-md px-4 py-3">
                  <Receipt className="w-4 h-4 text-[#168BFF] flex-shrink-0" />
                  <span>
                    <strong className="text-white">Báo giá: </strong>
                    {service.priceLabel} — Kiểm tra xe trước khi xác nhận giá.
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-video rounded-custom-lg overflow-hidden border border-border-custom">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Service Items */}
        <section className="py-14 bg-[#07111F] border-y border-slate-800">
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">
              Các hạng mục thực hiện
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 bg-[#050A12]/60 border border-slate-800 rounded-custom-md"
                >
                  <CheckCircle className="w-5 h-5 text-[#168BFF] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-14">
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">
              Quy trình thực hiện
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {autospaProcess.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-bg-surface-2 border border-border-custom rounded-custom-md flex flex-col gap-2"
                >
                  <span className="text-2xl font-extrabold text-gradient-blue">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-[#07111F] to-[#0E1726] border-y border-slate-800">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">
                  Sẵn sàng chăm sóc xe?
                </h3>
                <p className="text-sm text-slate-400">
                  Đặt lịch ngay hoặc gọi để được tư vấn miễn phí.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/#dat-lich">
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Đặt lịch
                  </Button>
                </Link>
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="outline"
                    className="font-bold flex items-center gap-2 w-full sm:w-auto border-slate-700 text-slate-300 hover:border-[#168BFF] hover:text-[#00C8FF]"
                  >
                    <Phone className="w-4 h-4" />
                    {autospaContact.hotlineDisplay}
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-14">
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">
              Câu hỏi thường gặp về dịch vụ này
            </h2>
            <FaqAccordion
              items={[
                {
                  question: `Dịch vụ ${service.name} mất bao lâu?`,
                  answer:
                    "Thời gian phụ thuộc vào tình trạng xe và mức độ dịch vụ. Chúng tôi sẽ thông báo thời gian dự kiến khi nhận xe và kiểm tra.",
                },
                {
                  question: "Giá dịch vụ bao nhiêu?",
                  answer:
                    "Giá được báo sau khi kiểm tra tình trạng xe thực tế. Không có chi phí phát sinh ngoài giá đã thống nhất. Liên hệ hotline để được tư vấn nhanh.",
                },
                {
                  question: "Có cần đặt lịch trước không?",
                  answer:
                    "Nên đặt lịch trước để đảm bảo có ca phù hợp. Bạn có thể đặt qua form, gọi điện hoặc nhắn Zalo.",
                },
                {
                  question: "Xe có được giữ an toàn trong thời gian làm không?",
                  answer:
                    "Garage có camera giám sát 24/7. Với dịch vụ qua đêm, xe được khóa trong khu vực an toàn.",
                },
              ]}
            />
          </Container>
        </section>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="py-14 bg-[#07111F] border-t border-slate-800">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Dịch vụ liên quan
                </h2>
                <Link
                  href="/dich-vu"
                  className="text-sm text-[#168BFF] hover:text-[#00C8FF] transition-colors flex items-center gap-1"
                >
                  Xem tất cả
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((s) => {
                  const RelIcon = iconMap[s.iconName] ?? Wrench;
                  return (
                    <Link
                      key={s.id}
                      href={`/dich-vu/${s.slug}`}
                      className="group p-5 bg-[#050A12]/60 border border-slate-800 rounded-custom-lg hover:border-[#168BFF]/40 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-custom-md bg-[#168BFF]/15 flex items-center justify-center text-[#00C8FF]">
                          <RelIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-[#00C8FF] transition-colors leading-tight">
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {s.description}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-[#168BFF]">
                        Xem chi tiết <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
