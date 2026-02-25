'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Trophy, 
  Medal, 
  BookOpen, 
  PenTool, 
  ThumbsUp,
  Calendar,
  Star,
  Coins,
  TrendingUp,
  Award
} from 'lucide-react';
import { BADGES, GENRES } from '@/types/database';
import { getInitials } from '@/lib/utils';

// Demo profil verisi
const DEMO_PROFILE = {
  id: 'u1',
  username: 'baran_uruncan',
  display_name: 'Baran Ürüncan',
  email: 'baran@example.com',
  bio: 'Hikaye tutkunu, bilim kurgu ve fantastik türlerinde yazmayı seviyorum. StoryForge\'da yeni hikayelerin peşindeyim!',
  avatar_url: null,
  total_wins: 7,
  total_finalists: 12,
  total_submissions: 45,
  total_votes_received: 234,
  earnings: 125.50,
  created_at: '2024-01-15T10:00:00Z',
};

const DEMO_BADGES = [
  { ...BADGES[0], id: 'b1', earned_at: '2024-01-16T10:00:00Z' }, // İlk Adım
  { ...BADGES[1], id: 'b2', earned_at: '2024-02-01T10:00:00Z' }, // Finalist
  { ...BADGES[2], id: 'b3', earned_at: '2024-02-15T10:00:00Z' }, // Bölüm Kazananı
  { ...BADGES[3], id: 'b4', earned_at: '2024-03-01T10:00:00Z' }, // Üçlü Şampiyon
];

const DEMO_CONTRIBUTIONS = [
  {
    id: 'c1',
    book_title: 'Yıldızların Ötesinde',
    genre: 'science_fiction',
    chapter_number: 3,
    type: 'winner',
    date: '2024-02-15T10:00:00Z',
  },
  {
    id: 'c2',
    book_title: 'Son Ejderha Şövalyesi',
    genre: 'fantasy',
    chapter_number: 5,
    type: 'finalist',
    date: '2024-02-20T10:00:00Z',
  },
  {
    id: 'c3',
    book_title: 'Yıldızların Ötesinde',
    genre: 'science_fiction',
    chapter_number: 4,
    type: 'winner',
    date: '2024-02-25T10:00:00Z',
  },
  {
    id: 'c4',
    book_title: 'Gece Yarısı Cinayetleri',
    genre: 'mystery',
    chapter_number: 2,
    type: 'finalist',
    date: '2024-03-01T10:00:00Z',
  },
];

export default function ProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'contributions' | 'badges' | 'stats'>('contributions');

  const profile = DEMO_PROFILE;
  const badges = DEMO_BADGES;
  const contributions = DEMO_CONTRIBUTIONS;

  const stats = [
    { icon: Trophy, label: 'Kazanılan', value: profile.total_wins, color: 'text-yellow-500' },
    { icon: Medal, label: 'Finalist', value: profile.total_finalists, color: 'text-gray-400' },
    { icon: PenTool, label: 'Öneri', value: profile.total_submissions, color: 'text-[var(--primary)]' },
    { icon: ThumbsUp, label: 'Oy', value: profile.total_votes_received, color: 'text-green-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-12">
            {/* Avatar */}
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="w-24 h-24 rounded-full border-4 border-[var(--card)] object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-[var(--card)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(profile.display_name)}
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                {profile.display_name}
              </h1>
              <p className="text-[var(--foreground)]/70">@{profile.username}</p>
            </div>

            {/* Earnings Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--muted)] rounded-full">
              <Coins className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-semibold text-[var(--foreground)]">
                ${profile.earnings.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-4 text-[var(--foreground)]/70 max-w-2xl">
              {profile.bio}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-[var(--background)] rounded-xl"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--foreground)]/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b-2 border-[var(--border)]">
        {[
          { id: 'contributions', label: 'Katkılar', icon: BookOpen },
          { id: 'badges', label: 'Rozetler', icon: Award },
          { id: 'stats', label: 'Gelir', icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'contributions' && (
        <div className="space-y-4">
          {contributions.map((contribution) => {
            const genre = GENRES.find((g) => g.id === contribution.genre);
            return (
              <div
                key={contribution.id}
                className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-4 flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${genre?.color} flex items-center justify-center text-2xl`}
                >
                  {genre?.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {contribution.book_title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/70">
                    Bölüm {contribution.chapter_number}
                  </p>
                </div>
                <div className="text-right">
                  {contribution.type === 'winner' ? (
                    <span className="badge badge-gold">
                      <Trophy className="w-3 h-3" /> Kazanan
                    </span>
                  ) : (
                    <span className="badge badge-silver">
                      <Medal className="w-3 h-3" /> Finalist
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 text-center card-hover"
            >
              <span className="text-4xl mb-3 block">{badge.icon}</span>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">
                {badge.name}
              </h3>
              <p className="text-sm text-[var(--foreground)]/70">
                {badge.description}
              </p>
            </div>
          ))}

          {/* Locked Badges */}
          {BADGES.slice(badges.length).map((badge, index) => (
            <div
              key={`locked-${index}`}
              className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 text-center opacity-50"
            >
              <span className="text-4xl mb-3 block grayscale">🔒</span>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">
                {badge.name}
              </h3>
              <p className="text-sm text-[var(--foreground)]/70">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
            <Coins className="w-6 h-6 text-[var(--accent)]" />
            Gelir Özeti
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-[var(--background)] rounded-xl text-center">
              <div className="text-3xl font-bold gradient-text mb-1">
                ${profile.earnings.toFixed(2)}
              </div>
              <div className="text-sm text-[var(--foreground)]/70">
                Toplam Kazanç
              </div>
            </div>
            <div className="p-4 bg-[var(--background)] rounded-xl text-center">
              <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
                {profile.total_wins}
              </div>
              <div className="text-sm text-[var(--foreground)]/70">
                Kazanılan Bölüm
              </div>
            </div>
            <div className="p-4 bg-[var(--background)] rounded-xl text-center">
              <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
                ${(profile.earnings / profile.total_wins).toFixed(2)}
              </div>
              <div className="text-sm text-[var(--foreground)]/70">
                Ortalama / Bölüm
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-6">
            <h4 className="font-semibold text-[var(--foreground)] mb-4">
              Gelir Dağılımı Nasıl Çalışır?
            </h4>
            <ul className="space-y-2 text-[var(--foreground)]/70">
              <li className="flex items-start gap-2">
                <Star className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Bölüm kazananları, kitap satışlarından pay alır</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Finalistler de katkılarına göre ödüllendirilir</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Toplam oy sayısı, kazanç oranını etkiler</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Kitap tamamlandığında, gelirler dağıtılır</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
