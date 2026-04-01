import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Nobre Imóveis",
    default: "Nobre Imóveis — Seu Sonho, Nossa Missão",
  },
  description:
    "Encontre o imóvel perfeito com a Nobre Imóveis. Apartamentos, casas e coberturas de alto padrão em localizações privilegiadas.",
  keywords: ["imóveis", "apartamento", "casa", "imobiliária", "comprar imóvel"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-cream-100 font-body">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
