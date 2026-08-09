// ============================================================
// src/app/dich-vu/[slug]/page.tsx
// Trang chi tiết dịch vụ Tiến Quốc Auto Spa — Theme-aware
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
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
  CalendarCheck,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { JsonLd } from "@/components/common/JsonLd";
import { Button } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import {
  getServiceBySlug,
  getAllServices,
  autospaProcess,
} from "@/data/autospa";
import { autospaContact, siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Dịch vụ không tồn tại" };

  const title = `${service.name} Tại Huế | Tiến Quốc Auto Spa`;
  const description = service.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/dich-vu/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: service.imageSrc, alt: service.imageAlt }],
    },
  };
}

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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const ServiceIcon = iconMap[service.iconName] ?? Wrench;

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

      <div className="flex flex-col" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dịch vụ", href: "/dich-vu" },
            { label: service.name },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden py-12 sm:py-16" style={{ backgroundColor: "var(--page-bg)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,139,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Text */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-custom-lg flex items-center justify-center"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                      color: "var(--page-primary-alt)"
                    }}
                  >
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--page-primary-alt)" }}>
                    Tiến Quốc Auto Spa
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight" style={{ color: "var(--page-text)" }}>
                  {service.name}
                </h1>

                <p className="text-sm sm:text-base leading-relaxed font-normal" style={{ color: "var(--page-text-muted)" }}>
                  {service.longDescription ?? service.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/#dat-lich">
                    <Button
                      variant="secondary"
                      className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto glow-primary"
                      style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Đặt lịch dịch vụ này
                    </Button>
                  </Link>
                  <a href={`tel:${autospaContact.hotlineRaw}`}>
                    <Button
                      variant="outline"
                      className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Phone className="w-4 h-4" />
                      Gọi {autospaContact.hotlineDisplay}
                    </Button>
                  </a>
                </div>

                <div
                  className="flex items-center gap-2 text-xs rounded-custom-md px-4 py-3 border"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)",
                    color: "var(--page-text-muted)"
                  }}
                >
                  <Receipt className="w-4 h-4 flex-shrink-0" style={{ color: "var(--page-primary-alt)" }} />
                  <span>
                    <strong style={{ color: "var(--page-text)" }}>Báo giá: </strong>
                    {service.priceLabel} — Kiểm tra xe trước khi xác nhận giá.
                  </span>
                </div>
              </div>

              {/* Image */}
              <div
                className="relative aspect-video rounded-custom-lg overflow-hidden border"
                style={{ borderColor: "var(--page-border)" }}
              >
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
        <section
          className="py-14 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold mb-8" style={{ color: "var(--page-text)" }}>
              Các hạng mục thực hiện
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-custom-md border"
                  style={{
                    backgroundColor: "var(--page-bg)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--page-text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-14" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold mb-8" style={{ color: "var(--page-text)" }}>
              Quy trình thực hiện
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {autospaProcess.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-custom-md border flex flex-col gap-2"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <span className="text-2xl font-extrabold text-gradient-blue">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold" style={{ color: "var(--page-text)" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--page-text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Banner */}
        <section
          className="py-14 border-y"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold" style={{ color: "var(--page-text)" }}>
                  Sẵn sàng chăm sóc xe?
                </h3>
                <p className="text-sm" style={{ color: "var(--page-text-muted)" }}>
                  Đặt lịch ngay hoặc gọi để được tư vấn miễn phí.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/#dat-lich">
                  <Button
                    variant="secondary"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                    style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Đặt lịch
                  </Button>
                </Link>
                <a href={`tel:${autospaContact.hotlineRaw}`}>
                  <Button
                    variant="outline"
                    className="font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
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
        <section className="py-14" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <h2 className="text-xl sm:text-2xl font-bold mb-8" style={{ color: "var(--page-text)" }}>
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
          <section
            className="py-14 border-t"
            style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
          >
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--page-text)" }}>
                  Dịch vụ liên quan
                </h2>
                <Link
                  href="/dich-vu"
                  className="text-sm font-semibold transition-colors flex items-center gap-1"
                  style={{ color: "var(--page-primary-alt)" }}
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
                      className="group p-5 rounded-custom-lg border transition-all duration-200"
                      style={{
                        backgroundColor: "var(--page-bg)",
                        borderColor: "var(--page-border)"
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-custom-md flex items-center justify-center"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--page-primary) 15%, transparent)",
                            color: "var(--page-primary-alt)"
                          }}
                        >
                          <RelIcon className="w-4 h-4" />
                        </div>
                        <h3
                          className="text-sm font-bold transition-colors leading-tight"
                          style={{ color: "var(--page-text)" }}
                        >
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--page-text-muted)" }}>
                        {s.description}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color: "var(--page-primary-alt)" }}>
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
