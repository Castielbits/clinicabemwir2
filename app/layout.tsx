import type { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";

// Montserrat Black (peso 900) é a fonte institucional oficial do manual da Bem-wir
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Nunito é o substituto Google Fonts mais próximo do Avenir Next (fonte web oficial da marca)
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bem-wir | Ciência e empatia na gestão do bem-estar",
    template: "%s | Bem-wir",
  },
  description:
    "Cuidado integrado que combina fisioterapia especializada em neurociências, psicologia e neuromodulação. Tratamento global para fibromialgia, depressão, TDAH e dores orofaciais crônicas.",
  keywords: [
    "fibromialgia",
    "neuromodulação",
    "fisioterapia neurológica",
    "psicologia",
    "dor crônica",
    "TDAH",
    "depressão",
    "dores orofaciais",
    "tratamento integrado",
    "bem-wir",
  ],
  authors: [{ name: "Bem-wir Clínica" }],
  openGraph: {
    title: "Bem-wir | Remodulando seu cérebro, corpo e vida",
    description:
      "Cuidado integrado que une fisioterapia especializada em neurociências, psicologia e neuromodulação.",
    type: "website",
    locale: "pt_BR",
    siteName: "Bem-wir Clínica",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bem-wir | Remodulando cérebro, corpo e vida",
    description:
      "Fisioterapia especializada em neurociências, psicologia e neuromodulação.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Bem-wir",
  description:
    "Clínica de tratamento integrado que combina fisioterapia especializada em neurociências, psicologia e neuromodulação",
  slogan: "ciência e empatia na gestão do bem-estar",
  medicalSpecialty: [
    "Fisioterapia em Neurociências",
    "Psicologia",
    "Neuromodulação",
  ],
  telephone: "+55 31 99999-9999",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressLocality: "Placeholder",
  },
  sameAs: ["https://www.instagram.com/bemwir"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={nunito.className}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
