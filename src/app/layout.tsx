// ============================================================
// src/app/layout.tsx
// Bố cục gốc ứng dụng: Quản lý phông chữ, Header, Footer và các Contact Bar
// ============================================================

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
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
    default: siteConfig.displayName + " - " + siteConfig.slogan,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/assets/images/brand/huecartour_logoIcon.png", type: "image/png" },
    ],
    shortcut: "/assets/images/brand/huecartour_logoIcon.png",
    apple: "/assets/images/brand/huecartour_logoIcon.png",
  },
  openGraph: {
    title: siteConfig.displayName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.displayName,
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.displayName,
    description: siteConfig.description,
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-text-on-primary z-50">
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
