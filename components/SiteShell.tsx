"use client";

import { usePathname } from "next/navigation";
import { WhatsAppProvider } from "@/components/WhatsAppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsentBanner from "@/components/CookieConsentBanner";

function SiteContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Mensagens personalizadas por página (apenas para páginas sem contexto)
  const getWhatsAppMessage = () => {
    if (pathname === "/") {
      return "Olá! Gostaria de saber mais sobre os imóveis disponíveis no site.";
    }
    if (pathname === "/imoveis") {
      return "Olá! Quero buscar imóveis no site. Pode me ajudar a encontrar o que procuro?";
    }
    if (pathname === "/quem-somos") {
      return "Olá! Gostaria de saber mais sobre a V.A Lima Imóveis.";
    }
    if (pathname === "/localizacao") {
      return "Olá! Quero saber mais sobre a localização da imobiliária.";
    }
    return "Olá! Tenho interesse em conhecer os imóveis disponíveis. Pode me ajudar?";
  };

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsentBanner />
    </>
  );
}

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WhatsAppProvider>
      <SiteContent>{children}</SiteContent>
    </WhatsAppProvider>
  );
}
