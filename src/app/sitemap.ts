// ============================================================
// src/app/sitemap.ts
// Cấu hình tệp sitemap.xml động cho các công cụ tìm kiếm
// ============================================================

import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { tours } from "@/data/huecartour";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // 1. Các trang tĩnh cố định
  const staticRoutes = [
    "",
    "/tours",
    "/auto-spa",
    "/lien-he",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? (1.0 as const) : (0.8 as const),
  }));

  // 2. Các trang chi tiết tour động
  const tourRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tour/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7 as const,
  }));

  return [...staticRoutes, ...tourRoutes];
}
