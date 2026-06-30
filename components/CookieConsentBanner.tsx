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
    <div className="fixed inset-x-0 bottom-0 z-50 bg-slate-900/95 px-4 py-4 text-white shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base">
            Utilizamos cookies para melhorar sua experiência no site. Escolha como deseja continuar.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => handleChoice("necessary")}
            className="rounded-md border border-slate-600 px-3 py-2 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
          >
            Apenas essenciais
          </button>

          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="rounded-md border border-slate-600 px-3 py-2 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
          >
            Rejeitar todos
          </button>

          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
