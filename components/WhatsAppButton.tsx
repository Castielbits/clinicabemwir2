"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteContent";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-cream/95 px-4 py-3 text-dark shadow-[0_12px_30px_rgba(95,36,131,0.12)] backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 border border-dark/8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
      aria-label="Falar no WhatsApp"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsAppIcon size={18} />
      </span>
      <span className="hidden pr-1 text-left sm:block">
        <span className="block eyebrow text-dark/40" style={{ fontSize: "0.55rem" }}>
          WhatsApp
        </span>
        <span className="block text-sm font-bold text-ink">
          {siteConfig.secondaryCtaLabel}
        </span>
      </span>
      <ArrowUpRight size={14} className="hidden text-dark/40 sm:block" />
    </a>
  );
}
