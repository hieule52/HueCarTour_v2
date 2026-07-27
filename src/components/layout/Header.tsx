// ============================================================
// src/components/layout/Header.tsx
// Header chính — Tiến Quốc Auto Spa là thương hiệu mặc định
// HUECARTOUR không còn là logo chính trong header
// ============================================================

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { mainNav, autospaContact } from "@/data/site";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);


  // Khóa cuộn trang khi menu drawer mở ra
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Đóng menu khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Quản lý Focus khi Drawer mở ra (Accessibility)
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 w-full z-50 backdrop-blur-md bg-[#07111F]/95 text-white border-b border-slate-800/80 shadow-custom-lg transition-colors duration-300">
        <Container>
          <div className="flex items-center justify-between h-18">

            {/* Logo — Tiến Quốc Auto Spa (thương hiệu chính) */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-2"
              aria-label="Tiến Quốc Auto Spa – Trang chủ"
            >
              <Image
                src="/assets/images/brand/autospa_logoIcon.png"
                alt="Tiến Quốc Auto Spa Logo"
                width={200}
                height={56}
                className="h-12 sm:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Điều hướng chính">
              {mainNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    item.href !== "/#dat-lich" &&
                    item.href !== "/#quy-trinh" &&
                    pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-semibold transition-colors focus-visible:outline-2 py-2",
                      isActive
                        ? "text-[#00C8FF] border-b-2 border-[#00C8FF]"
                        : "text-slate-300 hover:text-[#00C8FF]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Hotline Auto Spa */}
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#00C8FF] transition-colors focus-visible:outline-2"
                aria-label={`Gọi Tiến Quốc Auto Spa: ${autospaContact.hotlineDisplay}`}
              >
                <div className="w-9 h-9 rounded-custom-full bg-[#168BFF]/20 text-[#00C8FF] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="text-[10px] font-medium text-slate-400">Hotline</span>
                  <span>{autospaContact.hotlineDisplay}</span>
                </div>
              </a>

              {/* CTA Đặt lịch */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const el = document.getElementById("dat-lich");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-bold flex items-center gap-1.5 glow-primary"
              >
                <CalendarCheck className="w-4 h-4" />
                Đặt lịch
              </Button>
            </div>

            {/* Mobile Actions Toolbar */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                aria-label={`Gọi ${autospaContact.hotlineDisplay}`}
                className="w-10 h-10 rounded-custom-full bg-[#168BFF] text-white flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label={isOpen ? "Đóng menu" : "Mở menu"}
                className="w-10 h-10 rounded-custom-md border bg-[#0E1726] border-slate-800 text-white flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Drawer menu di động */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            ref={menuRef}
            className="relative w-4/5 max-w-sm h-full bg-[#0B1526] text-white border-r border-slate-800 shadow-custom-lg flex flex-col justify-between py-6 px-5 z-10 transition-transform duration-300 ease-out transform translate-x-0"
          >
            <div className="flex flex-col gap-6">
              {/* Header Drawer — Logo Auto Spa */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <Image
                  src="/assets/images/brand/autospa_logoIcon.png"
                  alt="Tiến Quốc Auto Spa"
                  width={160}
                  height={44}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Đóng menu"
                  className="p-1 rounded-custom-md hover:bg-slate-800 text-slate-400 focus-visible:outline-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <nav className="flex flex-col gap-1" aria-label="Menu di động">
                {mainNav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" &&
                      item.href !== "/#dat-lich" &&
                      item.href !== "/#quy-trinh" &&
                      pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-bold py-2.5 px-3 rounded-custom-md transition-colors",
                        isActive
                          ? "bg-[#168BFF]/20 text-[#00C8FF]"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Drawer — CTA + Thông tin */}
            <div className="flex flex-col gap-4 pt-6 border-t border-slate-800">
              {/* CTA Đặt lịch */}
              <Button
                variant="secondary"
                className="w-full font-bold flex items-center justify-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById("dat-lich");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
              >
                <CalendarCheck className="w-4 h-4" />
                Đặt lịch Auto Spa
              </Button>

              {/* Thông tin liên hệ ngắn */}
              <div className="flex flex-col gap-1 text-[11px] text-slate-400 leading-relaxed">
                <div className="font-semibold text-white text-sm">
                  📞 {autospaContact.hotlineDisplay}
                </div>
                <div className="truncate">{autospaContact.address}</div>
                <div>{autospaContact.workingHours.hours} • {autospaContact.workingHours.days}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
