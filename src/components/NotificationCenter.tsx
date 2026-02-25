'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  UserPlus,
  Settings,
  CheckCheck
} from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'win' | 'book' | 'comment' | 'like' | 'follow' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'win',
    title: 'Tebrikler!',
    message: 'Bölümünüz "Karanlık Ormanın Sırrı" kitabında kazandı!',
    time: '5 dk önce',
    read: false,
    link: '/books/karanlik-ormanin-sirri',
  },
  {
    id: '2',
    type: 'comment',
    title: 'Yeni Yorum',
    message: '@MehmetKalem senin bölümüne yorum yaptı.',
    time: '1 saat önce',
    read: false,
  },
  {
    id: '3',
    type: 'like',
    title: 'Beğeni',
    message: 'Bölümünüz 50 beğeni aldı! 🎉',
    time: '2 saat önce',
    read: false,
  },
  {
    id: '4',
    type: 'follow',
    title: 'Yeni Takipçi',
    message: '@ZehraSözlük seni takip etmeye başladı.',
    time: '3 saat önce',
    read: true,
  },
  {
    id: '5',
    type: 'book',
    title: 'Yeni Bölüm',
    message: '"Yıldızlararası Yolculuk" kitabına yeni bölüm eklendi.',
    time: '5 saat önce',
    read: true,
    link: '/books/yildizlararasi-yolculuk',
  },
  {
    id: '6',
    type: 'system',
    title: 'Hoş Geldin!',
    message: 'StoryForge ailesine katıldığın için teşekkürler.',
    time: '1 gün önce',
    read: true,
  },
];

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'win':
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 'book':
      return <BookOpen className="w-5 h-5 text-blue-500" />;
    case 'comment':
      return <MessageSquare className="w-5 h-5 text-green-500" />;
    case 'like':
      return <Heart className="w-5 h-5 text-red-500" />;
    case 'follow':
      return <UserPlus className="w-5 h-5 text-purple-500" />;
    default:
      return <Bell className="w-5 h-5 text-[var(--primary)]" />;
  }
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
        aria-label="Bildirimler"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30">
            <h3 className="font-semibold text-[var(--foreground)]">Bildirimler</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/50 hover:text-[var(--primary)]"
                  title="Tümünü okundu işaretle"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <Link
                href="/settings/notifications"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
                title="Ayarlar"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto text-[var(--foreground)]/20 mb-3" />
                <p className="text-[var(--foreground)]/50">Bildirim yok</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative group ${!notification.read ? 'bg-[var(--primary)]/5' : ''}`}
                  >
                    {notification.link ? (
                      <Link
                        href={notification.link}
                        onClick={() => {
                          markAsRead(notification.id);
                          setIsOpen(false);
                        }}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--muted)]/50 transition-colors"
                      >
                        <div className="shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            {notification.title}
                          </p>
                          <p className="text-sm text-[var(--foreground)]/70 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[var(--foreground)]/40 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-start gap-3 px-4 py-3">
                        <div className="shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            {notification.title}
                          </p>
                          <p className="text-sm text-[var(--foreground)]/70 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[var(--foreground)]/40 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded hover:bg-[var(--muted)] text-[var(--foreground)]/40 hover:text-green-500"
                          title="Okundu işaretle"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 rounded hover:bg-[var(--muted)] text-[var(--foreground)]/40 hover:text-red-500"
                        title="Kaldır"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary)]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--muted)]/30">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-[var(--primary)] hover:underline"
              >
                Tüm bildirimleri gör
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
