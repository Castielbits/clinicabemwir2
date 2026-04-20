"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoComTexto from "@/images/logos/logo-bem-wir-com-texto.png";
import { navLinks, siteConfig } from "@/data/siteContent";

export default function Footer() {
  const pathname = usePathname();

  const resolveHref = (href: string, kind: "anchor" | "page") => {
    if (kind === "anchor") {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="section-dark-deep py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Image
              src={logoComTexto}
              alt="Bem-wir"
              height={32}
              className="mb-5 h-8 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="eyebrow text-white/35" style={{ fontSize: "0.6rem" }}>
              {siteConfig.slogan}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
              Cuidado integrado para dor crônica e sofrimento persistente, com
              fisioterapia especializada em neurociências, psicologia e
              neuromodulação.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-sm">
            <div className="flex flex-wrap gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href, link.kind)}
                  className="text-white/45 transition-colors duration-200 hover:text-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1 text-white/35 sm:text-right">
              <span>{siteConfig.whatsappDisplay}</span>
              <span>{siteConfig.email}</span>
              <span>{siteConfig.instagramHandle}</span>
            </div>
            <hr className="divider-line light" />
            <div className="eyebrow text-white/25" style={{ fontSize: "0.55rem" }}>
              &copy; {new Date().getFullYear()} Bem-wir. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
