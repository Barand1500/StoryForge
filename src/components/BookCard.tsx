import Link from 'next/link';
import { BookOpen, Users, Clock } from 'lucide-react';
import { Book, GENRES } from '@/types/database';
import { formatRelativeTime } from '@/lib/utils';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const genre = GENRES.find((g) => g.id === book.genre);

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
    <Link href={`/books/${book.id}`}>
      <article className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden card-hover">
        {/* Cover Image or Gradient */}
        <div
          className={`h-48 bg-gradient-to-br ${genre?.color || 'from-[var(--primary)] to-[var(--secondary)]'} relative`}
        >
          {book.cover_image_url ? (
            <img
              src={book.cover_image_url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">{genre?.icon || '📖'}</span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColors[book.status]}`}
            >
              {statusLabels[book.status]}
            </span>
          </div>

          {/* Genre Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm">
              {genre?.name || 'Genel'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-[var(--foreground)]/70 text-sm mb-4 line-clamp-2">
            {book.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-[var(--foreground)]/50">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>
                {book.current_chapter}/{book.total_chapters} Bölüm
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatRelativeTime(book.created_at)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
