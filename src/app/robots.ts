// ============================================================
// src/app/robots.ts
// Robots.txt tự động — cho phép index trang công khai
// ============================================================

import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
