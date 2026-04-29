// filepath: components/WhatsAppContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WhatsAppContextType {
  customMessage: string | null;
  setCustomMessage: (message: string | null) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  return (
    <WhatsAppContext.Provider value={{ customMessage, setCustomMessage }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsAppMessage() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsAppMessage must be used within WhatsAppProvider");
  }
  return context;
}