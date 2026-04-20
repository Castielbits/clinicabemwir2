import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { founders, foundersSection } from "@/data/siteContent";

const frameColors = [
  { bg: "bg-butter/40", accent: "bg-butter" },
  { bg: "bg-blush/40", accent: "bg-blush" },
];

export default function Equipe() {
  return (
    <section id="equipe" className="section-cream section-full">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <ScrollReveal>
          <SectionHeader
            eyebrow={foundersSection.eyebrow}
            title={foundersSection.title}
            description={foundersSection.description}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {founders.map((founder, index) => (
            <ScrollReveal key={founder.area} delay={index + 1}>
              <article className="group">
                {/* Photo placeholder — intentional editorial frame */}
                <div
                  className={`relative w-full overflow-hidden rounded-2xl ${frameColors[index].bg} aspect-[4/3] flex flex-col items-center justify-end pb-8`}
                >
                  {/* Abstract organic shape behind */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-40 h-40 rounded-full ${frameColors[index].accent} opacity-30 blur-3xl pointer-events-none`}
                  />
                  {/* Monogram circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/60 bg-white/50 backdrop-blur-sm shadow-sm mb-4">
                    <span className="font-serif text-2xl font-bold text-dark/60">
                      {founder.monogram}
                    </span>
                  </div>
                  <span
                    className="relative z-10 eyebrow text-ink/30"
                    style={{ fontSize: "0.55rem" }}
                  >
                    Fotos em breve
                  </span>
                </div>

                {/* Text */}
                <div className="mt-8 border-t border-dark/8 pt-8">
                  <p className="eyebrow text-dark/40" style={{ fontSize: "0.62rem" }}>
                    {founder.label}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-ink">
                    {founder.area}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted">
                    {founder.bio}
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className={`mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${frameColors[index].accent}`} />
                      <p className="text-sm leading-7 text-muted">
                        Atendimento integrado, leitura clínica compartilhada e
                        acompanhamento contínuo.
                      </p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className={`mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${frameColors[index].accent}`} />
                      <p className="text-sm leading-7 text-muted">
                        {index === 0
                          ? "Foco em função, dor persistente e sistema nervoso."
                          : "Foco em trauma, regulação emocional e sofrimento persistente."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
