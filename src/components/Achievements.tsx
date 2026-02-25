'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Star, 
  BookOpen, 
  Pencil, 
  Users, 
  Heart, 
  MessageCircle, 
  Flame,
  Crown,
  Zap,
  Award,
  Medal,
  Target,
  Rocket,
  Sparkles,
  Lock,
  CheckCircle
} from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'writing' | 'reading' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  unlockedAt?: string;
}

// Achievement definitions
export const achievementList: Omit<Achievement, 'progress' | 'unlocked' | 'unlockedAt'>[] = [
  // Writing achievements
  { id: 'first-chapter', name: 'İlk Adım', description: 'İlk bölümünü yaz', icon: 'Pencil', category: 'writing', rarity: 'common', maxProgress: 1 },
  { id: 'writer-10', name: 'Kalem Ustası', description: '10 bölüm yaz', icon: 'Pencil', category: 'writing', rarity: 'rare', maxProgress: 10 },
  { id: 'writer-50', name: 'Efsanevi Yazar', description: '50 bölüm yaz', icon: 'Star', category: 'writing', rarity: 'epic', maxProgress: 50 },
  { id: 'writer-100', name: 'Destan Yazarı', description: '100 bölüm yaz', icon: 'Crown', category: 'writing', rarity: 'legendary', maxProgress: 100 },
  { id: 'first-book', name: 'Yeni Başlangıç', description: 'İlk kitabını oluştur', icon: 'BookOpen', category: 'writing', rarity: 'common', maxProgress: 1 },
  { id: 'book-creator-5', name: 'Kitap Fabrikası', description: '5 kitap oluştur', icon: 'BookOpen', category: 'writing', rarity: 'rare', maxProgress: 5 },
  
  // Reading achievements
  { id: 'reader-first', name: 'Okuyucu', description: 'İlk kitabını oku', icon: 'BookOpen', category: 'reading', rarity: 'common', maxProgress: 1 },
  { id: 'reader-10', name: 'Kitap Kurdu', description: '10 kitap oku', icon: 'BookOpen', category: 'reading', rarity: 'rare', maxProgress: 10 },
  { id: 'reader-50', name: 'Kütüphane Faresi', description: '50 kitap oku', icon: 'BookOpen', category: 'reading', rarity: 'epic', maxProgress: 50 },
  { id: 'chapter-100', name: 'Maratoncı', description: '100 bölüm oku', icon: 'Target', category: 'reading', rarity: 'rare', maxProgress: 100 },
  { id: 'bookmark-master', name: 'İşaretçi Usta', description: '20 kitabı yer imlerine ekle', icon: 'Target', category: 'reading', rarity: 'rare', maxProgress: 20 },
  
  // Social achievements
  { id: 'first-collab', name: 'Takım Oyuncusu', description: 'İlk işbirliğine katıl', icon: 'Users', category: 'social', rarity: 'common', maxProgress: 1 },
  { id: 'collaborator-10', name: 'İşbirliği Ustası', description: '10 farklı kitaba katkıda bulun', icon: 'Users', category: 'social', rarity: 'epic', maxProgress: 10 },
  { id: 'first-like', name: 'Beğeni Avcısı', description: 'İlk beğenini al', icon: 'Heart', category: 'social', rarity: 'common', maxProgress: 1 },
  { id: 'popular-100', name: 'Popüler Yazar', description: '100 beğeni al', icon: 'Heart', category: 'social', rarity: 'rare', maxProgress: 100 },
  { id: 'viral-1000', name: 'Viral Yıldız', description: '1000 beğeni al', icon: 'Rocket', category: 'social', rarity: 'legendary', maxProgress: 1000 },
  { id: 'commenter-10', name: 'Sosyal Kelebek', description: '10 yorum yap', icon: 'MessageCircle', category: 'social', rarity: 'common', maxProgress: 10 },
  { id: 'follower-50', name: 'Takipçi Mıknatısı', description: '50 takipçi kazan', icon: 'Users', category: 'social', rarity: 'epic', maxProgress: 50 },
  
  // Special achievements
  { id: 'early-bird', name: 'Erken Kuş', description: 'Beta kullanıcısı ol', icon: 'Sparkles', category: 'special', rarity: 'legendary' },
  { id: 'streak-7', name: 'Haftalık Seri', description: '7 gün üst üste yaz', icon: 'Flame', category: 'special', rarity: 'rare', maxProgress: 7 },
  { id: 'streak-30', name: 'Aylık Tutku', description: '30 gün üst üste yaz', icon: 'Flame', category: 'special', rarity: 'epic', maxProgress: 30 },
  { id: 'night-owl', name: 'Gece Kuşu', description: 'Gece yarısından sonra 10 bölüm yaz', icon: 'Zap', category: 'special', rarity: 'rare', maxProgress: 10 },
  { id: 'perfectionist', name: 'Mükemmeliyetçi', description: 'Bir bölümü 5 kez düzenle', icon: 'Award', category: 'special', rarity: 'common', maxProgress: 5 },
];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Trophy, Star, BookOpen, Pencil, Users, Heart, MessageCircle, Flame,
  Crown, Zap, Award, Medal, Target, Rocket, Sparkles
};

const rarityColors = {
  common: { bg: 'bg-gray-100 dark:bg-gray-800', border: 'border-gray-300 dark:border-gray-600', text: 'text-gray-600 dark:text-gray-400', glow: '' },
  rare: { bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-300 dark:border-blue-600', text: 'text-blue-600 dark:text-blue-400', glow: 'shadow-blue-200 dark:shadow-blue-900' },
  epic: { bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-300 dark:border-purple-600', text: 'text-purple-600 dark:text-purple-400', glow: 'shadow-purple-200 dark:shadow-purple-900' },
  legendary: { bg: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30', border: 'border-yellow-400 dark:border-yellow-500', text: 'text-yellow-600 dark:text-yellow-400', glow: 'shadow-yellow-200 dark:shadow-yellow-900 shadow-lg' },
};

const rarityLabels = {
  common: 'Yaygın',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi',
};

const categoryLabels = {
  writing: 'Yazarlık',
  reading: 'Okuma',
  social: 'Sosyal',
  special: 'Özel',
};

interface AchievementsProps {
  achievements: Achievement[];
  showAll?: boolean;
  compact?: boolean;
}

export function AchievementBadge({ achievement, size = 'md' }: { achievement: Achievement; size?: 'sm' | 'md' | 'lg' }) {
  const Icon = iconMap[achievement.icon] || Trophy;
  const colors = rarityColors[achievement.rarity];
  
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  return (
    <div 
      className={`${sizes[size]} rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center relative ${colors.glow} ${!achievement.unlocked ? 'opacity-40 grayscale' : ''}`}
      title={achievement.name}
    >
      <Icon className={`${iconSizes[size]} ${colors.text}`} />
      {achievement.unlocked && (
        <div className="absolute -bottom-1 -right-1">
          <CheckCircle className="w-4 h-4 text-green-500 fill-white" />
        </div>
      )}
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
          <Lock className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.icon] || Trophy;
  const colors = rarityColors[achievement.rarity];
  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 1;
  const progressPercent = Math.min((progress / maxProgress) * 100, 100);

  return (
    <div 
      className={`p-4 rounded-xl border-2 ${colors.border} ${colors.bg} ${colors.glow} transition-all hover:scale-[1.02] ${!achievement.unlocked ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-full ${achievement.unlocked ? colors.bg : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center relative`}>
          <Icon className={`w-6 h-6 ${achievement.unlocked ? colors.text : 'text-gray-400'}`} />
          {!achievement.unlocked && (
            <Lock className="w-4 h-4 text-gray-500 absolute" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${achievement.unlocked ? '' : 'text-gray-500'}`}>
              {achievement.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-medium`}>
              {rarityLabels[achievement.rarity]}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {achievement.description}
          </p>
          {achievement.maxProgress && achievement.maxProgress > 1 && (
            <div className="space-y-1">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${achievement.unlocked ? 'bg-green-500' : 'bg-[var(--primary)]'} transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {progress} / {maxProgress}
              </p>
            </div>
          )}
          {achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Kazanıldı: {new Date(achievement.unlockedAt).toLocaleDateString('tr-TR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Achievements({ achievements, showAll = true, compact = false }: AchievementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlocked, setShowUnlocked] = useState<boolean | null>(null);

  const categories = ['all', 'writing', 'reading', 'social', 'special'];
  
  const filteredAchievements = achievements.filter(a => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    if (showUnlocked === true && !a.unlocked) return false;
    if (showUnlocked === false && a.unlocked) return false;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {achievements.filter(a => a.unlocked).slice(0, 5).map(achievement => (
          <AchievementBadge key={achievement.id} achievement={achievement} size="sm" />
        ))}
        {unlockedCount > 5 && (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
            +{unlockedCount - 5}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Başarılar</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unlockedCount} / {totalCount} başarı kazanıldı
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUnlocked(showUnlocked === true ? null : true)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showUnlocked === true 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            Kazanılan
          </button>
          <button
            onClick={() => setShowUnlocked(showUnlocked === false ? null : false)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showUnlocked === false 
                ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            Kilitli
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-sm text-center text-gray-500">
          %{Math.round((unlockedCount / totalCount) * 100)} tamamlandı
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-[var(--primary)] text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat === 'all' ? 'Tümü' : categoryLabels[cat as keyof typeof categoryLabels]}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredAchievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Bu kategoride başarı bulunamadı</p>
        </div>
      )}
    </div>
  );
}
