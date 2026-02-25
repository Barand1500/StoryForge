import { 
  Trophy, 
  Medal, 
  Crown,
  TrendingUp,
  PenTool,
  BookOpen,
  Star,
  Flame,
  Award,
  ChevronUp,
  ChevronDown,
  Minus
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const topWriters = [
  {
    rank: 1,
    prevRank: 1,
    username: 'AyşeYazar',
    avatar: null,
    points: 15420,
    wins: 47,
    contributions: 156,
    streak: 12,
    badge: '👑',
  },
  {
    rank: 2,
    prevRank: 3,
    username: 'MehmetKalem',
    avatar: null,
    points: 12890,
    wins: 38,
    contributions: 142,
    streak: 8,
    badge: '🔥',
  },
  {
    rank: 3,
    prevRank: 2,
    username: 'ZehraSözlük',
    avatar: null,
    points: 11750,
    wins: 35,
    contributions: 128,
    streak: 5,
    badge: '⭐',
  },
  {
    rank: 4,
    prevRank: 4,
    username: 'CanHikaye',
    avatar: null,
    points: 9840,
    wins: 29,
    contributions: 98,
    streak: 3,
    badge: null,
  },
  {
    rank: 5,
    prevRank: 7,
    username: 'ElifMasalcı',
    avatar: null,
    points: 8920,
    wins: 26,
    contributions: 87,
    streak: 15,
    badge: '🚀',
  },
  {
    rank: 6,
    prevRank: 5,
    username: 'BurakRoman',
    avatar: null,
    points: 7650,
    wins: 23,
    contributions: 76,
    streak: 0,
    badge: null,
  },
  {
    rank: 7,
    prevRank: 6,
    username: 'SedaÖykü',
    avatar: null,
    points: 6890,
    wins: 20,
    contributions: 68,
    streak: 2,
    badge: null,
  },
  {
    rank: 8,
    prevRank: 9,
    username: 'EmreKitap',
    avatar: null,
    points: 5420,
    wins: 16,
    contributions: 54,
    streak: 4,
    badge: null,
  },
  {
    rank: 9,
    prevRank: 8,
    username: 'DenizYazı',
    avatar: null,
    points: 4980,
    wins: 15,
    contributions: 49,
    streak: 1,
    badge: null,
  },
  {
    rank: 10,
    prevRank: 12,
    username: 'AliKahraman',
    avatar: null,
    points: 4520,
    wins: 13,
    contributions: 43,
    streak: 7,
    badge: null,
  },
];

const weeklyStats = {
  totalSubmissions: 1247,
  totalVotes: 8934,
  newWriters: 156,
  completedBooks: 3,
};

function RankChange({ current, prev }: { current: number; prev: number }) {
  const diff = prev - current;
  if (diff > 0) {
    return (
      <span className="flex items-center text-green-500 text-sm">
        <ChevronUp className="w-4 h-4" />
        {diff}
      </span>
    );
  } else if (diff < 0) {
    return (
      <span className="flex items-center text-red-500 text-sm">
        <ChevronDown className="w-4 h-4" />
        {Math.abs(diff)}
      </span>
    );
  }
  return <Minus className="w-4 h-4 text-[var(--foreground)]/30" />;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-700" />;
    default:
      return <span className="text-lg font-bold text-[var(--foreground)]/50">#{rank}</span>;
  }
}

function getRankBg(rank: number) {
  switch (rank) {
    case 1:
      return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    case 2:
      return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
    case 3:
      return 'from-amber-700/20 to-orange-700/20 border-amber-700/30';
    default:
      return 'from-transparent to-transparent border-[var(--border)]';
  }
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 mb-6">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">Haftalık Sıralama</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Liderlik{' '}
              <span className="gradient-text">Tablosu</span>
            </h1>
            <p className="text-xl text-[var(--foreground)]/70">
              En yetenekli yazarlarımızı keşfet ve ilham al
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Gönderilen Bölüm', value: weeklyStats.totalSubmissions, icon: PenTool, color: 'text-blue-500' },
              { label: 'Toplam Oy', value: weeklyStats.totalVotes, icon: Star, color: 'text-yellow-500' },
              { label: 'Yeni Yazar', value: weeklyStats.newWriters, icon: TrendingUp, color: 'text-green-500' },
              { label: 'Tamamlanan Kitap', value: weeklyStats.completedBooks, icon: BookOpen, color: 'text-purple-500' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="card p-4 text-center">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-[var(--foreground)]">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/50">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-center gap-4 mb-12">
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="relative mb-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {topWriters[1].username.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shadow">
                    2
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm md:text-base">{topWriters[1].username}</h3>
                <p className="text-[var(--primary)] font-bold">{topWriters[1].points.toLocaleString()} puan</p>
                <div className="h-24 w-full mt-4 rounded-t-xl bg-gradient-to-t from-gray-500/30 to-gray-400/10 border-t-4 border-gray-400" />
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="relative mb-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl animate-pulse-slow">
                    {topWriters[0].username.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-[var(--foreground)] text-lg">{topWriters[0].username}</h3>
                <p className="text-[var(--primary)] font-bold text-lg">{topWriters[0].points.toLocaleString()} puan</p>
                <div className="h-32 w-full mt-4 rounded-t-xl bg-gradient-to-t from-yellow-500/30 to-yellow-400/10 border-t-4 border-yellow-500" />
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="relative mb-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-700 to-orange-700 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {topWriters[2].username.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold shadow">
                    3
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm md:text-base">{topWriters[2].username}</h3>
                <p className="text-[var(--primary)] font-bold">{topWriters[2].points.toLocaleString()} puan</p>
                <div className="h-16 w-full mt-4 rounded-t-xl bg-gradient-to-t from-amber-700/30 to-amber-600/10 border-t-4 border-amber-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Leaderboard */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-[var(--primary)]" />
              Tüm Sıralama
            </h2>

            <div className="space-y-3">
              {topWriters.map((writer) => (
                <Link
                  key={writer.username}
                  href={`/profile/${writer.username}`}
                  className={`block card p-4 bg-gradient-to-r ${getRankBg(writer.rank)} hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 flex items-center justify-center">
                      {getRankIcon(writer.rank)}
                    </div>

                    {/* Rank Change */}
                    <div className="w-8">
                      <RankChange current={writer.rank} prev={writer.prevRank} />
                    </div>

                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                        {writer.avatar || writer.username.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[var(--foreground)] truncate">
                            {writer.username}
                          </h3>
                          {writer.badge && <span>{writer.badge}</span>}
                        </div>
                        {writer.streak > 0 && (
                          <div className="flex items-center gap-1 text-orange-500 text-sm">
                            <Flame className="w-4 h-4" />
                            <span>{writer.streak} gün seri</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-[var(--foreground)]">{writer.wins}</div>
                        <div className="text-[var(--foreground)]/50">Kazanım</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-[var(--foreground)]">{writer.contributions}</div>
                        <div className="text-[var(--foreground)]/50">Katkı</div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="font-bold text-[var(--primary)] text-lg">
                        {writer.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50">puan</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="btn-secondary">
                Daha Fazla Göster
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
