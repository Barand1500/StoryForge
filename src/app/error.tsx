'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertTriangle, Bug } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Error Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-red-500/30 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500 animate-bounce" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
          Bir Şeyler Ters Gitti!
        </h1>
        
        <p className="text-[var(--foreground)]/70 mb-6 text-lg">
          Beklenmeyen bir hata oluştu. Endişelenmeyin, ekibimiz bu sorunu inceliyor.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-left">
            <div className="flex items-center gap-2 text-red-500 font-medium mb-2">
              <Bug className="w-4 h-4" />
              <span>Hata Detayları</span>
            </div>
            <pre className="text-sm text-red-400 overflow-x-auto whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-red-400/70">
                Hata ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-5 h-5" />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Ana Sayfa
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--foreground)]/50 mb-2">
            Sorun devam ederse:
          </p>
          <ul className="text-sm text-[var(--foreground)]/70 space-y-1">
            <li>• Tarayıcı önbelleğinizi temizleyin</li>
            <li>• Sayfayı yenileyin</li>
            <li>• Birazdan tekrar deneyin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
