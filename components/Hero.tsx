import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import Highlight from "@/components/Highlight";
import { heroContent, siteConfig } from "@/data/siteContent";

const dotColors = ["bg-butter", "bg-blush", "bg-sage", "bg-butter"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden section-dark flex min-h-[100svh] items-center pt-28 pb-16 sm:pt-24 sm:pb-20">
      <NeuralNetworkBackground />

      {/* Organic color blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[70vw] h-[70vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-butter/6 blur-[100px]" />
        <div className="absolute -bottom-16 -left-16 w-[55vw] h-[55vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-blush/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-10 flex flex-col items-center text-center">

        <ScrollReveal>
          <p className="eyebrow eyebrow-line light text-white/50 justify-center" style={{ fontSize: "0.62rem" }}>
            {heroContent.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h1 className="heading-serif mt-6 sm:mt-8 text-[2.4rem] xs:text-[2.75rem] sm:text-6xl lg:text-[5rem] text-white">
            <Highlight color="rgba(253, 233, 162, 0.32)" delay={650}>
              Remodulando
            </Highlight>{" "}
            cérebro, corpo e vida.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="mt-5 sm:mt-8 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-white/70">
            {heroContent.intro}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p className="mt-3 sm:mt-4 max-w-xl text-sm leading-6 sm:text-base sm:leading-7 text-white/45">
            {heroContent.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <div className="mt-8 sm:mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <Link href="#elegibilidade" className="btn-primary btn-cream w-full sm:w-auto justify-center">
              {siteConfig.primaryCtaLabel}
              <ArrowRight size={16} />
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-outline-light w-full sm:w-auto justify-center"
            >
              {siteConfig.secondaryCtaLabel}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={5}>
          <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-2 sm:gap-3">
            {heroContent.badges.map((item, i) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 sm:px-4 sm:py-2 text-[0.68rem] sm:text-xs font-semibold tracking-wide text-white/70"
              >
                <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${dotColors[i % dotColors.length]}`} />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator — escondido no mobile pra não competir com os botões */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <div className="h-9 w-px bg-white/15" />
        <span className="eyebrow text-white/25" style={{ fontSize: "0.52rem" }}>rolar</span>
      </div>
    </section>
  );
}
