// ============================================================
// src/data/autospa.ts
// Dữ liệu cứng: Tiến Quốc Auto Spa
// ============================================================

import type {
  AutoSpaService,
  AutoSpaProcessStep,
  AutoSpaWhyItem,
  AutoSpaFaq,
  AutoSpaPackage,
} from "@/types/autospa";

// ----------------------------------------------------------
// THÔNG TIN THƯƠNG HIỆU (xem thêm trong site.ts)
// ----------------------------------------------------------
export const autospaBrand = {
  name: "TIẾN QUỐC AUTO SPA",
  displayName: "Tiến Quốc Auto Spa",
  slogan: "Xe đẹp hơn – Bền lâu hơn – An tâm trên mọi hành trình",
  description:
    "Trung tâm dịch vụ bảo dưỡng, sửa chữa và chăm sóc xe ô tô chuyên nghiệp tại Huế.",
} as const;

// ----------------------------------------------------------
// DỊCH VỤ AUTO SPA
// ⚠️  Không tự thêm giá – priceLabel dùng dạng text
// ----------------------------------------------------------
export const autospaServices: AutoSpaService[] = [
  {
    id: "srv_detail_wash",
    slug: "rua-xe-chi-tiet-ve-sinh-gam",
    name: "Rửa xe chi tiết & Vệ sinh khung gầm",
    description:
      "Rửa xe tỉ mỉ không góc chết, vệ sinh khung gầm, nội ngoại thất bằng dung dịch sinh học chuyên dụng cao cấp.",
    longDescription:
      "Dịch vụ rửa xe chi tiết chuẩn Detailing: tẩy sạch bụi bẩn hốc bánh, lau chùi khe kẽ, rửa khung gầm bằng cầu nâng áp lực cao và phủ dưỡng lốp bóng bảo vệ cao su.",
    imageSrc: "/assets/images/autospa/ruaxe.png",
    imageAlt: "Rửa xe chi tiết vệ sinh khung gầm ô tô Tiến Quốc AutoSpa",
    iconName: "sparkles",
    items: [
      "Rửa xe tỉ mỉ nội ngoại thất không chạm",
      "Vệ sinh khung gầm áp lực cao",
      "Làm sạch hốc bánh & lazang chi tiết",
      "Dưỡng bóng lốp & nhựa ngoại thất",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 1,
  },
  {
    id: "srv_interior_detail",
    slug: "ve-sinh-noi-that",
    name: "Vệ sinh nội thất cơ bản đến chuyên sâu",
    description:
      "Làm sạch thảm, trần, ghế da/nỉ, khử trùng khử mùi bằng hơi nước nóng áp suất cao mang lại không gian trong lành.",
    longDescription:
      "Giặt sạch ghế, thảm sàn, vệ sinh bảng điều khiển taplo, khử mùi máy lạnh và diệt khuẩn bằng hơi nước nóng chuyên dụng giúp nội thất luôn sạch đẹp như xe mới.",
    imageSrc: "/assets/images/autospa/VeSinhNoiThat.png",
    imageAlt: "Vệ sinh nội thất ô tô cơ bản và chuyên sâu Tiến Quốc AutoSpa",
    iconName: "wind",
    items: [
      "Hút bụi & giặt sâu ghế da/nỉ",
      "Tẩy vết bẩn trần xe, vách cửa & taplo",
      "Khử trùng diệt khuẩn bằng hơi nước nóng",
      "Dưỡng mềm da ghế & khử mùi nội thất",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 2,
  },
  {
    id: "srv_engine_detail",
    slug: "ve-sinh-khoang-may",
    name: "Vệ sinh khoang máy chi tiết",
    description:
      "Tẩy sạch dầu mỡ và bụi bẩn bám lâu ngày trong khoang máy bằng hóa chất an toàn, phủ lớp bảo vệ chi tiết nhựa/cao su.",
    imageSrc: "/assets/images/autospa/VeSinhKhoanMay.png",
    imageAlt: "Vệ sinh khoang máy ô tô chi tiết Tiến Quốc AutoSpa",
    iconName: "cpu",
    items: [
      "Tẩy sạch dầu mỡ khoang động cơ",
      "Dùng dung dịch sinh học an toàn điện",
      "Làm sạch chi tiết các ống dẫn & nắp máy",
      "Phủ chất dưỡng bảo vệ chống giòn nhựa",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 3,
  },
  {
    id: "srv_undercarriage",
    slug: "tay-ve-sinh-gam-hoc-banh",
    name: "Tẩy & Vệ sinh chi tiết gầm, hốc bánh",
    description:
      "Tẩy sạch nhựa đường, rỉ sét và bùn đất bám chặt dưới gầm xe & hốc bánh, trả lại bề mặt kim loại nguyên bản.",
    imageSrc: "/assets/images/autospa/TayVeSinh.png",
    imageAlt: "Tẩy và vệ sinh chi tiết gầm hốc bánh ô tô Tiến Quốc AutoSpa",
    iconName: "shield",
    items: [
      "Tẩy nhựa đường bám gầm & thân xe",
      "Tẩy ố rỉ sét hốc bánh & phuộc nhún",
      "Rửa gầm áp lực cao xoáy bùn đất",
      "Kiểm tra & xịt dung dịch bảo vệ gầm",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 4,
  },
  {
    id: "srv_tinting",
    slug: "dan-phim-cach-nhiet",
    name: "Dán phim cách nhiệt cao cấp",
    description:
      "Dán phim cách nhiệt chống tia UV 99%, cản nhiệt lượng mặt trời vượt trội, bảo vệ sức khỏe và nội thất ô tô.",
    imageSrc: "/assets/images/autospa/DanPhim.png",
    imageAlt: "Dán phim cách nhiệt ô tô cao cấp Tiến Quốc AutoSpa",
    iconName: "sun",
    items: [
      "Cắt tia hồng ngoại & cản nhiệt đến 90%",
      "Chống 99% tia cực tím (UV) độc hại",
      "Giảm chói lóa mắt khi lái xe ban ngày",
      "Bảo hành chống bong tróc & bay màu",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 5,
  },
  {
    id: "srv_undercoating",
    slug: "phu-bao-ve-gam",
    name: "Phủ sơn bảo vệ gầm ô tô",
    description:
      "Phủ cao su non bảo vệ gầm chống oxy hóa rỉ sét, hạn chế đá văng mài mòn và triệt tiêu tiếng ồn rống gầm.",
    imageSrc: "/assets/images/autospa/PhuSon.png",
    imageAlt: "Phủ sơn bảo vệ gầm ô tô chống rỉ Tiến Quốc AutoSpa",
    iconName: "layers",
    items: [
      "Phủ lớp sơn cao su non chất lượng cao",
      "Chống ăn mòn muối biển & nước mưa",
      "Giảm tiếng ồn & chống xước đá văng",
      "Bảo vệ kết cấu gầm xe lâu bền",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: true,
    order: 6,
  },
  {
    id: "srv_leather_upholstery",
    slug: "boc-da-ghe-san-360",
    name: "Bọc da ghế & Bọc da sàn 360°",
    description:
      "Bọc da ghế ô tô may thủ công tinh tế, bọc sàn da 360° ôm sát kín sàn chống nước, chống bám bẩn tuyệt đối.",
    imageSrc: "/assets/images/autospa/BocDa.png",
    imageAlt: "Bọc da ghế và bọc da sàn 360 ô tô Tiến Quốc AutoSpa",
    iconName: "palette",
    items: [
      "Bọc da ghế cao cấp Nappa / Da công nghiệp",
      "May may mẫu mã & phối màu theo ý thích",
      "Bọc sàn da 360° phủ kín sàn xe ôm sát",
      "Chống thấm nước, dễ lau chùi vệ sinh",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: false,
    order: 7,
  },
  {
    id: "srv_lighting",
    slug: "den-chieu-sang-led-audi",
    name: "Đèn chiếu sáng, Mí LED & LED Audi",
    description:
      "Nâng cấp đèn Bi-LED / Bi-Laser tăng sáng an toàn đêm, độ mí LED chạy thời trang & LED Audi ấn tượng.",
    imageSrc: "/assets/images/autospa/Den.png",
    imageAlt: "Nâng cấp đèn chiếu sáng mí LED và LED Audi Tiến Quốc AutoSpa",
    iconName: "zap",
    items: [
      "Nâng cấp Bi-LED / Bi-Laser siêu sáng",
      "Độ mí LED chạy xi-nhan & LED Audi",
      "Căn chỉnh mặt cắt ánh sáng không chói mắt",
      "Thi công giắc cắm giấu dây chuẩn zin",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: false,
    order: 8,
  },
  {
    id: "srv_electronics",
    slug: "man-hinh-cam-hanh-trinh-cam-360",
    name: "Màn hình, Cam hành trình, Cam 360°",
    description:
      "Lắp đặt màn hình Android cảm ứng, camera hành trình sắc nét 4K, camera lùi & camera 360° quan sát toàn cảnh xóa điểm mù.",
    imageSrc: "/assets/images/autospa/Cam360.png",
    imageAlt: "Lắp đặt màn hình Android camera 360 ô tô Tiến Quốc AutoSpa",
    iconName: "tv",
    items: [
      "Lắp màn hình Android thông minh đa nhiệm",
      "Camera hành trình nét 4K quay đêm tốt",
      "Camera 360° toàn cảnh xoay góc nhìn",
      "Tích hợp ra lệnh giọng nói & Vietmap",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: false,
    order: 9,
  },
  {
    id: "srv_ambient_audio",
    slug: "led-noi-that-loa-sub",
    name: "LED nội thất & Loa Sub âm thanh",
    description:
      "Trang bị dải LED nội thất 64 màu huyền ảo đổi màu qua app, nâng cấp loa Sub gầm ghế cho âm thanh trầm ấm sống động.",
    imageSrc: "/assets/images/autospa/LedNoiThat.png",
    imageAlt: "Nâng cấp LED nội thất và loa Sub ô tô Tiến Quốc AutoSpa",
    iconName: "music",
    items: [
      "Dải LED nội thất Ambient Light 64 màu",
      "Độ loa Sub trầm gầm ghế đánh sâu ấm",
      "Nâng cấp hệ thống loa cánh & Amply",
      "Thi công thẩm mỹ không ảnh hưởng điện",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: false,
    order: 10,
  },
  {
    id: "srv_parts",
    slug: "thay-the-order-phu-tung",
    name: "Thay thế & Order phụ tùng đa dạng",
    description:
      "Nhận cung cấp, thay thế và order phụ tùng chính hãng nguồn hàng phong phú cho mọi dòng xe Đức, Nhật, Hàn, Mỹ.",
    imageSrc: "/assets/images/autospa/PhuTung.png",
    imageAlt: "Cung cấp thay thế và order phụ tùng ô tô Tiến Quốc AutoSpa",
    iconName: "settings",
    items: [
      "Order phụ tùng các dòng xe nhập / xe hiếm",
      "Thay thế phụ tùng máy gầm & điện ô tô",
      "Cung cấp phụ kiện đồ chơi ô tô độc lạ",
      "Cam kết phụ tùng đúng nguồn gốc uy tín",
    ],
    priceLabel: "Liên hệ báo giá",
    featured: false,
    order: 11,
  },
  {
    id: "srv_rescue",
    slug: "cuu-ho-lop-ac-quy-24-24",
    name: "Cứu hộ lốp & Ắc quy 24/24",
    description:
      "Dịch vụ cứu hộ sự cố lốp xì/nổ, kích bình ắc quy hoặc thay ắc quy tận nơi hoạt động 24/7 mọi lúc mọi nơi tại Huế.",
    imageSrc: "/assets/images/autospa/CuuHo.png",
    imageAlt: "Cứu hộ lốp và ắc quy ô tô 24/24 Tiến Quốc AutoSpa",
    iconName: "truck",
    items: [
      "Vá lốp & thay lốp dự phòng tận nơi 24/7",
      "Kích bình ắc quy hết điện nhanh chóng",
      "Thay mới ắc quy chính hãng bảo hành dài",
      "Có mặt ứng cứu ngay khi tiếp nhận cuộc gọi",
    ],
    priceLabel: "Phục vụ 24/7",
    featured: false,
    order: 12,
  },
];

// ----------------------------------------------------------
// QUY TRÌNH LÀM VIỆC
// ----------------------------------------------------------
export const autospaProcess: AutoSpaProcessStep[] = [
  {
    step: 1,
    title: "Tiếp nhận hoặc Giao nhận tận nhà",
    description: "Nhận xe trực tiếp tại garage hoặc nhân viên giao nhận xe tận nhà theo yêu cầu.",
    iconName: "truck",
  },
  {
    step: 2,
    title: "Chẩn đoán & Kiểm tra",
    description: "Kiểm tra tình trạng xe kỹ lưỡng và tư vấn phương án chăm sóc phù hợp.",
    iconName: "scan-search",
  },
  {
    step: 3,
    title: "Báo giá minh bạch",
    description: "Báo giá chi tiết từng hạng mục trước khi thi công – cam kết không phát sinh.",
    iconName: "receipt",
  },
  {
    step: 4,
    title: "Thi công chuyên nghiệp",
    description: "Kỹ thuật viên lành nghề thực hiện với sản phẩm và thiết bị chuyên dụng.",
    iconName: "wrench",
  },
  {
    step: 5,
    title: "Nghiệm thu & Bàn giao tận nơi",
    description: "Vệ sinh kiểm tra cuối cùng và bàn giao xe tận nhà sạch sẽ thơm tho cho quý khách.",
    iconName: "shield-check",
  },
];

// ----------------------------------------------------------
// LÝ DO CHỌN TIẾN QUỐC AUTO SPA
// ----------------------------------------------------------
export const autospaWhyItems: AutoSpaWhyItem[] = [
  {
    title: "Giao nhận xe tận nhà",
    description: "Quý khách chỉ cần alo, bên em có dịch vụ giao nhận xe tận nơi chu đáo.",
    iconName: "car",
  },
  {
    title: "Cứu hộ 24/24",
    description: "Hỗ trợ kích bình ắc quy và vá lốp cứu hộ 24/7 nhanh chóng tận nơi.",
    iconName: "truck",
  },
  {
    title: "Kỹ thuật viên lành nghề",
    description: "Đội ngũ thợ kinh nghiệm nhiều năm, am hiểu kỹ thuật chăm sóc ô tô.",
    iconName: "user-check",
  },
  {
    title: "Order phụ tùng đa dạng",
    description: "Đặt hàng phụ tùng chính hãng cho mọi dòng xe Đức, Nhật, Hàn, Mỹ nhanh chóng.",
    iconName: "settings",
  },
  {
    title: "Báo giá minh bạch",
    description: "Báo giá rõ ràng trước khi làm, không phát sinh chi phí ngoài dự toán.",
    iconName: "receipt",
  },
  {
    title: "Thiết bị & Sản phẩm cao cấp",
    description: "Sử dụng hóa chất, phim cách nhiệt, Ceramic và phụ kiện chọn lọc uy tín.",
    iconName: "award",
  },
];

// ----------------------------------------------------------
// FAQ AUTO SPA
// ----------------------------------------------------------
export const autospaFaq: AutoSpaFaq[] = [
  {
    question: "Tôi có cần đặt lịch trước không?",
    answer:
      "Nên đặt lịch trước để đảm bảo có ca phù hợp, đặc biệt vào cuối tuần. Bạn có thể đặt qua điện thoại, Zalo hoặc form trên website.",
  },
  {
    question: "Bảo dưỡng định kỳ mất bao lâu?",
    answer:
      "Bảo dưỡng cơ bản (thay dầu, kiểm tra) mất 1–2 giờ. Bảo dưỡng toàn diện có thể mất 3–4 giờ tùy tình trạng xe.",
  },
  {
    question: "Phủ Ceramic bảo hành bao lâu?",
    answer:
      "Tùy dòng sản phẩm: Ceramic phổ thông bảo hành 1 năm, dòng cao cấp bảo hành 3–5 năm. Chúng tôi sẽ tư vấn cụ thể khi bạn đến.",
  },
  {
    question: "Có thể để xe lại qua đêm không?",
    answer:
      "Có, chúng tôi nhận xe qua đêm cho các công việc phức tạp. Xe được giữ trong garage an toàn và có camera giám sát.",
  },
  {
    question: "Làm sao để biết giá dịch vụ?",
    answer:
      "Giá phụ thuộc vào dòng xe, tình trạng và dịch vụ cụ thể. Gọi hoặc nhắn Zalo để được báo giá nhanh, hoặc đến trực tiếp để kiểm tra xe.",
  },
];

// ----------------------------------------------------------
// GÓI DỊCH VỤ ĐỀ XUẤT
// ⚠️  Không tự thêm giá – priceLabel dùng dạng text
// ----------------------------------------------------------
export const autospaPackages: AutoSpaPackage[] = [
  {
    id: "pkg_basic",
    name: "Gói Rửa & Vệ sinh Cơ bản",
    description: "Vệ sinh xe tỉ mỉ, kiểm tra nhanh lốp và ắc quy, phù hợp làm sạch hàng tuần.",
    services: [
      "Rửa xe chi tiết & vệ sinh khung gầm",
      "Hút bụi & lau dọn nội thất",
      "Vệ sinh kính & hốc bánh",
      "Dưỡng bóng lốp xe",
      "Giao nhận xe tận nhà theo yêu cầu",
    ],
    priceLabel: "Liên hệ báo giá",
    isPopular: false,
  },
  {
    id: "pkg_full",
    name: "Gói Chăm sóc Toàn diện",
    description: "Tẩy rửa chuyên sâu nội ngoại thất, vệ sinh khoang máy & diệt khuẩn hơi nước nóng.",
    services: [
      "Rửa xe chi tiết không chạm & rửa gầm",
      "Vệ sinh nội thất chuyên sâu hơi nước nóng",
      "Vệ sinh khoang máy chi tiết",
      "Tẩy & vệ sinh gầm, hốc bánh",
      "Khử mùi & dưỡng da ghế/nhựa nội thất",
      "Kiểm tra tổng quát xe & cứu hộ 24/24",
    ],
    priceLabel: "Liên hệ báo giá",
    isPopular: true,
  },
  {
    id: "pkg_premium",
    name: "Gói Nâng cấp & Phủ bảo vệ",
    description: "Dán phim cách nhiệt, phủ sơn bảo vệ gầm, bọc da 360° & nâng cấp thiết bị điện tử.",
    services: [
      "Toàn bộ hạng mục Gói Toàn diện",
      "Dán phim cách nhiệt cao cấp cản UV 99%",
      "Phủ sơn bảo vệ gầm ô tô chống rỉ",
      "Bọc da ghế & Bọc da sàn 360°",
      "Độ đèn Bi-LED / Màn hình / Cam 360° / LED nội thất",
    ],
    priceLabel: "Liên hệ báo giá",
    isPopular: false,
  },
];

// ----------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------

/** Lấy dịch vụ theo slug */
export function getServiceBySlug(slug: string): AutoSpaService | undefined {
  return autospaServices.find((s) => s.slug === slug);
}

/** Lấy danh sách dịch vụ nổi bật */
export function getFeaturedServices(maxCount = 4): AutoSpaService[] {
  return autospaServices
    .filter((s) => s.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, maxCount);
}

/** Lấy tất cả dịch vụ theo thứ tự */
export function getAllServices(): AutoSpaService[] {
  return [...autospaServices].sort((a, b) => a.order - b.order);
}
