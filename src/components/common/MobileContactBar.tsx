// ============================================================
// src/components/common/MobileContactBar.tsx
// Thanh liên hệ cố định dưới cùng màn hình (Sticky Bottom Bar) cho Mobile
// ============================================================

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, MapPin, MessageSquare } from "lucide-react";
import { huecartourContact, autospaContact } from "@/data/site";
import { isPlaceholderUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const MobileContactBar: React.FC = () => {
  const pathname = usePathname();
  const isSpa = pathname?.startsWith("/auto-spa");

  // Đổi thông tin liên hệ tùy theo website hiện tại
  const contact = isSpa ? autospaContact : huecartourContact;

  const items = [
    {
      id: "call",
      label: "Gọi điện",
      href: `tel:${contact.hotlineRaw}`,
      icon: <Phone className="w-5 h-5" />,
      color: "text-emerald-600 dark:text-emerald-400",
      disabled: false,
    },
    {
      id: "zalo",
      label: "Zalo",
      href: contact.zaloUrl,
      icon: <span className="font-bold text-sm tracking-tight">Zalo</span>,
      color: "text-blue-600 dark:text-blue-400",
      disabled: isPlaceholderUrl(contact.zaloUrl),
    },
    {
      id: "messenger",
      label: "Messenger",
      href: "messengerUrl" in contact ? contact.messengerUrl : "REPLACE_WITH_MESSENGER_URL",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-indigo-600 dark:text-indigo-400",
      disabled: !("messengerUrl" in contact) || isPlaceholderUrl(contact.messengerUrl),
    },
    {
      id: "maps",
      label: "Chỉ đường",
      href: contact.googleMapsDirectionUrl,
      icon: <MapPin className="w-5 h-5" />,
      color: "text-red-600 dark:text-red-400",
      disabled: isPlaceholderUrl(contact.googleMapsDirectionUrl),
    },
  ];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-md border-t border-border-custom shadow-custom-lg pb-[env(safe-area-inset-bottom,0px)]"
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
                className="flex flex-col items-center justify-center h-full w-full text-[10px] font-semibold text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60"
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
              target={item.id === "call" ? undefined : "_blank"}
              rel={item.id === "call" ? undefined : "noopener noreferrer"}
              className={cn(
                "flex flex-col items-center justify-center h-full w-full text-[10px] font-bold transition-transform active:scale-95 focus-visible:bg-bg-surface-muted",
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
