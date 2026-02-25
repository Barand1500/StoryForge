'use client';

import { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Flag,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Demo data
const DEMO_SUBMISSIONS = [
  {
    id: '1',
    user: {
      username: 'elif_yildiz',
      avatar: null,
    },
    book: {
      title: 'Yıldızların Ötesinde',
      chapter: 5,
    },
    content: 'Uzay gemisinin kaptan köprüsünde alarm zilleri çalmaya başladı. Yıldız haritasında beliren gizemli sinyal, Aurora\'yı beklenmedik bir rotaya çekiyordu. Kaptan Elena, ekibine döndü ve kararlı bir sesle konuştu: "Hazırlanın, bilinmeyen sulara giriyoruz."',
    status: 'pending',
    reports: 0,
    created_at: '2026-02-25T10:30:00',
    votes: 0,
  },
  {
    id: '2',
    user: {
      username: 'ahmet_kaya',
      avatar: null,
    },
    book: {
      title: 'Son Ejderha Şövalyesi',
      chapter: 8,
    },
    content: 'Şövalye Karan, kılıcını kınından çekti. Ejderhanın gözlerindeki ateş, karanlık ormanı aydınlatıyordu. Bu kadim yaratıkla savaşmak zorunda değildi, ama krallığın kaderi onun omuzlarındaydı. Derin bir nefes aldı ve ileriye atıldı.',
    status: 'pending',
    reports: 2,
    created_at: '2026-02-25T09:15:00',
    votes: 0,
  },
  {
    id: '3',
    user: {
      username: 'zeynep_demir',
      avatar: null,
    },
    book: {
      title: 'Gece Yarısı Cinayetleri',
      chapter: 3,
    },
    content: 'Dedektif Elif, eski malikânenin bodrum katına inen merdivenlere baktı. Karanlıkta bir şey parıldıyordu. Elindeki feneri doğrulttuğunda, kanla yazılmış bir mesajla karşılaştı: "Gerçek hiçbir zaman ortaya çıkmayacak."',
    status: 'approved',
    reports: 0,
    created_at: '2026-02-24T22:45:00',
    votes: 45,
  },
  {
    id: '4',
    user: {
      username: 'can_ozturk',
      avatar: null,
    },
    book: {
      title: 'Yıldızların Ötesinde',
      chapter: 5,
    },
    content: 'Bu öneri uygunsuz içerik içerdiği için reddedildi. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    status: 'rejected',
    reports: 5,
    created_at: '2026-02-24T18:20:00',
    votes: 0,
  },
  {
    id: '5',
    user: {
      username: 'selin_arslan',
      avatar: null,
    },
    book: {
      title: 'Son Ejderha Şövalyesi',
      chapter: 8,
    },
    content: 'Ejderha aniden duraksadı. Gözlerindeki vahşi ışık yerini merak dolu bir bakışa bıraktı. Belki de bu kadim yaratık, yüzyıllar boyunca yalnızca savaşçıları görmüştü. Ama Karan farklıydı - korkusuzca yaklaşırken elini uzattı.',
    status: 'pending',
    reports: 0,
    created_at: '2026-02-25T08:00:00',
    votes: 0,
  },
];

export default function AdminModerationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSubmissions = DEMO_SUBMISSIONS.filter((sub) => {
    const matchesSearch =
      sub.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: DEMO_SUBMISSIONS.filter((s) => s.status === 'pending').length,
    approved: DEMO_SUBMISSIONS.filter((s) => s.status === 'approved').length,
    rejected: DEMO_SUBMISSIONS.filter((s) => s.status === 'rejected').length,
    reported: DEMO_SUBMISSIONS.filter((s) => s.reports > 0).length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Moderasyon</h1>
        <p className="text-[var(--foreground)]/60 mt-1">
          Kullanıcı önerilerini inceleyin ve onaylayın
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setStatusFilter('pending')}
          className={`bg-[var(--card)] rounded-xl p-4 border-2 transition-all ${
            statusFilter === 'pending' ? 'border-[var(--warning)] shadow-lg' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--warning)]/10 rounded-lg">
              <Clock className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.pending}</p>
              <p className="text-sm text-[var(--foreground)]/60">Bekleyen</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`bg-[var(--card)] rounded-xl p-4 border-2 transition-all ${
            statusFilter === 'approved' ? 'border-[var(--success)] shadow-lg' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--success)]/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.approved}</p>
              <p className="text-sm text-[var(--foreground)]/60">Onaylanan</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={`bg-[var(--card)] rounded-xl p-4 border-2 transition-all ${
            statusFilter === 'rejected' ? 'border-[var(--error)] shadow-lg' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--error)]/10 rounded-lg">
              <XCircle className="w-5 h-5 text-[var(--error)]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.rejected}</p>
              <p className="text-sm text-[var(--foreground)]/60">Reddedilen</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('all')}
          className={`bg-[var(--card)] rounded-xl p-4 border-2 transition-all ${
            statusFilter === 'all' ? 'border-[var(--primary)] shadow-lg' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--error)]/10 rounded-lg">
              <Flag className="w-5 h-5 text-[var(--error)]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.reported}</p>
              <p className="text-sm text-[var(--foreground)]/60">Raporlanan</p>
            </div>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
          <input
            type="text"
            placeholder="Öneri, kullanıcı veya kitap ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-lg">
                  {submission.user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[var(--foreground)]">
                      @{submission.user.username}
                    </span>
                    {submission.reports > 0 && (
                      <span className="badge badge-error flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        {submission.reports} rapor
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--foreground)]/60">
                    {submission.book.title} • Bölüm {submission.book.chapter}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/40 mt-1">
                    {formatDate(submission.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`badge ${
                  submission.status === 'pending' 
                    ? 'bg-[var(--warning)]/10 text-[var(--warning)]'
                    : submission.status === 'approved'
                    ? 'bg-[var(--success)]/10 text-[var(--success)]'
                    : 'bg-[var(--error)]/10 text-[var(--error)]'
                }`}>
                  {submission.status === 'pending' ? 'Bekliyor' :
                   submission.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                </span>
                <button
                  onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                  className="btn-icon"
                >
                  {expandedId === submission.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Content Preview */}
            <div className="px-4 pb-4">
              <p className={`text-[var(--foreground)]/80 font-serif leading-relaxed ${
                expandedId === submission.id ? '' : 'line-clamp-2'
              }`}>
                "{submission.content}"
              </p>
              <p className="text-xs text-[var(--foreground)]/40 mt-2">
                {submission.content.length} karakter
              </p>
            </div>

            {/* Actions */}
            {submission.status === 'pending' && (
              <div className="px-4 py-3 bg-[var(--muted)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="btn-icon" title="Önizle">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="btn-icon" title="Kullanıcıya Mesaj">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2 border-[var(--error)] text-[var(--error)] hover:bg-[var(--error)]/10">
                    <XCircle className="w-4 h-4" />
                    Reddet
                  </button>
                  <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2 bg-[var(--success)] hover:bg-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Onayla
                  </button>
                </div>
              </div>
            )}

            {/* Approved Info */}
            {submission.status === 'approved' && (
              <div className="px-4 py-3 bg-[var(--success)]/5 flex items-center justify-between">
                <span className="text-sm text-[var(--success)]">
                  ✓ Onaylandı ve oylamaya alındı
                </span>
                <span className="text-sm text-[var(--foreground)]/60">
                  {submission.votes} oy aldı
                </span>
              </div>
            )}

            {/* Rejected Info */}
            {submission.status === 'rejected' && (
              <div className="px-4 py-3 bg-[var(--error)]/5 flex items-center justify-between">
                <span className="text-sm text-[var(--error)]">
                  ✗ Topluluk kurallarına aykırı içerik
                </span>
                <button className="text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)]">
                  Kararı İncele
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredSubmissions.length === 0 && (
          <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-[var(--foreground)]/20 mx-auto mb-4" />
            <p className="text-[var(--foreground)]/60">
              {statusFilter === 'pending' 
                ? 'Bekleyen öneri bulunmuyor'
                : 'Öneri bulunamadı'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
