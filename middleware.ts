import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/admin/auth",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Injeta x-pathname em todos os requests para layouts server-side lerem
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  // Ignora todas as rotas de API — elas têm sua própria proteção
  if (pathname.startsWith("/api")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Só protege páginas /admin/*
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Rotas públicas do admin — passa direto sem verificar token
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
    await jwtVerify(token, secret, {
      issuer: "va-lima-imoveis",
      audience: "admin",
    });
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    const response = NextResponse.redirect(new URL("/admin/login", req.url));
    response.cookies.set(COOKIE_NAME, "", {
      maxAge: 0,
      path: "/admin",
      httpOnly: true,
      sameSite: "strict",
    });
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
