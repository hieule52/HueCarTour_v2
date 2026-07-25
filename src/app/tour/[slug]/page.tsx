// ============================================================
// src/app/tour/[slug]/page.tsx
// Trang chi tiết từng Tour du lịch - Static Generation đầy đủ
// ============================================================

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, Check, X, ArrowRight, ShieldCheck, Car, HelpCircle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card } from "@/components/common/Card";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { JsonLd } from "@/components/common/JsonLd";
import { BookingForm } from "@/components/booking/BookingForm";
import { TourCard } from "@/components/tour/TourCard";
import { getTourBySlug, getAllTourSlugs, getRelatedTours } from "@/data/huecartour";
import { huecartourContact } from "@/data/site";
import { formatVnd } from "@/lib/currency";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

// 1. Sinh các Static Params cho Next.js Static Site Generation (SSG)
export async function generateStaticParams() {
  const slugs = getAllTourSlugs();
  return slugs;
}

// 2. Tạo Metadata động
export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};

  return {
    title: tour.seo?.title || `${tour.name} - Xe Riêng Đời Mới`,
    description:
      tour.seo?.description ||
      `Chi tiết lịch trình, tuyến đường, điểm tham quan và bảng giá thuê xe du lịch ${tour.name} trọn gói.`,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = getRelatedTours(tour.slug, 3);

  // Cấu trúc dữ liệu có cấu trúc (Schema JSON-LD) cho trang dịch vụ Tour du lịch
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tour.name,
    "description": tour.description,
    "image": tour.imageSrc.startsWith("http") ? tour.imageSrc : `${huecartourContact.zaloUrl}/${tour.imageSrc}`,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "VND",
      "lowPrice": tour.pricing.car_4 || 0,
      "highPrice": tour.pricing.car_16 || 0,
      "offerCount": Object.keys(tour.pricing).length,
    },
  };

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Chèn JSON-LD Schema */}
      <JsonLd data={tourSchema} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tất cả các tour", href: "/tours" },
          { label: tour.name },
        ]}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* Cột trái: Nội dung chi tiết */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tiêu đề & Ảnh bìa */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary leading-tight">
                {tour.name}
              </h1>
              
              <div className="flex items-center gap-4 text-xs sm:text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  Đón tại: {tour.pickupPoint}
                </span>
              </div>

              {/* Ảnh tỉ lệ rộng 16:9 */}
              <div className="relative w-full aspect-[16/9] rounded-custom-lg overflow-hidden bg-bg-surface-muted border border-border-custom shadow-custom-sm">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-text-secondary/50 text-xs">
                  Hình ảnh {tour.name}
                </div>
                <Image
                  src={tour.imageSrc}
                  alt={tour.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div className="space-y-4 bg-bg-surface p-6 rounded-custom-lg border border-border-custom">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary">
                Giới thiệu lịch trình chi tiết
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed whitespace-pre-line">
                {tour.longDescription || tour.description}
              </p>
            </div>

            {/* Danh sách các điểm tham quan */}
            {tour.stops.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-text-primary">
                  Các điểm tham quan dọc hành trình
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.stops.map((stop, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-bg-surface border border-border-custom rounded-custom-lg flex gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-custom-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-text-primary">{stop.name}</h4>
                        {stop.description && (
                          <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                            {stop.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bao gồm & Chưa bao gồm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-bg-surface p-6 rounded-custom-lg border border-border-custom">
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Giá xe đã bao gồm
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-red-700 flex items-center gap-1.5">
                  <X className="w-4 h-4" /> Giá xe chưa bao gồm
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  {tour.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lưu ý giá nếu có */}
            {tour.priceNote && (
              <div className="p-4 rounded-custom-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-blue-800 dark:text-blue-300 text-xs flex gap-2">
                <ShieldCheck className="w-4.5 h-4.5 flex-shrink-0" />
                <span>{tour.priceNote}</span>
              </div>
            )}

            {/* FAQ câu hỏi của tour */}
            {tour.faq && tour.faq.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Câu hỏi thường gặp về hành trình
                </h2>
                <FaqAccordion items={tour.faq} />
              </div>
            )}

          </div>

          {/* Cột phải: Bảng giá & Đặt xe */}
          <div className="space-y-8 lg:sticky lg:top-24">
            
            {/* Bảng giá xe chi tiết */}
            <Card className="p-6 bg-bg-surface space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-text-primary pb-3 border-b border-border-custom flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Bảng Giá Thuê Xe Riêng
              </h3>
              
              <div className="divide-y divide-border-custom">
                {tour.pricing.car_4 && (
                  <div className="flex justify-between items-center py-2.5 text-xs sm:text-sm">
                    <span className="text-text-secondary">Xe 4 chỗ (Sedan/SUV nhỏ)</span>
                    <span className="font-bold text-primary">{formatVnd(tour.pricing.car_4)}</span>
                  </div>
                )}
                {tour.pricing.car_7 && (
                  <div className="flex justify-between items-center py-2.5 text-xs sm:text-sm">
                    <span className="text-text-secondary">Xe 7 chỗ (SUV/MPV)</span>
                    <span className="font-bold text-primary">{formatVnd(tour.pricing.car_7)}</span>
                  </div>
                )}
                {tour.pricing.car_16 && (
                  <div className="flex justify-between items-center py-2.5 text-xs sm:text-sm">
                    <span className="text-text-secondary">Xe 16 chỗ (Xe khách nhỏ)</span>
                    <span className="font-bold text-primary">{formatVnd(tour.pricing.car_16)}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href="#dat-xe-form"
                  className="w-full text-xs font-bold flex items-center justify-center gap-1.5 h-11 px-5 rounded-custom-md bg-primary text-text-on-primary hover:bg-primary-hover transition-colors"
                >
                  Đăng ký đặt xe
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            {/* Biểu mẫu đặt xe nhanh */}
            <div id="dat-xe-form" className="scroll-mt-24">
              <BookingForm />
            </div>

          </div>

        </div>

        {/* Tour liên quan (Tối đa 3 cái) */}
        {relatedTours.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border-custom space-y-8">
            <h2 className="text-lg sm:text-2xl font-bold text-text-primary text-center">
              Các tuyến đường / hành trình tương tự
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedTours.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
