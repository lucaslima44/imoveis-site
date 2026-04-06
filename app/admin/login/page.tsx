"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error ?? "Credenciais inválidas.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-2xl font-semibold text-cream-50 tracking-tight">
            VA. Lima
          </p>
          <p className="font-body text-[10px] font-medium tracking-[0.3em] text-gold-400 uppercase mt-0.5">
            Imóveis
          </p>
          <p className="font-body text-navy-500 text-xs mt-4 tracking-wide uppercase">
            Painel Administrativo
          </p>
        </div>

        {/* Card */}
        <div className="bg-navy-700 border border-navy-500 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-gold-400" />
            <h1 className="font-body text-cream-50 text-sm font-medium tracking-wide">
              Acesso restrito
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Usuário */}
            <div>
              <label className="block font-body text-navy-300 text-xs font-medium mb-2 tracking-wide uppercase">
                Usuário
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={64}
                  className="w-full pl-9 pr-4 py-3 bg-navy-900 border border-navy-500 text-cream-50 text-sm font-body placeholder:text-navy-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Digite o usuário"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block font-body text-navy-300 text-xs font-medium mb-2 tracking-wide uppercase">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={256}
                  className="w-full pl-9 pr-10 py-3 bg-navy-900 border border-navy-500 text-cream-50 text-sm font-body placeholder:text-navy-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Digite a senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 px-3 py-2.5">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-red-300 text-xs font-body">{error}</p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 text-cream-50 py-3 font-body font-medium text-sm tracking-[0.1em] uppercase hover:bg-gold-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-navy-600 text-[11px] mt-6 font-body">
          Acesso restrito. Esta página não é indexada.
        </p>
      </div>
    </div>
  );
}
