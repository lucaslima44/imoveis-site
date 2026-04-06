"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { href: "/admin",              label: "Dashboard",   icon: LayoutDashboard, exact: true  },
  { href: "/admin/imoveis",      label: "Imóveis",     icon: Building2,       exact: false },
  { href: "/admin/imoveis/novo", label: "Novo Imóvel", icon: PlusCircle,      exact: true  },
];

export default function AdminSidebar({ username }: { username: string }) {
  const pathname   = usePathname();
  const router     = useRouter();
  const [open, setOpen]       = useState(false);
  const [leaving, setLeaving] = useState(false);

  async function handleLogout() {
    setLeaving(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(link: (typeof navLinks)[0]) {
    return link.exact ? pathname === link.href : pathname.startsWith(link.href);
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <p className="font-display text-lg font-semibold text-navy-900 tracking-tight">
          VA. Lima
        </p>
        <p className="font-body text-[9px] font-medium tracking-[0.25em] text-gold-500 uppercase mt-0.5">
          Painel Admin
        </p>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-body font-medium transition-all duration-150 ${
                active
                  ? "bg-navy-900 text-cream-50"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <link.icon size={16} className={active ? "text-gold-400" : "text-gray-400"} />
              {link.label}
              {active && <ChevronRight size={12} className="ml-auto text-gold-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Usuário + sair */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-2">
        <div className="px-3 py-2">
          <p className="text-gray-400 text-[10px] font-body uppercase tracking-wide">
            Logado como
          </p>
          <p className="text-gray-700 text-sm font-body font-medium mt-0.5">
            {username}
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={leaving}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-body font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 disabled:opacity-50"
        >
          <LogOut size={16} />
          {leaving ? "Saindo..." : "Sair"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <p className="font-display text-base font-semibold text-navy-900">
          VA. Lima Admin
        </p>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-56 bg-white min-h-screen shadow-xl mt-12">
            <NavContent />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
