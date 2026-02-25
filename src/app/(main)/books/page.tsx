'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Filter, Search } from 'lucide-react';
import { GENRES, Genre } from '@/types/database';

// Demo kitaplar
const DEMO_BOOKS = [
  {
    id: '1',
    title: 'Yıldızların Ötesinde',
    description: 'İnsanlık galaksiler arası yolculuğun eşiğinde. Keşif gemisi Aurora, bilinmeyen bir sinyal izliyor. Dünya\'dan milyonlarca ışık yılı uzakta, gizemli bir mesaj onları bekliyor.',
    genre: 'science_fiction' as const,
    status: 'active' as const,
    current_chapter: 5,
    total_chapters: 15,
  },
  {
    id: '2',
    title: 'Son Ejderha Şövalyesi',
    description: 'Antik bir kehanet, genç bir şövalyenin kaderini değiştirecek. Karanlık güçler uyanırken, son ejderha şövalyesi ortaya çıkmalı.',
    genre: 'fantasy' as const,
    status: 'voting' as const,
    current_chapter: 8,
    total_chapters: 15,
  },
  {
    id: '3',
    title: 'Gece Yarısı Cinayetleri',
    description: 'Şehri saran gizem, dedektif Elif\'i karanlık bir komploya sürüklüyor. Her ipucu yeni sorular doğuruyor.',
    genre: 'mystery' as const,
    status: 'active' as const,
    current_chapter: 3,
    total_chapters: 15,
  },
  {
    id: '4',
    title: 'Sonbahar Aşkı',
    description: 'İstanbul\'un sonbahar yaprakları arasında başlayan bir aşk hikayesi. İki yalnız ruh, kader tarafından bir araya getirilir.',
    genre: 'romance' as const,
    status: 'active' as const,
    current_chapter: 6,
    total_chapters: 15,
  },
  {
    id: '5',
    title: 'Karanlık Ev',
    description: 'Eski malikane, yeni sakinlerini bekliyor. Duvarların ardındaki sırlar, geceleri fısıldamaya başlıyor.',
    genre: 'horror' as const,
    status: 'active' as const,
    current_chapter: 4,
    total_chapters: 15,
  },
  {
    id: '6',
    title: 'Paralel',
    description: 'Kuantum deneyinde bir hata, bilim insanı Kerem\'i paralel evrenlere sürükler. Evine dönmenin tek yolu var: kendini bulmak.',
    genre: 'science_fiction' as const,
    status: 'completed' as const,
    current_chapter: 15,
    total_chapters: 15,
  },
];

export default function BooksPage() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'voting' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = DEMO_BOOKS.filter((book) => {
    const genreMatch = selectedGenre === 'all' || book.genre === selectedGenre;
    const statusMatch = selectedStatus === 'all' || book.status === selectedStatus;
    const searchMatch = 
      searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatch && statusMatch && searchMatch;
  });

  const statusLabels = {
    active: 'Aktif',
    voting: 'Oylama',
    completed: 'Tamamlandı',
  };
  const statusColors = {
    active: 'bg-green-500',
    voting: 'bg-[var(--accent)]',
    completed: 'bg-gray-500',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          Kitaplar
        </h1>
        <p className="text-[var(--foreground)]/70">
          Aktif hikayelere katıl veya tamamlanmış kitapları oku
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/50" />
            <input
              type="text"
              placeholder="Kitap ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[var(--foreground)]/50" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value as Genre | 'all')}
              className="input-field w-auto"
            >
              <option value="all">Tüm Türler</option>
              {GENRES.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.icon} {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'voting' | 'completed')}
            className="input-field w-auto"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="voting">Oylama</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--foreground)]/30" />
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            Kitap Bulunamadı
          </h3>
          <p className="text-[var(--foreground)]/70">
            Filtreleri değiştirerek tekrar deneyin
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const genre = GENRES.find((g) => g.id === book.genre);

            return (
              <Link href={`/books/${book.id}`} key={book.id}>
                <article className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden card-hover h-full">
                  <div
                    className={`h-48 bg-gradient-to-br ${genre?.color} relative`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{genre?.icon}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColors[book.status]}`}
                      >
                        {statusLabels[book.status]}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm">
                        {genre?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                      {book.title}
                    </h3>
                    <p className="text-[var(--foreground)]/70 text-sm mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-[var(--foreground)]/50">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {book.current_chapter}/{book.total_chapters} Bölüm
                        </span>
                      </div>
                      {book.status === 'active' && (
                        <span className="text-[var(--success)] font-medium">
                          Yazıma Açık
                        </span>
                      )}
                      {book.status === 'voting' && (
                        <span className="text-[var(--accent)] font-medium">
                          Oylama Devam Ediyor
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
