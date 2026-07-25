// ============================================================
// src/components/common/Breadcrumb.tsx
// Thanh điều hướng phân cấp (Breadcrumbs)
// ============================================================

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="py-4 border-b border-border-custom bg-bg-surface-muted/50" aria-label="Breadcrumb">
      <Container>
        <ol className="flex items-center flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-text-secondary">
          <li className="flex items-center">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus-visible:outline-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Trang chủ</span>
            </Link>
          </li>
          
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 mx-1 flex-shrink-0" />
                {isLast || !item.href ? (
                  <span className="font-medium text-text-primary truncate max-w-[200px] md:max-w-xs" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-xs focus-visible:outline-2"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
};
