// ============================================================
// src/components/common/MobileContactBar.tsx
// Thanh liên hệ cố định dưới cùng màn hình (Sticky Bottom Bar) Mobile
// Mặc định: Gọi, Zalo, Đặt lịch, Chỉ đường (Auto Spa)
// Trang /dich-vu-xe-du-lich: Gọi, Zalo, Báo giá, Messenger (HUECARTOUR)
// FIX: Zalo icon lớn hơn, safe-area, vùng bấm 44px, theme-aware
// ============================================================

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, MapPin, CalendarCheck, MessageSquare } from "lucide-react";
import { autospaContact, huecartourContact } from "@/data/site";
import { isPlaceholderUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export const MobileContactBar: React.FC = () => {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const isHuecartour = pathname?.startsWith("/dich-vu-xe-du-lich");
  const contact = isHuecartour ? huecartourContact : autospaContact;

  // Zalo icon: tăng từ text-sm (14px) lên text-xl (20px) + font-black
  const ZaloIcon = (
    <span
      className="font-black text-xl leading-none select-none"
      aria-hidden="true"
    >
      Z
    </span>
  );

  const autospaItems = [
    {
      id: "call",
      label: "Gọi điện",
      href: `tel:${autospaContact.hotlineRaw}`,
      icon: <Phone className="w-6 h-6" />,
      color: "text-emerald-500",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Zalo",
      href: autospaContact.zaloUrl,
      icon: ZaloIcon,
      color: "text-blue-400",
      disabled: isPlaceholderUrl(autospaContact.zaloUrl),
    },
    {
      id: "booking",
      label: "Đặt lịch",
      href: "/#dat-lich",
      icon: <CalendarCheck className="w-6 h-6" />,
      color: "text-[#00C8FF]",
      disabled: false,
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: autospaContact.googleMapsDirectionUrl,
      icon: <MapPin className="w-6 h-6" />,
      color: "text-red-400",
      disabled: false,
    },
  ];

  const huecartourItems = [
    {
      id: "call",
      label: "Gọi đặt xe",
      href: `tel:${huecartourContact.hotlineRaw}`,
      icon: <Phone className="w-6 h-6" />,
      color: "text-emerald-500",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Zalo",
      href: huecartourContact.zaloUrl,
      icon: ZaloIcon,
      color: "text-blue-400",
      disabled: isPlaceholderUrl(huecartourContact.zaloUrl),
    },
    {
      id: "messenger",
      label: "Báo giá",
      href: huecartourContact.messengerUrl,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-indigo-400",
      disabled: isPlaceholderUrl(huecartourContact.messengerUrl),
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: contact.googleMapsDirectionUrl,
      icon: <MapPin className="w-6 h-6" />,
      color: "text-red-400",
      disabled: false,
    },
  ];

  const items = isHuecartour ? huecartourItems : autospaItems;

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t shadow-custom-lg",
        "pb-[env(safe-area-inset-bottom,0px)]",
        isDark
          ? "bg-[#07111F]/97 backdrop-blur-md border-slate-800"
          : "bg-white/97 backdrop-blur-md border-gray-200"
      )}
      role="toolbar"
      aria-label="Liên hệ nhanh di động"
    >
      <div className="grid grid-cols-4 h-16 items-center">
        {items.map((item) => {
          if (item.disabled) {
            return (
              <button
                key={item.id}
                disabled
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full text-[10px] font-semibold cursor-not-allowed opacity-40",
                  isDark ? "text-gray-600" : "text-gray-400"
                )}
                aria-label={`${item.label} (Chưa cấu hình)`}
              >
                <span className="mb-1 flex items-center justify-center w-7 h-7">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target={
                item.id === "call" || item.id === "booking"
                  ? undefined
                  : "_blank"
              }
              rel={
                item.id === "call" || item.id === "booking"
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={item.label}
              style={{ touchAction: "manipulation" }}
              className={cn(
                "flex flex-col items-center justify-center h-full w-full text-[10px] font-bold transition-transform active:scale-90",
                isDark
                  ? "focus-visible:bg-slate-800/50"
                  : "focus-visible:bg-gray-100/80",
                item.color
              )}
            >
              <span className="mb-1 flex items-center justify-center w-7 h-7">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
