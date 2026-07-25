// ============================================================
// src/data/huecartour.ts
// Dữ liệu cứng: Tour và Đội xe
// ============================================================

import type { Tour } from "@/types/tour";
import type { Vehicle } from "@/types/vehicle";

// ----------------------------------------------------------
// ĐỘI XE
// ----------------------------------------------------------
export const vehicles: Vehicle[] = [
  {
    id: "car_4",
    name: "Xe 4 chỗ",
    type: "VinFast VF5 / Sedan",
    seats: 4,
    maxPassengers: 3,
    maxLuggage: 2,
    amenities: ["ac", "wifi", "usb", "water"],
    amenityLabels: {
      ac: "Điều hòa",
      wifi: "Wi-Fi",
      usb: "Sạc USB",
      water: "Nước miễn phí",
      newspaper: "Báo",
      childSeat: "Ghế trẻ em",
    },
    imageSrc: "/assets/images/fleet/vf5.jpg",
    imageAlt: "Xe VinFast VF5 4 chỗ dịch vụ đưa đón tại Huế",
    isFeatured: true,
    description:
      "Lý tưởng cho cặp đôi và gia đình nhỏ. Sedan hoặc SUV nhỏ rộng rãi, tiết kiệm nhiên liệu, phù hợp mọi tuyến đường.",
  },
  {
    id: "car_7",
    name: "Xe 7 chỗ",
    type: "Limogreen SUV / MPV",
    seats: 7,
    maxPassengers: 6,
    maxLuggage: 3,
    amenities: ["ac", "wifi", "usb", "water"],
    amenityLabels: {
      ac: "Điều hòa",
      wifi: "Wi-Fi",
      usb: "Sạc USB",
      water: "Nước miễn phí",
      newspaper: "Báo",
      childSeat: "Ghế trẻ em",
    },
    imageSrc: "/assets/images/fleet/limo.png",
    imageAlt: "Xe Limogreen 7 chỗ SUV MPV dịch vụ thuê xe du lịch Huế",
    isFeatured: false,
    description:
      "Phù hợp cho gia đình và nhóm bạn. Không gian rộng thoải mái, cốp lớn chứa đủ hành lý cho chuyến du lịch.",
  },
  {
    id: "car_16",
    name: "Xe 16 chỗ",
    type: "Ford Transit 16 chỗ",
    seats: 16,
    maxPassengers: 15,
    maxLuggage: 8,
    amenities: ["ac", "wifi", "usb", "water"],
    amenityLabels: {
      ac: "Điều hòa",
      wifi: "Wi-Fi",
      usb: "Sạc USB",
      water: "Nước miễn phí",
      newspaper: "Báo",
      childSeat: "Ghế trẻ em",
    },
    imageSrc: "/assets/images/fleet/ford.jpg",
    imageAlt: "Xe Ford Transit 16 chỗ thuê xe đoàn Huế",
    isFeatured: false,
    description:
      "Giải pháp lý tưởng cho đoàn khách, tổ chức và sự kiện. Sức chứa lớn, hành lý rộng rãi cho cả đoàn.",
  },
];

// ----------------------------------------------------------
// DANH SÁCH TOUR
// ----------------------------------------------------------
export const tours: Tour[] = [
  // 1. Huế City Tour – 3 Điểm
  {
    id: "tour_hct_3",
    slug: "hue-city-tour-3-diem",
    name: "Huế City Tour – 3 Điểm",
    shortName: "Huế City Tour 3",
    description:
      "Khám phá tinh hoa kiến trúc Cố đô Huế qua 3 điểm nổi bật: Kinh Thành, Chùa Thiên Mụ và Lăng Khải Định. Tài xế địa phương dẫn đường, xuất phát từ trung tâm Huế.",
    longDescription:
      "Tour nửa ngày lý tưởng để khám phá những điểm tham quan nổi tiếng nhất của Cố đô Huế. Bắt đầu bằng Kinh Thành Huế – di sản UNESCO, tiếp tục đến Chùa Thiên Mụ biểu tượng bên bờ sông Hương, kết thúc tại Lăng Khải Định với kiến trúc kết hợp Á-Âu độc đáo.",
    duration: "Nửa ngày (4–5 giờ)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      {
        name: "Kinh Thành Huế",
        description: "Quần thể cung điện Đại Nội và Hoàng Thành, di sản UNESCO.",
      },
      {
        name: "Chùa Thiên Mụ",
        description: "Ngôi chùa biểu tượng trên đồi Hà Khê bên bờ sông Hương.",
      },
      {
        name: "Lăng Khải Định",
        description: "Lăng mộ độc đáo kết hợp kiến trúc Á-Âu của vua Khải Định.",
      },
    ],
    pricing: { car_4: 700000, car_7: 800000, car_16: 1200000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan tại các điểm", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá trên tính cho một chiều (thuê cả xe). Giá có thể thay đổi theo mùa lễ tết.",
    imageSrc: "/assets/images/tours/3DiemHue.png",
    imageAlt: "Tour Huế 3 Điểm - Kinh Thành, Thiên Mụ, Lăng Khải Định",
    isFeatured: true,
    order: 1,
    tags: ["city-tour", "hue", "nua-ngay"],
    faq: [
      {
        question: "Tour này mất bao lâu?",
        answer: "Khoảng 4–5 giờ tùy điểm xuất phát và tốc độ tham quan.",
      },
    ],
    seo: {
      title: "Huế City Tour 3 Điểm – Kinh Thành, Thiên Mụ, Lăng Khải Định | HUE CAR TOURS",
      description:
        "Tour tham quan Huế 3 điểm nổi bật: Kinh Thành Huế, Chùa Thiên Mụ, Lăng Khải Định. Xe riêng có tài xế, giá từ 700.000đ.",
    },
  },

  // 2. Huế City Tour – 4 Điểm
  {
    id: "tour_hct_4",
    slug: "hue-city-tour-4-diem",
    name: "Huế City Tour – 4 Điểm",
    shortName: "Huế City Tour 4",
    description:
      "Trải nghiệm toàn diện hơn với 4 điểm tham quan, thêm Lăng Tự Đức – công trình kiến trúc nghệ thuật tinh tế nhất triều Nguyễn.",
    longDescription:
      "Tour ngày đầy đủ khám phá 4 địa danh tiêu biểu của Cố đô Huế. Thêm Lăng Tự Đức với hồ Lưu Khiêm thơ mộng và không gian thanh bình đặc trưng.",
    duration: "Cả ngày (6–7 giờ)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Kinh Thành Huế", description: "Quần thể cung điện Đại Nội và Hoàng Thành, di sản UNESCO." },
      { name: "Chùa Thiên Mụ", description: "Ngôi chùa biểu tượng trên đồi Hà Khê bên bờ sông Hương." },
      { name: "Lăng Tự Đức", description: "Công trình kiến trúc tinh tế nhất triều Nguyễn, hồ Lưu Khiêm thơ mộng." },
      { name: "Lăng Khải Định", description: "Lăng mộ độc đáo kết hợp kiến trúc Á-Âu." },
    ],
    pricing: { car_4: 850000, car_7: 950000, car_16: 1500000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan tại các điểm", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá trên tính cho một chiều (thuê cả xe). Giá có thể thay đổi theo mùa lễ tết.",
    imageSrc: "/assets/images/tours/4DiemHue.png",
    imageAlt: "Tour Huế 4 Điểm - Kinh Thành, Thiên Mụ, Tự Đức, Khải Định",
    isFeatured: true,
    order: 2,
    tags: ["city-tour", "hue", "ca-ngay"],
    seo: {
      title: "Huế City Tour 4 Điểm – Kinh Thành, Thiên Mụ, Tự Đức, Khải Định | HUE CAR TOURS",
      description:
        "Tour tham quan Huế 4 điểm: Kinh Thành, Chùa Thiên Mụ, Lăng Tự Đức, Lăng Khải Định. Xe riêng từ 850.000đ.",
    },
  },

  // 3. Huế City Tour – 5 Điểm
  {
    id: "tour_hct_5",
    slug: "hue-city-tour-5-diem",
    name: "Huế City Tour – 5 Điểm",
    shortName: "Huế City Tour 5",
    description:
      "Hành trình khám phá Cố đô toàn diện nhất với 5 điểm tham quan, thêm Lăng Minh Mạng – tuyệt tác kiến trúc giữa rừng thông xanh mát.",
    longDescription:
      "Tour đầy đủ nhất cho những ai muốn trải nghiệm toàn bộ tinh hoa triều Nguyễn trong một ngày. Lăng Minh Mạng nằm trong khuôn viên rộng lớn với kiến trúc hài hoà cùng thiên nhiên.",
    duration: "Cả ngày (8–9 giờ)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Kinh Thành Huế" },
      { name: "Chùa Thiên Mụ" },
      { name: "Lăng Tự Đức" },
      { name: "Lăng Khải Định" },
      { name: "Lăng Minh Mạng", description: "Kiệt tác kiến trúc triều Nguyễn giữa rừng thông và hồ nước yên tĩnh." },
    ],
    pricing: { car_4: 1000000, car_7: 1100000, car_16: 1700000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan tại các điểm", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá trên tính cho một chiều (thuê cả xe). Giá có thể thay đổi theo mùa lễ tết.",
    imageSrc: "/assets/images/tours/5DiemHue.png",
    imageAlt: "Tour Huế 5 Điểm - Trọn bộ Di tích Triều Nguyễn",
    isFeatured: true,
    order: 3,
    tags: ["city-tour", "hue", "ca-ngay", "day-du"],
    seo: {
      title: "Huế City Tour 5 Điểm – Trọn Bộ Di Tích Triều Nguyễn | HUE CAR TOURS",
      description:
        "Tour Huế 5 điểm đầy đủ nhất: Kinh Thành, Thiên Mụ, Tự Đức, Khải Định, Minh Mạng. Xe riêng từ 1.000.000đ.",
    },
  },

  // 4. Huế → Đà Nẵng
  {
    id: "tour_hue_danang",
    slug: "hue-di-da-nang",
    name: "Huế → Đà Nẵng",
    shortName: "Huế – Đà Nẵng",
    description:
      "Tuyến xe từ Huế đến Đà Nẵng qua những cảnh quan đẹp nhất miền Trung: Đầm Lập An, Biển Lăng Cô và Đèo Hải Vân hùng vĩ.",
    longDescription:
      "Hành trình Huế – Đà Nẵng không chỉ là di chuyển mà còn là hành trình khám phá cảnh đẹp. Đầm Lập An với màu nước xanh ngọc, bãi biển Lăng Cô dài mướt mát và Đèo Hải Vân – con đèo mây đẹp nhất Việt Nam.",
    duration: "Nửa ngày (3–4 giờ có dừng)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Đầm Lập An", description: "Đầm phá đẹp với làng chài nổi trên mặt nước." },
      { name: "Biển Lăng Cô", description: "Bãi biển hoang sơ, nước trong và cát trắng mịn." },
      { name: "Đèo Hải Vân", description: "Đèo mây huyền thoại, tầm nhìn panorama ra vịnh Đà Nẵng." },
    ],
    pricing: { car_4: 1400000, car_7: 1600000, car_16: 1900000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường & hầm", "Nước uống miễn phí"],
    excluded: ["Vé tham quan", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Phí hầm Hải Vân đã bao gồm.",
    imageSrc: "/assets/images/tours/Hue-DaNang.png",
    imageAlt: "Tour Huế đi Đà Nẵng qua Đèo Hải Vân hùng vĩ",
    isFeatured: true,
    order: 4,
    tags: ["lien-tinh", "da-nang", "hai-van"],
    seo: {
      title: "Thuê Xe Huế Đi Đà Nẵng – Qua Đèo Hải Vân, Lăng Cô | HUE CAR TOURS",
      description:
        "Xe từ Huế đi Đà Nẵng qua Đầm Lập An, Lăng Cô, Đèo Hải Vân. Giá từ 1.400.000đ, xe riêng có tài xế.",
    },
  },

  // 5. Huế → Hội An
  {
    id: "tour_hue_hoian",
    slug: "hue-di-hoi-an",
    name: "Huế → Hội An",
    shortName: "Huế – Hội An",
    description:
      "Hành trình từ Cố đô lịch sử đến Phố cổ di sản, qua ba điểm dừng tuyệt đẹp dọc đường: Lập An, Lăng Cô và Hải Vân.",
    longDescription:
      "Kết hợp tham quan cảnh đẹp ven biển và đến với Phố Cổ Hội An được UNESCO công nhận. Hành trình dài hơn nhưng trọn vẹn hơn cho kỳ nghỉ miền Trung của bạn.",
    duration: "Cả ngày (5–6 giờ có dừng)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Đầm Lập An" },
      { name: "Biển Lăng Cô" },
      { name: "Đèo Hải Vân" },
    ],
    pricing: { car_4: 1600000, car_7: 1800000, car_16: 2200000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường & hầm", "Nước uống miễn phí"],
    excluded: ["Vé tham quan", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Phí hầm Hải Vân đã bao gồm.",
    imageSrc: "/assets/images/tours/Hue-HoiAn.png",
    imageAlt: "Tour Huế đi Hội An qua Lăng Cô và Đèo Hải Vân",
    isFeatured: true,
    order: 5,
    tags: ["lien-tinh", "hoi-an"],
    seo: {
      title: "Thuê Xe Huế Đi Hội An – Qua Lăng Cô, Hải Vân | HUE CAR TOURS",
      description:
        "Xe từ Huế đến Hội An, dừng Đầm Lập An, Lăng Cô, Đèo Hải Vân. Giá từ 1.600.000đ.",
    },
  },

  // 6. Huế → Phong Nha
  {
    id: "tour_hue_phongnha",
    slug: "hue-di-phong-nha",
    name: "Huế → Phong Nha – Kẻ Bàng",
    shortName: "Huế – Phong Nha",
    description:
      "Khám phá Vườn Quốc gia Phong Nha – Kẻ Bàng, Di sản Thiên nhiên Thế giới. Xe riêng từ Huế, thoải mái dừng chụp ảnh dọc đường.",
    longDescription:
      "Phong Nha – Kẻ Bàng sở hữu hệ thống hang động kỳ vĩ nhất thế giới, trong đó có Sơn Đoòng – hang động lớn nhất hành tinh. Xe riêng từ Huế giúp bạn tự do sắp xếp thời gian tham quan.",
    duration: "Cả ngày (4–5 giờ di chuyển mỗi chiều)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [],
    pricing: { car_4: 1800000, car_7: 2000000, car_16: 2800000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan hang động", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Khuyến nghị thuê xe cả ngày hoặc 2 chiều.",
    imageSrc: "/assets/images/tours/Hue-PhongNha.png",
    imageAlt: "Tour Huế đi Phong Nha Kẻ Bàng Di sản Thiên nhiên Thế giới",
    isFeatured: true,
    order: 6,
    tags: ["lien-tinh", "phong-nha", "thien-nhien"],
    seo: {
      title: "Thuê Xe Huế Đi Phong Nha Kẻ Bàng | HUE CAR TOURS",
      description:
        "Xe từ Huế đi Phong Nha – Kẻ Bàng, Di sản Thiên nhiên Thế giới. Giá từ 1.800.000đ.",
    },
  },

  // 7. Sân bay Phú Bài
  {
    id: "tour_airport",
    slug: "dua-don-san-bay-phu-bai",
    name: "Huế – Sân bay Phú Bài",
    shortName: "Sân bay Phú Bài",
    description:
      "Dịch vụ đưa đón sân bay Phú Bài chuyên nghiệp, đúng giờ. Theo dõi chuyến bay, đón tận nơi đến, đưa đến điểm đặt.",
    longDescription:
      "Chúng tôi theo dõi lịch bay thực tế để đón đúng giờ. Tài xế chờ tại sảnh đến với biển tên, hỗ trợ hành lý và đưa bạn đến điểm đặt an toàn. Dịch vụ 24/7.",
    duration: "30–40 phút",
    pickupPoint: "Sân bay Phú Bài hoặc trung tâm TP Huế",
    stops: [],
    pricing: { car_4: 200000, car_7: 250000, car_16: 600000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Hỗ trợ hành lý", "Nước uống miễn phí"],
    excluded: ["Phí gửi xe tại sân bay (nếu có)", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Đặt ít nhất 2 giờ trước chuyến bay.",
    imageSrc: "/assets/images/tours/Hue-SanBay.png",
    imageAlt: "Dịch vụ đưa đón sân bay Phú Bài Huế",
    isFeatured: false,
    order: 7,
    tags: ["san-bay", "dua-don"],
    seo: {
      title: "Đưa Đón Sân Bay Phú Bài Huế – Giá Tốt, Đúng Giờ | HUE CAR TOURS",
      description:
        "Dịch vụ xe đưa đón sân bay Phú Bài Huế. Xe 4 chỗ từ 200.000đ, 7 chỗ từ 250.000đ. Đặt xe 24/7.",
    },
  },

  // 8. Huế → Quảng Trị
  {
    id: "tour_hue_quangtri",
    slug: "hue-quang-tri-tour",
    name: "Huế → Quảng Trị → Huế",
    shortName: "Huế – Quảng Trị",
    description:
      "Hành trình về nguồn đầy xúc cảm: Cầu Hiền Lương, Địa đạo Vịnh Mốc và các di tích lịch sử vùng DMZ.",
    longDescription:
      "Chuyến hành trình về nguồn đến với những chứng tích lịch sử đau thương và hào hùng của chiến tranh Việt Nam. Cầu Hiền Lương – ranh giới vĩ tuyến 17, Địa đạo Vịnh Mốc – hệ thống địa đạo ngầm nơi người dân sinh sống suốt chiến tranh.",
    duration: "Cả ngày (8–10 giờ)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Cầu Hiền Lương", description: "Cây cầu lịch sử chia đôi đất nước tại vĩ tuyến 17." },
      { name: "Địa đạo Vịnh Mốc", description: "Hệ thống địa đạo hơn 2km nơi dân làng sinh sống trong chiến tranh." },
      { name: "Các di tích lịch sử DMZ", description: "Khu phi quân sự và các địa danh lịch sử vùng Quảng Trị." },
    ],
    pricing: { car_4: 1750000, car_7: 1950000, car_16: 4000000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá khứ hồi trong ngày. Xuất phát và kết thúc tại Huế.",
    imageSrc: "/assets/images/tours/Hue-QuangTri.png",
    imageAlt: "Tour Huế Quảng Trị - Cầu Hiền Lương vĩ tuyến 17",
    isFeatured: false,
    order: 8,
    tags: ["lich-su", "quang-tri", "dmz"],
    seo: {
      title: "Tour Huế – Quảng Trị – Cầu Hiền Lương, Địa Đạo Vịnh Mốc | HUE CAR TOURS",
      description:
        "Tour xe riêng Huế – Quảng Trị: Cầu Hiền Lương, Địa đạo Vịnh Mốc, DMZ. Giá từ 1.750.000đ.",
    },
  },

  // 9. Huế → Quảng Trị - Khe Sanh
  {
    id: "tour_hue_khesanh",
    slug: "hue-quang-tri-khe-sanh",
    name: "Huế → Quảng Trị – Khe Sanh → Huế",
    shortName: "Huế – Khe Sanh",
    description:
      "Hành trình lịch sử mở rộng thêm Sân bay Tà Cơn và Căn cứ Khe Sanh – nơi diễn ra trận đánh khốc liệt nhất của chiến tranh.",
    longDescription:
      "Bổ sung thêm Căn cứ Khe Sanh vào hành trình lịch sử, nơi trận chiến năm 1968 kéo dài 77 ngày để lại nhiều dấu tích. Sân bay Tà Cơn với máy bay thật và xe tăng trưng bày.",
    duration: "Cả ngày (10–11 giờ)",
    pickupPoint: "Trung tâm TP Huế (địa điểm thoả thuận)",
    stops: [
      { name: "Cầu Hiền Lương" },
      { name: "Địa đạo Vịnh Mốc" },
      { name: "Sân bay Tà Cơn", description: "Sân bay lịch sử với trưng bày hiện vật chiến tranh." },
      { name: "Căn cứ Khe Sanh", description: "Căn cứ của quân đội Mỹ trong trận chiến khốc liệt 1968." },
    ],
    pricing: { car_4: 2150000, car_7: 2350000, car_16: 4500000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá khứ hồi trong ngày. Xuất phát và kết thúc tại Huế.",
    imageSrc: "/assets/images/tours/hue-KheSanh.png",
    imageAlt: "Tour Huế Quảng Trị Khe Sanh - Căn cứ lịch sử",
    isFeatured: false,
    order: 9,
    tags: ["lich-su", "quang-tri", "khe-sanh"],
    seo: {
      title: "Tour Huế – Quảng Trị – Khe Sanh – Sân Bay Tà Cơn | HUE CAR TOURS",
      description:
        "Tour lịch sử Huế – Khe Sanh: Cầu Hiền Lương, Vịnh Mốc, Tà Cơn, Căn cứ Khe Sanh. Giá từ 2.150.000đ.",
    },
  },

  // 10. Đà Nẵng → Phong Nha
  {
    id: "tour_danang_phongnha",
    slug: "da-nang-di-phong-nha",
    name: "Đà Nẵng → Phong Nha – Kẻ Bàng",
    shortName: "Đà Nẵng – Phong Nha",
    description:
      "Xe riêng từ Đà Nẵng đến Phong Nha – Kẻ Bàng, Di sản Thiên nhiên Thế giới. Tiện lợi cho khách đang ở Đà Nẵng.",
    longDescription:
      "Tuyến xe từ Đà Nẵng đến Phong Nha dài hơn nhưng thoải mái với xe riêng. Qua các địa danh đẹp dọc đường, đến thẳng khu vực hang động.",
    duration: "Cả ngày (5–6 giờ di chuyển mỗi chiều)",
    pickupPoint: "Trung tâm TP Đà Nẵng (địa điểm thoả thuận)",
    stops: [],
    pricing: { car_4: 3100000, car_7: 3500000, car_16: 5000000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan hang động", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Khuyến nghị thuê xe cả ngày.",
    imageSrc: "/assets/images/tours/DaNang_PhongNha.png",
    imageAlt: "Tour Đà Nẵng đi Phong Nha Kẻ Bàng",
    isFeatured: false,
    order: 10,
    tags: ["lien-tinh", "phong-nha", "da-nang"],
    seo: {
      title: "Thuê Xe Đà Nẵng Đi Phong Nha Kẻ Bàng | HUE CAR TOURS",
      description:
        "Xe riêng từ Đà Nẵng đến Phong Nha – Kẻ Bàng. Giá từ 3.100.000đ, tài xế kinh nghiệm.",
    },
  },

  // 11. Hội An → Phong Nha
  {
    id: "tour_hoian_phongnha",
    slug: "hoi-an-di-phong-nha",
    name: "Hội An → Phong Nha – Kẻ Bàng",
    shortName: "Hội An – Phong Nha",
    description:
      "Tuyến xe riêng từ Phố cổ Hội An đến Phong Nha – Kẻ Bàng, lý tưởng cho hành trình khám phá miền Trung.",
    longDescription:
      "Từ Hội An đến Phong Nha là hành trình dài xuyên miền Trung. Xe riêng thoải mái dừng nghỉ, ngắm cảnh dọc đường.",
    duration: "Cả ngày (6–7 giờ di chuyển mỗi chiều)",
    pickupPoint: "Trung tâm TP Hội An (địa điểm thoả thuận)",
    stops: [],
    pricing: { car_4: 3300000, car_7: 3800000, car_16: 5500000 },
    included: ["Xe đời mới điều hòa", "Tài xế kinh nghiệm", "Xăng dầu", "Phí cầu đường", "Nước uống miễn phí"],
    excluded: ["Vé tham quan hang động", "Hướng dẫn viên", "Bữa ăn", "Chi phí cá nhân"],
    priceNote: "Giá một chiều. Khuyến nghị thuê xe cả ngày.",
    imageSrc: "/assets/images/tours/HoiAn-PhongNha.png",
    imageAlt: "Tour Hội An đi Phong Nha Kẻ Bàng",
    isFeatured: false,
    order: 11,
    tags: ["lien-tinh", "phong-nha", "hoi-an"],
    seo: {
      title: "Thuê Xe Hội An Đi Phong Nha Kẻ Bàng | HUE CAR TOURS",
      description:
        "Xe riêng từ Hội An đến Phong Nha – Kẻ Bàng. Giá từ 3.300.000đ, thoải mái và linh hoạt.",
    },
  },
];

// ----------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------

/** Lấy tour theo slug, trả undefined nếu không tìm thấy */
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

/** Lấy danh sách tour nổi bật, tối đa maxCount (mặc định 6) */
export function getFeaturedTours(maxCount = 6): Tour[] {
  return tours
    .filter((t) => t.isFeatured)
    .sort((a, b) => a.order - b.order)
    .slice(0, maxCount);
}

/**
 * Lấy tour liên quan dựa trên tags chung.
 * Loại trừ tour hiện tại, trả tối đa maxCount tour.
 */
export function getRelatedTours(currentSlug: string, maxCount = 3): Tour[] {
  const current = getTourBySlug(currentSlug);
  if (!current) return [];

  return tours
    .filter((t) => t.slug !== currentSlug && t.tags.some((tag) => current.tags.includes(tag)))
    .sort((a, b) => a.order - b.order)
    .slice(0, maxCount);
}

/** Lấy vehicle theo id */
export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

/** Static params cho generateStaticParams */
export function getAllTourSlugs(): { slug: string }[] {
  return tours.map((t) => ({ slug: t.slug }));
}

/** Lấy tất cả tour theo thứ tự */
export function getAllTours(): Tour[] {
  return [...tours].sort((a, b) => a.order - b.order);
}
