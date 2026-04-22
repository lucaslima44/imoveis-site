import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ActionCardProps {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  iconColor?: string;
}

export default function ActionCard({ href, icon: Icon, title, description, iconColor = "text-gold-400" }: ActionCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 bg-white border border-gray-200 p-5 hover:border-gold-400 hover:shadow-sm transition-all duration-150 group"
    >
      <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
        <Icon size={18} className={iconColor} />
      </div>
      <div>
        <p className="font-body text-sm font-semibold text-navy-900">
          {title}
        </p>
        <p className="font-body text-xs text-gray-500 mt-0.5">
          {description}
        </p>
      </div>
      <ArrowRight
        size={16}
        className="ml-auto text-gray-300 group-hover:text-gold-400 transition-colors"
      />
    </Link>
  );
}