import { headers } from "next/headers";
import { getSessionFromCookie } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: { template: "%s | Admin VA. Lima", default: "Admin VA. Lima Imóveis" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lê o pathname atual via header injetado pelo middleware
  const headersList = headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // Na página de login: renderiza só o conteúdo, sem sidebar
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  // Para todas as outras rotas /admin: verifica sessão e exibe sidebar
  const session = await getSessionFromCookie().catch(() => null);

  if (!session) {
    // Sem sessão e fora do login → middleware já vai redirecionar,
    // renderiza vazio para não piscar
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar username={session.username} />
      <main className="flex-1 overflow-auto">
        <div className="pt-14 lg:pt-0 p-6 lg:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
