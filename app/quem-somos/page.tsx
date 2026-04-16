import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";
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
    name: "Vandir Lima",
    role: "Fundador & Diretor",
    image: "/",
    bio: "5 anos de mercado imobiliário. Especialista em imóveis residenciais.",
  },
  // {
  //   name: "Ana Carvalho",
  //   role: "Gerente Comercial",
  //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  //   bio: "Especialista em negociação e atendimento consultivo. Mais de 300 imóveis intermediados.",
  // },
  // {
  //   name: "Bruno Lima",
  //   role: "Corretor Sênior",
  //   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  //   bio: "CRECI ativo, especializado em condomínios de alto padrão e imóveis residenciais.",
  // },
  // {
  //   name: "Fernanda Costa",
  //   role: "Corretora & Avaliadora",
  //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  //   bio: "Avaliadora certificada com foco em imóveis residenciais e consultoria para compradores.",
  // },
];

const timeline = [
  { 
    year: "2021", 
    event: "Formalização e Sede Própria", 
    description: "Obtenção do CRECI e abertura da sede estratégica no Capão Redondo para atendimento presencial." 
  },
  { 
    year: "2023", 
    event: "Consolidação no Mercado Local", 
    description: "Expansão da carteira de imóveis e fortalecimento da marca na região sul de São Paulo." 
  },
  { 
    year: "2025", 
    event: "Modernização de Processos", 
    description: "Implementação de novas tecnologias de gestão para agilizar contratos e vistorias." 
  },
  { 
    year: "2026", 
    event: "Presença Digital Global", 
    description: "Lançamento do novo portal imobiliário, conectando clientes a oportunidades com apenas um clique." 
  },
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
            <span className="text-gold-400 italic">Há +5 Anos</span>
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
                Fundada em 2021 no Capão Redondo, a V.A. Lima Imóveis surgiu para simplificar o mercado imobiliário com ética e resultados reais. Somos especialistas no que fazemos e apaixonados pela nossa região.
              </p>
              <p>
               Com 5 anos de atuação e mais de 50 imóveis negociados, construímos uma base sólida de confiança com nossos clientes. Acreditamos que a transparência é o único caminho para negociações seguras e duradouras.
              </p>
              <p>
               Nosso foco é o bairro, nossa força é a transparência e nosso objetivo é a sua satisfação. Estamos prontos para continuar crescendo junto com a nossa comunidade.
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
                50+
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
              <div key={i} className="bg-cream-50 p-8 card-shadow">
                <div className="w-12 h-12 bg-navy-900 flex items-center justify-center mb-6">
                  <v.icon size={20} className="text-gold-400" />
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
                    {item.event} <br /> {item.description}
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
                className="bg-cream-50 overflow-hidden card-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
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
