'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Users,
  PenTool,
  ArrowUpDown,
} from 'lucide-react';
import Link from 'next/link';
import { GENRES } from '@/types/database';

// Demo data
const DEMO_BOOKS = [
  {
    id: '1',
    title: 'Yıldızların Ötesinde',
    genre: 'science_fiction',
    status: 'active',
    current_chapter: 5,
    total_chapters: 15,
    total_submissions: 234,
    total_views: 5670,
    created_at: '2026-01-15',
  },
  {
    id: '2',
    title: 'Son Ejderha Şövalyesi',
    genre: 'fantasy',
    status: 'voting',
    current_chapter: 8,
    total_chapters: 15,
    total_submissions: 189,
    total_views: 4320,
    created_at: '2026-01-10',
  },
  {
    id: '3',
    title: 'Gece Yarısı Cinayetleri',
    genre: 'mystery',
    status: 'active',
    current_chapter: 3,
    total_chapters: 15,
    total_submissions: 156,
    total_views: 3890,
    created_at: '2026-02-01',
  },
  {
    id: '4',
    title: 'Aşkın Renkleri',
    genre: 'romance',
    status: 'completed',
    current_chapter: 15,
    total_chapters: 15,
    total_submissions: 412,
    total_views: 12450,
    created_at: '2025-11-20',
  },
  {
    id: '5',
    title: 'Korku Sokağı',
    genre: 'horror',
    status: 'active',
    current_chapter: 7,
    total_chapters: 15,
    total_submissions: 98,
    total_views: 2890,
    created_at: '2026-02-10',
  },
];

export default function AdminBooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const filteredBooks = DEMO_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const toggleBookSelection = (id: string) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllBooks = () => {
    if (selectedBooks.length === filteredBooks.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(filteredBooks.map((b) => b.id));
    }
  };

  const statusLabels: Record<string, string> = {
    active: 'Aktif',
    voting: 'Oylama',
    completed: 'Tamamlandı',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-[var(--success)]/10 text-[var(--success)]',
    voting: 'bg-[var(--warning)]/10 text-[var(--warning)]',
    completed: 'bg-gray-500/10 text-gray-500',
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Kitap Yönetimi</h1>
          <p className="text-[var(--foreground)]/60 mt-1">
            Toplam {DEMO_BOOKS.length} kitap
          </p>
        </div>
        <Link href="/admin/books/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Yeni Kitap Ekle
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
            <input
              type="text"
              placeholder="Kitap ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field w-full lg:w-48"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="voting">Oylama</option>
            <option value="completed">Tamamlandı</option>
          </select>

          {/* Genre Filter */}
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="select-field w-full lg:w-48"
          >
            <option value="all">Tüm Türler</option>
            {GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.icon} {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedBooks.length > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--foreground)]/60">
              {selectedBooks.length} kitap seçildi
            </span>
            <button className="btn-secondary text-sm py-1.5 px-3 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Toplu Düzenle
            </button>
            <button className="btn-ghost text-sm py-1.5 px-3 flex items-center gap-2 text-[var(--error)]">
              <Trash2 className="w-4 h-4" />
              Sil
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedBooks.length === filteredBooks.length && filteredBooks.length > 0}
                    onChange={toggleAllBooks}
                    className="w-4 h-4 rounded border-[var(--border)]"
                  />
                </th>
                <th>
                  <button className="flex items-center gap-1 hover:text-[var(--primary)]">
                    Kitap <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th>Tür</th>
                <th>Durum</th>
                <th>İlerleme</th>
                <th>Öneriler</th>
                <th>Görüntüleme</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => {
                const genre = GENRES.find((g) => g.id === book.genre);
                
                return (
                  <tr key={book.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => toggleBookSelection(book.id)}
                        className="w-4 h-4 rounded border-[var(--border)]"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${genre?.color} flex items-center justify-center`}>
                          <span className="text-lg">{genre?.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--foreground)]">{book.title}</p>
                          <p className="text-xs text-[var(--foreground)]/50">
                            Oluşturulma: {new Date(book.created_at).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="chip">{genre?.name}</span>
                    </td>
                    <td>
                      <span className={`badge ${statusColors[book.status]}`}>
                        {statusLabels[book.status]}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20 h-2">
                          <div 
                            className="progress-bar-fill"
                            style={{ width: `${(book.current_chapter / book.total_chapters) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-[var(--foreground)]/60">
                          {book.current_chapter}/{book.total_chapters}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <PenTool className="w-4 h-4 text-[var(--foreground)]/40" />
                        <span>{book.total_submissions}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-[var(--foreground)]/40" />
                        <span>{book.total_views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="relative group">
                        <button className="btn-icon">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 bg-[var(--card)] rounded-lg shadow-lg border-2 border-[var(--border)] py-1 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <Link
                            href={`/books/${book.id}`}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm"
                          >
                            <Eye className="w-4 h-4" /> Görüntüle
                          </Link>
                          <Link
                            href={`/admin/books/${book.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm"
                          >
                            <Edit className="w-4 h-4" /> Düzenle
                          </Link>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] text-sm text-[var(--error)] w-full">
                            <Trash2 className="w-4 h-4" /> Sil
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-[var(--foreground)]/20 mx-auto mb-4" />
            <p className="text-[var(--foreground)]/60">Kitap bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
