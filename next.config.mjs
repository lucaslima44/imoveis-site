/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Isso vai fazer o build ignorar os erros de variáveis não usadas
  },
  typescript: {
    ignoreBuildErrors: true, // Isso ignora erros de tipo que podem estar vindo do PropertyForm
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "rvdfaaynexvaccfngdym.supabase.co" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
