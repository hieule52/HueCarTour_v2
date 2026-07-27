// ============================================================
// src/app/layout.tsx
// Bố cục gốc — Tiến Quốc Auto Spa là thương hiệu chính
// ============================================================

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig, autospaContact } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/common/FloatingContact";
import { MobileContactBar } from "@/components/common/MobileContactBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Tiến Quốc Auto Spa | Bảo dưỡng, sửa chữa và chăm sóc ô tô tại Huế",
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Tiến Quốc Auto Spa",
    "auto spa Huế",
    "chăm sóc ô tô Huế",
    "bảo dưỡng ô tô Huế",
    "sửa chữa ô tô Huế",
    "vệ sinh nội thất ô tô Huế",
    "đánh bóng ô tô Huế",
    "phủ ceramic Huế",
    "chăm sóc khoang máy Huế",
    "rửa xe chi tiết Huế",
  ],
  authors: [{ name: siteConfig.displayName }],
  creator: siteConfig.displayName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/images/brand/autospa_iconTab.png", type: "image/png" },
    ],
    shortcut: "/assets/images/brand/autospa_iconTab.png",
    apple: "/assets/images/brand/autospa_iconTab.png",
  },
  openGraph: {
    title: "Tiến Quốc Auto Spa | Bảo dưỡng, sửa chữa và chăm sóc ô tô tại Huế",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.displayName,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1000,
        alt: "Tiến Quốc Auto Spa – Trung tâm chăm sóc ô tô tại Huế",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiến Quốc Auto Spa | Chăm sóc ô tô tại Huế",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "geo.region": "VN-TTH",
    "geo.placename": "Huế",
    "contact:phone_number": autospaContact.hotlineDisplay,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-app text-text-primary">
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-white z-50"
        >
          Chuyển đến nội dung chính
        </a>

        <Header />

        <main id="main-content" className="flex-grow pb-safe">
          {children}
        </main>

        <Footer />

        {/* Floating actions */}
        <FloatingContact />
        <MobileContactBar />
      </body>
    </html>
  );
}
