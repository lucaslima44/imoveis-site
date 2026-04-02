import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_NAME = "VA. Lima Imóveis";
const SITE_URL = "https://www.valimaImoveis.com.br"; // ← troque pela URL real

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Imobiliária no Capão Redondo, Zona Sul de SP`,
  },
  description:
    "VA. Lima Imóveis — imobiliária de confiança no Capão Redondo e Parque Fernanda, Zona Sul de São Paulo. Apartamentos COHAB, casas e imóveis próximos à Estrada de Itapecerica, Sonda e UNASP. Atendimento pelo WhatsApp!",
  keywords: [
    "imobiliária Capão Redondo",
    "imobiliária Parque Fernanda",
    "imóveis Zona Sul São Paulo",
    "apartamento COHAB Capão Redondo",
    "VA Lima Imóveis",
    "VA Lima Imobiliária",
    "imóveis Estrada de Itapecerica",
    "imobiliária perto do UNASP",
    "imobiliária perto do Sonda",
    "comprar apartamento Capão Redondo",
    "alugar imóvel Capão Redondo",
    "imóveis zona sul SP",
    "casas Capão Redondo",
    "apartamento Parque Fernanda SP",
    "imobiliária bairro Capão Redondo",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Imobiliária no Capão Redondo, Zona Sul de SP`,
    description:
      "Imobiliária de bairro no Capão Redondo e Parque Fernanda. Apartamentos COHAB, casas e imóveis próximos ao UNASP e Estrada de Itapecerica. Fale pelo WhatsApp!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VA. Lima Imóveis — Capão Redondo, Zona Sul SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Imobiliária Capão Redondo`,
    description:
      "Apartamentos COHAB, casas e imóveis no Capão Redondo e Parque Fernanda — Zona Sul de São Paulo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: { google: "SEU_CODIGO_AQUI" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "VA. Lima Imóveis",
  alternateName: "VA. Lima Imobiliária",
  description:
    "Imobiliária de bairro no Capão Redondo e Parque Fernanda, Zona Sul de São Paulo. Especializada em apartamentos COHAB e imóveis residenciais próximos à Estrada de Itapecerica, Sonda e UNASP.",
  url: SITE_URL,
  telephone: "+55-11-99999-9999",
  email: "contato@valimaimoveis.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Estrada de Itapecerica",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "05835-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-23.6794",
    longitude: "-46.7596",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: [
    { "@type": "Place", name: "Capão Redondo" },
    { "@type": "Place", name: "Parque Fernanda" },
    { "@type": "Place", name: "Zona Sul de São Paulo" },
    { "@type": "Place", name: "Estrada de Itapecerica" },
    { "@type": "Place", name: "São Paulo" },
  ],
  sameAs: [],
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Dinheiro, PIX, Transferência bancária, Financiamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream-100 font-body">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
