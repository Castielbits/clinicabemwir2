"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  eligibilityOptions,
  eligibilitySection,
  siteConfig,
} from "@/data/siteContent";

type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  queixa: string;
  queixaOutra: string;
  tempo: string;
  tratamentos: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  nome: "",
  email: "",
  whatsapp: "",
  queixa: "",
  queixaOutra: "",
  tempo: "",
  tratamentos: "",
};

const TOTAL_STEPS = 4;

// Tonalidade dos blobs muda por passo (jornada visual)
const stepPalette: Record<
  number,
  { blob1: string; blob2: string; blob3: string }
> = {
  1: {
    blob1: "rgba(168, 127, 199, 0.55)", // roxo claro
    blob2: "rgba(251, 218, 208, 0.40)", // blush
    blob3: "rgba(95, 36, 131, 0.50)", // roxo dark
  },
  2: {
    blob1: "rgba(168, 127, 199, 0.50)",
    blob2: "rgba(253, 233, 162, 0.45)", // butter
    blob3: "rgba(95, 36, 131, 0.45)",
  },
  3: {
    blob1: "rgba(253, 233, 162, 0.50)",
    blob2: "rgba(212, 225, 152, 0.50)", // sage
    blob3: "rgba(168, 127, 199, 0.40)",
  },
  4: {
    blob1: "rgba(212, 225, 152, 0.55)",
    blob2: "rgba(168, 127, 199, 0.50)",
    blob3: "rgba(95, 36, 131, 0.45)",
  },
};

export default function Elegibilidade() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const palette = stepPalette[step];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!form.queixa) newErrors.queixa = "Selecione sua principal queixa";
      if (form.queixa === "outra" && !form.queixaOutra.trim()) {
        newErrors.queixaOutra = "Descreva brevemente sua queixa";
      }
    }
    if (currentStep === 2) {
      if (!form.tempo) newErrors.tempo = "Selecione o tempo da condição";
    }
    if (currentStep === 3) {
      if (!form.tratamentos) newErrors.tratamentos = "Selecione uma opção";
    }
    if (currentStep === 4) {
      if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
      if (!form.email.trim()) {
        newErrors.email = "Email é obrigatório";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Email inválido";
      }
      if (!form.whatsapp.trim()) newErrors.whatsapp = "WhatsApp é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const selectOption = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Auto-advance exceto em "Outra" (que precisa de follow-up)
    if (field === "queixa" && value === "outra") return;
    if (field === "queixa" || field === "tempo" || field === "tratamentos") {
      setTimeout(() => {
        setStep((s) => Math.min(s + 1, TOTAL_STEPS));
      }, 320);
    }
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

  return (
    <section
      id="elegibilidade"
      className="section-dark relative overflow-hidden"
      style={{ padding: "clamp(6rem, 12vw, 10rem) 0" }}
    >
      {/* Blobs imersivos */}
      <div
        className="immersive-blob immersive-blob-1"
        style={{
          width: "70vw",
          height: "70vw",
          top: "-20vw",
          left: "-20vw",
          background: palette.blob1,
        }}
        aria-hidden="true"
      />
      <div
        className="immersive-blob immersive-blob-2"
        style={{
          width: "60vw",
          height: "60vw",
          bottom: "-25vw",
          right: "-20vw",
          background: palette.blob2,
        }}
        aria-hidden="true"
      />
      <div
        className="immersive-blob immersive-blob-3"
        style={{
          width: "50vw",
          height: "50vw",
          top: "30%",
          left: "40%",
          background: palette.blob3,
        }}
        aria-hidden="true"
      />

      {/* Grão sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left — info */}
          <div>
            <ScrollReveal>
              <p className="eyebrow eyebrow-line light text-white/50">
                {eligibilitySection.eyebrow}
              </p>
              <h2 className="heading-serif mt-6 text-3xl text-white sm:text-4xl lg:text-[3rem]">
                {eligibilitySection.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/65">
                {eligibilitySection.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="mt-10 space-y-5">
                <div className="border-l-2 border-white/15 pl-6">
                  <p
                    className="eyebrow text-white/40 mb-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    prioridade desta fase
                  </p>
                  <p className="text-sm leading-7 text-white/60">
                    A triagem inicial é o principal caminho de entrada do site.
                    WhatsApp continua disponível como canal de apoio.
                  </p>
                </div>
                <div className="border-l-2 border-white/15 pl-6">
                  <p
                    className="eyebrow text-white/40 mb-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    assinatura
                  </p>
                  <p className="font-serif text-xl font-bold text-white">
                    {siteConfig.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/55">
                    {eligibilitySection.note}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form imersivo com container sutil */}
          <ScrollReveal delay={2}>
            <div className="form-glass-container max-w-2xl">
              {/* Header estruturado — sinaliza "isto é um formulário" */}
              <div className="form-card-header">
                <div className="form-card-header-row">
                  <div className="flex items-center gap-3">
                    <span className="form-card-icon">
                      <ClipboardList size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <p
                        className="eyebrow text-ink/50"
                        style={{ fontSize: "0.6rem" }}
                      >
                        triagem inicial
                      </p>
                      <p className="font-serif text-base font-bold text-ink leading-tight">
                        Formulário de avaliação
                      </p>
                    </div>
                  </div>
                  <p
                    className="eyebrow text-ink/40 hidden sm:block"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {TOTAL_STEPS} perguntas · 2 min
                  </p>
                </div>
              </div>

              <div className="form-card-body">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center step-enter">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage/40">
                    <Check size={32} className="text-ink" strokeWidth={2.5} />
                  </div>
                  <p
                    className="eyebrow mt-8 text-ink/40"
                    style={{ fontSize: "0.62rem" }}
                  >
                    envio concluído
                  </p>
                  <h3 className="heading-serif mt-4 text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
                    Recebemos suas informações.
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-8 text-muted">
                    Nossa equipe fará a leitura inicial do seu caso e entrará em
                    contato pelo WhatsApp ou email informado para orientar o
                    próximo passo.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                      setStep(1);
                      setErrors({});
                    }}
                    className="btn-pill-light mt-10"
                  >
                    Enviar nova resposta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Progress */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className="eyebrow text-ink/55"
                        style={{ fontSize: "0.62rem" }}
                      >
                        passo {step} de {TOTAL_STEPS}
                      </p>
                      <p
                        className="eyebrow text-ink/35"
                        style={{ fontSize: "0.62rem" }}
                      >
                        {step === TOTAL_STEPS ? "último passo" : "continue"}
                      </p>
                    </div>
                    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-ink/8">
                      <div
                        className="progress-gradient absolute inset-y-0 left-0 rounded-full"
                        style={{ width: progressWidth }}
                      />
                    </div>
                  </div>

                  {/* Conteúdo do passo */}
                  <div key={step} className="step-enter">
                    {step === 1 && (
                      <StepContent
                        index="01"
                        question="Qual a sua principal queixa?"
                        subtitle="Escolha a que mais se aproxima do seu caso."
                      >
                        <div className="pill-grid grid gap-4 sm:grid-cols-2">
                          {eligibilityOptions.complaints
                            .filter((o) => o.value !== "")
                            .map((option) => {
                              const selected = form.queixa === option.value;
                              return (
                                <PillOrganic
                                  key={option.value}
                                  selected={selected}
                                  onClick={() =>
                                    selectOption("queixa", option.value)
                                  }
                                  label={option.label}
                                />
                              );
                            })}
                        </div>

                        {form.queixa === "outra" ? (
                          <div className="mt-8 anim-fade-in">
                            <label
                              className="eyebrow mb-3 block text-ink/55"
                              style={{ fontSize: "0.62rem" }}
                            >
                              qual? *
                            </label>
                            <UnderlineInput
                              name="queixaOutra"
                              type="text"
                              value={form.queixaOutra}
                              onChange={handleChange}
                              placeholder="Descreva brevemente sua queixa"
                              autoFocus
                              error={!!errors.queixaOutra}
                            />
                            {errors.queixaOutra ? (
                              <p className="mt-3 text-xs text-red-500">
                                {errors.queixaOutra}
                              </p>
                            ) : null}
                          </div>
                        ) : null}

                        {errors.queixa ? (
                          <p className="mt-5 text-xs text-red-500">
                            {errors.queixa}
                          </p>
                        ) : null}
                      </StepContent>
                    )}

                    {step === 2 && (
                      <StepContent
                        index="02"
                        question="Há quanto tempo convive com isso?"
                        subtitle="Uma leitura estratégica do tempo nos ajuda a entender seu caso."
                      >
                        <div className="pill-grid grid gap-4 sm:grid-cols-2">
                          {eligibilityOptions.durations
                            .filter((o) => o.value !== "")
                            .map((option) => {
                              const selected = form.tempo === option.value;
                              return (
                                <PillOrganic
                                  key={option.value}
                                  selected={selected}
                                  onClick={() =>
                                    selectOption("tempo", option.value)
                                  }
                                  label={option.label}
                                />
                              );
                            })}
                        </div>
                        {errors.tempo ? (
                          <p className="mt-5 text-xs text-red-500">
                            {errors.tempo}
                          </p>
                        ) : null}
                      </StepContent>
                    )}

                    {step === 3 && (
                      <StepContent
                        index="03"
                        question="Já tentou outros tratamentos antes?"
                        subtitle="Sem julgamento. Isso nos ajuda a não repetir o que não funcionou."
                      >
                        <div className="pill-grid grid gap-4 sm:grid-cols-2">
                          {eligibilityOptions.previousTreatments
                            .filter((o) => o.value !== "")
                            .map((option) => {
                              const selected =
                                form.tratamentos === option.value;
                              return (
                                <PillOrganic
                                  key={option.value}
                                  selected={selected}
                                  onClick={() =>
                                    selectOption("tratamentos", option.value)
                                  }
                                  label={option.label}
                                />
                              );
                            })}
                        </div>
                        {errors.tratamentos ? (
                          <p className="mt-5 text-xs text-red-500">
                            {errors.tratamentos}
                          </p>
                        ) : null}
                      </StepContent>
                    )}

                    {step === 4 && (
                      <StepContent
                        index="04"
                        question="Pra onde enviamos o retorno?"
                        subtitle="A equipe entra em contato pelo canal que você preferir."
                      >
                        <div className="step-child-stagger grid gap-7">
                          <div>
                            <label
                              className="eyebrow mb-3 block text-ink/55"
                              style={{ fontSize: "0.62rem" }}
                            >
                              nome completo *
                            </label>
                            <UnderlineInput
                              name="nome"
                              type="text"
                              value={form.nome}
                              onChange={handleChange}
                              placeholder="Seu nome completo"
                              error={!!errors.nome}
                            />
                            {errors.nome ? (
                              <p className="mt-3 text-xs text-red-500">
                                {errors.nome}
                              </p>
                            ) : null}
                          </div>
                          <div className="grid gap-7 sm:grid-cols-2">
                            <div>
                              <label
                                className="eyebrow mb-3 block text-ink/55"
                                style={{ fontSize: "0.62rem" }}
                              >
                                email *
                              </label>
                              <UnderlineInput
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                error={!!errors.email}
                              />
                              {errors.email ? (
                                <p className="mt-3 text-xs text-red-500">
                                  {errors.email}
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="eyebrow mb-3 block text-ink/55"
                                style={{ fontSize: "0.62rem" }}
                              >
                                whatsapp *
                              </label>
                              <UnderlineInput
                                name="whatsapp"
                                type="tel"
                                value={form.whatsapp}
                                onChange={handleChange}
                                placeholder="(31) 99999-9999"
                                error={!!errors.whatsapp}
                              />
                              {errors.whatsapp ? (
                                <p className="mt-3 text-xs text-red-500">
                                  {errors.whatsapp}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </StepContent>
                    )}
                  </div>

                  {/* Navegação */}
                  <div className="mt-12 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink/50 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ArrowLeft size={16} />
                      Voltar
                    </button>

                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-pill-light"
                      >
                        Continuar
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-pill-light"
                      >
                        {loading ? (
                          "Enviando..."
                        ) : (
                          <>
                            Enviar para avaliação
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {step === TOTAL_STEPS ? (
                    <p className="mt-6 text-xs leading-6 text-muted">
                      Seus dados serão usados apenas para retorno clínico
                      inicial e não serão compartilhados com terceiros.
                    </p>
                  ) : null}
                </form>
              )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function StepContent({
  index,
  question,
  subtitle,
  children,
}: {
  index: string;
  question: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="step-child-stagger">
      <p
        className="eyebrow text-ink/35 mb-3"
        style={{ fontSize: "0.6rem" }}
      >
        pergunta {index}
      </p>
      <h3 className="heading-serif text-[1.5rem] leading-[1.15] text-ink sm:text-[1.9rem] lg:text-[2.15rem]">
        {question}
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
        {subtitle}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function PillOrganic({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="pill-wrap">
      <button
        type="button"
        onClick={onClick}
        className={`pill-organic group relative flex w-full items-center gap-3 border px-6 py-4 text-left text-sm font-medium ${
          selected ? "is-selected" : ""
        }`}
      >
        <span
          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all ${
            selected
              ? "bg-cream text-dark scale-100"
              : "border border-ink/25 scale-90 group-hover:border-ink/50"
          }`}
        >
          {selected ? <Check size={12} strokeWidth={3} /> : null}
        </span>
        <span className="flex-1">{label}</span>
      </button>
    </div>
  );
}

function UnderlineInput({
  name,
  type,
  value,
  onChange,
  placeholder,
  autoFocus,
  error,
}: {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  error?: boolean;
}) {
  return (
    <div className="field-underline-wrap">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`field-underline ${error ? "has-error" : ""}`}
      />
    </div>
  );
}
