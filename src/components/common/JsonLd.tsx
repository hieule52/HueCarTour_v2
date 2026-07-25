// ============================================================
// src/components/common/JsonLd.tsx
// Component chèn schema JSON-LD để tối ưu SEO
// ============================================================

import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
