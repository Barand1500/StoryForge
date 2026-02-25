'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, Loader2, Home, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AuthConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (token_hash && type) {
        const supabase = createClient();
        
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'signup' | 'recovery' | 'email',
        });

        if (error) {
          setStatus('error');
          setMessage(error.message);
        } else {
          setStatus('success');
          setMessage('E-posta adresiniz başarıyla doğrulandı!');
          
          // 3 saniye sonra ana sayfaya yönlendir
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      } else {
        // URL parametreleri yoksa, hash'ten kontrol et
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          const supabase = createClient();
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setStatus('error');
            setMessage(error.message);
          } else {
            setStatus('success');
            setMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
            setTimeout(() => {
              router.push('/');
            }, 2000);
          }
        } else {
          setStatus('error');
          setMessage('Geçersiz doğrulama bağlantısı.');
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Doğrulanıyor...
              </h1>
              <p className="text-[var(--foreground)]/70">
                E-posta adresiniz doğrulanıyor, lütfen bekleyin.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center animate-scaleIn">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Başarılı!
              </h1>
              <p className="text-[var(--foreground)]/70 mb-6">
                {message}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="btn-primary flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Ana Sayfa
                </Link>
              </div>
              <p className="text-sm text-[var(--foreground)]/50 mt-4">
                Otomatik yönlendiriliyorsunuz...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Hata Oluştu
              </h1>
              <p className="text-[var(--foreground)]/70 mb-6">
                {message || 'Doğrulama sırasında bir hata oluştu.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="btn-primary flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Ana Sayfa
                </Link>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Tekrar Dene
                </button>
              </div>
            </>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">📚</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>✨</div>
      </div>
    </div>
  );
}
