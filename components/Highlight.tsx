"use client";

import { useEffect, useRef, useState } from "react";

type HighlightProps = {
  children: React.ReactNode;
  /** Cor do marca-texto. Default: butter (#fde9a2) */
  color?: string;
  /** Atraso em ms antes de iniciar a animação após entrar na tela */
  delay?: number;
};

/**
 * Destaca uma palavra como se um marca-texto fosse passado por cima.
 * A barra cresce horizontalmente da esquerda pra direita quando o
 * elemento entra na viewport. Usa CSS transform pra ficar performático.
 */
export default function Highlight({
  children,
  color = "rgba(253, 233, 162, 0.85)",
  delay = 200,
}: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className="highlight-word"
      style={
        {
          "--highlight-color": color,
          "--highlight-scale": visible ? 1 : 0,
        } as React.CSSProperties
      }
    >
      <span className="highlight-word-text">{children}</span>
    </span>
  );
}
