import Link from 'next/link';
import { 
  PenTool, 
  Users, 
  Vote, 
  Trophy, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  Zap,
} from 'lucide-react';
import { GENRES } from '@/types/database';
import FloatingBooks from '@/components/ui/FloatingBooks';

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
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <FloatingBooks />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--muted)] rounded-full mb-8 animate-bounceIn border border-[var(--border)]">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[var(--primary)]">
                23 Aktif Hikaye Yazılıyor
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              Hikayenin Yazarı{' '}
              <span className="gradient-text inline-block animate-gradient bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-[length:200%_auto]">
                Herkes
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--foreground)]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Her bölümde binlerce kişinin hayal gücü yarışıyor. 
              <span className="text-[var(--primary)] font-semibold"> En çok oy alan öneri</span> hikayeye ekleniyor.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/books" className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
                <BookOpen className="w-5 h-5" />
                Kitapları Keşfet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Nasıl Çalışır?
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--foreground)]/60">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--primary)]" />
                <span><strong className="text-[var(--foreground)]">1,234</strong> Yazar</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">5,678</strong> Öneri</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                <span><strong className="text-[var(--foreground)]">%94</strong> Memnuniyet</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--card)] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
              Basit 4 Adım
            </span>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto text-lg">
              StoryForge ile hikaye yazma deneyimi tamamen farklı bir boyutta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]" />
            
            {[
              {
                icon: BookOpen,
                title: 'Oku',
                description: 'Aktif kitapları keşfet ve mevcut hikayeyi oku',
                step: 1,
              },
              {
                icon: PenTool,
                title: 'Yaz',
                description: 'Hikayenin devamı için kendi önerini gönder',
                step: 2,
              },
              {
                icon: Vote,
                title: 'Oyla',
                description: 'Diğer yazarların önerilerini oku ve oy ver',
                step: 3,
              },
              {
                icon: Trophy,
                title: 'Kazan',
                description: 'En çok oy alan öneri hikayeye eklenir',
                step: 4,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm z-10 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                
                {/* Icon Container */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mt-6">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--foreground)]/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Books */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-semibold mb-3">
                🔥 Şu An Popüler
              </span>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-2">
                Aktif Kitaplar
              </h2>
              <p className="text-[var(--foreground)]/70 text-lg">
                Şu anda topluluk tarafından yazılmakta olan hikayeler
              </p>
            </div>
            <Link
              href="/books"
              className="btn-secondary flex items-center gap-2 group"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_BOOKS.map((book, index) => {
              const genre = GENRES.find((g) => g.id === book.genre);
              const statusLabels = {
                active: 'Aktif',
                voting: 'Oylama',
                completed: 'Tamamlandı',
              };
              const statusColors = {
                active: 'bg-[var(--success)]',
                voting: 'bg-[var(--accent)] animate-pulse',
                completed: 'bg-gray-500',
              };

              return (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <article 
                    className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden card-3d group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`h-52 bg-gradient-to-br ${genre?.color} relative overflow-hidden`}
                    >
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-32 h-32 border-4 border-white rounded-full" />
                        <div className="absolute bottom-4 left-4 w-24 h-24 border-4 border-white rounded-full" />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{genre?.icon}</span>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-white text-sm font-semibold ${statusColors[book.status]} shadow-lg`}
                        >
                          {statusLabels[book.status]}
                        </span>
                      </div>
                      
                      {/* Genre Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
                          {genre?.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[var(--foreground)]/70 mb-4 line-clamp-2">
                        {book.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[var(--foreground)]/60">İlerleme</span>
                          <span className="font-semibold text-[var(--primary)]">
                            {book.current_chapter}/{book.total_chapters}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-bar-fill"
                            style={{ width: `${(book.current_chapter / book.total_chapters) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-[var(--foreground)]/50">
                          <Users className="w-4 h-4" />
                          <span>234 Yazar</span>
                        </div>
                        <span className="text-[var(--primary)] font-semibold flex items-center gap-1">
                          Katıl <ArrowRight className="w-4 h-4" />
                        </span>
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
      <section className="py-24 bg-[var(--card)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-semibold mb-4">
              📚 Keşfet
            </span>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Tür Seç, Maceraya Başla
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto text-lg">
              Favori türünüzde yazılmakta olan kitapları keşfedin
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {GENRES.map((genre, index) => (
              <Link
                key={genre.id}
                href={`/books?genre=${genre.id}`}
                className={`p-6 rounded-2xl bg-gradient-to-br ${genre.color} text-white text-center card-3d group relative overflow-hidden`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">{genre.icon}</span>
                <h3 className="font-bold text-lg mb-1">{genre.name}</h3>
                <p className="text-sm opacity-80 line-clamp-2">{genre.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[var(--foreground)] to-[#1a120b] rounded-3xl p-12 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent)] rounded-full blur-3xl opacity-20" />
            
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Büyüyen Bir Topluluk
              </h2>
              <p className="text-white/60">
                Her gün yüzlerce yeni hikaye ve binlerce öneri
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: Users, value: '1,234', label: 'Aktif Yazar', color: 'from-blue-400 to-blue-600' },
                { icon: BookOpen, value: '23', label: 'Aktif Kitap', color: 'from-green-400 to-green-600' },
                { icon: PenTool, value: '5,678', label: 'Gönderilen Öneri', color: 'from-purple-400 to-purple-600' },
                { icon: Trophy, value: '156', label: 'Bölüm Kazananı', color: 'from-amber-400 to-amber-600' },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
              ❤️ Topluluk Sesleri
            </span>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Yazarlarımız Ne Diyor?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Elif Yıldız',
                role: 'Fantastik Hikaye Tutkunu',
                avatar: '👩‍🎨',
                quote: 'StoryForge sayesinde yazarlık tutkumu keşfettim. İlk hikayem 3. bölümde kazandı!',
              },
              {
                name: 'Ahmet Kaya',
                role: 'Bilim Kurgu Yazarı',
                avatar: '👨‍🚀',
                quote: 'Başka yazarların fikirlerini görmek ve oy vermek harika bir deneyim.',
              },
              {
                name: 'Zeynep Demir',
                role: 'Gizem Meraklısı',
                avatar: '🕵️‍♀️',
                quote: 'Her bölümde heyecan dorukta! Hangi öneri kazanacak diye beklemek çok zevkli.',
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-[var(--background)] rounded-2xl p-6 border-2 border-[var(--border)] card-hover"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[var(--muted)] rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--foreground)]">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--foreground)]/60">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[var(--foreground)]/70 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] animate-gradient" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">📚</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🪶</div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              Ücretsiz Başla
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hikayenin Bir Parçası Ol
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Hemen ücretsiz kayıt ol ve ilk önerini gönder. 
            Belki de bir sonraki bölümün kazananı <span className="font-bold">sen</span> olursun!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--muted)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <PenTool className="w-5 h-5" />
              Yazmaya Başla
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Önce Oku
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-12 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>1,234+ Yazar</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>4.9 Puan</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>₺50K+ Ödül</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
