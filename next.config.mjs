/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warnings do not block the build; only actual errors do
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Type errors do not block production builds
    ignoreBuildErrors: false,
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
