"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/imoveis", label: "Imóveis" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/localizacao", label: "Localização" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 backdrop-blur-sm shadow-[0_2px_24px_rgba(15,30,43,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl font-semibold text-navy-900 tracking-tight group-hover:text-gold-500 transition-colors duration-300">
              VA. Lima
            </span>
            <span className="font-body text-[10px] font-medium tracking-[0.3em] text-gold-500 uppercase">
              Imóveis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link font-body text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5 ${
                  pathname === link.href
                    ? "text-gold-500 active"
                    : "text-navy-700 hover:text-navy-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/imoveis"
              className="ml-2 bg-navy-900 text-cream-50 px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-500 transition-colors duration-300"
            >
              Ver Imóveis
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-navy-900 hover:text-gold-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-cream-50/98 backdrop-blur-sm border-t border-cream-200`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 font-body text-sm font-medium border-b border-cream-200 transition-colors duration-200 ${
                pathname === link.href
                  ? "text-gold-500"
                  : "text-navy-700 hover:text-gold-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/imoveis"
            className="mt-3 text-center bg-navy-900 text-cream-50 py-3 text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-500 transition-colors duration-300"
          >
            Ver Imóveis
          </Link>
        </nav>
      </div>
    </header>
  );
}
