// ============================================================
// src/components/layout/Header.tsx
// Header chính — Tiến Quốc Auto Spa
// FIX: Mobile menu dùng CSS visibility thay vì conditional render
// THÊM: Theme Toggle (Dark/Light)
// ============================================================

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarCheck, Moon, Sun } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { mainNav, autospaContact } from "@/data/site";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme, isDark } = useTheme();

  // Đóng menu khi route thay đổi
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
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
        setTimeout(() => {
          (focusableElements[0] as HTMLElement).focus();
        }, 100);
      }
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 w-full z-50 backdrop-blur-md border-b shadow-custom-lg transition-colors duration-300",
          isDark
            ? "bg-[#07111F]/95 text-white border-slate-800/80"
            : "bg-white/95 text-gray-900 border-gray-200/80"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-18">

            {/* Logo */}
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
                      isDark
                        ? isActive
                          ? "text-[#00C8FF] border-b-2 border-[#00C8FF]"
                          : "text-slate-300 hover:text-[#00C8FF]"
                        : isActive
                          ? "text-[#0EA5E9] border-b-2 border-[#0EA5E9]"
                          : "text-gray-600 hover:text-[#0EA5E9]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
                title={isDark ? "Light Mode" : "Dark Mode"}
                className={cn(
                  "w-9 h-9 rounded-custom-full flex items-center justify-center transition-all duration-200 focus-visible:outline-2 hover:scale-105 active:scale-95",
                  isDark
                    ? "bg-slate-800/80 text-yellow-300 hover:bg-slate-700 border border-slate-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                )}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Hotline Auto Spa */}
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-colors focus-visible:outline-2",
                  isDark
                    ? "text-white hover:text-[#00C8FF]"
                    : "text-gray-900 hover:text-[#0EA5E9]"
                )}
                aria-label={`Gọi Tiến Quốc Auto Spa: ${autospaContact.hotlineDisplay}`}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-custom-full flex items-center justify-center",
                    isDark
                      ? "bg-[#168BFF]/20 text-[#00C8FF]"
                      : "bg-[#0EA5E9]/15 text-[#0EA5E9]"
                  )}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className={cn("text-[10px] font-medium", isDark ? "text-slate-400" : "text-gray-500")}>
                    Hotline
                  </span>
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

            {/* Mobile Actions Toolbar: [Theme] [Call] [Menu] */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
                className={cn(
                  "w-10 h-10 rounded-custom-full flex items-center justify-center transition-all duration-200 focus-visible:outline-2 active:scale-95",
                  isDark
                    ? "bg-slate-800/80 text-yellow-300 border border-slate-700"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                )}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Call button */}
              <a
                href={`tel:${autospaContact.hotlineRaw}`}
                aria-label={`Gọi ${autospaContact.hotlineDisplay}`}
                className="w-10 h-10 rounded-custom-full bg-[#168BFF] text-white flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Hamburger — tối thiểu 44x44px */}
              <button
                ref={triggerRef}
                onClick={handleOpen}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label="Mở menu điều hướng"
                style={{ touchAction: "manipulation" }}
                className={cn(
                  "w-11 h-11 rounded-custom-md border flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform focus-visible:outline-2",
                  isDark
                    ? "bg-[#0E1726] border-slate-800 text-white"
                    : "bg-gray-100 border-gray-200 text-gray-800"
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ============================================================
          MOBILE DRAWER — CSS controlled (không dùng conditional render)
          Luôn render trong DOM, dùng visibility + translate để ẩn/hiện
          Tránh problem "nhấn lần đầu không mở" trên iOS Safari
          ============================================================ */}

      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={cn(
          "lg:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Panel */}
      <div
        ref={menuRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng di động"
        className={cn(
          "lg:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm z-[100] flex flex-col justify-between py-6 px-5",
          "transition-transform duration-300 ease-out will-change-transform",
          isDark
            ? "bg-[#0B1526] text-white border-r border-slate-800 shadow-custom-lg"
            : "bg-white text-gray-900 border-r border-gray-200 shadow-custom-lg",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-6">
          {/* Header Drawer */}
          <div className={cn(
            "flex items-center justify-between pb-4 border-b",
            isDark ? "border-slate-800" : "border-gray-200"
          )}>
            <Image
              src="/assets/images/brand/autospa_logoIcon.png"
              alt="Tiến Quốc Auto Spa"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
            />
            <button
              onClick={handleClose}
              aria-label="Đóng menu"
              style={{ touchAction: "manipulation" }}
              className={cn(
                "w-10 h-10 rounded-custom-md flex items-center justify-center focus-visible:outline-2 transition-colors",
                isDark
                  ? "hover:bg-slate-800 text-slate-400"
                  : "hover:bg-gray-100 text-gray-500"
              )}
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
                  onClick={handleClose}
                  className={cn(
                    "text-base font-bold py-3 px-3 rounded-custom-md transition-colors",
                    isDark
                      ? isActive
                        ? "bg-[#168BFF]/20 text-[#00C8FF]"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      : isActive
                        ? "bg-[#0EA5E9]/10 text-[#0EA5E9]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle in Drawer */}
          <div className={cn("pt-3 border-t", isDark ? "border-slate-800" : "border-gray-200")}>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 py-2.5 px-3 rounded-custom-md transition-colors text-sm font-semibold",
                isDark
                  ? "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
              aria-label={isDark ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-300" />
                  <span>Chuyển sang Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-indigo-500" />
                  <span>Chuyển sang Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Drawer — CTA + Thông tin */}
        <div className={cn("flex flex-col gap-4 pt-6 border-t", isDark ? "border-slate-800" : "border-gray-200")}>
          {/* CTA Đặt lịch */}
          <Button
            variant="secondary"
            className="w-full font-bold flex items-center justify-center gap-2"
            onClick={() => {
              handleClose();
              setTimeout(() => {
                const el = document.getElementById("dat-lich");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 320);
            }}
          >
            <CalendarCheck className="w-4 h-4" />
            Đặt lịch Auto Spa
          </Button>

          {/* Thông tin liên hệ ngắn */}
          <div className={cn("flex flex-col gap-1 text-[11px] leading-relaxed", isDark ? "text-slate-400" : "text-gray-500")}>
            <div className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
              📞 {autospaContact.hotlineDisplay}
            </div>
            <div className="truncate">{autospaContact.address}</div>
            <div>{autospaContact.workingHours.hours} • {autospaContact.workingHours.days}</div>
          </div>
        </div>
      </div>
    </>
  );
};
