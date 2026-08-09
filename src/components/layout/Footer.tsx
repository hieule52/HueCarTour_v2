// ============================================================
// src/components/layout/Footer.tsx
// Footer — Tiến Quốc Auto Spa làm thương hiệu chính
// THÊM: Theme-aware colors (dark/light)
// ============================================================

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Container } from "../common/Container";
import { siteConfig, autospaContact } from "@/data/site";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer
      className={cn(
        "pt-16 pb-20 lg:pb-12 border-t transition-colors duration-300",
        isDark
          ? "bg-[#030810] text-gray-300 border-slate-800"
          : "bg-gray-900 text-gray-300 border-gray-700"
      )}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">

          {/* Cột 1: Thương hiệu Tiến Quốc Auto Spa */}
          <div className="flex flex-col gap-5">
            <div>
              <Image
                src="/assets/images/brand/autospa_logoIcon.png"
                alt="Tiến Quốc Auto Spa Logo"
                width={200}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trung tâm dịch vụ bảo dưỡng, sửa chữa và chăm sóc xe ô tô chuyên nghiệp tại Huế.
            </p>
            <p className="text-xs text-[#00C8FF] font-semibold italic">
              {siteConfig.slogan}
            </p>
          </div>

          {/* Cột 2: Dịch vụ Auto Spa */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Dịch Vụ Auto Spa
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Bảo dưỡng định kỳ", href: "/dich-vu/bao-duong-dinh-ky" },
                { label: "Sửa chữa chuyên nghiệp", href: "/dich-vu/sua-chua-chuyen-nghiep" },
                { label: "Vệ sinh nội thất chuyên sâu", href: "/dich-vu/ve-sinh-noi-that" },
                { label: "Đánh bóng – Phủ ceramic", href: "/dich-vu/danh-bong-phu-ceramic" },
                { label: "Chăm sóc khoang máy", href: "/dich-vu/ve-sinh-khoang-may" },
                { label: "Rửa xe chi tiết", href: "/dich-vu/rua-xe-chi-tiet-ve-sinh-gam" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#00C8FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/dich-vu"
                  className="text-[#168BFF] hover:text-[#00C8FF] transition-colors font-semibold"
                >
                  Xem tất cả dịch vụ →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Dịch vụ bổ sung HUECARTOUR */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Xe Du Lịch Huế
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dịch vụ bổ sung qua{" "}
              <span className="text-gray-400 font-semibold">HUECARTOUR</span>
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Xe du lịch HUECARTOUR", href: "/dich-vu-xe-du-lich" },
                { label: "Đưa đón sân bay Phú Bài", href: "/dich-vu-xe-du-lich/don-tien-san-bay-phu-bai" },
                { label: "Tour tham quan Huế", href: "/dich-vu-xe-du-lich/hue-city-tour-4-diem" },
                { label: "Xe Huế – Đà Nẵng / Hội An", href: "/dich-vu-xe-du-lich/hue-da-nang-hoi-an" },
                { label: "Xe Huế – Quảng Trị", href: "/dich-vu-xe-du-lich/hue-quang-tri" },
                { label: "Xe Huế – Phong Nha", href: "/dich-vu-xe-du-lich/hue-phong-nha" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#00C8FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Liên Hệ
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#168BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400">
                  {autospaContact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#168BFF] flex-shrink-0" />
                <a
                  href={`tel:${autospaContact.hotlineRaw}`}
                  className="text-white hover:text-[#00C8FF] transition-colors font-bold text-base"
                  aria-label={`Gọi hotline ${autospaContact.hotlineDisplay}`}
                >
                  {autospaContact.hotlineDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#168BFF] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs text-gray-400 leading-normal">
                  <span className="font-semibold text-white">{autospaContact.workingHours.hours}</span>
                  <span>{autospaContact.workingHours.days}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-[#168BFF] flex-shrink-0" />
                <a
                  href={autospaContact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00C8FF] transition-colors"
                >
                  Facebook Tiến Quốc Auto Spa
                </a>
              </li>
              <li>
                <a
                  href={autospaContact.googleMapsDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#168BFF] hover:text-[#00C8FF] transition-colors text-xs font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Xem trên Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            {/* Copyright */}
            <p>
              © {year}{" "}
              <span className="text-gray-400 font-semibold">{siteConfig.displayName}</span>.
              {" "}All rights reserved.
            </p>

            {/* Policy links */}
            <div className="flex items-center gap-4">
              <Link
                href="/chinh-sach-bao-mat"
                className="hover:text-gray-300 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <span className="text-slate-700">|</span>
              <Link
                href="/dieu-khoan-su-dung"
                className="hover:text-gray-300 transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <span className="text-slate-700">|</span>
              <Link
                href="/lien-he"
                className="hover:text-gray-300 transition-colors"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
