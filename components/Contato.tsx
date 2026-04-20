import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { contactSection, siteConfig } from "@/data/siteContent";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contato() {
  return (
    <section id="contato" className="section-cream section-full">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-end">
          <ScrollReveal>
            <div>
              <p className="eyebrow eyebrow-line dark text-dark/50">
                contato
              </p>
              <h2 className="heading-serif mt-6 text-3xl text-ink sm:text-4xl lg:text-[2.8rem]">
                {contactSection.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                {contactSection.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-[1.3fr_0.7fr]">
            <ScrollReveal delay={1}>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl bg-dark p-8 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]">
                    <WhatsAppIcon size={22} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <div className="mt-8">
                  <p className="eyebrow text-white/40 mb-2" style={{ fontSize: "0.6rem" }}>
                    canal preferencial
                  </p>
                  <h3 className="font-serif text-2xl font-bold">
                    WhatsApp
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {siteConfig.whatsappDisplay}
                  </p>
                </div>
              </a>
            </ScrollReveal>

            <div className="grid gap-5">
              <ScrollReveal delay={2}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block rounded-2xl border border-dark/8 bg-cream-light p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Mail size={18} className="text-dark/60" />
                  <p className="eyebrow mt-5 text-dark/35" style={{ fontSize: "0.6rem" }}>
                    email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {siteConfig.email}
                  </p>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-dark/8 bg-cream-light p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Instagram size={18} className="text-dark/60" />
                  <p className="eyebrow mt-5 text-dark/35" style={{ fontSize: "0.6rem" }}>
                    instagram
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {siteConfig.instagramHandle}
                  </p>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
