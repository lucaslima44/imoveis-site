import Image from "next/image";
import { Users, Target, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a VA. Lima Imóveis — imobiliária de bairro no Capão Redondo e Parque Fernanda, Zona Sul de São Paulo. Nossa história, missão e o time dedicado a encontrar o imóvel certo para você.",
  openGraph: {
    title: "Quem Somos | VA. Lima Imóveis — Capão Redondo SP",
    description:
      "Imobiliária de confiança no Capão Redondo e Parque Fernanda, Zona Sul de SP. Conheça nossa história e nosso time.",
  },
};

const values = [
  {
    icon: Target,
    title: "Missão",
    desc: "Conectar pessoas aos seus imóveis ideais com transparência, agilidade e cuidado em cada etapa do processo.",
  },
  {
    icon: Eye,
    title: "Visão",
    desc: "Ser a imobiliária de referência em São Paulo, reconhecida pela excelência no atendimento e confiança dos clientes.",
  },
  {
    icon: Heart,
    title: "Valores",
    desc: "Honestidade, comprometimento, respeito ao cliente e paixão pelo que fazemos movem cada negociação.",
  },
];

const team = [
  {
    name: "Ricardo Nobre",
    role: "Fundador & Diretor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "15 anos de mercado imobiliário. Especialista em imóveis de alto padrão e investimentos.",
  },
  {
    name: "Ana Carvalho",
    role: "Gerente Comercial",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Especialista em negociação e atendimento consultivo. Mais de 300 imóveis intermediados.",
  },
  {
    name: "Bruno Lima",
    role: "Corretor Sênior",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "CRECI ativo, especializado em condomínios de alto padrão e imóveis residenciais.",
  },
  {
    name: "Fernanda Costa",
    role: "Corretora & Avaliadora",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Avaliadora certificada com foco em imóveis residenciais e consultoria para compradores.",
  },
];

const timeline = [
  { year: "2009", event: "Fundação da VA. Lima Imóveis no Capão Redondo" },
  { year: "2012", event: "Abertura da segunda unidade e expansão para o interior" },
  { year: "2016", event: "Prêmio de melhor imobiliária regional pelo CRECI-SP" },
  { year: "2020", event: "Digitalização completa e lançamento do portal online" },
  { year: "2024", event: "Mais de 1.200 imóveis negociados e 500 famílias atendidas" },
];

export default function QuemSomos() {
  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy-900 pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=60"
            alt="Edifícios"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Nossa história
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-cream-50 leading-tight max-w-2xl">
            Realizando Sonhos
            <br />
            <span className="text-gold-400 italic">Há 15 Anos</span>
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Nossa Trajetória</p>
            <h2 className="heading-display text-4xl mb-6">
              De uma ideia à referência no mercado
            </h2>
            <div className="w-12 h-0.5 bg-gold-500 mb-8" />
            <div className="space-y-4 font-body text-navy-600 text-[15px] leading-relaxed">
              <p>
                A VA. Lima Imóveis nasceu com uma missão clara com uma missão clara: oferecer um
                atendimento imobiliário diferenciado, baseado em transparência,
                confiança e resultado. Fundada com foco no atendimento ao bairro,
                começou com dois corretores e um sonho grande.
              </p>
              <p>
                Ao longo de 15 anos, construímos uma reputação sólida no mercado
                paulistano, intermediando mais de 1.200 negociações e ajudando
                centenas de famílias a encontrarem o lar ideal. Cada imóvel
                negociado carrega uma história, e é isso que nos motiva.
              </p>
              <p>
                Hoje, somos uma equipe de profissionais apaixonados, com profundo
                conhecimento do mercado e um compromisso inabalável com a
                satisfação de cada cliente.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-80 lg:h-[480px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Equipe VA. Lima Imóveis"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-navy-900 text-cream-50 p-6 shadow-xl">
              <p className="font-display text-4xl font-semibold text-gold-400">
                1.200+
              </p>
              <p className="font-body text-sm text-cream-300 mt-1">
                Imóveis Negociados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">O que nos guia</p>
            <h2 className="heading-display text-4xl md:text-5xl">
              Missão, Visão e Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-cream-50 p-8 card-shadow group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-navy-900 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <v.icon size={20} className="text-gold-400 group-hover:text-cream-50 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                  {v.title}
                </h3>
                <p className="font-body text-navy-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Nossa evolução</p>
          <h2 className="heading-display text-4xl md:text-5xl">
            Nossa História
          </h2>
        </div>
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-cream-300 hidden md:block" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <span className="font-display text-2xl font-semibold text-gold-500">
                    {item.year}
                  </span>
                  <p className="font-body text-navy-600 text-sm leading-relaxed mt-1">
                    {item.event}
                  </p>
                </div>
                {/* Dot */}
                <div className="hidden md:flex w-5 h-5 rounded-full bg-navy-900 border-2 border-gold-400 shrink-0 mt-1 z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream-200 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Pessoas por trás dos resultados</p>
            <h2 className="heading-display text-4xl md:text-5xl">
              Nosso Time
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-cream-50 overflow-hidden card-shadow group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-navy-900 text-lg">
                    {member.name}
                  </h3>
                  <p className="font-body text-gold-500 text-xs font-medium tracking-wide uppercase mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-navy-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream-50 mb-4">
            Pronto para encontrar seu imóvel?
          </h2>
          <p className="font-body text-cream-300 text-base mb-8 max-w-md mx-auto">
            Nossa equipe está pronta para te ajudar a dar o próximo passo.
          </p>
          <a
            href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Quero conhecer os imóveis disponíveis.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 text-cream-50 px-8 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-gold-400 transition-colors duration-300"
          >
            Falar com um Corretor
          </a>
        </div>
      </section>
    </div>
  );
}
