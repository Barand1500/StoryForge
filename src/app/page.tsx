import Link from 'next/link';
import { 
  PenTool, 
  Users, 
  Vote, 
  Trophy, 
  BookOpen, 
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { GENRES } from '@/types/database';

// Demo kitaplar (gerçek veritabanı bağlantısı olmadan)
const DEMO_BOOKS = [
  {
    id: '1',
    title: 'Yıldızların Ötesinde',
    description: 'İnsanlık galaksiler arası yolculuğun eşiğinde. Keşif gemisi Aurora, bilinmeyen bir sinyal izliyor...',
    genre: 'science_fiction' as const,
    status: 'active' as const,
    current_chapter: 5,
    total_chapters: 15,
  },
  {
    id: '2',
    title: 'Son Ejderha Şövalyesi',
    description: 'Antik bir kehanet, genç bir şövalyenin kaderini değiştirecek. Karanlık güçler uyanırken...',
    genre: 'fantasy' as const,
    status: 'voting' as const,
    current_chapter: 8,
    total_chapters: 15,
  },
  {
    id: '3',
    title: 'Gece Yarısı Cinayetleri',
    description: 'Şehri saran gizem, dedektif Elif\'i karanlık bir komploya sürüklüyor...',
    genre: 'mystery' as const,
    status: 'active' as const,
    current_chapter: 3,
    total_chapters: 15,
  },
];

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--muted)] rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--primary)]">
                Topluluk Tarafından Yazılan Hikayeler
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              Hikayenin Yazarı{' '}
              <span className="gradient-text">Herkes</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--foreground)]/70 mb-8 max-w-2xl mx-auto">
              Her bölümde binlerce kişinin hayal gücü yarışıyor. En çok oy alan öneri 
              hikayeye ekleniyor. Sen de bu maceranın bir parçası ol.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/books" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Kitapları Keşfet
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works" className="btn-secondary text-lg px-8 py-4">
                Nasıl Çalışır?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
              StoryForge ile hikaye yazma deneyimi tamamen farklı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Oku',
                description: 'Aktif kitapları keşfet ve mevcut hikayeyi oku',
              },
              {
                icon: PenTool,
                title: 'Yaz',
                description: 'Hikayenin devamı için kendi önerini gönder (300-400 karakter)',
              },
              {
                icon: Vote,
                title: 'Oyla',
                description: 'Diğer yazarların önerilerini oku ve en beğendiğine oy ver',
              },
              {
                icon: Trophy,
                title: 'Kazan',
                description: 'En çok oy alan öneri hikayeye eklenir ve yazar ödüllendirilir',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--foreground)]/70 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Books */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                Aktif Kitaplar
              </h2>
              <p className="text-[var(--foreground)]/70">
                Şu anda yazılmakta olan hikayeler
              </p>
            </div>
            <Link
              href="/books"
              className="btn-secondary flex items-center gap-2"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_BOOKS.map((book) => {
              const genre = GENRES.find((g) => g.id === book.genre);
              const statusLabels = {
                active: 'Aktif',
                voting: 'Oylama',
                completed: 'Tamamlandı',
              };
              const statusColors = {
                active: 'bg-green-500',
                voting: 'bg-[var(--accent)]',
                completed: 'bg-gray-500',
              };

              return (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <article className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden card-hover">
                    <div
                      className={`h-48 bg-gradient-to-br ${genre?.color} relative`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{genre?.icon}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColors[book.status]}`}
                        >
                          {statusLabels[book.status]}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm">
                          {genre?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                        {book.title}
                      </h3>
                      <p className="text-[var(--foreground)]/70 text-sm mb-4 line-clamp-2">
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-[var(--foreground)]/50">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>
                            {book.current_chapter}/{book.total_chapters} Bölüm
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Tür Seç, Maceraya Başla
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
              Favori türünüzde yazılmakta olan kitapları keşfedin
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {GENRES.map((genre) => (
              <Link
                key={genre.id}
                href={`/books?genre=${genre.id}`}
                className={`p-6 rounded-2xl bg-gradient-to-br ${genre.color} text-white text-center card-hover`}
              >
                <span className="text-4xl mb-3 block">{genre.icon}</span>
                <h3 className="font-semibold mb-1">{genre.name}</h3>
                <p className="text-sm opacity-80">{genre.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '1,234', label: 'Aktif Yazar' },
              { icon: BookOpen, value: '12', label: 'Aktif Kitap' },
              { icon: PenTool, value: '5,678', label: 'Gönderilen Öneri' },
              { icon: Trophy, value: '156', label: 'Bölüm Kazananı' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-[var(--muted)] rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-[var(--foreground)]/70 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hikayenin Bir Parçası Ol
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Hemen ücretsiz kayıt ol ve ilk önerini gönder. Belki de bir sonraki
            bölümün kazananı sen olursun!
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[var(--muted)] transition-colors"
          >
            Hemen Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
