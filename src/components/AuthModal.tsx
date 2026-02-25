'use client';

import { useState } from 'react';
import { X, Mail, Lock, User, Loader2, Sparkles, BookOpen, PenTool, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal } = useUIStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const supabase = createClient();

    try {
      if (authModalMode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              username: username || email.split('@')[0],
              display_name: displayName,
            },
          },
        });

        if (error) throw error;
        setSuccess(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        closeAuthModal();
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setDisplayName('');
    setError('');
    setSuccess(false);
  };

  const switchMode = (mode: 'login' | 'register') => {
    resetForm();
    openAuthModal(mode);
  };

  // Success State for Registration
  if (success && authModalMode === 'register') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAuthModal} />
        
        <div className="relative bg-[var(--card)] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500 animate-bounce" />
            </div>
            
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              Kayıt Başarılı! 🎉
            </h2>
            
            <p className="text-[var(--foreground)]/70 mb-6">
              <strong>{email}</strong> adresine bir doğrulama e-postası gönderdik. 
              Lütfen e-postanızdaki bağlantıya tıklayarak hesabınızı aktifleştirin.
            </p>

            <div className="p-4 rounded-xl bg-[var(--muted)] mb-6">
              <p className="text-sm text-[var(--foreground)]/60">
                💡 E-posta birkaç dakika içinde gelmezse spam klasörünü kontrol edin.
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                switchMode('login');
              }}
              className="btn-primary w-full"
            >
              Giriş Sayfasına Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="relative bg-[var(--card)] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
        {/* Decorative Header */}
        <div className="relative h-32 bg-gradient-to-br from-[var(--primary)] via-purple-500 to-pink-500 overflow-hidden">
          {/* Floating Icons */}
          <div className="absolute inset-0">
            <BookOpen className="absolute top-4 left-6 w-8 h-8 text-white/20 animate-float" />
            <PenTool className="absolute top-8 right-10 w-6 h-6 text-white/20 animate-float" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute bottom-4 left-1/4 w-5 h-5 text-white/30 animate-float" style={{ animationDelay: '1s' }} />
            <span className="absolute bottom-6 right-6 text-3xl opacity-30 animate-float" style={{ animationDelay: '0.3s' }}>✨</span>
          </div>
          
          {/* Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold">
              {authModalMode === 'login' ? 'Tekrar Hoş Geldin!' : 'Hikayene Başla'}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {authModalMode === 'login' ? 'Hikayeni yazmaya devam et' : 'Binlerce yazara katıl'}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-6">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 p-3.5 border-2 border-[var(--border)] rounded-xl hover:bg-[var(--muted)] hover:border-[var(--primary)]/30 transition-all group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              Google ile devam et
            </span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[var(--card)] text-sm text-[var(--foreground)]/50">
                veya e-posta ile
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-1.5">
                    Kullanıcı Adı
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="kullanici_adi"
                      className="input-field pl-8"
                      required
                      minLength={3}
                      maxLength={20}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-1.5">
                    Görünen Ad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-1.5">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {authModalMode === 'register' && (
                <p className="text-xs text-[var(--foreground)]/50 mt-1">
                  En az 6 karakter olmalı
                </p>
              )}
            </div>

            {authModalMode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-sm text-[var(--primary)] hover:underline">
                  Şifremi unuttum
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                <X className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {authModalMode === 'login' ? 'Giriş yapılıyor...' : 'Kayıt olunuyor...'}
                </>
              ) : authModalMode === 'login' ? (
                <>
                  <PenTool className="w-5 h-5" />
                  Giriş Yap
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Kayıt Ol
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <p className="text-center mt-6 text-sm text-[var(--foreground)]/70">
            {authModalMode === 'login' ? (
              <>
                Hesabın yok mu?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  Hemen kayıt ol
                </button>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  Giriş yap
                </button>
              </>
            )}
          </p>

          {/* Terms */}
          {authModalMode === 'register' && (
            <p className="text-center mt-4 text-xs text-[var(--foreground)]/50">
              Kayıt olarak{' '}
              <a href="/terms" className="underline hover:text-[var(--primary)]">Kullanım Şartları</a>
              {' '}ve{' '}
              <a href="/privacy" className="underline hover:text-[var(--primary)]">Gizlilik Politikası</a>
              &apos;nı kabul etmiş olursunuz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
