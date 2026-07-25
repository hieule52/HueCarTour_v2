// ============================================================
// src/app/auto-spa/page.tsx
// Trang Tiến Quốc Auto Spa - Theme Tối, Công Nghệ, Ánh Sáng Xanh Điện
// ============================================================

"use client";

import React from "react";
import Image from "next/image";
import {
  Wrench,
  Settings,
  Sparkles,
  Shield,
  ClipboardCheck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  UserCheck,
  Cpu,
  Receipt,
  Award,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sun,
  Layers,
  Palette,
  Tv,
  Music,
  Truck,
  Wind,
  Car,
  ScanSearch,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { GoogleMap } from "@/components/common/GoogleMap";
import { JsonLd } from "@/components/common/JsonLd";
import { AutoSpaBookingForm } from "@/components/autospa/AutoSpaBookingForm";
import {
  autospaBrand,
  autospaServices,
  autospaPackages,
  autospaProcess,
  autospaWhyItems,
  autospaFaq,
} from "@/data/autospa";
import { autospaContact } from "@/data/site";

export default function AutoSpaPage() {
  const allServices = autospaServices;

  const handleBookingScroll = () => {
    const el = document.getElementById("dat-lich");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const renderIcon = (name: string) => {
    const props = { className: "w-5 h-5" };
    switch (name) {
      case "wrench":
        return <Wrench {...props} />;
      case "settings":
        return <Settings {...props} />;
      case "sparkles":
        return <Sparkles {...props} />;
      case "shield":
        return <Shield {...props} />;
      case "clipboard-check":
        return <ClipboardCheck {...props} />;
      case "check-circle":
        return <CheckCircle {...props} />;
      case "clock":
        return <Clock {...props} />;
      case "map-pin":
        return <MapPin {...props} />;
      case "phone":
        return <Phone {...props} />;
      case "user-check":
        return <UserCheck {...props} />;
      case "cpu":
        return <Cpu {...props} />;
      case "receipt":
        return <Receipt {...props} />;
      case "award":
        return <Award {...props} />;
      case "heart-handshake":
        return <HeartHandshake {...props} />;
      case "shield-check":
        return <ShieldCheck {...props} />;
      case "sun":
        return <Sun {...props} />;
      case "layers":
        return <Layers {...props} />;
      case "palette":
        return <Palette {...props} />;
      case "zap":
        return <Zap {...props} />;
      case "tv":
        return <Tv {...props} />;
      case "music":
        return <Music {...props} />;
      case "truck":
        return <Truck {...props} />;
      case "wind":
        return <Wind {...props} />;
      case "car":
        return <Car {...props} />;
      case "scan-search":
        return <ScanSearch {...props} />;
      default:
        return <Wrench {...props} />;
    }
  };

  // Cấu trúc Schema LocalBusiness cho Auto Spa
  const spaSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": autospaBrand.name,
    "description": autospaBrand.description,
    "image": "/assets/images/brand/autospa_logoIcon.png",
    "telephone": autospaContact.hotlineRaw,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": autospaContact.address,
      "addressLocality": "Huế",
      "addressCountry": "VN",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "07:30",
      "closes": "18:00",
    },
  };

  return (
    // Áp dụng lớp theme-autospa để thay đổi toàn bộ biến CSS của trang này thành Dark Theme
    <div className="theme-autospa bg-bg-app text-text-primary min-h-screen flex flex-col gap-20 sm:gap-24 md:gap-28 pb-16">
      <JsonLd data={spaSchema} />

      {/* 1. HERO SECTION (Theme Tối, Công nghệ, Ánh sáng xanh điện) */}
      <section className="relative bg-[#050a12] text-white overflow-hidden py-20 sm:py-28 md:py-36">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,139,255,0.08)_0%,rgba(5,10,18,1)_80%)] z-0" />
        
        {/* Neon light source (Accent) */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(0,200,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl flex flex-col gap-6 text-left">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-custom-full w-fit flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-secondary animate-pulse" />
              CHĂM SÓC XE CHUYÊN NGHIỆP TẠI HUẾ
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Bảo dưỡng đúng, chăm xe kỹ, <br className="hidden sm:inline" />
              <span className="text-secondary">lái xe an tâm</span>
            </h1>

            <p className="text-sm sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              Dịch vụ chăm sóc xe hơi chuyên sâu, nâng cấp phụ kiện điện tử, rửa xe chi tiết, phim cách nhiệt, bọc da 360° &amp; cứu hộ lốp/ắc quy 24/24 tại Huế.
            </p>

            {/* Đặc quyền Giao nhận xe tại nhà */}
            <div className="p-4 rounded-custom-md bg-[#168BFF]/10 border border-[#168BFF]/30 flex items-center gap-3 text-xs sm:text-sm text-white max-w-xl">
              <Car className="w-6 h-6 text-[#00C8FF] flex-shrink-0" />
              <div>
                <span className="font-bold text-[#00C8FF]">Đặc quyền tiện lợi:</span> Bên em có dịch vụ <span className="font-bold text-white">giao nhận xe tại nhà</span>, quý khách chỉ cần ALO hotline!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="primary"
                className="font-bold flex items-center justify-center gap-2"
                onClick={handleBookingScroll}
              >
                Đặt lịch chăm xe ngay
              </Button>
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-custom-md border border-gray-700 bg-transparent text-white font-bold text-sm hover:bg-white/5 hover:border-gray-600 transition-colors h-11"
              >
                Gọi Hotline: {autospaContact.hotlineDisplay}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DỊCH VỤ CHÍNH (Hiển thị đầy đủ 12 dịch vụ thực tế) */}
      <section id="dich-vu-spa">
        <Container>
          <SectionHeading
            eyebrow="DANH MỤC DỊCH VỤ DÙNG XE HƠI"
            title="Tất cả các dịch vụ Tiến Quốc AutoSpa"
            description="Cung cấp đầy đủ các giải pháp chăm sóc, làm đẹp, độ xe & cứu hộ 24/24 cho xế yêu của bạn."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allServices.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col bg-bg-surface border-border-custom hover:shadow-custom-md overflow-hidden justify-between group"
              >
                <div>
                  {/* Khung chứa hình ảnh dịch vụ (Sẵn sàng để nạp ảnh thực tế) */}
                  <div className="relative w-full aspect-[16/10] bg-bg-surface-muted border-b border-border-custom/50 overflow-hidden">
                    {/* Placeholder khung hình ảnh chờ nạp */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1424] p-4 text-center text-slate-400 text-xs">
                      <Sparkles className="w-6 h-6 text-[#00C8FF]/50 mb-1.5" />
                      <span className="font-semibold text-slate-300">Hình ảnh {service.name}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">(Khung chờ nạp hình ảnh)</span>
                    </div>

                    {service.imageSrc && (
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}

                    {service.featured && (
                      <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] uppercase font-bold shadow-custom-sm">
                        Nổi bật
                      </Badge>
                    )}
                  </div>

                  {/* Nội dung chi tiết dịch vụ */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-custom-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-text-on-primary transition-colors">
                        {renderIcon(service.iconName)}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 pt-2 text-xs text-text-secondary">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-bg-surface-muted/50 border-t border-border-custom/50 flex items-center justify-between text-xs">
                  <span className="text-text-secondary font-medium">{service.priceLabel}</span>
                  <button
                    onClick={handleBookingScroll}
                    className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Tư vấn &amp; Đặt lịch <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. GÓI DỊCH VỤ ĐỀ XUẤT */}
      <section id="goi-dich-vu" className="bg-bg-surface-muted/30 py-16 sm:py-20 border-y border-border-custom">
        <Container>
          <SectionHeading
            eyebrow="GÓI DỊCH VỤ KHUYẾN NGHỊ"
            title="Các gói chăm sóc xe tối ưu chi phí"
            description="Tổng hợp các hạng mục được ghép gói khoa học giúp phục hồi và bảo vệ xe toàn diện nhất."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {autospaPackages.map((pkg) => (
              <div key={pkg.id} className="relative flex flex-col group">
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-secondary/20 text-secondary border border-secondary/40 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-custom-full shadow-custom-sm whitespace-nowrap flex items-center gap-1 group-hover:bg-secondary group-hover:text-text-on-secondary transition-colors duration-300">
                      ⭐ Gợi ý nhiều nhất
                    </span>
                  </div>
                )}

                <Card
                  className="flex flex-col justify-between p-6 sm:p-7 bg-bg-surface w-full h-full border border-border-custom group-hover:border-secondary group-hover:shadow-custom-lg transition-all duration-300 pt-7"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-text-primary group-hover:text-primary transition-colors">{pkg.name}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1.5">{pkg.description}</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-text-secondary font-medium border-t border-border-custom/60 pt-4">
                      {pkg.services.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-custom/60 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary font-medium">Chi phí ước lượng:</span>
                      <span className="font-bold text-sm sm:text-base text-secondary">{pkg.priceLabel}</span>
                    </div>
                    <Button
                      onClick={handleBookingScroll}
                      variant="outline"
                      className="w-full text-xs font-bold hover:bg-secondary hover:text-text-on-secondary hover:border-secondary transition-all duration-200"
                    >
                      Đăng ký gói này
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. QUY TRÌNH LÀM VIỆC */}
      <section id="quy-trinh-spa">
        <Container>
          <SectionHeading
            eyebrow="VẬN HÀNH CHUYÊN NGHIỆP"
            title="Quy trình chăm sóc xe 6 bước"
            description="Quy trình tiếp nhận, chẩn đoán lỗi và bàn giao xe tiêu chuẩn đảm bảo sự yên tâm tuyệt đối cho khách hàng."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {autospaProcess.map((item) => (
              <div
                key={item.step}
                className="p-5 bg-bg-surface border border-border-custom rounded-custom-lg flex gap-4"
              >
                <div className="w-10 h-10 rounded-custom-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {renderIcon(item.iconName)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-1.5">
                    <span className="text-secondary font-extrabold text-xs">0{item.step}</span>
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. LÝ DO LỰA CHỌN */}
      <section className="bg-bg-surface-muted/30 py-16 sm:py-20 border-y border-border-custom">
        <Container>
          <SectionHeading
            eyebrow="TÍN NHIỆM & CHẤT LƯỢNG"
            title="Lý do lựa chọn Tiến Quốc Auto Spa"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {autospaWhyItems.map((item, idx) => (
              <Card key={idx} className="p-5 bg-bg-surface border-border-custom flex flex-col gap-3">
                <div className="w-10 h-10 rounded-custom-full bg-secondary/15 flex items-center justify-center text-primary">
                  {renderIcon(item.iconName)}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-text-primary">{item.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FORM ĐẶT LỊCH (Spa Booking Form) */}
      <section id="dat-lich" className="scroll-mt-24">
        <Container cleanWidth>
          <AutoSpaBookingForm />
        </Container>
      </section>

      {/* 7. FAQ GIẢI ĐÁP CỦA SPA */}
      <section id="faq-spa">
        <Container>
          <SectionHeading
            eyebrow="HỎI ĐÁP AUTO SPA"
            title="Các thắc mắc thường gặp"
          />
          <FaqAccordion items={autospaFaq} />
        </Container>
      </section>

      {/* 8. ĐỊA CHỈ & BẢN ĐỒ GOOGLE MAPS */}
      <section id="lien-he-spa" className="scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="VỊ TRÍ GARAGE"
            title="Địa chỉ Tiến Quốc Auto Spa"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="p-6 sm:p-8 bg-bg-surface border border-border-custom rounded-custom-lg space-y-6">
              <h3 className="text-lg font-bold text-text-primary pb-3 border-b border-border-custom">
                TIẾN QUỐC AUTO SPA
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Vị trí garage:</span>
                    <span>{autospaContact.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Hotline đặt hẹn:</span>
                    <a href={`tel:${autospaContact.hotlineRaw}`} className="font-bold text-primary text-base hover:underline">
                      {autospaContact.hotlineDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Thời gian làm việc:</span>
                    <span>{autospaContact.workingHours.days}</span>
                    <span className="block text-xs font-semibold text-text-primary">{autospaContact.workingHours.hours}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <GoogleMap
                embedUrl={autospaContact.googleMapsEmbedUrl}
                directionUrl={autospaContact.googleMapsDirectionUrl}
                address={autospaContact.address}
                title="Vị trí Tiến Quốc Auto Spa"
              />
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
