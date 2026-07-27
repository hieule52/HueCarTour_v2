import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ================================================================
      // REDIRECT 301 – PERMANENT (giữ backlink, tránh 404)
      // Sau khi / trở thành trang chủ Auto Spa, /auto-spa không còn cần
      // ================================================================
      {
        source: "/auto-spa",
        destination: "/",
        permanent: true,
      },
      // /tours → trang xe du lịch HUECARTOUR mới
      {
        source: "/tours",
        destination: "/dich-vu-xe-du-lich",
        permanent: true,
      },
      // /tour/[slug] → chi tiết tuyến xe HUECARTOUR mới
      {
        source: "/tour/:slug",
        destination: "/dich-vu-xe-du-lich/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
