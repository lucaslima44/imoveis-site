import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="font-display text-[12rem] font-bold text-cream-200 leading-none select-none pointer-events-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-navy-900 w-20 h-20 flex items-center justify-center">
              <Search size={32} className="text-gold-400" />
            </div>
          </div>
        </div>

        <p className="section-label mb-3">Página não encontrada</p>
        <h1 className="heading-display text-3xl md:text-4xl mb-4">
          Esse endereço não existe
        </h1>
        <p className="font-body text-navy-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          A página que você está procurando pode ter sido removida, renomeada ou
          nunca ter existido. Mas não se preocupe — temos muitos imóveis
          esperando por você!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-navy-900 text-cream-50 px-7 py-3.5 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-gold-500 transition-colors duration-300"
          >
            <Home size={16} />
            Ir para Home
          </Link>
          <Link
            href="/imoveis"
            className="inline-flex items-center justify-center gap-2 border border-navy-900 text-navy-900 px-7 py-3.5 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-navy-900 hover:text-cream-50 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Ver Imóveis
          </Link>
        </div>
      </div>
    </div>
  );
}
