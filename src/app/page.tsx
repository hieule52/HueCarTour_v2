// ============================================================
// src/app/page.tsx
// Trang chủ HUE CAR TOURS - Giao diện cao cấp, chuyên nghiệp
// ============================================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Receipt,
  ShieldCheck,
  Clock,
  Headset,
  Car,
  Users,
  Compass,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { TourCard } from "@/components/tour/TourCard";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { BookingForm } from "@/components/booking/BookingForm";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { GoogleMap } from "@/components/common/GoogleMap";
import { getFeaturedTours, vehicles } from "@/data/huecartour";
import { huecartourContact, globalFaq } from "@/data/site";

export default function HomePage() {
  const featuredTours = getFeaturedTours(6);
  const [, setSelectedVehicle] = useState<string>("car_4");

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicle(id);
    // Lưu tạm vào localStorage để form đặt xe đọc nếu cần
    const selectEl = document.getElementById("vehicleType") as HTMLSelectElement | null;
    if (selectEl) {
      selectEl.value = id;
      // Kích hoạt event change để react-hook-form cập nhật
      const event = new Event("change", { bubbles: true });
      selectEl.dispatchEvent(event);
    }
  };

  return (
    <div className="flex flex-col gap-20 sm:gap-24 md:gap-28 pb-16">
      
      {/* 1. HERO SECTION (Theo chuẩn banner-design) */}
      <section className="relative bg-[#0d1727] text-white overflow-hidden py-16 sm:py-24 md:py-32">
        {/* Layer Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,34,54,0.8)_0%,rgba(13,23,39,1)_100%)] z-0" />
        
        {/* Subtle royal pattern decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(232,185,35,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,rgba(23,34,54,0.3)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl flex flex-col gap-6 text-left">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-secondary uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-custom-full w-fit">
              XE RIÊNG TẠI HUẾ
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Khám phá miền Trung <br className="hidden sm:inline" />
              <span className="text-secondary">theo cách riêng</span> của bạn
            </h1>
            
            <p className="text-sm sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Đưa đón sân bay Phú Bài, thuê xe theo tuyến liên tỉnh và các tour tham quan riêng cùng tài xế địa phương thân thiện tại Huế. An tâm hành trình, giá cả minh bạch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="secondary"
                className="font-bold flex items-center justify-center gap-2"
                onClick={() => {
                  const el = document.getElementById("dat-xe");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Nhận báo giá đặt xe
              </Button>
              <Link href="/tours">
                <Button
                  variant="outline"
                  className="w-full font-bold text-white border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Xem các tour du lịch
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THANH CAM KẾT (Trust items immediately below hero) */}
      <section className="-mt-32 relative z-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-bg-surface border border-border-custom shadow-custom-lg rounded-custom-lg p-5 sm:p-6">
            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-custom-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-text-primary">Báo giá rõ ràng</span>
                <span className="text-[10px] text-text-secondary">Đã chốt là không đổi</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-custom-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-text-primary">Không phụ phí ẩn</span>
                <span className="text-[10px] text-text-secondary">Phí cầu đường bao gồm</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-custom-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-text-primary">Tài xế đúng giờ</span>
                <span className="text-[10px] text-text-secondary">Chờ đón chuyên nghiệp</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-custom-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Headset className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-text-primary">Hỗ trợ nhanh</span>
                <span className="text-[10px] text-text-secondary">Kết nối trực tiếp 24/7</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. DỊCH VỤ NỔI BẬT */}
      <section id="dich-vu">
        <Container>
          <SectionHeading
            eyebrow="DỊCH VỤ CỦA CHÚNG TÔI"
            title="Dịch vụ xe du lịch riêng chất lượng cao"
            description="Đáp ứng mọi nhu cầu di chuyển tham quan và đưa đón miền Trung với dịch vụ chuẩn mực, xe sạch sẽ, lái xe an toàn."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-custom-full bg-secondary/15 flex items-center justify-center text-primary">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-primary">Thuê xe riêng có tài</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Linh hoạt theo lịch trình cá nhân. Đội xe từ 4 chỗ, 7 chỗ đến 16 chỗ đáp ứng nhóm nhỏ và gia đình lớn.
                </p>
              </div>
              <Link href="#dat-xe" className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline">
                Đăng ký ngay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-custom-full bg-secondary/15 flex items-center justify-center text-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-primary">Tour tham quan Huế</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Khám phá Kinh Thành, Lăng tẩm và chùa cổ tiêu biểu chỉ trong nửa ngày hoặc một ngày với giá trọn gói.
                </p>
              </div>
              <Link href="/tours" className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline">
                Xem chi tiết các tour <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-custom-full bg-secondary/15 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-primary">Xe Huế đi Đà Nẵng / Hội An</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Tuyến di chuyển ngắm cảnh qua Đầm Lập An, Vịnh Lăng Cô và Đèo Hải Vân hùng vĩ ngắm mây trời.
                </p>
              </div>
              <Link href="#dat-xe" className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline">
                Đăng ký ngay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-custom-full bg-secondary/15 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text-primary">Đưa đón sân bay Phú Bài</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Đúng giờ, đón sảnh ga đi/đến chuyên nghiệp. Tài xế hỗ trợ mang xách hành lý cẩn thận, an toàn.
                </p>
              </div>
              <Link href="#dat-xe" className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline">
                Đăng ký ngay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. TOUR PHỔ BIẾN (Tối đa 6 tour featured) */}
      <section id="tours-featured" className="bg-bg-surface-muted/30 py-16 sm:py-20 border-y border-border-custom">
        <Container>
          <SectionHeading
            eyebrow="GỢI Ý HÀNH TRÌNH"
            title="Các tour du lịch riêng phổ biến nhất"
            description="Lịch trình được thiết kế hợp lý bởi tài xế bản địa giúp bạn ngắm nhìn miền Trung trọn vẹn và thư thái."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tours">
              <Button variant="outline" className="font-bold flex items-center justify-center gap-2 mx-auto">
                Xem tất cả 11 tour hành trình
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. ĐỘI XE DU LỊCH */}
      <section id="doi-xe">
        <Container>
          <SectionHeading
            eyebrow="ĐỘI XE CHẤT LƯỢNG"
            title="Đội xe đời mới, tiện nghi đầy đủ"
            description="Chúng tôi trang bị các dòng xe hiện đại, điều hòa mát rượi, Wi-Fi tốc độ cao, nước uống miễn phí và cổng sạc USB."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelectVehicle={handleSelectVehicle}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 6. LÝ DO LỰA CHỌN */}
      <section className="bg-[#111928] text-white py-16 sm:py-20 md:py-24 border-y border-gray-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-secondary uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-custom-full w-fit">
                TẠI SAO CHỌN CHÚNG TÔI
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Cam kết chất lượng dịch vụ xe du lịch tốt nhất tại Huế
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                HUE CAR TOURS là thương hiệu dịch vụ vận chuyển cá nhân được vận hành bởi tài xế bản xứ giàu kinh nghiệm tại Cố đô. Chúng tôi hiểu rõ từng ngóc ngách, ẩm thực địa phương và cam kết mang lại sự an tâm tuyệt đối cho quý khách.
              </p>
              
              <div className="flex gap-4 pt-2">
                <a
                  href={`tel:${huecartourContact.hotlineRaw}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-custom-md bg-secondary text-text-on-secondary font-bold text-sm hover:bg-secondary-hover transition-colors"
                >
                  Gọi hotline ngay
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-custom-lg border border-white/10 bg-white/5">
                <h4 className="text-base font-bold text-white mb-2">Đúng giờ đón khách</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tài xế luôn có mặt trước giờ hẹn ít nhất 10-15 phút để chuẩn bị đón tiếp chu đáo nhất.
                </p>
              </div>

              <div className="p-5 rounded-custom-lg border border-white/10 bg-white/5">
                <h4 className="text-base font-bold text-white mb-2">Không chi phí ẩn</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Giá báo trọn gói bao gồm xăng dầu, cầu đường và phí đỗ xe. Không phát sinh chi phí mập mờ.
                </p>
              </div>

              <div className="p-5 rounded-custom-lg border border-white/10 bg-white/5">
                <h4 className="text-base font-bold text-white mb-2">Lái xe an toàn</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tài xế địa phương kinh nghiệm chạy xe điềm đạm, cẩn thận, am hiểu Luật Giao thông.
                </p>
              </div>

              <div className="p-5 rounded-custom-lg border border-white/10 bg-white/5">
                <h4 className="text-base font-bold text-white mb-2">Hỗ trợ nhiệt tình</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tư vấn điểm tham quan, quán ăn ngon bản địa hoàn toàn miễn phí suốt chặng đường đi.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. QUY TRÌNH ĐẶT XE */}
      <section>
        <Container>
          <SectionHeading
            eyebrow="QUY TRÌNH ĐƠN GIẢN"
            title="Quy trình đặt xe nhanh chóng"
            description="Đặt xe nhanh chóng chỉ với 4 bước cơ bản không cần thủ tục đặt cọc phức tạp."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative p-5 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-secondary">01</span>
              <h4 className="text-sm sm:text-base font-bold text-text-primary">Gửi thông tin</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Nhập lịch trình di chuyển và loại xe mong muốn vào form yêu cầu báo giá bên dưới.
              </p>
            </div>

            <div className="relative p-5 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-secondary">02</span>
              <h4 className="text-sm sm:text-base font-bold text-text-primary">Nhận báo giá</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Tài xế nhận yêu cầu, phân tích tuyến đường và phản hồi báo giá trọn gói tức thì.
              </p>
            </div>

            <div className="relative p-5 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-secondary">03</span>
              <h4 className="text-sm sm:text-base font-bold text-text-primary">Xác nhận lịch</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Chốt giờ đón, thông tin biển số xe và thông tin tài xế phục vụ chuyến đi của bạn.
              </p>
            </div>

            <div className="relative p-5 bg-bg-surface border border-border-custom rounded-custom-lg flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-secondary">04</span>
              <h4 className="text-sm sm:text-base font-bold text-text-primary">Đi xe & Thanh toán</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Trải nghiệm chuyến đi an toàn và thanh toán tiền mặt trực tiếp cho tài xế khi kết thúc hành trình.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FORM ĐẶT XE & YÊU CẦU BÁO GIÁ */}
      <section id="dat-xe" className="scroll-mt-24">
        <Container cleanWidth>
          <BookingForm />
        </Container>
      </section>

      {/* 9. ĐÁNH GIÁ CỦA KHÁCH HÀNG */}
      <section className="bg-bg-surface-muted/30 py-16 sm:py-20 border-y border-border-custom">
        <Container>
          <SectionHeading
            eyebrow="Ý KIẾN KHÁCH HÀNG"
            title="Đánh giá từ những người đã trải nghiệm"
            description="Sự hài lòng của khách hàng là động lực lớn nhất để chúng tôi hoàn thiện chất lượng dịch vụ đón đưa."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg space-y-4 shadow-custom-sm">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
                &ldquo;Dịch vụ rất tốt, tài xế đúng giờ, nhiệt tình giới thiệu các quán ăn địa phương siêu ngon. Xe mới tinh chạy êm ái, gia đình tôi đi rất hài lòng.&rdquo;
              </p>
              <div className="border-t border-border-custom pt-3 flex items-center justify-between text-xs">
                <span className="font-bold text-text-primary">Chị Lan Hương</span>
                <span className="text-text-secondary">Khách tour Đà Nẵng</span>
              </div>
            </div>

            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg space-y-4 shadow-custom-sm">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
                &ldquo;Tôi đặt xe đón sân bay Phú Bài về trung tâm thành phố. Chuyến bay trễ hơn 30 phút nhưng tài xế vẫn vui vẻ đứng chờ ở sảnh, thái độ niềm nở lắm.&rdquo;
              </p>
              <div className="border-t border-border-custom pt-3 flex items-center justify-between text-xs">
                <span className="font-bold text-text-primary">Anh Tuấn Minh</span>
                <span className="text-text-secondary">Khách đưa đón sân bay</span>
              </div>
            </div>

            <div className="p-6 bg-bg-surface border border-border-custom rounded-custom-lg space-y-4 shadow-custom-sm">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
                &ldquo;Chuyến tham quan Lăng tẩm Huế 4 điểm bằng xe riêng thật tuyệt vời. Không bị gò bó thời gian như đi xe đoàn lớn. Giá cả lại rất hợp túi tiền.&rdquo;
              </p>
              <div className="border-t border-border-custom pt-3 flex items-center justify-between text-xs">
                <span className="font-bold text-text-primary">Chị Minh Tâm</span>
                <span className="text-text-secondary">Khách Huế City Tour</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 10. FAQ CÂU HỎI THƯỜNG GẶP */}
      <section id="faq">
        <Container>
          <SectionHeading
            eyebrow="GIẢI ĐÁP THẮC MẮC"
            title="Câu hỏi thường gặp về dịch vụ"
            description="Tìm nhanh câu trả lời cho các thắc mắc phổ biến nhất từ hành khách khi đặt xe tại Huế."
          />
          <FaqAccordion items={globalFaq} />
        </Container>
      </section>

      {/* 11. LIÊN HỆ & GOOGLE MAPS */}
      <section id="lien-he" className="scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="KẾT NỐI VỚI CHÚNG TÔI"
            title="Thông tin liên hệ chi tiết"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Hộp thông tin liên hệ */}
            <div className="p-6 sm:p-8 bg-bg-surface border border-border-custom rounded-custom-lg space-y-6">
              <h3 className="text-lg font-bold text-text-primary pb-3 border-b border-border-custom">
                HUE CAR TOURS
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Văn phòng đại diện:</span>
                    <span>{huecartourContact.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Hotline đặt xe:</span>
                    <a href={`tel:${huecartourContact.hotlineRaw}`} className="font-bold text-primary text-base hover:underline">
                      {huecartourContact.hotlineDisplay}
                    </a>
                    <span className="text-[11px] text-text-secondary block font-normal">({huecartourContact.contactName})</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">Email liên hệ:</span>
                    <a href={`mailto:${huecartourContact.email}`} className="hover:underline">
                      {huecartourContact.email}
                    </a>
                  </div>
                </li>
              </ul>
              
              <div className="pt-4 border-t border-border-custom">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2.5">
                  Giờ đón xe du lịch
                </h4>
                <div className="flex gap-2 items-center text-xs text-text-secondary">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Phục vụ 24/7 (Cần đặt lịch trước)</span>
                </div>
              </div>
            </div>

            {/* Bản đồ Google Maps */}
            <div className="lg:col-span-2">
              <GoogleMap
                embedUrl={huecartourContact.googleMapsEmbedUrl}
                directionUrl={huecartourContact.googleMapsDirectionUrl}
                address={huecartourContact.address}
                title="Văn phòng Hue Car Tours"
              />
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
