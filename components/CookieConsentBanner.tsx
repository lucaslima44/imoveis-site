"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "va_lima_cookie_consent";
type ConsentChoice = "necessary" | "all" | "rejected";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const consentCookie = cookies.find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
    const value = consentCookie?.split("=")[1];
    const acceptedValues = ["necessary", "all", "rejected", "accepted"];

    setIsVisible(!acceptedValues.includes(value ?? ""));

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;

    if (gtag) {
      gtag("consent", "update", {
        analytics_storage: value === "all" ? "granted" : "denied",
      });
    }
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=31536000; SameSite=Lax`;

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;

    if (gtag) {
      gtag("consent", "update", {
        analytics_storage: choice === "all" ? "granted" : "denied",
      });
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-slate-900/95 px-4 py-4 text-white shadow-2xl md:left-4 md:right-auto md:w-[454px] md:max-w-[calc(100%-2rem)] md:h-[160px]">
      <div className="mx-auto flex h-full flex-col gap-3">
        <div className="max-w-3xl">
          <p className="text-xs leading-relaxed md:text-sm">
            Utilizamos cookies para melhorar sua experiência no site. Escolha como deseja continuar. Ao aceitar você concorda com nossa <a href="/politica-de-privacidade" className="text-amber-400 hover:text-amber-300">política de privacidade</a>.
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-2">
          <button
            type="button"
            onClick={() => handleChoice("necessary")}
            className="rounded-md border border-slate-600 px-3 py-2 text-xs font-semibold text-white transition hover:border-amber-400 hover:text-amber-300 md:text-sm"
          >
            Apenas essenciais
          </button>

          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="rounded-md border border-slate-600 px-3 py-2 text-xs font-semibold text-white transition hover:border-amber-400 hover:text-amber-300 md:text-sm"
          >
            Rejeitar todos
          </button>

          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="rounded-md bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 md:text-sm"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
