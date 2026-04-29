// filepath: app/loading.tsx
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-navy-900/60 font-body text-sm">
          Carregando...
        </p>
      </div>
    </div>
  );
}