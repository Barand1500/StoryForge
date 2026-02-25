import { 
  BookOpen, 
  PenTool, 
  Vote, 
  Trophy, 
  Users, 
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: BookOpen,
    title: 'Kitap Seç',
    description: 'Katılmak istediğin aktif kitaplardan birini seç. Türe, konuya veya popülerliğe göre filtrele.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: PenTool,
    title: 'Bölümünü Yaz',
    description: 'Hikayenin bir sonraki bölümü için kendi versiyonunu yaz. Yaratıcılığını göster!',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Vote,
    title: 'Oylama Başlar',
    description: 'Yazım süresi bitince topluluk en iyi bölümü seçmek için oy kullanır.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Trophy,
    title: 'Kazanan Belirlenir',
    description: 'En çok oy alan bölüm hikayeye eklenir ve yazarı puan kazanır!',
    color: 'from-green-500 to-emerald-500',
  },
];

const features = [
  {
    icon: Users,
    title: 'Topluluk Odaklı',
    description: 'Binlerce yazar bir araya gelerek eşsiz hikayeler oluşturuyor.',
  },
  {
    icon: Sparkles,
    title: 'Yaratıcı Özgürlük',
    description: 'İstediğin türde, istediğin tarzda yaz. Sınır yok!',
  },
  {
    icon: Clock,
    title: 'Düzenli Döngüler',
    description: 'Her bölüm için yazım ve oylama süreleri belirli. Asla sıkılmazsın.',
  },
  {
    icon: CheckCircle,
    title: 'Moderasyon',
    description: 'Kaliteli içerik için profesyonel moderasyon ekibi.',
  },
];

const faqs = [
  {
    question: 'Katılmak ücretsiz mi?',
    answer: 'Evet! StoryForge tamamen ücretsiz. Hesap oluştur ve hemen yazmaya başla.',
  },
  {
    question: 'Bir bölüm ne kadar uzun olmalı?',
    answer: 'Minimum 500, maksimum 2000 kelime. Bu sayede hikaye akışı korunuyor.',
  },
  {
    question: 'Kendi kitabımı başlatabilir miyim?',
    answer: 'Elbette! Belirli bir puan seviyesine ulaştığında kendi kitabını oluşturabilirsin.',
  },
  {
    question: 'Oylama nasıl çalışıyor?',
    answer: 'Her kullanıcı bir bölüm başına bir oy hakkına sahip. Oylar gizli tutulur ve süre sonunda açıklanır.',
  },
  {
    question: 'Kazanınca ne olur?',
    answer: 'Bölümün hikayeye eklenir, puan kazanırsın ve profilinde sergilenir. Ayrıca toplulukta tanınırlığın artar!',
  },
  {
    question: 'İçerik kuralları var mı?',
    answer: 'Evet, topluluk kurallarımız mevcut. Saygılı, orijinal ve kaliteli içerik bekliyoruz.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-6">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-medium">Platform Rehberi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              StoryForge{' '}
              <span className="gradient-text">Nasıl Çalışır?</span>
            </h1>
            <p className="text-xl text-[var(--foreground)]/70 leading-relaxed">
              Kolektif hikaye yazımının büyüleyici dünyasına hoş geldin! 
              Dört basit adımda harika hikayelerin bir parçası ol.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[var(--primary)]/50 to-transparent" />
                  )}
                  
                  <div className="card p-6 h-full relative overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-[var(--foreground)]/5">
                      {index + 1}
                    </div>
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--foreground)]/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Neden StoryForge?
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
              StoryForge'u diğer platformlardan ayıran özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card p-6 text-center hover:scale-105 transition-transform">
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Example */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                Örnek Bir Döngü
              </h2>
              <p className="text-[var(--foreground)]/70">
                Bir bölümün hayat döngüsünü takip edelim
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-transparent" />

              <div className="space-y-8">
                {[
                  { time: 'Pazartesi 09:00', title: 'Yeni Bölüm Açıldı', desc: 'Yazarlar hikaye için yeni bölümlerini yazmaya başlıyor.' },
                  { time: 'Çarşamba 09:00', title: 'Yazım Süresi Bitiyor', desc: '48 saat içinde 45 yazar bölümünü gönderdi.' },
                  { time: 'Çarşamba 09:01', title: 'Oylama Başlıyor', desc: 'Topluluk en iyi bölümü seçmek için oy kullanıyor.' },
                  { time: 'Perşembe 21:00', title: 'Kazanan Açıklandı', desc: '@yazarahi\'nin bölümü 234 oyla kazandı!' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative z-10 shadow-lg shadow-[var(--primary)]/30">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="card p-4 flex-1">
                      <span className="text-xs text-[var(--primary)] font-medium">{item.time}</span>
                      <h4 className="font-semibold text-[var(--foreground)] mt-1">{item.title}</h4>
                      <p className="text-sm text-[var(--foreground)]/70 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-[var(--foreground)]/70">
              Merak ettiklerinin cevapları burada
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h4 className="font-semibold text-[var(--foreground)] mb-2 flex items-start gap-2">
                  <span className="text-[var(--primary)]">Q:</span>
                  {faq.question}
                </h4>
                <p className="text-[var(--foreground)]/70 pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              Hazır mısın?
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 mb-8">
              Hemen katıl ve ilk bölümünü yaz. Harika hikayeler seni bekliyor!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/books" className="btn-primary flex items-center gap-2">
                Kitapları Keşfet
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary">
                Liderlik Tablosu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
