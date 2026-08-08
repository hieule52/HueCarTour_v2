// ============================================================
// src/components/common/FloatingContact.tsx
// Nút liên hệ nổi cạnh phải cho Desktop (từ 1024px trở lên)
// Mặc định: Auto Spa. Khi /dich-vu-xe-du-lich: HUECARTOUR
// ============================================================

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { autospaContact, huecartourContact } from "@/data/site";
import { isPlaceholderUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const FloatingContact: React.FC = () => {
  const pathname = usePathname();
  // Khi trên trang xe du lịch, dùng liên hệ HUECARTOUR
  const isHuecartour = pathname?.startsWith("/dich-vu-xe-du-lich");
  const contact = isHuecartour ? huecartourContact : autospaContact;

  const links = [
    {
      id: "call",
      label: isHuecartour ? "Gọi đặt xe" : "Gọi Auto Spa",
      href: `tel:${contact.hotlineRaw}`,
      icon: <Phone className="w-5 h-5" />,
      color: "bg-emerald-600 hover:bg-emerald-700 text-white",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Nhắn Zalo",
      href: contact.zaloUrl,
      icon: <span className="font-bold text-xs">Zalo</span>,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      disabled: isPlaceholderUrl(contact.zaloUrl),
    },
    {
      id: "messenger",
      label: "Messenger",
      href: contact.messengerUrl,
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-indigo-600 hover:bg-indigo-700 text-white",
      disabled: isPlaceholderUrl(contact.messengerUrl),
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: contact.googleMapsDirectionUrl,
      icon: <MapPin className="w-5 h-5" />,
      color: "bg-red-600 hover:bg-red-700 text-white",
      disabled: isPlaceholderUrl(contact.googleMapsDirectionUrl),
    },
  ];

  return (
    <div
      className="hidden lg:flex flex-col gap-3 fixed right-6 bottom-24 z-40"
      aria-label="Liên hệ nhanh"
      role="complementary"
    >
      {links.map((link) => {
        if (link.disabled) {
          return (
            <button
              key={link.id}
              disabled
              title={`${link.label} (Chưa cấu hình)`}
              className="w-12 h-12 rounded-custom-full flex items-center justify-center bg-gray-700 text-gray-500 border border-gray-600 cursor-not-allowed opacity-50 relative group"
            >
              {link.icon}
              <span className="absolute right-14 bg-gray-800 text-white text-xs px-2.5 py-1 rounded-custom-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-custom-sm font-medium">
                {link.label} (Dev)
              </span>
            </button>
          );
        }

        return (
          <a
            key={link.id}
            href={link.href}
            target={link.id === "call" ? undefined : "_blank"}
            rel={link.id === "call" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            className={cn(
              "w-12 h-12 rounded-custom-full flex items-center justify-center transition-all duration-200 shadow-custom-md hover:scale-105 active:scale-95 focus-visible:outline-2 relative group",
              link.color
            )}
          >
            {link.icon}
            <span className="absolute right-14 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-custom-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-custom-sm font-medium">
              {link.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};
