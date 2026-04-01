import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./ui/icons";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/imoveis", label: "Imóveis" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/localizacao", label: "Localização" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-cream-200">
      {/* Top CTA */}
      <div className="border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase mb-2">
              Pronto para começar?
            </p>
            <h3 className="font-display text-3xl text-cream-50 font-medium">
              Encontre seu imóvel ideal
            </h3>
          </div>
          <Link
            href="/imoveis"
            className="shrink-0 border border-gold-400 text-gold-400 px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-cream-50 hover:border-gold-500 transition-all duration-300"
          >
            Ver Todos os Imóveis
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p className="font-display text-3xl font-semibold text-cream-50 tracking-tight">
                Nobre
              </p>
              <p className="font-body text-[10px] font-medium tracking-[0.3em] text-gold-400 uppercase mt-0.5">
                Imóveis
              </p>
            </div>
            <p className="text-cream-300 font-body text-sm leading-relaxed max-w-sm mb-8">
              Há mais de 15 anos realizando sonhos e conectando pessoas aos seus
              imóveis ideais. Transparência, confiança e excelência em cada
              negociação.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-navy-500 flex items-center justify-center text-cream-300 hover:border-gold-400 hover:text-gold-400 transition-all duration-200"
              >
                <InstagramIcon size={16}  />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-navy-500 flex items-center justify-center text-cream-300 hover:border-gold-400 hover:text-gold-400 transition-all duration-200"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cream-50 font-body font-semibold text-sm tracking-wide mb-6 uppercase">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300 text-sm hover:text-gold-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream-50 font-body font-semibold text-sm tracking-wide mb-6 uppercase">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-cream-300 text-sm leading-relaxed">
                  Av. Paulista, 1000, Sala 210
                  <br />
                  São Paulo — SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-cream-300 text-sm hover:text-gold-400 transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-400 shrink-0" />
                <a
                  href="mailto:contato@nobre.com.br"
                  className="text-cream-300 text-sm hover:text-gold-400 transition-colors"
                >
                  contato@nobre.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-cream-300 text-xs">
            © {year} Nobre Imóveis. Todos os direitos reservados.
          </p>
          <p className="text-navy-500 text-xs">CRECI: 00000-J</p>
        </div>
      </div>
    </footer>
  );
}
