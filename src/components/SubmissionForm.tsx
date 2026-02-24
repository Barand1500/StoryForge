'use client';

import { useState } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore, useUIStore, useBookStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';

interface SubmissionFormProps {
  chapterId: string;
  onSubmit?: () => void;
}

const MIN_CHARS = 300;
const MAX_CHARS = 400;

export default function SubmissionForm({ chapterId, onSubmit }: SubmissionFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const { addSubmission } = useBookStore();

  const charCount = content.length;
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      openAuthModal('login');
      return;
    }

    if (!isValidLength) {
      setError(`Öneriniz ${MIN_CHARS}-${MAX_CHARS} karakter arasında olmalıdır.`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          chapter_id: chapterId,
          user_id: user.id,
          content: content.trim(),
        })
        .select('*, user:profiles(*)')
        .single();

      if (error) throw error;

      addSubmission(data);
      setSuccess(true);
      setContent('');
      onSubmit?.();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Öneri gönderme hatası:', err);
      setError('Öneri gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 text-center">
        <p className="text-[var(--foreground)]/70 mb-4">
          Öneri göndermek için giriş yapmalısınız.
        </p>
        <button onClick={() => openAuthModal('login')} className="btn-primary">
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
        Hikayeyi Devam Ettir
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Hikaye nasıl devam etmeli? Kendi sahnenizi yazın..."
            className="input-field story-textarea min-h-[200px]"
            disabled={isSubmitting}
          />

          {/* Character Count */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {charCount < MIN_CHARS && (
                <span className="text-[var(--error)] text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  En az {MIN_CHARS - charCount} karakter daha yazın
                </span>
              )}
              {charCount > MAX_CHARS && (
                <span className="text-[var(--error)] text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {charCount - MAX_CHARS} karakter fazla
                </span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                isValidLength
                  ? 'text-[var(--success)]'
                  : charCount > MAX_CHARS
                  ? 'text-[var(--error)]'
                  : 'text-[var(--foreground)]/50'
              }`}
            >
              {charCount}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            ✅ Öneriniz başarıyla gönderildi!
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isValidLength}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Öneri Gönder
            </>
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--foreground)]/50">
          💡 <strong>İpucu:</strong> Mevcut hikayeyle tutarlı, yaratıcı ve ilgi çekici
          bir devam yazın. En çok oy alan öneri hikayeye eklenecek!
        </p>
      </div>
    </div>
  );
}
