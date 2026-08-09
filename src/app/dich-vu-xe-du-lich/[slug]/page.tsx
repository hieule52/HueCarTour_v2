// ============================================================
// src/app/dich-vu-xe-du-lich/[slug]/page.tsx
// Trang chi tiết tuyến xe / tour HUECARTOUR
// Theme-aware: Đồng bộ 100% thương hiệu TIẾN QUỐC AUTO SPA
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Check,
  X,
  ArrowRight,
  Phone,
  Car,
  Shield,
  CalendarCheck,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { JsonLd } from "@/components/common/JsonLd";
import { Button } from "@/components/common/Button";
import { TourCard } from "@/components/tour/TourCard";
import { BookingForm } from "@/components/booking/BookingForm";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import {
  getTourBySlug,
  getAllTourSlugs,
  getRelatedTours,
} from "@/data/huecartour";
import { huecartourContact, siteConfig } from "@/data/site";
import { formatVnd } from "@/lib/currency";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTourSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tuyến xe không tồn tại" };

  const title =
    tour.seo?.title ||
    `${tour.name} – Xe Riêng Tại Huế | HUECARTOUR`;
  const description =
    tour.seo?.description ||
    `Chi tiết lịch trình, điểm tham quan và bảng giá thuê xe ${tour.name}. Xe riêng 4–7–16 chỗ đời mới, tài xế kinh nghiệm.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/dich-vu-xe-du-lich/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: tour.imageSrc, alt: tour.imageAlt }],
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = getRelatedTours(tour.slug, 3);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${siteConfig.url}/dich-vu-xe-du-lich/${slug}`,
        name: tour.name,
        description: tour.longDescription ?? tour.description,
        image: `${siteConfig.url}${tour.imageSrc}`,
        touristType: "VehiclePassenger",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: tour.pricing.car_4 || tour.pricing.car_7,
          highPrice: tour.pricing.car_16,
        },
        provider: {
          "@type": "LocalBusiness",
          name: "Tiến Quốc Auto Spa – HUECARTOUR",
          telephone: huecartourContact.hotlineDisplay,
          url: siteConfig.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Xe du lịch", item: `${siteConfig.url}/dich-vu-xe-du-lich` },
          { "@type": "ListItem", position: 3, name: tour.name, item: `${siteConfig.url}/dich-vu-xe-du-lich/${slug}` },
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
            { label: "Xe du lịch", href: "/dich-vu-xe-du-lich" },
            { label: tour.name },
          ]}
        />

        {/* Main Content */}
        <section className="py-10 sm:py-14" style={{ backgroundColor: "var(--page-bg)" }}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* ====== LEFT — 2/3 ====== */}
              <div className="lg:col-span-2 space-y-8">

                {/* Hero image + title */}
                <div className="space-y-4">
                  <div
                    className="relative aspect-video rounded-2xl overflow-hidden border shadow-md"
                    style={{ backgroundColor: "var(--page-surface-2)", borderColor: "var(--page-border)" }}
                  >
                    <Image
                      src={tour.imageSrc}
                      alt={tour.imageAlt}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tour.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--page-primary-alt) 15%, transparent)",
                          borderColor: "color-mix(in srgb, var(--page-primary-alt) 30%, transparent)",
                          color: "var(--page-primary-alt)"
                        }}
                      >
                        {tag.replace("-", " ")}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "var(--page-text)" }}>
                    {tour.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm" style={{ color: "var(--page-text-muted)" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" style={{ color: "var(--page-primary-alt)" }} />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" style={{ color: "var(--page-primary-alt)" }} />
                      {tour.pickupPoint}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--page-text-muted)" }}>
                    {tour.longDescription ?? tour.description}
                  </p>
                </div>

                {/* Stops */}
                {tour.stops.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold" style={{ color: "var(--page-text)" }}>Các điểm tham quan</h2>
                    <div className="space-y-2">
                      {tour.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl border"
                          style={{
                            backgroundColor: "var(--page-surface-2)",
                            borderColor: "var(--page-border)"
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: "var(--page-primary-alt)",
                              color: "var(--page-bg)"
                            }}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-sm font-bold" style={{ color: "var(--page-text)" }}>{stop.name}</span>
                            {stop.description && (
                              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--page-text-muted)" }}>
                                {stop.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Included / Excluded */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-5 rounded-xl space-y-3 border"
                    style={{
                      backgroundColor: "var(--page-surface-2)",
                      borderColor: "var(--page-border)"
                    }}
                  >
                    <h3 className="text-sm font-bold" style={{ color: "var(--page-text)" }}>✅ Đã bao gồm</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--page-text-muted)" }}>
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="p-5 rounded-xl space-y-3 border"
                    style={{
                      backgroundColor: "var(--page-surface-2)",
                      borderColor: "var(--page-border)"
                    }}
                  >
                    <h3 className="text-sm font-bold" style={{ color: "var(--page-text)" }}>❌ Không bao gồm</h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--page-text-muted)" }}>
                          <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* FAQ */}
                {tour.faq && tour.faq.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold" style={{ color: "var(--page-text)" }}>Câu hỏi thường gặp</h2>
                    <FaqAccordion items={tour.faq} />
                  </div>
                )}
              </div>

              {/* ====== RIGHT — 1/3 (sticky sidebar) ====== */}
              <div className="space-y-4 lg:sticky lg:top-24">

                {/* Bảng giá */}
                <div
                  className="p-6 rounded-2xl shadow-md space-y-4 border"
                  style={{
                    backgroundColor: "var(--page-surface-2)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <h3 className="text-base font-bold" style={{ color: "var(--page-text)" }}>Bảng giá xe riêng</h3>
                  <p className="text-xs italic leading-relaxed" style={{ color: "var(--page-text-dim)" }}>
                    {tour.priceNote}
                  </p>

                  <div className="space-y-2.5">
                    {(
                      [
                        { key: "car_4", label: "Xe 4 chỗ" },
                        { key: "car_7", label: "Xe 7 chỗ" },
                        { key: "car_16", label: "Xe 16 chỗ" },
                      ] as const
                    ).map(({ key, label }) => {
                      const price = tour.pricing[key];
                      if (!price) return null;
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 rounded-xl border"
                          style={{
                            backgroundColor: "var(--page-bg)",
                            borderColor: "var(--page-border)"
                          }}
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--page-text)" }}>
                            <Car className="w-4 h-4" style={{ color: "var(--page-primary-alt)" }} />
                            {label}
                          </span>
                          <span className="text-base font-extrabold" style={{ color: "var(--page-primary-alt)" }}>
                            {formatVnd(price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2 border-t" style={{ borderColor: "var(--page-border)" }}>
                    <a href={`tel:${huecartourContact.hotlineRaw}`}>
                      <Button
                        variant="secondary"
                        className="w-full font-bold flex items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--page-primary-alt)", color: "var(--page-bg)" }}
                      >
                        <Phone className="w-4 h-4" />
                        Gọi đặt xe ngay
                      </Button>
                    </a>
                    <a href="#dat-xe">
                      <Button
                        variant="outline"
                        className="w-full font-bold flex items-center justify-center gap-2"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Nhận báo giá
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Cam kết */}
                <div
                  className="p-5 rounded-2xl space-y-3 border"
                  style={{
                    backgroundColor: "var(--page-surface)",
                    borderColor: "var(--page-border)"
                  }}
                >
                  <h4 className="text-sm font-bold" style={{ color: "var(--page-text)" }}>Cam kết của HUECARTOUR</h4>
                  {[
                    "Báo giá trọn gói, không phụ phí",
                    "Xe đời mới, điều hòa mát",
                    "Tài xế đúng giờ, am hiểu địa phương",
                    "Hỗ trợ 24/7 trong suốt hành trình",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--page-text-muted)" }}>
                      <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--page-primary-alt)" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Form đặt xe */}
        <section
          id="dat-xe"
          className="py-14 sm:py-20 border-t scroll-mt-20"
          style={{ backgroundColor: "var(--page-surface)", borderColor: "var(--page-border)" }}
        >
          <Container>
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--page-text)" }}>
              Đặt xe cho hành trình này
            </h2>
            <BookingForm />
          </Container>
        </section>

        {/* Related tours */}
        {related.length > 0 && (
          <section className="py-14 border-t" style={{ backgroundColor: "var(--page-bg)", borderColor: "var(--page-border)" }}>
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold" style={{ color: "var(--page-text)" }}>Tuyến xe liên quan</h2>
                <Link
                  href="/dich-vu-xe-du-lich"
                  className="text-sm font-semibold transition-colors flex items-center gap-1"
                  style={{ color: "var(--page-primary-alt)" }}
                >
                  Xem tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((t) => (
                  <TourCard key={t.id} tour={t} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
