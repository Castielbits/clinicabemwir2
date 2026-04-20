"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoComTexto from "@/images/logos/logo-bem-wir-com-texto.png";
import { navLinks, siteConfig } from "@/data/siteContent";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeAnchor = (href: string) => (pathname === "/" ? href : `/${href}`);

  const resolveHref = (href: string, kind: "anchor" | "page") => {
    if (kind === "anchor") return homeAnchor(href);
    return href;
  };

  const solid = scrolled || mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`flex items-center justify-between px-6 py-4 transition-all duration-500 sm:px-10 ${
          solid
            ? "bg-cream/95 shadow-[0_1px_0_rgba(95,36,131,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center"
          aria-label="Bem-wir — Voltar ao início"
        >
          <Image
            src={logoComTexto}
            alt="Bem-wir"
            height={40}
            className="h-10 w-auto transition-all duration-500"
            style={{
              filter: solid ? "none" : "brightness(0) invert(1)",
            }}
            priority
          />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href, link.kind)}
              className={`eyebrow tracking-[0.18em] transition-colors duration-300 hover:opacity-100 ${
                solid
                  ? "text-ink/60 hover:text-dark"
                  : "text-white/65 hover:text-white"
              }`}
              style={{ fontSize: "0.68rem" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={homeAnchor("#elegibilidade")}
            className={`btn-primary text-xs transition-all duration-300 ${
              solid ? "btn-dark" : "btn-outline-light"
            }`}
          >
            {siteConfig.primaryCtaLabel}
          </Link>
        </nav>

        {/* Hamburger — mobile */}
        <button
          className={`menu-toggle md:hidden ${solid ? "menu-toggle--solid" : "menu-toggle--light"} ${mobileOpen ? "is-open" : ""}`}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          <span className="menu-toggle-bar menu-toggle-bar--top" />
          <span className="menu-toggle-bar menu-toggle-bar--mid" />
          <span className="menu-toggle-bar menu-toggle-bar--bot" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer md:hidden ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-inner">
          <p
            className="eyebrow text-dark/40 mb-4"
            style={{ fontSize: "0.6rem" }}
          >
            navegação
          </p>
          <nav className="flex flex-col">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={resolveHref(link.href, link.kind)}
                onClick={() => setMobileOpen(false)}
                className="mobile-drawer-link"
                style={{ transitionDelay: mobileOpen ? `${idx * 40 + 80}ms` : "0ms" }}
              >
                <span className="mobile-drawer-link-label">{link.label}</span>
                <span className="mobile-drawer-link-arrow" aria-hidden>→</span>
              </Link>
            ))}
          </nav>

          <div className="mobile-drawer-divider" />

          <div className="flex flex-col gap-3">
            <Link
              href={homeAnchor("#elegibilidade")}
              onClick={() => setMobileOpen(false)}
              className="btn-primary btn-dark text-center text-sm"
            >
              {siteConfig.primaryCtaLabel}
            </Link>
            <Link
              href={siteConfig.whatsappUrl}
              onClick={() => setMobileOpen(false)}
              target="_blank"
              rel="noreferrer"
              className="mobile-drawer-whatsapp"
            >
              <span className="mobile-drawer-whatsapp-icon">
                <WhatsAppIcon size={18} />
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="eyebrow text-dark/40" style={{ fontSize: "0.55rem" }}>
                  WhatsApp direto
                </span>
                <span className="text-sm font-bold text-ink">
                  {siteConfig.whatsappDisplay}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop blur atrás do drawer */}
      <div
        className={`mobile-drawer-backdrop md:hidden ${mobileOpen ? "is-open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
    </header>
  );
}
