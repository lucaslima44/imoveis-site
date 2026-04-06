"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";

export default function DeletePropertyButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/imoveis/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConfirm(false);
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error ?? "Erro ao excluir.");
      }
    } catch {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setConfirm(true)}
        className="flex items-center gap-1 text-xs font-body text-red-400 hover:text-red-600 transition-colors px-2 py-1 border border-gray-200 hover:border-red-300"
      >
        <Trash2 size={12} />
        Excluir
      </button>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white max-w-sm w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-body text-sm font-semibold text-navy-900">
                  Confirmar exclusão
                </h3>
                <p className="font-body text-xs text-gray-500 mt-0.5">
                  As fotos também serão removidas.
                </p>
              </div>
            </div>

            <p className="font-body text-sm text-gray-600 mb-4 bg-gray-50 px-3 py-2 border-l-2 border-red-300 line-clamp-2">
              &ldquo;{title}&rdquo;
            </p>

            {error && (
              <p className="text-red-500 text-xs font-body mb-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setConfirm(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2.5 text-sm font-body font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
