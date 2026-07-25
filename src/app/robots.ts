// ============================================================
// src/app/robots.ts
// Cấu hình tệp robots.txt tự động của Next.js
// ============================================================

import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
