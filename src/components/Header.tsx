'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, User, LogIn, Menu, X, PenTool } from 'lucide-react';
import { useAuthStore, useUIStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import AuthModal from './AuthModal';
import { ThemeToggle } from './ThemeToggle';
import { NotificationCenter } from './NotificationCenter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, setLoading } = useAuthStore();
  const { openAuthModal } = useUIStore();

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        setUser(profile);
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUser(profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--card)] border-b-2 border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg group-hover:scale-105 transition-transform">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">StoryForge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/books"
                className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Kitaplar
              </Link>
              
              <ThemeToggle />
              
              {user ? (
                <>
                  <NotificationCenter />
                  <Link
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-sm"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="btn-primary text-sm"
                  >
                    Kayıt Ol
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--foreground)]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[var(--border)] animate-fadeIn">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/books"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Kitaplar
                </Link>
                
                {user ? (
                  <>
                    <Link
                      href={`/profile/${user.username}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      <User className="w-5 h-5" />
                      Profilim
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="btn-secondary text-sm w-fit"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsMenuOpen(false);
                      }}
                      className="btn-secondary text-sm"
                    >
                      Giriş Yap
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setIsMenuOpen(false);
                      }}
                      className="btn-primary text-sm"
                    >
                      Kayıt Ol
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal />
    </>
  );
}
