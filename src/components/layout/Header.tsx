// ============================================================
// src/components/layout/Header.tsx
// Header điều hướng chính: Hỗ trợ chuyển theme, Menu drawer di động đầy đủ
// ============================================================

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Car, MapPin } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { mainNav, huecartourContact, autospaContact } from "@/data/site";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const isSpa = pathname?.startsWith("/auto-spa");
  const contact = isSpa ? autospaContact : huecartourContact;


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
      <header
        className={cn(
          "sticky top-0 w-full z-50 backdrop-blur-md transition-colors duration-300",
          isSpa
            ? "bg-[#07111F]/95 text-white border-b border-slate-800/80 shadow-custom-lg"
            : "bg-bg-surface/90 text-text-primary border-b border-border-custom shadow-custom-sm"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link
              href={isSpa ? "/auto-spa" : "/"}
              className="flex items-center gap-2 group focus-visible:outline-2"
            >
            {isSpa ? (
              <div className="flex items-center">
                <Image
                  src="/assets/images/brand/autospa_logoIcon.png"
                  alt="Tiến Quốc Auto Spa Logo"
                  width={180}
                  height={52}
                  className="h-12 sm:h-13 w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/images/brand/huecartour_logoIcon.png"
                  alt="Hue Car Tours Icon"
                  width={56}
                  height={56}
                  className="h-14 w-auto object-contain flex-shrink-0"
                  priority
                />
                <div className="flex flex-col leading-none gap-1">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-primary">
                    HUE CAR TOURS
                  </span>
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-text-secondary">
                    Xe riêng miền Trung
                  </span>
                </div>
              </div>
            )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {mainNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-semibold transition-colors focus-visible:outline-2 py-2",
                      isSpa
                        ? isActive
                          ? "text-[#00C8FF] border-b-2 border-[#00C8FF]"
                          : "text-slate-300 hover:text-[#00C8FF]"
                        : isActive
                          ? "text-primary border-b-2 border-primary"
                          : "text-text-secondary hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${contact.hotlineRaw}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-colors focus-visible:outline-2",
                  isSpa ? "text-white hover:text-[#00C8FF]" : "text-text-primary hover:text-primary"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-custom-full flex items-center justify-center",
                    isSpa ? "bg-[#168BFF]/20 text-[#00C8FF]" : "bg-primary/10 text-primary"
                  )}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isSpa ? "text-slate-400" : "text-text-secondary"
                    )}
                  >
                    Hotline 24/7
                  </span>
                  <span className="leading-tight">{contact.hotlineDisplay}</span>
                </div>
              </a>

              {/* Nút chuyển đổi nhanh giữa 2 thương hiệu */}
              {isSpa ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/")}
                  className="font-bold border-[#168BFF] text-[#00C8FF] hover:bg-[#168BFF] hover:text-white flex items-center gap-1.5"
                >
                  Đặt Xe Du Lịch
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => (window.location.href = "/auto-spa")}
                  className="font-bold flex items-center gap-1.5"
                >
                  <Car className="w-4 h-4" />
                  Auto Spa
                </Button>
              )}
            </div>

            {/* Mobile Actions Toolbar */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:${contact.hotlineRaw}`}
                aria-label="Gọi hotline"
                className={cn(
                  "w-10 h-10 rounded-custom-full flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform",
                  isSpa ? "bg-[#168BFF] text-white" : "bg-primary text-text-on-primary"
                )}
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label={isOpen ? "Đóng menu" : "Mở menu"}
                className={cn(
                  "w-10 h-10 rounded-custom-md border flex items-center justify-center shadow-custom-sm active:scale-95 transition-transform",
                  isSpa
                    ? "bg-[#0E1726] border-slate-800 text-white"
                    : "bg-bg-surface border-border-custom text-text-primary"
                )}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Drawer menu di động */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" id="mobile-drawer" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            ref={menuRef}
            className={cn(
              "relative w-4/5 max-w-sm h-full shadow-custom-lg flex flex-col justify-between py-6 px-5 z-10 transition-transform duration-300 ease-out transform translate-x-0",
              isSpa ? "bg-[#0B1526] text-white border-r border-slate-800" : "bg-bg-surface text-text-primary"
            )}
          >
            <div className="flex flex-col gap-6">
              {/* Header Drawer */}
              <div
                className={cn(
                  "flex items-center justify-between pb-4 border-b",
                  isSpa ? "border-slate-800" : "border-border-custom"
                )}
              >
                {isSpa ? (
                  <Image
                    src="/assets/images/brand/autospa_logoIcon.png"
                    alt="Tiến Quốc Auto Spa"
                    width={140}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/images/brand/huecartour_logoIcon.png"
                      alt="Hue Car Tours Icon"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain flex-shrink-0"
                    />
                    <span className="font-extrabold text-sm tracking-tight text-primary">
                      HUE CAR TOURS
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Đóng menu"
                  className={cn(
                    "p-1 rounded-custom-md focus-visible:outline-2",
                    isSpa ? "hover:bg-slate-800 text-slate-400" : "hover:bg-bg-surface-muted text-text-secondary"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <nav className="flex flex-col gap-4">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-bold py-2 px-3 rounded-custom-md transition-colors",
                        isSpa
                          ? isActive
                            ? "bg-[#168BFF]/20 text-[#00C8FF]"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          : isActive
                            ? "bg-primary/10 text-primary"
                            : "text-text-secondary hover:bg-bg-surface-muted hover:text-text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Drawer */}
            <div
              className={cn(
                "flex flex-col gap-4 pt-6 border-t",
                isSpa ? "border-slate-800" : "border-border-custom"
              )}
            >
              {isSpa ? (
                <Button
                  variant="outline"
                  className="w-full font-bold border-[#168BFF] text-[#00C8FF] hover:bg-[#168BFF] hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/";
                  }}
                >
                  Đặt Xe Du Lịch
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full font-bold"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/auto-spa";
                  }}
                >
                  Auto Spa Chăm Sóc Xe
                </Button>
              )}

              <div className="flex flex-col gap-1 text-[11px] text-text-secondary leading-relaxed">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{contact.address}</span>
                </div>
                <div className="font-semibold text-text-primary mt-1">
                  Hotline: {contact.hotlineDisplay}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
