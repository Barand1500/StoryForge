// Veritabanı tipleri

export type Genre = 'science_fiction' | 'fantasy' | 'horror' | 'romance' | 'mystery';

export type BookStatus = 'active' | 'voting' | 'completed';
export type ChapterStatus = 'writing' | 'voting' | 'completed';
export type SubmissionStatus = 'pending' | 'finalist' | 'winner' | 'rejected';

export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  total_wins: number;
  total_finalists: number;
  total_submissions: number;
  total_votes_received: number;
  earnings: number;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: 'first_submission' | 'finalist' | 'winner' | 'triple_winner' | 'multi_book';
  requirement_value: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  cover_image_url?: string;
  genre: Genre;
  status: BookStatus;
  current_chapter: number;
  total_chapters: number;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  book_id: string;
  chapter_number: number;
  title: string;
  content: string; // AI veya kazanan metin
  status: ChapterStatus;
  writing_start: string;
  writing_end: string;
  voting_start?: string;
  voting_end?: string;
  winner_submission_id?: string;
  created_at: string;
  updated_at: string;
  book?: Book;
  submissions?: Submission[];
  winning_submission?: Submission;
}

export interface Submission {
  id: string;
  chapter_id: string;
  user_id: string;
  content: string;
  status: SubmissionStatus;
  vote_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  chapter?: Chapter;
}

export interface Vote {
  id: string;
  submission_id: string;
  user_id: string;
  created_at: string;
  submission?: Submission;
  user?: User;
}

// UI için türler
export interface GenreInfo {
  id: Genre;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const GENRES: GenreInfo[] = [
  {
    id: 'science_fiction',
    name: 'Bilim Kurgu',
    description: 'Gelecek, uzay ve teknoloji',
    icon: '🚀',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'fantasy',
    name: 'Fantastik',
    description: 'Büyü, ejderhalar ve destanlar',
    icon: '🐉',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'horror',
    name: 'Korku',
    description: 'Gerilim, dehşet ve karanlık',
    icon: '👻',
    color: 'from-gray-700 to-red-900'
  },
  {
    id: 'romance',
    name: 'Aşk & Drama',
    description: 'Romantizm ve duygusal yolculuklar',
    icon: '💕',
    color: 'from-pink-400 to-red-500'
  },
  {
    id: 'mystery',
    name: 'Gizem & Dedektif',
    description: 'Suçlar, ipuçları ve çözümler',
    icon: '🔍',
    color: 'from-amber-600 to-orange-700'
  }
];

export const BADGES: Omit<Badge, 'id'>[] = [
  {
    name: 'İlk Adım',
    description: 'İlk önerinizi gönderdiniz',
    icon: '✨',
    requirement_type: 'first_submission',
    requirement_value: 1
  },
  {
    name: 'Finalist',
    description: 'Bir bölümde finale kaldınız',
    icon: '🏅',
    requirement_type: 'finalist',
    requirement_value: 1
  },
  {
    name: 'Bölüm Kazananı',
    description: 'Bir bölümü kazandınız',
    icon: '🏆',
    requirement_type: 'winner',
    requirement_value: 1
  },
  {
    name: 'Üçlü Şampiyon',
    description: 'Üç bölüm kazandınız',
    icon: '👑',
    requirement_type: 'triple_winner',
    requirement_value: 3
  },
  {
    name: 'Çok Yönlü Yazar',
    description: 'Birden fazla kitaba katkıda bulundunuz',
    icon: '📚',
    requirement_type: 'multi_book',
    requirement_value: 2
  }
];

// Zaman hesaplamaları için yardımcı tipler
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isExpired: boolean;
}
