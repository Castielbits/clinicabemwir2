import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Neuromodulacao from "@/components/Neuromodulacao";
import Tratamento from "@/components/Tratamento";
import Equipe from "@/components/Equipe";
import Elegibilidade from "@/components/Elegibilidade";
import Depoimentos from "@/components/Depoimentos";
import Faq from "@/components/Faq";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import VideoManifesto from "@/components/VideoManifesto";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Ciência e empatia na gestão do bem-estar",
  description:
    "A Bem-wir integra fisioterapia especializada em neurociências, psicologia e neuromodulação. Tratamento global para fibromialgia, depressão, TDAH e dores orofaciais crônicas.",
  openGraph: {
    title: "Bem-wir | Remodulando cérebro, corpo e vida",
    description:
      "Cuidado integrado para quadros em que corpo, sistema nervoso e contexto emocional precisam ser lidos em conjunto.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problema />
      <Tratamento />
      <Neuromodulacao />
      <Equipe />
      <VideoManifesto />
      <Depoimentos />
      <Faq />
      <Elegibilidade />
      <Contato />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
