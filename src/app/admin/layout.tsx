'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  PenTool,
  ChevronRight,
  Bell,
  Search,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/books', icon: BookOpen, label: 'Kitaplar' },
  { href: '/admin/users', icon: Users, label: 'Kullanıcılar' },
  { href: '/admin/moderation', icon: MessageSquare, label: 'Moderasyon' },
  { href: '/admin/settings', icon: Settings, label: 'Ayarlar' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[var(--foreground)] to-[#1a120b] transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <div className="p-2 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">Admin User</p>
              <p className="text-white/50 text-sm truncate">admin@storyforge.com</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Siteye Dön</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-[var(--card)] border-b-2 border-[var(--border)] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2 bg-[var(--muted)] border-2 border-transparent rounded-lg focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-[var(--muted)] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[var(--foreground)]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
