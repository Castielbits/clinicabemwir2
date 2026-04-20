import { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionHeaderProps) {
  const centered = align === "center";
  const eyebrowColor = inverted ? "text-white/60" : "text-dark/60";
  const titleColor = inverted ? "text-white" : "text-ink";
  const descColor = inverted ? "text-white/70" : "text-muted";
  const lineMode = inverted ? "light" : "dark";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`eyebrow eyebrow-line ${lineMode} ${eyebrowColor} mb-6 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`heading-serif text-[1.65rem] xs:text-3xl sm:text-4xl lg:text-[3.2rem] ${titleColor} break-words`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-6 text-base leading-8 sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
