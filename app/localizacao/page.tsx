import { MapPin, Phone, Mail, Clock, Car, Train } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Localização",
  description:
    "Encontre a VA. Lima Imóveis no Capão Redondo — Parque Fernanda, Zona Sul de SP. Próximos ao UNASP e Estrada de Itapecerica.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Estrada de Itapecerica",
    sub: "Parque Fernanda — Capão Redondo, SP",
    href: "https://maps.google.com/?q=Estrada+de+Itapecerica+Capão+Redondo+São+Paulo",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 99999-9999",
    sub: "Seg a Sex, das 9h às 18h",
    href: "tel:+5511999999999",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@valimaimoveis.com.br",
    sub: "Respondemos em até 2h",
    href: "mailto:contato@valimaimoveis.com.br",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg – Sex: 9h às 18h",
    sub: "Sáb: 9h às 13h | Dom: Fechado",
    href: null,
  },
];

const howToArrive = [
  {
    icon: Train,
    mode: "Metrô",
    desc: 'Linha 5-Lilás (Capão Redondo). Desça na estação Capão Redondo e pegue um ônibus até a Estrada de Itapecerica.',
  },
  {
    icon: Car,
    mode: "Carro / App",
    desc: 'Acesso pela Estrada de Itapecerica. Próximo ao Sonda Supermercados e UNASP.',
  },
];

export default function LocalizacaoPage() {
  // Embed Google Maps — Capão Redondo / Parque Fernanda, Estrada de Itapecerica
  // ← Para usar seu endereço exato: Google Maps → Compartilhar → Incorporar um mapa → copie o src do iframe
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.8177!2d-46.7596!3d-23.6794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4f1c3c1c1c1c%3A0x0!2sEstrada%20de%20Itapecerica%2C%20Cap%C3%A3o%20Redondo%2C%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1700000000001!5m2!1spt-BR!2sbr";

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <div className="bg-navy-900 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Venha nos visitar
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-cream-50 leading-tight">
            Nossa
            <span className="text-gold-400 italic"> Localização</span>
          </h1>
        </div>
      </div>

      {/* Map + Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Map */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="overflow-hidden shadow-[0_4px_32px_rgba(15,30,43,0.12)] h-[420px] lg:h-[500px]">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização VA. Lima Imóveis — Capão Redondo SP"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Estrada+de+Itapecerica+Capão+Redondo+São+Paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-body text-navy-500 hover:text-gold-500 transition-colors duration-200"
            >
              <MapPin size={14} />
              Abrir no Google Maps
            </a>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <div>
              <p className="section-label mb-3">Informações de contato</p>
              <h2 className="heading-display text-3xl mb-8">
                Como chegar até nós
              </h2>
            </div>

            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-cream-50 card-shadow"
              >
                <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
                  <info.icon size={16} className="text-gold-400" />
                </div>
                <div>
                  <p className="font-body text-navy-400 text-[10px] font-medium tracking-[0.15em] uppercase mb-1">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-body text-navy-900 text-sm font-medium hover:text-gold-500 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-body text-navy-900 text-sm font-medium">
                      {info.value}
                    </p>
                  )}
                  <p className="font-body text-navy-500 text-xs mt-0.5">
                    {info.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to arrive */}
      <section className="bg-cream-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Acesso fácil</p>
            <h2 className="heading-display text-3xl">Como Chegar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {howToArrive.map((item, i) => (
              <div key={i} className="bg-cream-50 p-6 card-shadow flex items-start gap-4">
                <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-body text-navy-900 font-semibold text-sm mb-1">
                    {item.mode}
                  </h3>
                  <p className="font-body text-navy-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-navy-900 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-cream-50">
              Prefere falar antes de vir?
            </h2>
            <p className="font-body text-cream-300 text-sm mt-1">
              Entre em contato pelo WhatsApp e agende uma visita sem compromisso.
            </p>
          </div>
          <a
            href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Gostaria de agendar uma visita a um imóvel no Capão Redondo.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm text-cream-50 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Agendar pelo WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
