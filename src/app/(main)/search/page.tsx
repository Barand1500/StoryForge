'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search as SearchIcon, 
  X, 
  BookOpen, 
  User, 
  Filter, 
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Star,
  Hash
} from 'lucide-react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

// Mock data
const mockBooks = [
  { id: 1, title: 'Karanlık Ormanın Sırrı', slug: 'karanlik-ormanin-sirri', genre: 'Fantastik', author: 'AyşeYazar', chapters: 24, rating: 4.8, cover: null },
  { id: 2, title: 'Yıldızlararası Yolculuk', slug: 'yildizlararasi-yolculuk', genre: 'Bilim Kurgu', author: 'MehmetKalem', chapters: 18, rating: 4.5, cover: null },
  { id: 3, title: 'Kayıp Şehrin İzinde', slug: 'kayip-sehrin-izinde', genre: 'Macera', author: 'ZehraSözlük', chapters: 32, rating: 4.9, cover: null },
  { id: 4, title: 'Son Vampir', slug: 'son-vampir', genre: 'Korku', author: 'CanHikaye', chapters: 15, rating: 4.3, cover: null },
  { id: 5, title: 'Aşkın Rengi', slug: 'askin-rengi', genre: 'Romantik', author: 'ElifMasalcı', chapters: 28, rating: 4.7, cover: null },
];

const mockUsers = [
  { username: 'AyşeYazar', bio: 'Fantastik dünyaların mimarı', books: 12, followers: 2450 },
  { username: 'MehmetKalem', bio: 'Bilim kurgu tutkunu', books: 8, followers: 1890 },
  { username: 'ZehraSözlük', bio: 'Macera hikayeleri uzmanı', books: 15, followers: 3200 },
];

const trendingSearches = [
  'Fantastik', 'Korku Hikayeleri', 'Romantik', 'Macera', 'Bilim Kurgu'
];

const genres = ['Tümü', 'Fantastik', 'Bilim Kurgu', 'Macera', 'Korku', 'Romantik', 'Gizem', 'Tarihi'];

type Tab = 'all' | 'books' | 'users';
type SortOption = 'relevance' | 'newest' | 'popular' | 'rating';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedGenre, setSelectedGenre] = useState('Tümü');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ books: typeof mockBooks; users: typeof mockUsers }>({ books: [], users: [] });
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults({ books: [], users: [] });
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filteredBooks = mockBooks.filter(book => 
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.genre.toLowerCase().includes(lowerQuery)
        );
        const filteredUsers = mockUsers.filter(user =>
          user.username.toLowerCase().includes(lowerQuery) ||
          user.bio.toLowerCase().includes(lowerQuery)
        );
        setResults({ books: filteredBooks, users: filteredUsers });
        setIsSearching(false);
      }, 300);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const hasResults = results.books.length > 0 || results.users.length > 0;
  const showTrending = !query && !hasResults;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Search Header */}
      <section className="py-12 bg-gradient-to-b from-[var(--muted)]/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[var(--foreground)] text-center mb-8">
              Hikaye Ara
            </h1>

            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kitap, yazar veya tür ara..."
                className="input-field pl-12 pr-12 py-4 text-lg w-full"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--muted)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--foreground)]/40" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors shrink-0 ${
                  showFilters 
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                    : 'border-[var(--border)] text-[var(--foreground)]/70 hover:border-[var(--primary)]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtreler
              </button>
              {genres.slice(1, 5).map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre === selectedGenre ? 'Tümü' : genre)}
                  className={`px-4 py-2 rounded-full border transition-colors shrink-0 ${
                    selectedGenre === genre
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'border-[var(--border)] text-[var(--foreground)]/70 hover:border-[var(--primary)]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      {showFilters && (
        <section className="py-4 bg-[var(--muted)]/30 border-b border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                    Tür
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="input-field w-full"
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                    Sırala
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="input-field w-full"
                  >
                    <option value="relevance">İlgililik</option>
                    <option value="newest">En Yeni</option>
                    <option value="popular">En Popüler</option>
                    <option value="rating">En Yüksek Puan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            {hasResults && (
              <div className="flex items-center gap-4 mb-6 border-b border-[var(--border)]">
                {[
                  { id: 'all' as Tab, label: 'Tümü', count: results.books.length + results.users.length },
                  { id: 'books' as Tab, label: 'Kitaplar', count: results.books.length, icon: BookOpen },
                  { id: 'users' as Tab, label: 'Yazarlar', count: results.users.length, icon: User },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-[var(--primary)] text-[var(--primary)]'
                          : 'border-transparent text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{tab.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-xs">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Trending Searches */}
            {showTrending && !isSearching && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                    Popüler Aramalar
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="px-4 py-2 rounded-full bg-[var(--muted)] text-[var(--foreground)]/70 hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Hash className="w-4 h-4" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Öne Çıkan Kitaplar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockBooks.slice(0, 4).map((book) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.slug}`}
                        className="card p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[var(--primary)] to-purple-600 flex items-center justify-center text-white text-2xl shrink-0">
                          📖
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[var(--foreground)] truncate">{book.title}</h3>
                          <p className="text-sm text-[var(--foreground)]/50">@{book.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                              {book.genre}
                            </span>
                            <span className="text-xs text-yellow-500 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {book.rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {query && !isSearching && !hasResults && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  Sonuç Bulunamadı
                </h3>
                <p className="text-[var(--foreground)]/70 mb-4">
                  &quot;{query}&quot; için sonuç bulunamadı.
                </p>
                <div className="text-sm text-[var(--foreground)]/50">
                  <p>Öneriler:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Yazım hatası olup olmadığını kontrol edin</li>
                    <li>• Daha genel anahtar kelimeler kullanın</li>
                    <li>• Farklı filtreler deneyin</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Book Results */}
            {!isSearching && hasResults && (activeTab === 'all' || activeTab === 'books') && results.books.length > 0 && (
              <div className="mb-8">
                {activeTab === 'all' && (
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Kitaplar
                  </h3>
                )}
                <div className="space-y-3">
                  {results.books.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.slug}`}
                      className="card p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform"
                    >
                      <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[var(--primary)] to-purple-600 flex items-center justify-center text-white text-2xl shrink-0">
                        📚
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--foreground)]">{book.title}</h3>
                        <p className="text-sm text-[var(--foreground)]/50">@{book.author}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-[var(--foreground)]/50">
                          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                            {book.genre}
                          </span>
                          <span>{book.chapters} bölüm</span>
                          <span className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-3 h-3 fill-current" />
                            {book.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* User Results */}
            {!isSearching && hasResults && (activeTab === 'all' || activeTab === 'users') && results.users.length > 0 && (
              <div>
                {activeTab === 'all' && (
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Yazarlar
                  </h3>
                )}
                <div className="space-y-3">
                  {results.users.map((user) => (
                    <Link
                      key={user.username}
                      href={`/profile/${user.username}`}
                      className="card p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                        {user.username.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--foreground)]">@{user.username}</h3>
                        <p className="text-sm text-[var(--foreground)]/50">{user.bio}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-[var(--foreground)]/50">
                          <span>{user.books} kitap</span>
                          <span>{user.followers.toLocaleString()} takipçi</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
