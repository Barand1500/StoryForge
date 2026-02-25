import Link from 'next/link';
import { Home, BookOpen, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[180px] font-bold gradient-text opacity-20 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-float">📚</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
          Sayfa Bulunamadı
        </h1>
        
        <p className="text-[var(--foreground)]/70 mb-8 text-lg">
          Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. 
          Belki de bu hikayenin bu bölümü henüz yazılmadı!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Ana Sayfa
          </Link>
          <Link
            href="/books"
            className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <BookOpen className="w-5 h-5" />
            Kitapları Keşfet
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--foreground)]/50 mb-4">Veya şunları deneyin:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/search" className="flex items-center gap-1 text-[var(--primary)] hover:underline">
              <Search className="w-4 h-4" />
              Ara
            </Link>
            <span className="text-[var(--foreground)]/30">•</span>
            <Link href="/leaderboard" className="text-[var(--primary)] hover:underline">
              Leaderboard
            </Link>
            <span className="text-[var(--foreground)]/30">•</span>
            <Link href="/how-it-works" className="text-[var(--primary)] hover:underline">
              Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
