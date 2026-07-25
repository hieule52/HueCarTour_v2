// ============================================================
// src/components/common/FaqAccordion.tsx
// Hộp câu hỏi thường gặp (Accordion) với chuyển động mượt mà
// ============================================================

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[] | FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4 max-w-3xl mx-auto w-full", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-border-custom rounded-custom-lg bg-bg-surface overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:bg-bg-surface-muted cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${index}`}
              id={`faq-title-${index}`}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-text-secondary transition-transform duration-300 flex-shrink-0 ml-4",
                  isOpen && "transform rotate-180 text-primary"
                )}
              />
            </button>
            <div
              id={`faq-content-${index}`}
              aria-labelledby={`faq-title-${index}`}
              role="region"
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-[500px] border-t border-border-custom" : "max-h-0"
              )}
            >
              <div className="p-4 sm:p-5 text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed bg-bg-surface-muted/30">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
