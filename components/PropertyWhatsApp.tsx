// filepath: components/PropertyWhatsApp.tsx
"use client";

import { useEffect } from "react";
import { useWhatsAppMessage } from "@/components/WhatsAppContext";
import { Property } from "@/types";

export default function PropertyWhatsApp({ property }: { property: Property }) {
  const { setCustomMessage } = useWhatsAppMessage();
  
  const message = `Olá! Tenho interesse no imóvel: ${property.title} (${property.address}). Pode me enviar mais informações?`;
  
  useEffect(() => {
    setCustomMessage(message);
    
    // Limpa a mensagem quando o usuário sai da página
    return () => setCustomMessage(null);
  }, [message, setCustomMessage]);
  
  return null;
}