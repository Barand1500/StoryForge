'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  PenTool
} from 'lucide-react';
import { GENRES } from '@/types/database';
import { CountdownTimer, SubmissionForm, SubmissionCard } from '@/components';
import { useAuthStore } from '@/lib/store';

// Demo veri
const DEMO_BOOK = {
  id: '1',
  title: 'Yıldızların Ötesinde',
  description: 'İnsanlık galaksiler arası yolculuğun eşiğinde. Keşif gemisi Aurora, bilinmeyen bir sinyal izliyor. Dünya\'dan milyonlarca ışık yılı uzakta, gizemli bir mesaj onları bekliyor.',
  genre: 'science_fiction' as const,
  status: 'active' as const,
  current_chapter: 5,
  total_chapters: 15,
};

const DEMO_CHAPTERS = [
  {
    id: 'ch1',
    chapter_number: 1,
    title: 'Karanlık Uzayın Çağrısı',
    content: `Keşif gemisi Aurora, Dünya\'dan tam 47 ışık yılı uzakta, Epsilon Eridani yıldız sisteminin sınırlarında süzülüyordu. Kaptan Elif Yıldırım, komuta köprüsünde sessizce durmuş, dev ekranlarda beliren verileri inceliyordu.

"Kaptan, yine o sinyal," dedi baş iletişim subayı Kerem heyecanla. "Bu sefer çok daha güçlü."

Elif başını çevirdi. Üç aydır bu gizemli sinyali takip ediyorlardı. Hiçbir doğal kaynaktan gelemeyecek kadar düzenli, hiçbir bilinen medeniyetle eşleşmeyen bir örüntü...

"Koordinatları belirle," dedi Elif kararlı bir sesle. "Aurora\'yı o yöne çeviriyoruz."

Gemi titredi, motorlar uğuldadı. Bilinmeyene doğru yolculuk başlıyordu.`,
    status: 'completed' as const,
    winner_user: { display_name: 'Ahmet Yılmaz', username: 'ahmet_yilmaz' }
  },
  {
    id: 'ch2',
    chapter_number: 2,
    title: 'Gizemli Gezegen',
    content: `Aurora, sinyalin kaynağına yaklaştıkça, sensörler tuhaf veriler almaya başladı. Önlerinde, hiçbir haritada görünmeyen bir gezegen belirmişti.

"Bu imkansız," diye mırıldandı bilim subayı Dr. Zeynep. "Bu kadar büyük bir gök cismi nasıl tespit edilemez?"

Gezegen, karanlık bir eflatun renginde parıldıyordu. Yüzeyinde, geometrik şekiller oluşturan dev yapılar görülüyordu.

"Kaptan, gezegenin yüzeyinden enerji yayılımı alıyorum," dedi Kerem. "Ve... ve sinyal oradan geliyor."

Elif derin bir nefes aldı. "Yörüngeye girin. Keşif ekibi hazırlansın."

Bilinmeyen, onları çağırıyordu.`,
    status: 'completed' as const,
    winner_user: { display_name: 'Zeynep Demir', username: 'zeynep_d' }
  },
  {
    id: 'ch3',
    chapter_number: 3,
    title: 'İlk Temas',
    content: `Mekik, gezegenin atmosferine dalış yaptığında, herkes nefesini tuttu. Mor bulutların arasından geçtiler, ve önlerinde inanılmaz bir manzara belirdi.

Devasa kristal kuleler, gökyüzüne doğru yükseliyordu. Yapılar, içten gelen bir ışıkla aydınlanıyordu - sanki canlıydılar.

"Burada biri var," diye fısıldadı Dr. Zeynep. "Ya da... vardı."

Elif gözlerini kıstı. Kulelerin arasında, hareket eden bir şey gördü. İnsansı bir siluet...

"Silahlarınız hazır olsun," dedi sessizce. "Ama ateş açmayın. Bu bir ilk temas."

Mekiğin kapısı açıldığında, karşılarında bir figür belirdi. Gümüşi bir zırh, uzun boylu, insan olmayan bir varlık...`,
    status: 'completed' as const,
    winner_user: { display_name: 'Can Özkan', username: 'can_ozkan' }
  },
  {
    id: 'ch4',
    chapter_number: 4,
    title: 'Tercüman',
    content: `Varlık, bir adım öne çıktı. Gözleri - eğer gözlerse - derin bir mavilikte parıldıyordu. Ağzı olmadan konuştu, sesi doğrudan zihinlerinde yankılandı.

"Bekledik. Uzun zaman bekledik."

Elif şaşkınlığını gizlemeye çalıştı. "Kim... kimsiniz?"

"Biz Arşivcileriz. Galaksinin hafızasını tutanlar." Varlık, kristal kulelere doğru döndü. "Bu binalar, milyarlarca yıllık bilgiyi barındırıyor. Her medeniyet, her hikaye, her son..."

"Her son mu?" diye sordu Dr. Zeynep.

Arşivci\'nin sesi bir an karardı. "Her medeniyetin bir sonu var. Sizinkinin de olacak. Ama önce... bir seçim yapmalısınız."

Elif kalbi hızla atmaya başladı. Ne tür bir seçim?`,
    status: 'completed' as const,
    winner_user: { display_name: 'Elif Ak', username: 'elif_ak' }
  },
  {
    id: 'ch5',
    chapter_number: 5,
    title: 'Seçim',
    content: `Arşivci, elini - ya da eli andıran uzantısını - havaya kaldırdı. Kristal duvarlardan görüntüler yükselmeye başladı. Binlerce gezegen, trilyonlarca yaşam formu, ve... yıkım.

"Galaksi döngüsel bir tarih izler," dedi Arşivci. "Her 100 milyon yılda bir, büyük bir yok oluş dalgası geçer. Biz hayatta kalanları kayıt altına alırız."

Elif titredi. "Peki seçim nedir?"

"İki yol var. Birincisi: Bilgiyi alın ve kaçın. Dünyanıza dönün, hazırlanın. Belki hayatta kalırsınız."

"İkincisi?"

Arşivci\'nin gözleri parladı. "Bizimle kalın. Arşiv\'in bir parçası olun. Bedenleriniz yok olacak ama bilincleriniz sonsuza dek yaşayacak."

Mürettebat birbirine baktı. Kaptan Elif, hayatının en zor kararının eşiğindeydi.

---
**[Bu bölüm şu anda yazım aşamasında. Hikayeyi sen devam ettir!]**`,
    status: 'writing' as const,
    writing_end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün sonra
  },
];

const DEMO_SUBMISSIONS = [
  {
    id: 'sub1',
    content: 'Elif derin bir nefes aldı. "Üçüncü bir yol olmalı," dedi kararlılıkla. "Hem bilgiyi alıp hem de sizinle birlikte savaşmak. Bu yok oluş dalgasını durdurmak için." Arşivci şaşırmış görünüyordu - eğer yüz ifadesi varsa. "İlginç. Hiçbir ırk bunu önermedi."',
    status: 'pending' as const,
    vote_count: 24,
    user: { id: 'u1', display_name: 'Mehmet Kaya', avatar_url: null },
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'sub2',
    content: '"Dünyaya dönüyoruz," dedi Elif kesin bir sesle. "Ama sadece uyarmak için değil. Bir ordu toplamak için." Dr. Zeynep\'e döndü. "Bu arşivdeki teknolojiyi inceleyebilir misin? Savunma sistemleri, silahlar..." Arşivci başını eğdi. "Cesurca. Ama nafile."',
    status: 'pending' as const,
    vote_count: 18,
    user: { id: 'u2', display_name: 'Ayşe Çelik', avatar_url: null },
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'sub3',
    content: 'Kerem öne çıktı, gözleri parıldıyordu. "Ben kalacağım," dedi sessizce. Herkes ona döndü. "Bu arşiv, insanlığın tek şansı olabilir. Biri burada kalıp öğrenmeli." Elif itiraz etmek istedi ama Kerem\'in gözlerindeki kararlılığı gördü.',
    status: 'pending' as const,
    vote_count: 31,
    user: { id: 'u3', display_name: 'Ali Demir', avatar_url: null },
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
];

export default function BookDetailPage() {
  const params = useParams();
  const { user } = useAuthStore();
  const [activeChapter, setActiveChapter] = useState(DEMO_CHAPTERS.length - 1);
  const [submissions, setSubmissions] = useState(DEMO_SUBMISSIONS);

  const book = DEMO_BOOK;
  const chapters = DEMO_CHAPTERS;
  const currentChapter = chapters[activeChapter];
  const genre = GENRES.find((g) => g.id === book.genre);

  const isWritingPhase = currentChapter?.status === 'writing';
  const isVotingPhase = currentChapter?.status === 'voting';

  return (
    <div className="animate-fadeIn">
      {/* Hero Header */}
      <div className={`bg-gradient-to-br ${genre?.color} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/books"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Kitaplara Dön
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-40 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-6xl">
              {genre?.icon}
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-3">
                {genre?.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {book.title}
              </h1>
              <p className="text-white/80 max-w-2xl mb-4">
                {book.description}
              </p>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{book.current_chapter}/{book.total_chapters} Bölüm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>234 Katılımcı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Chapter Navigation */}
            <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[var(--foreground)]">Bölümler</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                    disabled={activeChapter === 0}
                    className="p-2 rounded-lg hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium">
                    {activeChapter + 1} / {chapters.length}
                  </span>
                  <button
                    onClick={() => setActiveChapter(Math.min(chapters.length - 1, activeChapter + 1))}
                    disabled={activeChapter === chapters.length - 1}
                    className="p-2 rounded-lg hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      index === activeChapter
                        ? 'bg-[var(--primary)] text-white'
                        : chapter.status === 'completed'
                        ? 'bg-[var(--muted)] text-[var(--foreground)]'
                        : 'bg-[var(--accent)]/20 text-[var(--accent)]'
                    }`}
                  >
                    {index + 1}. {chapter.status === 'writing' && '✏️'}
                    {chapter.status === 'voting' && '🗳️'}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Content */}
            <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-[var(--primary)] font-medium">
                    Bölüm {currentChapter.chapter_number}
                  </span>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    {currentChapter.title}
                  </h2>
                </div>
                {currentChapter.status === 'completed' && currentChapter.winner_user && (
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-[var(--foreground)]/70">
                      Kazanan:{' '}
                      <Link 
                        href={`/profile/${currentChapter.winner_user.username}`}
                        className="text-[var(--primary)] hover:underline"
                      >
                        {currentChapter.winner_user.display_name}
                      </Link>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line story-textarea">
                  {currentChapter.content}
                </p>
              </div>
            </div>

            {/* Submission Form (only for writing phase) */}
            {isWritingPhase && (
              <SubmissionForm chapterId={currentChapter.id} />
            )}

            {/* Submissions List */}
            {(isWritingPhase || isVotingPhase) && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-[var(--primary)]" />
                  Öneriler ({submissions.length})
                </h3>
                <div className="space-y-4">
                  {submissions
                    .sort((a, b) => b.vote_count - a.vote_count)
                    .map((submission, index) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={{
                          ...submission,
                          user_id: submission.user.id,
                          chapter_id: currentChapter.id,
                          updated_at: submission.created_at,
                        }}
                        rank={index + 1}
                        isVotingPhase={isVotingPhase}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Timer */}
            {isWritingPhase && currentChapter.writing_end && (
              <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 mb-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 text-center">
                  ✏️ Yazım Süresi
                </h3>
                <CountdownTimer 
                  endDate={currentChapter.writing_end}
                  label="Kalan süre"
                  size="md"
                />
              </div>
            )}

            {/* Stats */}
            <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 mb-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">
                Kitap İstatistikleri
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)]/70">Toplam Öneri</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)]/70">Toplam Oy</span>
                  <span className="font-semibold">2,345</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)]/70">Katılımcı</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)]/70">Tamamlanan Bölüm</span>
                  <span className="font-semibold">{book.current_chapter - 1}</span>
                </div>
              </div>
            </div>

            {/* Winners */}
            <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Bölüm Kazananları
              </h3>
              <div className="space-y-3">
                {chapters
                  .filter((ch) => ch.status === 'completed' && ch.winner_user)
                  .slice(-5)
                  .reverse()
                  .map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[var(--foreground)]/70">
                        Bölüm {chapter.chapter_number}
                      </span>
                      <Link
                        href={`/profile/${chapter.winner_user?.username}`}
                        className="text-[var(--primary)] hover:underline"
                      >
                        {chapter.winner_user?.display_name}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
