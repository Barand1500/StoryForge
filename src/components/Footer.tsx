import Link from 'next/link';
import { PenTool, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--card)] border-t-2 border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">StoryForge</span>
            </Link>
            <p className="text-[var(--foreground)]/70 max-w-md">
              Topluluk tarafından şekillendirilen hikayeler. Herkes yazar, herkes okur,
              herkes kaderi belirler.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  Kitaplar
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  Nasıl Çalışır?
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  Liderlik Tablosu
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--foreground)]/50 text-sm">
            © {currentYear} StoryForge. Tüm hakları saklıdır.
          </p>
          <p className="text-[var(--foreground)]/50 text-sm flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" /> ile yapıldı
          </p>
        </div>
      </div>
    </footer>
  );
}
