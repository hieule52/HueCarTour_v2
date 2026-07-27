// ============================================================
// src/components/common/MobileContactBar.tsx
// Thanh liên hệ cố định dưới cùng màn hình (Sticky Bottom Bar) Mobile
// Mặc định: Gọi, Zalo, Đặt lịch, Chỉ đường (Auto Spa)
// Trang /dich-vu-xe-du-lich: Gọi, Zalo, Báo giá, Messenger (HUECARTOUR)
// ============================================================

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, MapPin, CalendarCheck, MessageSquare } from "lucide-react";
import { autospaContact, huecartourContact } from "@/data/site";
import { isPlaceholderUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const MobileContactBar: React.FC = () => {
  const pathname = usePathname();
  const isHuecartour = pathname?.startsWith("/dich-vu-xe-du-lich");
  const contact = isHuecartour ? huecartourContact : autospaContact;

  const autospaItems = [
    {
      id: "call",
      label: "Gọi điện",
      href: `tel:${autospaContact.hotlineRaw}`,
      icon: <Phone className="w-5 h-5" />,
      color: "text-emerald-400",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Zalo",
      href: autospaContact.zaloUrl,
      icon: <span className="font-bold text-sm tracking-tight">Z</span>,
      color: "text-blue-400",
      disabled: isPlaceholderUrl(autospaContact.zaloUrl),
    },
    {
      id: "booking",
      label: "Đặt lịch",
      href: "/#dat-lich",
      icon: <CalendarCheck className="w-5 h-5" />,
      color: "text-[#00C8FF]",
      disabled: false,
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: autospaContact.googleMapsDirectionUrl,
      icon: <MapPin className="w-5 h-5" />,
      color: "text-red-400",
      disabled: false,
    },
  ];

  const huecartourItems = [
    {
      id: "call",
      label: "Gọi đặt xe",
      href: `tel:${huecartourContact.hotlineRaw}`,
      icon: <Phone className="w-5 h-5" />,
      color: "text-emerald-400",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Zalo",
      href: huecartourContact.zaloUrl,
      icon: <span className="font-bold text-sm tracking-tight">Z</span>,
      color: "text-blue-400",
      disabled: isPlaceholderUrl(huecartourContact.zaloUrl),
    },
    {
      id: "messenger",
      label: "Báo giá",
      href: huecartourContact.messengerUrl,
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-indigo-400",
      disabled: isPlaceholderUrl(huecartourContact.messengerUrl),
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: contact.googleMapsDirectionUrl,
      icon: <MapPin className="w-5 h-5" />,
      color: "text-red-400",
      disabled: false,
    },
  ];

  const items = isHuecartour ? huecartourItems : autospaItems;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F]/95 backdrop-blur-md border-t border-slate-800 shadow-custom-lg pb-[env(safe-area-inset-bottom,0px)]"
      role="toolbar"
      aria-label="Liên hệ nhanh di động"
    >
      <div className="grid grid-cols-4 h-14 items-center">
        {items.map((item) => {
          if (item.disabled) {
            return (
              <button
                key={item.id}
                disabled
                className="flex flex-col items-center justify-center h-full w-full text-[10px] font-semibold text-gray-600 cursor-not-allowed opacity-50"
                aria-label={`${item.label} (Chưa cấu hình)`}
              >
                <span className="mb-0.5">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "call" || item.id === "booking" ? undefined : "_blank"}
              rel={item.id === "call" || item.id === "booking" ? undefined : "noopener noreferrer"}
              aria-label={item.label}
              className={cn(
                "flex flex-col items-center justify-center h-full w-full text-[10px] font-bold transition-transform active:scale-95 focus-visible:bg-slate-800/50",
                item.color
              )}
            >
              <span className="mb-0.5">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
