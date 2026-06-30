import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a V.A Lima Imóveis trata os seus dados e cookies no site.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-cream-100 min-h-screen">
      <div className="bg-navy-900 pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Transparência e cuidado
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream-50 leading-tight">
            Política de <span className="text-gold-400">Privacidade</span>
          </h1>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="bg-cream-50 p-8 md:p-10 rounded-[24px] shadow-[0_4px_32px_rgba(15,30,43,0.08)]">
          <p className="font-body text-base md:text-lg leading-8 text-navy-700">
            Na <span className="font-semibold text-navy-900">V.A Lima Imóveis</span>, privacidade e transparência são prioridades. Esta política explica de forma simples como lidamos com as informações de quem visita nosso site.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-900 mb-3">
                1. Coleta de Dados de Navegação (Cookies)
              </h2>
              <p className="font-body text-sm md:text-base leading-7 text-navy-700">
                Não coletamos dados de identificação pessoal (como nome ou CPF) de forma automatizada. No entanto, utilizamos o Google Analytics para coletar dados estatísticos anônimos (como páginas visitadas e tempo de navegação) com o objetivo exclusivo de melhorar o nosso site. Você pode recusar esses cookies a qualquer momento no nosso banner inicial.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-900 mb-3">
                2. Contato via WhatsApp
              </h2>
              <p className="font-body text-sm md:text-base leading-7 text-navy-700">
                Nosso site possui links direcionados para o aplicativo WhatsApp. Ao clicar e iniciar uma conversa, os dados enviados (como seu nome e número de telefone) serão utilizados unicamente para responder às suas dúvidas e dar andamento ao atendimento imobiliário solicitado. Nós não compartilhamos e nem vendemos seus dados para terceiros.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-900 mb-3">
                3. Seus Direitos
              </h2>
              <p className="font-body text-sm md:text-base leading-7 text-navy-700">
                Você pode, a qualquer momento, solicitar a exclusão do seu contato de nossa base de dados após o atendimento.
              </p>
            </div>
          </div>

          <p className="mt-10 font-body text-sm text-navy-500">
            <span className="font-semibold">Última atualização:</span> Junho de 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
