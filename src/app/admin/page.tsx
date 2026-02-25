'use client';

import {
  BookOpen,
  Users,
  PenTool,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

// Demo data
const recentSubmissions = [
  { id: 1, user: 'Elif Yıldız', book: 'Yıldızların Ötesinde', chapter: 5, status: 'pending', time: '5 dk önce' },
  { id: 2, user: 'Ahmet Kaya', book: 'Son Ejderha Şövalyesi', chapter: 8, status: 'approved', time: '12 dk önce' },
  { id: 3, user: 'Zeynep Demir', book: 'Gece Yarısı Cinayetleri', chapter: 3, status: 'pending', time: '23 dk önce' },
  { id: 4, user: 'Can Öztürk', book: 'Yıldızların Ötesinde', chapter: 5, status: 'rejected', time: '45 dk önce' },
  { id: 5, user: 'Selin Arslan', book: 'Son Ejderha Şövalyesi', chapter: 8, status: 'pending', time: '1 saat önce' },
];

const topBooks = [
  { id: 1, title: 'Son Ejderha Şövalyesi', submissions: 234, views: 5670, trend: 12 },
  { id: 2, title: 'Yıldızların Ötesinde', submissions: 189, views: 4320, trend: 8 },
  { id: 3, title: 'Gece Yarısı Cinayetleri', submissions: 156, views: 3890, trend: -3 },
];

export default function AdminDashboard() {
  const stats = [
    { label: 'Toplam Kullanıcı', value: '1,234', change: 12, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Aktif Kitap', value: '23', change: 5, icon: BookOpen, color: 'from-green-500 to-green-600' },
    { label: 'Bekleyen Öneri', value: '156', change: -8, icon: PenTool, color: 'from-amber-500 to-amber-600' },
    { label: 'Günlük Görüntüleme', value: '8,432', change: 24, icon: Eye, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-[var(--foreground)]/60 mt-1">StoryForge genel bakış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--card)] rounded-2xl p-6 border-2 border-[var(--border)] card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${
                stat.change >= 0 
                  ? 'bg-[var(--success)]/10 text-[var(--success)]' 
                  : 'bg-[var(--error)]/10 text-[var(--error)]'
              }`}>
                {stat.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <div className="stat-value text-3xl">{stat.value}</div>
            <p className="text-[var(--foreground)]/60 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)]">Son Gönderiler</h2>
              <p className="text-[var(--foreground)]/60 text-sm">Moderasyon bekleyen öneriler</p>
            </div>
            <Link href="/admin/moderation" className="btn-secondary text-sm py-2 px-4">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="divide-y divide-[var(--border)]">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="p-4 hover:bg-[var(--muted)] transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--primary)] font-bold">
                  {submission.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--foreground)] truncate">
                    {submission.user}
                  </p>
                  <p className="text-sm text-[var(--foreground)]/60 truncate">
                    {submission.book} - Bölüm {submission.chapter}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    submission.status === 'pending' 
                      ? 'bg-[var(--warning)]/10 text-[var(--warning)]'
                      : submission.status === 'approved'
                      ? 'bg-[var(--success)]/10 text-[var(--success)]'
                      : 'bg-[var(--error)]/10 text-[var(--error)]'
                  }`}>
                    {submission.status === 'pending' ? 'Bekliyor' : 
                     submission.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                  </span>
                  <span className="text-xs text-[var(--foreground)]/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {submission.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Books */}
        <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">Popüler Kitaplar</h2>
            <p className="text-[var(--foreground)]/60 text-sm">Bu haftanın en aktif kitapları</p>
          </div>
          
          <div className="p-4 space-y-4">
            {topBooks.map((book, index) => (
              <div
                key={book.id}
                className="p-4 bg-[var(--muted)] rounded-xl hover:bg-[var(--border)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                    'bg-gradient-to-br from-orange-400 to-orange-600'
                  }`}>
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-[var(--foreground)] truncate flex-1">
                    {book.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--foreground)]/60">
                    {book.submissions} öneri · {book.views} görüntüleme
                  </span>
                  <span className={`flex items-center gap-1 font-medium ${
                    book.trend >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'
                  }`}>
                    {book.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(book.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Hızlı İşlemler</h2>
        <p className="text-white/70 mb-6">Sık kullanılan yönetim işlemleri</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/books/new"
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <BookOpen className="w-6 h-6" />
            <span className="font-medium">Yeni Kitap Ekle</span>
          </Link>
          <Link
            href="/admin/moderation"
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="font-medium">Önerileri İncele</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Users className="w-6 h-6" />
            <span className="font-medium">Kullanıcı Yönetimi</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">Oylama Ayarları</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
