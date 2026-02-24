import { TimeRemaining } from '@/types/database';
import { differenceInSeconds, format, formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export function calculateTimeRemaining(endDate: string): TimeRemaining {
  const end = new Date(endDate);
  const now = new Date();
  const total = differenceInSeconds(end, now);

  if (total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(total / (60 * 60 * 24));
  const hours = Math.floor((total % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((total % (60 * 60)) / 60);
  const seconds = total % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    total,
    isExpired: false,
  };
}

export function formatDate(date: string): string {
  return format(new Date(date), 'd MMMM yyyy', { locale: tr });
}

export function formatDateTime(date: string): string {
  return format(new Date(date), 'd MMMM yyyy HH:mm', { locale: tr });
}

export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr });
}

export function formatTimeRemaining(time: TimeRemaining): string {
  if (time.isExpired) return 'Süre doldu';
  
  const parts = [];
  if (time.days > 0) parts.push(`${time.days} gün`);
  if (time.hours > 0) parts.push(`${time.hours} saat`);
  if (time.minutes > 0) parts.push(`${time.minutes} dk`);
  if (time.days === 0 && time.hours === 0 && time.seconds > 0) {
    parts.push(`${time.seconds} sn`);
  }
  
  return parts.length > 0 ? parts.join(' ') : 'Az kaldı';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
