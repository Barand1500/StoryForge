# 📚 StoryForge

<div align="center">

![StoryForge Banner](https://img.shields.io/badge/StoryForge-Topluluk%20Hikayeleri-orange?style=for-the-badge&logo=bookstack)

**Hikayenin Yazarı Herkes**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)

[Demo](#) • [Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Nasıl Çalışır](#-nasıl-çalışır) • [Katkıda Bulun](#-katkıda-bulun)

</div>

---

## 🎯 Nedir?

**StoryForge**, topluluk tarafından şekillendirilen interaktif bir hikaye yazma platformudur. Burada hikayeler tek bir yazarın değil, binlerce kişinin hayal gücünün ürünüdür.

> *"Bu sadece kitap yazmak değil, bir kurgu yaratma festivali."*

## ✨ Özellikler

### 📖 İnteraktif Hikaye Yazımı
- Her bölüm için 2 günlük yazım süresi
- Topluluk önerileri arasından en çok oy alan hikayeye eklenir
- Birden fazla tür: Bilim Kurgu, Fantastik, Korku, Aşk/Drama, Gizem

### 🗳️ Demokratik Oylama Sistemi
- Kayıtlı kullanıcılar birden fazla öneriye oy verebilir
- Kendi önerine oy veremezsin (adil rekabet!)
- 2 saatlik oylama süresi

### 🏆 Rozet ve Ödül Sistemi
- **İlk Adım** - İlk öneriyi gönder
- **Finalist** - Finale kal
- **Bölüm Kazananı** - Bir bölümü kazan
- **Üçlü Şampiyon** - Üç bölüm kazan
- **Çok Yönlü Yazar** - Birden fazla kitaba katkıda bulun

### 💰 Gelir Paylaşımı
- Bölüm kazananları kitap satışlarından pay alır
- Finalistler de katkılarına göre ödüllendirilir
- Şeffaf ve adaletli dağıtım sistemi

### 👤 Profil Sistemi
- Kişisel istatistikler
- Kazanılan rozetler
- Katkı geçmişi
- Toplam kazanç takibi

## 🖼️ Ekran Görüntüleri

<div align="center">

| Ana Sayfa | Kitap Detay | Profil |
|:---------:|:-----------:|:------:|
| 🏠 | 📖 | 👤 |

</div>

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı (ücretsiz)

### Adım Adım Kurulum

```bash
# 1. Repoyu klonla
git clone https://github.com/Barand1500/StoryForge.git
cd StoryForge

# 2. Bağımlılıkları yükle
npm install

# 3. Environment değişkenlerini ayarla
cp .env.local.example .env.local
# .env.local dosyasını düzenle ve Supabase bilgilerini ekle

# 4. Veritabanını hazırla
# supabase/schema.sql dosyasını Supabase SQL Editor'da çalıştır

# 5. Geliştirme sunucusunu başlat
npm run dev
```

Uygulama **http://localhost:3000** adresinde çalışacaktır.

### Environment Değişkenleri

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎮 Nasıl Çalışır?

```
┌─────────────────────────────────────────────────────────────┐
│                      STORYFORGE DÖNGÜSÜ                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   📖 OKUMA       ✏️ YAZIM        🗳️ OYLAMA      🏆 KAZANAN   │
│   ─────────     ─────────      ─────────      ─────────    │
│   │ Mevcut  │   │ Öneri   │    │ Topluluk │   │ En çok  │  │
│   │ hikayeyi│ → │ gönder  │ →  │ oylar    │ → │ oy alan │  │
│   │ oku     │   │ (2 gün) │    │ (2 saat) │   │ eklenir │  │
│   └─────────┘   └─────────┘    └─────────┘   └─────────┘   │
│                                                             │
│                         ↺ Tekrar                            │
└─────────────────────────────────────────────────────────────┘
```

1. **📖 Oku** - Aktif kitapları keşfet ve mevcut hikayeyi oku
2. **✏️ Yaz** - Hikayenin devamı için 300-400 karakterlik öneri gönder
3. **🗳️ Oyla** - Diğer yazarların önerilerini oku ve beğendiğine oy ver
4. **🏆 Kazan** - En çok oy alan öneri hikayeye eklenir

## 🛠️ Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **State** | Zustand |
| **Icons** | Lucide React |
| **Date** | date-fns |

## 📁 Proje Yapısı

```
StoryForge/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── books/              # Kitap sayfaları
│   │   │   └── [id]/           # Kitap detay
│   │   ├── profile/            # Profil sayfaları
│   │   │   └── [username]/     # Kullanıcı profili
│   │   ├── layout.tsx          # Ana layout
│   │   ├── page.tsx            # Ana sayfa
│   │   └── globals.css         # Global stiller
│   ├── components/             # React bileşenleri
│   │   ├── AuthModal.tsx       # Giriş/Kayıt modalı
│   │   ├── BookCard.tsx        # Kitap kartı
│   │   ├── CountdownTimer.tsx  # Geri sayım
│   │   ├── Header.tsx          # Üst menü
│   │   ├── Footer.tsx          # Alt bilgi
│   │   ├── SubmissionCard.tsx  # Öneri kartı
│   │   └── SubmissionForm.tsx  # Öneri formu
│   ├── lib/                    # Yardımcı fonksiyonlar
│   │   ├── supabase/           # Supabase client
│   │   ├── store.ts            # Zustand store
│   │   └── utils.ts            # Utility fonksiyonlar
│   └── types/                  # TypeScript tipleri
│       └── database.ts         # Veritabanı tipleri
├── supabase/
│   └── schema.sql              # Veritabanı şeması
└── public/                     # Statik dosyalar
```

## 🎨 Renk Paleti

StoryForge, sıcak ve davetkar bir kitap yazma atmosferi yaratmak için tasarlandı:

| Renk | Hex | Kullanım |
|------|-----|----------|
| 🟠 Primary | `#D97706` | Ana aksiyonlar |
| 🟡 Accent | `#F59E0B` | Vurgular |
| 🟤 Secondary | `#92400E` | İkincil öğeler |
| 🟫 Background | `#FFF8F0` | Arka plan |
| ⬛ Foreground | `#2D2016` | Metin |

## 🤝 Katkıda Bulun

Katkılarınızı bekliyoruz! 

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

<div align="center">

**Baran Ürüncan**

[![GitHub](https://img.shields.io/badge/GitHub-Barand1500-black?style=flat-square&logo=github)](https://github.com/Barand1500)

</div>

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

*Hikayenin bir parçası ol, kalemine güç ver!* ✨

</div>
