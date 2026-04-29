// filepath: components/LoadingOverlay.tsx
'use client';

import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
}

export default function LoadingOverlay({ 
  isLoading, 
  message = 'Carregando...', 
  children 
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-cream-100/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center bg-white/90 px-8 py-6 rounded-lg shadow-lg">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-navy-900/70 font-body text-sm">
              {message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}