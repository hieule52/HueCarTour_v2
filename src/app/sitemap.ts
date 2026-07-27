// ============================================================
// src/app/sitemap.ts
// Sitemap — Ưu tiên Tiến Quốc Auto Spa làm thương hiệu chính
// Không đưa URL redirect vào sitemap
// ============================================================

import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { autospaServices } from "@/data/autospa";
import { tours } from "@/data/huecartour";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // 1. Trang chủ Auto Spa — priority cao nhất
  const homePage = {
    url: `${baseUrl}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1.0 as const,
  };

  // 2. Trang dịch vụ Auto Spa
  const autospaStaticPages = [
    "/dich-vu",
    "/lien-he",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9 as const,
  }));

  // 3. Chi tiết từng dịch vụ Auto Spa
  const autospaServicePages = autospaServices.map((service) => ({
    url: `${baseUrl}/dich-vu/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8 as const,
  }));

  // 4. Trang xe du lịch HUECARTOUR
  const huecartourMainPage = {
    url: `${baseUrl}/dich-vu-xe-du-lich`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75 as const,
  };

  // 5. Chi tiết tuyến/tour HUECARTOUR
  const tourPages = tours.map((tour) => ({
    url: `${baseUrl}/dich-vu-xe-du-lich/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65 as const,
  }));

  // 6. Trang chính sách (ưu tiên thấp)
  const policyPages = [
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4 as const,
  }));

  // Không đưa /auto-spa, /tours, /tour/[slug] vào sitemap
  // vì chúng đã được redirect 301

  return [
    homePage,
    ...autospaStaticPages,
    ...autospaServicePages,
    huecartourMainPage,
    ...tourPages,
    ...policyPages,
  ];
}
