import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Clock, Award, TrendingUp } from "lucide-react";
import { getFeatured } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const stats = [
  { value: "1.200+", label: "Imóveis Vendidos" },
  { value: "15", label: "Anos de Experiência" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "500+", label: "Famílias Atendidas" },
];

const differentials = [
  {
    icon: Shield,
    title: "Segurança Jurídica",
    desc: "Toda documentação verificada e processo 100% seguro para sua tranquilidade.",
  },
  {
    icon: Clock,
    title: "Atendimento Ágil",
    desc: "Respondemos em até 2 horas e acompanhamos você do início ao fim.",
  },
  {
    icon: Award,
    title: "Alto Padrão",
    desc: "Curadoria rigorosa dos melhores imóveis em localizações privilegiadas.",
  },
  {
    icon: TrendingUp,
    title: "Melhor Negócio",
    desc: "Avaliações precisas para garantir o melhor valor pelo seu investimento.",
  },
];

export default function Home() {
  const featured = getFeatured();

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=85"
            alt="Imóvel de luxo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-2xl">
            <p className="section-label mb-4 opacity-0 animate-fade-up">
              Bem-vindo à Nobre Imóveis
            </p>
            <h1 className="heading-display text-cream-50 text-5xl md:text-6xl lg:text-7xl mb-6 opacity-0 animate-fade-up delay-100">
              Encontre o Lugar
              <br />
              <span className="text-gold-400 italic">Perfeito</span> para Viver
            </h1>
            <p className="font-body text-cream-200 text-lg leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up delay-200">
              Há mais de 15 anos conectando pessoas aos seus imóveis ideais. 
              Transparência e excelência em cada negociação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300">
              <Link
                href="/imoveis"
                className="bg-gold-500 text-cream-50 px-8 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-gold-400 transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                Ver Imóveis
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/quem-somos"
                className="border border-cream-50/60 text-cream-50 px-8 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-cream-50 hover:text-navy-900 transition-all duration-300 flex items-center justify-center"
              >
                Quem Somos
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-cream-50 text-[10px] tracking-[0.2em] uppercase font-body">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-cream-50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl font-semibold text-gold-400 mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-cream-300 text-sm tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Seleção Especial</p>
            <h2 className="heading-display text-4xl md:text-5xl">
              Imóveis em Destaque
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="flex items-center gap-2 font-body text-sm font-medium text-navy-500 hover:text-gold-500 transition-colors duration-200 group shrink-0"
          >
            Ver todos os imóveis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Por que nos escolher</p>
            <h2 className="heading-display text-4xl md:text-5xl">
              Nossa Diferença
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-cream-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-navy-900 transition-colors duration-300">
                  <item.icon
                    size={22}
                    className="text-gold-500 group-hover:text-gold-400 transition-colors duration-300"
                  />
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-lg mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-navy-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
            alt="Casa de luxo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
          <p className="section-label mb-4">Vamos conversar?</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream-50 mb-6 leading-tight">
            Seu sonho começa com
            <br />
            <span className="text-gold-400 italic">uma conversa</span>
          </h2>
          <p className="font-body text-cream-200 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Entre em contato conosco e descubra as melhores oportunidades do
            mercado imobiliário. Atendimento personalizado e sem compromisso.
          </p>
          <a
            href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os imóveis disponíveis.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 text-cream-50 px-10 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-gold-400 transition-colors duration-300"
          >
            Falar no WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
