'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Calendar,
  Trophy,
  PenTool,
  Eye,
  Ban,
  Users,
} from 'lucide-react';

// Demo data
const DEMO_USERS = [
  {
    id: '1',
    username: 'elif_yildiz',
    email: 'elif@example.com',
    avatar_url: null,
    role: 'user',
    status: 'active',
    total_submissions: 45,
    total_wins: 8,
    created_at: '2025-12-15',
    last_active: '2026-02-25',
  },
  {
    id: '2',
    username: 'ahmet_kaya',
    email: 'ahmet@example.com',
    avatar_url: null,
    role: 'moderator',
    status: 'active',
    total_submissions: 89,
    total_wins: 15,
    created_at: '2025-11-20',
    last_active: '2026-02-24',
  },
  {
    id: '3',
    username: 'zeynep_demir',
    email: 'zeynep@example.com',
    avatar_url: null,
    role: 'user',
    status: 'active',
    total_submissions: 23,
    total_wins: 3,
    created_at: '2026-01-05',
    last_active: '2026-02-25',
  },
  {
    id: '4',
    username: 'can_ozturk',
    email: 'can@example.com',
    avatar_url: null,
    role: 'user',
    status: 'banned',
    total_submissions: 12,
    total_wins: 0,
    created_at: '2026-02-01',
    last_active: '2026-02-15',
  },
  {
    id: '5',
    username: 'selin_arslan',
    email: 'selin@example.com',
    avatar_url: null,
    role: 'admin',
    status: 'active',
    total_submissions: 156,
    total_wins: 28,
    created_at: '2025-10-01',
    last_active: '2026-02-25',
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = DEMO_USERS.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleLabels: Record<string, string> = {
    user: 'Kullanıcı',
    moderator: 'Moderatör',
    admin: 'Admin',
  };

  const roleColors: Record<string, string> = {
    user: 'bg-gray-500/10 text-gray-600',
    moderator: 'bg-blue-500/10 text-blue-600',
    admin: 'bg-purple-500/10 text-purple-600',
  };

  const statusLabels: Record<string, string> = {
    active: 'Aktif',
    banned: 'Yasaklı',
    suspended: 'Askıya Alındı',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-[var(--success)]/10 text-[var(--success)]',
    banned: 'bg-[var(--error)]/10 text-[var(--error)]',
    suspended: 'bg-[var(--warning)]/10 text-[var(--warning)]',
  };

  // Stats
  const stats = {
    total: DEMO_USERS.length,
    active: DEMO_USERS.filter((u) => u.status === 'active').length,
    moderators: DEMO_USERS.filter((u) => u.role === 'moderator').length,
    banned: DEMO_USERS.filter((u) => u.status === 'banned').length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Kullanıcı Yönetimi</h1>
        <p className="text-[var(--foreground)]/60 mt-1">
          Platform kullanıcılarını yönetin
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] rounded-xl p-4 border-2 border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.total}</p>
              <p className="text-sm text-[var(--foreground)]/60">Toplam</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card)] rounded-xl p-4 border-2 border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--success)]/10 rounded-lg">
              <UserCheck className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.active}</p>
              <p className="text-sm text-[var(--foreground)]/60">Aktif</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card)] rounded-xl p-4 border-2 border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.moderators}</p>
              <p className="text-sm text-[var(--foreground)]/60">Moderatör</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card)] rounded-xl p-4 border-2 border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--error)]/10 rounded-lg">
              <Ban className="w-5 h-5 text-[var(--error)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{stats.banned}</p>
              <p className="text-sm text-[var(--foreground)]/60">Yasaklı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
            <input
              type="text"
              placeholder="Kullanıcı adı veya e-posta ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select-field w-full lg:w-48"
          >
            <option value="all">Tüm Roller</option>
            <option value="user">Kullanıcı</option>
            <option value="moderator">Moderatör</option>
            <option value="admin">Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field w-full lg:w-48"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="banned">Yasaklı</option>
            <option value="suspended">Askıya Alındı</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>Rol</th>
                <th>Durum</th>
                <th>Öneriler</th>
                <th>Kazanımlar</th>
                <th>Kayıt Tarihi</th>
                <th>Son Aktivite</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">
                          @{user.username}
                        </p>
                        <p className="text-xs text-[var(--foreground)]/50 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${roleColors[user.role]}`}>
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[user.status]}`}>
                      {statusLabels[user.status]}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <PenTool className="w-4 h-4 text-[var(--foreground)]/40" />
                      <span>{user.total_submissions}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-[var(--accent)]" />
                      <span className="font-semibold text-[var(--primary)]">
                        {user.total_wins}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-[var(--foreground)]/60">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.created_at).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-[var(--foreground)]/60">
                      {new Date(user.last_active).toLocaleDateString('tr-TR')}
                    </span>
                  </td>
                  <td>
                    <div className="relative group">
                      <button className="btn-icon">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-[var(--card)] rounded-lg shadow-lg border-2 border-[var(--border)] py-1 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm w-full">
                          <Eye className="w-4 h-4" /> Profili Gör
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm w-full">
                          <Shield className="w-4 h-4" /> Rol Değiştir
                        </button>
                        {user.status === 'active' ? (
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm text-[var(--error)] w-full">
                            <Ban className="w-4 h-4" /> Yasakla
                          </button>
                        ) : (
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm text-[var(--success)] w-full">
                            <UserCheck className="w-4 h-4" /> Yasağı Kaldır
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-[var(--foreground)]/20 mx-auto mb-4" />
            <p className="text-[var(--foreground)]/60">Kullanıcı bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
