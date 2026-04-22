import Link from "next/link";
import { readProperties } from "@/lib/properties-store";
import {
  Building2,
  Pencil,
  PlusCircle,
  Image as ImageIcon,
} from "lucide-react";
import type { Metadata } from "next";
import DeletePropertyButton from "./DeletePropertyButton";
import { Button } from "@/components/Button";
import PageHeader from "@/components/PageHeader";

// Garante que a página sempre busque a versão mais recente do banco (sem F5)
export const dynamic = "force-dynamic";
export const revalidate = 0; // ADICIONE ESTA LINHA AQUI
export const metadata: Metadata = { title: "Imóveis" };

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(price);
}

const STATUS: Record<string, { label: string; cls: string }> = {
  disponivel: { label: "Disponível", cls: "bg-emerald-50 text-emerald-600" },
  reservado: { label: "Reservado", cls: "bg-amber-50 text-amber-600" },
  vendido: { label: "Vendido", cls: "bg-red-50 text-red-500" },
};

const NEGOCIO: Record<string, string> = {
  venda: "Venda",
  locacao: "Locação",
  venda_locacao: "Venda / Locação",
};

export default async function AdminImoveisPage() {
  let properties: Awaited<ReturnType<typeof readProperties>> = [];
  try {
    properties = await readProperties();
  } catch {
    properties = [];
  }

  return (
    <div>
      <PageHeader
        title="Imóveis"
        description={`${properties.length} imóvel${properties.length !== 1 ? "is" : ""} cadastrado${properties.length !== 1 ? "s" : ""}.`}
        action={
          <Button asChild>
            <Link href="/admin/imoveis/novo">
              <PlusCircle size={14} />
              Novo Imóvel
            </Link>
          </Button>
        }
      />

      <div className="bg-white border border-gray-200 overflow-hidden">
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <Building2 size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="font-body text-gray-500 text-sm">
              Nenhum imóvel cadastrado.
            </p>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/imoveis/novo">
                <PlusCircle size={14} />
                Cadastrar primeiro imóvel
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    Imóvel
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                    Tipo
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                    Negócio
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">
                    Valor
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">
                    Fotos
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                    Destacado
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map((p) => {
                  const st =
                    STATUS[p.status ?? "disponivel"] ?? STATUS.disponivel;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 shrink-0 bg-cover bg-center bg-gray-100"
                            style={{
                              backgroundImage: p.images[0]
                                ? `url(${p.images[0]})`
                                : undefined,
                            }}
                          >
                            {!p.images[0] && (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon
                                  size={14}
                                  className="text-gray-300"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-navy-900 line-clamp-1">
                              {p.title}
                            </p>
                            <p className="font-body text-xs text-gray-400 mt-0.5">
                              {p.address}, {p.neighborhood}, {p.state}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className={`text-[10px] font-body font-medium px-2 py-1 uppercase tracking-wide ${
                            p.type === "apartamento"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {p.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-body text-xs font-medium text-gray-600">
                          {NEGOCIO[p.contractType ?? "venda"] || "Venda"}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="font-body text-sm text-navy-900 font-medium">
                          {formatPrice(p.price)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <ImageIcon size={12} className="text-gray-400" />
                          <span className="font-body text-sm text-gray-600">
                            {p.images.length}
                          </span>
                        </div>
                      </td>

                      {/* COLUNA DE STATUS ALTERADA AQUI */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className={`text-[10px] font-body font-medium px-2 py-1 w-max ${st.cls}`}
                        >
                          {st.label}
                        </span>
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        {String(p.featured) === "true" && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-300 text-amber-700 bg-amber-50 w-max">
                            ⭐ DESTAQUE
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Button asChild variant="secondary" size="sm">
                            <Link href={`/admin/imoveis/${p.id}/editar`} prefetch={false}>
                              <Pencil size={12} />
                              Editar
                            </Link>
                          </Button>
                          <DeletePropertyButton id={p.id} title={p.title} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
