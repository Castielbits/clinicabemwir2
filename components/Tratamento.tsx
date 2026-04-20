import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { methodPillars, methodSection, methodSteps } from "@/data/siteContent";

import iconFisio from "@/images/Camada 6.png";
import iconPsico from "@/images/Camada 7.png";
import iconNeuro from "@/images/Camada 8.png";

const pillarIcons = [iconFisio, iconPsico, iconNeuro];
const accentColors = ["bg-butter", "bg-blush", "bg-sage"] as const;

export default function Tratamento() {
  return (
    <section id="metodo" className="section-cream section-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[35vw] h-[35vw] rounded-full bg-butter/25 blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[25vw] h-[25vw] rounded-full bg-sage/15 blur-[60px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10">

        <ScrollReveal>
          <div className="px-2 sm:px-0">
            <SectionHeader
              eyebrow={methodSection.eyebrow}
              title={methodSection.title}
              description={methodSection.description}
              align="center"
            />
          </div>
        </ScrollReveal>

        {/* Pilares com ícones */}
        <div className="mt-16 sm:mt-20 grid gap-8 sm:gap-10 lg:grid-cols-3">
          {methodPillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index + 1}>
              <article className="flex flex-col gap-6">
                {/* Ícone da marca */}
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${accentColors[index]}/30`}>
                  <Image
                    src={pillarIcons[index]}
                    alt={pillar.title}
                    height={40}
                    className="h-10 w-10 object-contain mix-blend-multiply"
                  />
                </div>
                <div className={`h-0.5 w-10 rounded-full ${accentColors[index]}`} />
                <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-base leading-8 text-muted">
                  {pillar.text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Processo — linha de fluxo horizontal sem números */}
        <ScrollReveal delay={1}>
          <div className="mt-20 border-t border-dark/8 pt-16">
            <p className="eyebrow eyebrow-line dark text-dark/40 mb-10">
              como funciona na prática
            </p>

            {/* Mobile: lista vertical */}
            <div className="flex flex-col gap-0 lg:hidden">
              {methodSteps.map((step, index) => (
                <div key={step.title} className="flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 flex-shrink-0 rounded-full mt-1 ${accentColors[index]}`} />
                    {index < methodSteps.length - 1 && (
                      <div className="mt-2 w-px flex-1 min-h-[2rem] bg-dark/8" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h4 className="font-serif text-xl font-bold text-ink">{step.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: linha horizontal com dots */}
            <div className="hidden lg:block">
              {/* Linha conectora */}
              <div className="relative flex items-center mb-8">
                {methodSteps.map((step, index) => (
                  <div key={step.title + "-dot"} className="flex-1 flex items-center">
                    <div className={`h-3.5 w-3.5 flex-shrink-0 rounded-full ${accentColors[index]} z-10`} />
                    {index < methodSteps.length - 1 && (
                      <div className="flex-1 border-t border-dashed border-dark/15 mx-3" />
                    )}
                  </div>
                ))}
              </div>
              {/* Labels abaixo */}
              <div className="grid grid-cols-3 gap-10">
                {methodSteps.map((step) => (
                  <div key={step.title + "-label"}>
                    <h4 className="font-serif text-xl font-bold text-ink">{step.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
