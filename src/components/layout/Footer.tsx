// ============================================================
// src/components/layout/Footer.tsx
// Chân trang hợp nhất cho cả hai thương hiệu HueCarTour & Auto Spa
// ============================================================

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Shield, Clock } from "lucide-react";
import { Container } from "../common/Container";
import { siteConfig, huecartourContact, autospaContact } from "@/data/site";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isSpa = pathname?.startsWith("/auto-spa");

  // Hiển thị thông tin phù hợp với brand hiện hành
  const contact = isSpa ? autospaContact : huecartourContact;

  return (
    <footer className="bg-[#0b1320] text-gray-300 pt-16 pb-20 lg:pb-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {isSpa ? (
                <Image
                  src="/assets/images/brand/autospa_logoIcon.png"
                  alt="Tiến Quốc Auto Spa Logo"
                  width={180}
                  height={52}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <>
                  <Image
                    src="/assets/images/brand/huecartour_logoIcon.png"
                    alt="Hue Car Tours Icon"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain flex-shrink-0"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-extrabold text-lg tracking-tight text-white">
                      HUE CAR TOURS
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-0.5">
                      Xe riêng miền Trung
                    </span>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isSpa
                ? "Dịch vụ bảo dưỡng, sửa chữa ô tô và phủ Ceramic cao cấp hàng đầu tại thành phố Huế. Chăm sóc xe tận tâm, uy tín và chuyên nghiệp."
                : "Dịch vụ thuê xe du lịch riêng có tài xế tại Huế. Chuyên đưa đón sân bay Phú Bài, đi Đà Nẵng, Hội An, Phong Nha và các tour nội thành."}
            </p>
            <p className="text-xs text-gray-500 italic mt-2">
              {isSpa ? "Xe đẹp hơn – Bền lâu hơn" : "An toàn, minh bạch, đúng giờ"}
            </p>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Liên Hệ Chúng Tôi
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href={`tel:${contact.hotlineRaw}`}
                  className="text-white hover:text-secondary transition-colors font-bold"
                >
                  {contact.hotlineDisplay}
                </a>
              </li>
              {"email" in contact && contact.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-secondary transition-colors truncate"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {isSpa && "workingHours" in contact && (
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs text-gray-400 leading-normal">
                    <span className="font-semibold text-white">{contact.workingHours.days}</span>
                    <span>{contact.workingHours.hours}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Liên Kết Nhanh
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  Trang chủ HueCarTour
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-secondary transition-colors">
                  Danh sách Tour du lịch
                </Link>
              </li>
              <li>
                <Link href="/auto-spa" className="hover:text-secondary transition-colors">
                  Tiến Quốc Auto Spa
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-secondary transition-colors">
                  Liên hệ & Báo giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Chính sách & Pháp lý */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Chính sách & Quy định
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/chinh-sach-bao-mat"
                  className="hover:text-secondary transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-4 h-4 text-gray-500" />
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/dieu-khoan-su-dung"
                  className="hover:text-secondary transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-4 h-4 text-gray-500" />
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <span className="text-xs text-gray-500 block leading-relaxed">
                * Tất cả thông tin báo giá trên website mang tính chất tham khảo trực tiếp từ dịch vụ cứng. Vui lòng kết nối Zalo hoặc gọi hotline để xác thực thông tin chính xác nhất.
              </span>
            </div>
          </div>
        </div>

        {/* Bản quyền dưới cùng */}
        <div className="pt-8 border-t border-gray-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.displayName}. All rights reserved.</p>
          <p className="italic">
            Slogan: {siteConfig.slogan}
          </p>
        </div>
      </Container>
    </footer>
  );
};
