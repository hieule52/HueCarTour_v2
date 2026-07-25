// ============================================================
// src/components/common/GoogleMap.tsx
// Component hiển thị bản đồ Google Maps với tính năng lazy load
// ============================================================

import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "./Button";
import { isPlaceholderUrl } from "@/lib/utils";

interface GoogleMapProps {
  embedUrl: string;
  directionUrl: string;
  address: string;
  title?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  embedUrl,
  directionUrl,
  address,
  title = "Bản đồ vị trí",
}) => {
  const isEmbedPlaceholder = isPlaceholderUrl(embedUrl);
  const isDirectionPlaceholder = isPlaceholderUrl(directionUrl);

  return (
    <div className="relative w-full rounded-custom-lg border border-border-custom bg-bg-surface overflow-hidden shadow-custom-sm">
      {isEmbedPlaceholder ? (
        // UI thay thế khi URL chưa cấu hình (placeholder)
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] sm:min-h-[400px] bg-bg-surface-muted/50">
          <div className="w-12 h-12 rounded-custom-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-text-primary mb-2">Bản đồ chưa được cấu hình</h4>
          <p className="text-xs md:text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
            {address}
          </p>
          <Button
            variant="outline"
            disabled
            className="text-xs md:text-sm"
          >
            Chỉ đường trên Google Maps
          </Button>
          <span className="text-[10px] text-text-secondary mt-3 italic">
            (Tính năng chỉ đường tạm dừng ở chế độ Development)
          </span>
        </div>
      ) : (
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Overlay nhỏ góc dưới để mở chỉ đường trực tiếp nếu cần */}
          {!isDirectionPlaceholder && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto max-w-sm p-3 bg-bg-surface border border-border-custom shadow-custom-md rounded-custom-md flex flex-col gap-2">
              <p className="text-xs text-text-secondary font-medium truncate flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {address}
              </p>
              <a
                href={directionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold rounded-custom-sm bg-primary text-text-on-primary hover:bg-primary-hover transition-colors focus-visible:outline-2"
              >
                Chỉ đường chi tiết
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
