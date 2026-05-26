import type { Metadata } from 'next'
import {
  Montserrat,
  Poppins,
  Inter,
  Plus_Jakarta_Sans,
} from 'next/font/google'

import Script from 'next/script'

import './globals.css'
import SiteShell from '@/components/SiteShell'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const SITE_NAME = 'V.A Lima Imóveis'

/*
  Enquanto o domínio oficial não estiver comprado,
  use a URL atual da Vercel.
*/
const SITE_URL = 'https://imoveis-site.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Imobiliária no Capão Redondo, Zona Sul de SP`,
  },

  description:
    'V.A Lima Imóveis — imobiliária de confiança no Capão Redondo e Parque Fernanda, Zona Sul de São Paulo. Apartamentos, casas e imóveis próximos à Estrada de Itapecerica, Sonda e UNASP. Atendimento pelo WhatsApp e presencial!',

  keywords: [
    'imobiliária Capão Redondo',
    'imobiliária Parque Fernanda',
    'imóveis Zona Sul São Paulo',
    'apartamento COHAB Capão Redondo',
    'VA Lima Imóveis',
    'VA Lima Imobiliária',
    'imóveis Estrada de Itapecerica',
    'imobiliária perto do UNASP',
    'imobiliária perto do Sonda',
    'comprar apartamento Capão Redondo',
    'alugar imóvel Capão Redondo',
    'imóveis zona sul SP',
    'casas Capão Redondo',
    'casa aluguel parque fernanda',
    'sobrado para alugar parque fernanda',
    'salão comercial para alugar capão redondo',
    'espaço comercial para alugar capão redondo',
    'apartamento Parque Fernanda SP',
    'imobiliária bairro Capão Redondo',
  ],

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: '/',
  },

  /*
    FAVICONS / IOS / ANDROID / PWA
  */
  manifest: '/site.webmanifest',

  appleWebApp: {
    title: SITE_NAME,
  },

 icons: {
  icon: [
    {
      url: '/favicon.ico',
    },
    {
      url: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
  ],

  shortcut: '/favicon.ico',

  apple: [
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
},

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,

    title: `${SITE_NAME} — Imobiliária no Capão Redondo, Zona Sul de SP`,

    description:
      'Imobiliária de bairro no Capão Redondo e Parque Fernanda. Apartamentos, casas e imóveis próximos ao UNASP e Estrada de Itapecerica. Fale pelo WhatsApp!',

    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'V.A Lima Imóveis — Capão Redondo, Zona Sul SP',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',

  name: 'V.A Lima Imóveis',

  alternateName: 'V.A Lima Imobiliária',

  description:
    'Imobiliária de bairro no Capão Redondo e Parque Fernanda, Zona Sul de São Paulo. Especializada em apartamentos e imóveis residenciais próximos à Estrada de Itapecerica, Sonda e UNASP.',

  url: SITE_URL,

  telephone: '+5511997111030',

  email: 'valima.imoveis@gmail.com',

  address: {
    '@type': 'PostalAddress',

    streetAddress: 'Rua Silvia de Faria Marcondes 400 Sala 01 B',

    addressLocality: 'São Paulo',

    addressRegion: 'SP',

    postalCode: '05889-410',

    addressCountry: 'BR',
  },

  geo: {
    '@type': 'GeoCoordinates',

    latitude: '-23.670147',

    longitude: '-46.788527',
  },

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',

      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],

      opens: '09:00',

      closes: '17:00',
    },
  ],

  areaServed: [
    {
      '@type': 'Place',
      name: 'Capão Redondo',
    },
    {
      '@type': 'Place',
      name: 'Parque Fernanda',
    },
    {
      '@type': 'Place',
      name: 'Zona Sul de São Paulo',
    },
    {
      '@type': 'Place',
      name: 'Estrada de Itapecerica',
    },
    {
      '@type': 'Place',
      name: 'São Paulo',
    },
  ],

  sameAs: [],

  priceRange: '$$',

  currenciesAccepted: 'BRL',

  paymentAccepted:
    'Dinheiro, PIX, Transferência bancária, Financiamento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`
        ${montserrat.variable}
        ${poppins.variable}
        ${inter.variable}
        ${plusJakarta.variable}
      `}
    >
      <body className="min-h-screen bg-cream-100 font-body">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}