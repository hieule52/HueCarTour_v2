// ============================================================
// src/app/dich-vu-xe-du-lich/[slug]/page.tsx
// Trang chi tiết tuyến xe / tour HUECARTOUR
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
  Home,
  ChevronRight,
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

// ============================================================
// Static params
// ============================================================
export async function generateStaticParams() {
  return getAllTourSlugs();
}

// ============================================================
// Metadata
// ============================================================
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

// ============================================================
// Page
// ============================================================
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

      <div className="theme-huecartour flex flex-col">
        {/* Breadcrumb */}
        <nav
          aria-label="Điều hướng phân cấp"
          className="border-b border-[#E4E7EC] bg-white"
        >
          <Container>
            <ol className="flex items-center gap-1.5 py-3 text-xs text-[#667085] flex-wrap">
              <li>
                <Link href="/" className="flex items-center gap-1 hover:text-[#172236] transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li>
                <Link href="/dich-vu-xe-du-lich" className="hover:text-[#172236] transition-colors">
                  Xe du lịch
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-[#101828] font-medium" aria-current="page">
                {tour.name}
              </li>
            </ol>
          </Container>
        </nav>

        {/* Main Content */}
        <section className="py-10 sm:py-14 bg-[#F7F6F1]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* ====== LEFT — 2/3 ====== */}
              <div className="lg:col-span-2 space-y-8">

                {/* Hero image + title */}
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#E4E7EC] shadow-md bg-[#F2F4F7]">
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
                        className="text-[10px] font-bold text-[#172236] uppercase bg-[#E8B923]/20 border border-[#E8B923]/40 px-2.5 py-1 rounded-full"
                      >
                        {tag.replace("-", " ")}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#101828] leading-tight">
                    {tour.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#667085]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#172236]" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#172236]" />
                      {tour.pickupPoint}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                    {tour.longDescription ?? tour.description}
                  </p>
                </div>

                {/* Stops */}
                {tour.stops.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-[#101828]">Các điểm tham quan</h2>
                    <div className="space-y-2">
                      {tour.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-white border border-[#E4E7EC] rounded-xl"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#172236] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#101828]">{stop.name}</span>
                            {stop.description && (
                              <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">
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
                  <div className="p-5 bg-white border border-[#E4E7EC] rounded-xl space-y-3">
                    <h3 className="text-sm font-bold text-[#101828]">✅ Đã bao gồm</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#667085]">
                          <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-white border border-[#E4E7EC] rounded-xl space-y-3">
                    <h3 className="text-sm font-bold text-[#101828]">❌ Không bao gồm</h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#667085]">
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
                    <h2 className="text-lg font-bold text-[#101828]">Câu hỏi thường gặp</h2>
                    <FaqAccordion items={tour.faq} />
                  </div>
                )}
              </div>

              {/* ====== RIGHT — 1/3 (sticky sidebar) ====== */}
              <div className="space-y-4 lg:sticky lg:top-24">

                {/* Bảng giá */}
                <div className="p-6 bg-white border border-[#E4E7EC] rounded-2xl shadow-md space-y-4">
                  <h3 className="text-base font-bold text-[#101828]">Bảng giá xe riêng</h3>
                  <p className="text-xs text-[#667085] italic leading-relaxed">
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
                          className="flex items-center justify-between p-3 bg-[#F7F6F1] rounded-xl"
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold text-[#101828]">
                            <Car className="w-4 h-4 text-[#172236]" />
                            {label}
                          </span>
                          <span className="text-base font-extrabold text-[#172236]">
                            {formatVnd(price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2 border-t border-[#E4E7EC]">
                    <a href={`tel:${huecartourContact.hotlineRaw}`}>
                      <Button
                        variant="secondary"
                        className="w-full font-bold flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Gọi đặt xe ngay
                      </Button>
                    </a>
                    <a href="#dat-xe">
                      <Button
                        variant="outline"
                        className="w-full font-bold flex items-center justify-center gap-2 border-[#172236]/20 text-[#172236] hover:bg-[#172236] hover:text-white"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Nhận báo giá
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Cam kết */}
                <div className="p-5 bg-[#172236] rounded-2xl space-y-3">
                  <h4 className="text-sm font-bold text-white">Cam kết của HUECARTOUR</h4>
                  {[
                    "Báo giá trọn gói, không phụ phí",
                    "Xe đời mới, điều hòa mát",
                    "Tài xế đúng giờ, am hiểu địa phương",
                    "Hỗ trợ 24/7 trong suốt hành trình",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-[#E8B923] flex-shrink-0 mt-0.5" />
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
          className="py-14 sm:py-20 bg-white border-t border-[#E4E7EC] scroll-mt-20"
        >
          <Container>
            <h2 className="text-2xl font-bold text-[#101828] mb-8 text-center">
              Đặt xe cho hành trình này
            </h2>
            <BookingForm />
          </Container>
        </section>

        {/* Related tours */}
        {related.length > 0 && (
          <section className="py-14 bg-[#F7F6F1] border-t border-[#E4E7EC]">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#101828]">Tuyến xe liên quan</h2>
                <Link
                  href="/dich-vu-xe-du-lich"
                  className="text-sm text-[#172236] font-semibold hover:text-[#E8B923] transition-colors flex items-center gap-1"
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
