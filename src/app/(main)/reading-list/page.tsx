'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Heart, 
  Bookmark, 
  Clock, 
  CheckCircle,
  MoreVertical,
  Trash2,
  Share2,
  Eye,
  Star,
  Filter,
  Search,
  BookmarkPlus,
  Library,
  Timer,
  Grid,
  List as ListIcon
} from 'lucide-react';

export interface FavoriteBook {
  id: string;
  title: string;
  author: {
    username: string;
    display_name: string;
    avatar_url?: string;
  };
  cover_url?: string;
  genre: string;
  total_chapters: number;
  read_chapters: number;
  added_at: string;
  last_read_at?: string;
  status: 'reading' | 'completed' | 'want_to_read' | 'on_hold' | 'dropped';
  rating?: number;
  notes?: string;
}

type ListFilter = 'all' | 'reading' | 'completed' | 'want_to_read' | 'on_hold' | 'dropped';
type SortBy = 'added_at' | 'last_read_at' | 'title' | 'progress';
type ViewMode = 'grid' | 'list';

const statusConfig = {
  reading: { label: 'Okunuyor', icon: BookOpen, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  completed: { label: 'Tamamlandı', icon: CheckCircle, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
  want_to_read: { label: 'Okumak İstiyorum', icon: BookmarkPlus, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  on_hold: { label: 'Beklemede', icon: Timer, color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' },
  dropped: { label: 'Bırakıldı', icon: Trash2, color: 'text-red-600 bg-red-100 dark:bg-red-900/30' },
};

// Demo data
const demoFavorites: FavoriteBook[] = [
  {
    id: '1',
    title: 'Karanlık Orman',
    author: { username: 'yazarali', display_name: 'Ali Yazar' },
    genre: 'Fantastik',
    total_chapters: 24,
    read_chapters: 18,
    added_at: '2024-01-15',
    last_read_at: '2024-01-20',
    status: 'reading',
    rating: 4,
  },
  {
    id: '2',
    title: 'Yıldızların Ötesi',
    author: { username: 'ayse_kalem', display_name: 'Ayşe Kalem' },
    genre: 'Bilim Kurgu',
    total_chapters: 30,
    read_chapters: 30,
    added_at: '2024-01-10',
    last_read_at: '2024-01-18',
    status: 'completed',
    rating: 5,
  },
  {
    id: '3',
    title: 'Gizli Bahçe',
    author: { username: 'mehmet_oz', display_name: 'Mehmet Öz' },
    genre: 'Romantik',
    total_chapters: 15,
    read_chapters: 0,
    added_at: '2024-01-19',
    status: 'want_to_read',
  },
  {
    id: '4',
    title: 'Dedektif Hikayesi',
    author: { username: 'zeynep_k', display_name: 'Zeynep K.' },
    genre: 'Polisiye',
    total_chapters: 20,
    read_chapters: 8,
    added_at: '2024-01-05',
    last_read_at: '2024-01-12',
    status: 'on_hold',
    rating: 3,
  },
];

export function ReadingListCard({ book, viewMode, onStatusChange, onRemove }: {
  book: FavoriteBook;
  viewMode: ViewMode;
  onStatusChange?: (id: string, status: FavoriteBook['status']) => void;
  onRemove?: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const status = statusConfig[book.status];
  const StatusIcon = status.icon;
  const progress = book.total_chapters > 0 ? (book.read_chapters / book.total_chapters) * 100 : 0;

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
        {/* Cover */}
        <div className="w-16 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg flex-shrink-0 flex items-center justify-center">
          {book.cover_url ? (
            <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <BookOpen className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link href={`/books/${book.id}`} className="hover:text-[var(--primary)]">
            <h3 className="font-semibold truncate">{book.title}</h3>
          </Link>
          <p className="text-sm text-gray-500">@{book.author.username}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
              {status.label}
            </span>
            {book.rating && (
              <span className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                {book.rating}
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="w-32 hidden sm:block">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{book.read_chapters}/{book.total_chapters} bölüm</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <button
                onClick={() => { setShowStatusMenu(!showStatusMenu); }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                <StatusIcon className="w-4 h-4" />
                Durumu Değiştir
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
                <Share2 className="w-4 h-4" />
                Paylaş
              </button>
              <button 
                onClick={() => onRemove?.(book.id)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-red-500"
              >
                <Trash2 className="w-4 h-4" />
                Listeden Kaldır
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </div>

        {/* Rating */}
        {book.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {book.rating}
          </div>
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div 
            className="h-full bg-[var(--primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link
            href={`/books/${book.id}`}
            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
          >
            <Eye className="w-5 h-5 text-gray-800" />
          </Link>
          <button className="p-3 bg-[var(--primary)] rounded-full hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link href={`/books/${book.id}`} className="hover:text-[var(--primary)]">
          <h3 className="font-semibold truncate">{book.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-3">@{book.author.username}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{book.read_chapters}/{book.total_chapters} bölüm</span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ReadingList() {
  const [favorites, setFavorites] = useState<FavoriteBook[]>(demoFavorites);
  const [filter, setFilter] = useState<ListFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('added_at');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = favorites
    .filter(book => {
      if (filter !== 'all' && book.status !== filter) return false;
      if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return (b.read_chapters / b.total_chapters) - (a.read_chapters / a.total_chapters);
        case 'last_read_at':
          return new Date(b.last_read_at || 0).getTime() - new Date(a.last_read_at || 0).getTime();
        default:
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();
      }
    });

  const stats = {
    total: favorites.length,
    reading: favorites.filter(b => b.status === 'reading').length,
    completed: favorites.filter(b => b.status === 'completed').length,
    wantToRead: favorites.filter(b => b.status === 'want_to_read').length,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
              <Library className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Okuma Listem</h1>
              <p className="text-gray-600 dark:text-gray-400">{stats.total} kitap</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{stats.reading}</span>
              <span className="text-gray-500">Okunuyor</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">{stats.completed}</span>
              <span className="text-gray-500">Tamamlandı</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookmarkPlus className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{stats.wantToRead}</span>
              <span className="text-gray-500">Okumak İstiyorum</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Kitap ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400" />
              {(['all', 'reading', 'completed', 'want_to_read', 'on_hold', 'dropped'] as ListFilter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f === 'all' ? 'Tümü' : statusConfig[f as keyof typeof statusConfig].label}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm"
              >
                <option value="added_at">Eklenme Tarihi</option>
                <option value="last_read_at">Son Okunan</option>
                <option value="title">Başlık</option>
                <option value="progress">İlerleme</option>
              </select>

              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book List */}
        {filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' 
            : 'space-y-4'
          }>
            {filteredBooks.map(book => (
              <ReadingListCard
                key={book.id}
                book={book}
                viewMode={viewMode}
                onRemove={(id) => setFavorites(prev => prev.filter(b => b.id !== id))}
                onStatusChange={(id, status) => {
                  setFavorites(prev => prev.map(b => b.id === id ? { ...b, status } : b));
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Library className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Liste Boş</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? 'Arama kriterlerinize uygun kitap bulunamadı.'
                : 'Henüz okuma listenize kitap eklemediniz.'}
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-5 h-5" />
              Kitapları Keşfet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
