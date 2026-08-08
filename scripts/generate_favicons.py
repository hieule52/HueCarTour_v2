"""
generate_favicons.py
Tạo favicon chuẩn từ autospa_tab.png cho TIẾN QUỐC AUTO SPA
"""

from PIL import Image
import os
import shutil

# Paths
BRAND_DIR = r"c:\DuAn\HueCarTour_v2\public\assets\images\brand"
SOURCE_FILE = os.path.join(BRAND_DIR, "autospa_tab.png")
OUTPUT_512 = os.path.join(BRAND_DIR, "autospa_tab.png")  # Giữ nguyên tên, sẽ verify/update nếu cần

def get_tight_crop_box(img, bg_color=(0, 0, 0), threshold=30):
    """
    Tìm bounding box của phần logo thực sự (loại bỏ viền nền đen dư thừa).
    Vì nền là đen, ta tìm các pixel không phải đen.
    """
    img_rgb = img.convert("RGB")
    width, height = img_rgb.size
    pixels = img_rgb.load()

    min_x, min_y = width, height
    max_x, max_y = 0, 0

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            # Pixel không phải nền đen (brightness > threshold)
            brightness = (r + g + b) / 3
            if brightness > threshold:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    return (min_x, min_y, max_x + 1, max_y + 1)


def create_favicon_set():
    print(f"📂 Đọc file nguồn: {SOURCE_FILE}")
    img = Image.open(SOURCE_FILE).convert("RGBA")
    original_size = img.size
    print(f"   Kích thước gốc: {original_size[0]}x{original_size[1]}")

    # --- Bước 1: Tạo autospa_tab.png chuẩn 512x512 ---
    # File autospa_tab.png đã là ảnh nền đen với rounded corners
    # Logo chiếm gần hết canvas → giữ nguyên, chỉ đảm bảo đúng 512x512
    
    # Resize thành 512x512 nếu chưa đúng
    if original_size != (512, 512):
        # Giữ tỷ lệ, fill nền đen nếu cần
        img_512 = Image.new("RGBA", (512, 512), (0, 0, 0, 255))
        img_resized = img.copy()
        img_resized.thumbnail((512, 512), Image.LANCZOS)
        # Căn giữa
        x_offset = (512 - img_resized.size[0]) // 2
        y_offset = (512 - img_resized.size[1]) // 2
        img_512.paste(img_resized, (x_offset, y_offset), img_resized)
    else:
        img_512 = img.copy()

    print(f"\n✅ autospa_tab.png: 512x512 (giữ nguyên file gốc)")

    # --- Bước 2: Tạo favicon set từ autospa_tab.png ---
    favicons = [
        ("favicon-16x16.png",        16,  "PNG"),
        ("favicon-32x32.png",        32,  "PNG"),
        ("favicon-48x48.png",        48,  "PNG"),
        ("apple-touch-icon.png",    180,  "PNG"),
        ("android-chrome-192x192.png", 192, "PNG"),
        ("android-chrome-512x512.png", 512, "PNG"),
    ]

    results = []
    for filename, size, fmt in favicons:
        out_path = os.path.join(BRAND_DIR, filename)
        
        if size == 512:
            out_img = img_512.copy()
        else:
            out_img = img_512.resize((size, size), Image.LANCZOS)
        
        out_img.save(out_path, fmt, optimize=True)
        file_size = os.path.getsize(out_path)
        print(f"   ✅ {filename}: {size}x{size}px — {file_size:,} bytes ({file_size // 1024} KB)")
        results.append((filename, size, file_size))

    return results


def check_existing_favicons():
    """Kiểm tra các file favicon hiện có trong public dir"""
    public_dir = r"c:\DuAn\HueCarTour_v2\public"
    print("\n🔍 Kiểm tra file favicon hiện có trong /public:")
    for fname in os.listdir(public_dir):
        if "favicon" in fname.lower() or "icon" in fname.lower() or "apple" in fname.lower():
            fpath = os.path.join(public_dir, fname)
            if os.path.isfile(fpath):
                size = os.path.getsize(fpath)
                print(f"   ⚠️  /public/{fname} ({size:,} bytes) — có thể gây nhầm favicon!")


if __name__ == "__main__":
    print("=" * 60)
    print("🚗 TIẾN QUỐC AUTO SPA — Favicon Generator")
    print("=" * 60)

    check_existing_favicons()

    print(f"\n📦 Tạo favicon set tại: {BRAND_DIR}")
    results = create_favicon_set()

    print("\n" + "=" * 60)
    print("📋 TỔNG KẾT")
    print("=" * 60)
    for fname, size, fsize in results:
        print(f"   {fname:<35} {size:>4}x{size:<4}  {fsize:>8,} bytes")

    print("\n🎉 Hoàn thành! Cập nhật layout.tsx tiếp theo.")
