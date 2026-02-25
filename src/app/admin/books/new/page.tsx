'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  BookOpen,
  Image,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { GENRES } from '@/types/database';

export default function NewBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    total_chapters: 15,
    initial_prompt: '',
    cover_image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In real implementation, this would save to Supabase
    alert('Kitap başarıyla oluşturuldu!');
    router.push('/admin/books');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'total_chapters' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/books"
          className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Yeni Kitap Ekle</h1>
          <p className="text-[var(--foreground)]/60 mt-1">
            Yeni bir hikaye başlat
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--primary)]" />
            Temel Bilgiler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="input-label">Kitap Başlığı *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Örn: Yıldızların Ötesinde"
                className="input-field"
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label className="input-label">Tür *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Tür seçin...</option>
                {GENRES.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.icon} {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Chapters */}
            <div>
              <label className="input-label">Toplam Bölüm Sayısı *</label>
              <input
                type="number"
                name="total_chapters"
                value={formData.total_chapters}
                onChange={handleChange}
                min={5}
                max={50}
                className="input-field"
                required
              />
              <p className="text-xs text-[var(--foreground)]/50 mt-1">
                5-50 arası bölüm sayısı belirleyebilirsiniz
              </p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="input-label">Açıklama *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Kitabın kısa açıklaması..."
                rows={4}
                className="input-field story-textarea"
                required
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
            <Image className="w-5 h-5 text-[var(--primary)]" />
            Kapak Görseli (Opsiyonel)
          </h2>
          
          <div>
            <label className="input-label">Görsel URL</label>
            <input
              type="url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input-field"
            />
            <p className="text-xs text-[var(--foreground)]/50 mt-1">
              Boş bırakılırsa türe göre otomatik gradient kullanılacak
            </p>
          </div>

          {/* Preview */}
          {formData.cover_image_url && (
            <div className="mt-4">
              <p className="input-label">Önizleme</p>
              <img
                src={formData.cover_image_url}
                alt="Cover preview"
                className="w-48 h-64 object-cover rounded-xl border-2 border-[var(--border)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Initial Prompt */}
        <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            Hikaye Başlangıcı *
          </h2>
          
          <div>
            <label className="input-label">İlk Bölüm İçeriği</label>
            <textarea
              name="initial_prompt"
              value={formData.initial_prompt}
              onChange={handleChange}
              placeholder="Hikayenin giriş bölümünü yazın. Bu, ilk bölümün içeriği olacak ve topluluk buradan devam edecek..."
              rows={8}
              className="input-field story-textarea"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-[var(--foreground)]/50">
                İyi bir başlangıç, topluluğun ilgisini çeker
              </p>
              <span className={`text-xs ${
                formData.initial_prompt.length < 200 ? 'text-[var(--error)]' : 'text-[var(--success)]'
              }`}>
                {formData.initial_prompt.length} karakter
              </span>
            </div>
          </div>

          {/* AI Generate Button (placeholder) */}
          <div className="mt-4 p-4 bg-[var(--muted)] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--foreground)]">AI ile Başlangıç Oluştur</p>
                <p className="text-sm text-[var(--foreground)]/60">
                  Tür ve açıklamaya göre etkileyici bir başlangıç üret
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary text-sm py-2 px-4"
                disabled
              >
                Yakında
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/admin/books" className="btn-secondary">
            İptal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="spinner spinner-sm" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Kitabı Oluştur
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
