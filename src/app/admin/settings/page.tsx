'use client';

import { useState } from 'react';
import {
  Save,
  Clock,
  Vote,
  PenTool,
  Bell,
  Shield,
  Palette,
  DollarSign,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Yazma ayarları
    writingPeriodDays: 2,
    minCharacters: 300,
    maxCharacters: 400,
    maxSubmissionsPerUser: 3,
    
    // Oylama ayarları
    votingPeriodHours: 2,
    maxVotesPerUser: 5,
    canVoteOwnSubmission: false,
    finalistCount: 5,
    
    // Bildirim ayarları
    emailOnVotingStart: true,
    emailOnWin: true,
    emailOnNewChapter: true,
    
    // Gelir ayarları
    winnerSharePercent: 70,
    platformSharePercent: 30,
    minWithdrawalAmount: 50,
  });

  const handleSave = () => {
    alert('Ayarlar kaydedildi!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Platform Ayarları</h1>
        <p className="text-[var(--foreground)]/60 mt-1">
          StoryForge genel ayarlarını yapılandırın
        </p>
      </div>

      {/* Writing Settings */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-[var(--primary)]" />
          Yazma Ayarları
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="input-label">Yazma Süresi (Gün)</label>
            <input
              type="number"
              value={settings.writingPeriodDays}
              onChange={(e) => setSettings({ ...settings, writingPeriodDays: parseInt(e.target.value) })}
              min={1}
              max={7}
              className="input-field"
            />
            <p className="text-xs text-[var(--foreground)]/50 mt-1">
              Her bölüm için öneri gönderme süresi
            </p>
          </div>
          
          <div>
            <label className="input-label">Kullanıcı Başına Max Öneri</label>
            <input
              type="number"
              value={settings.maxSubmissionsPerUser}
              onChange={(e) => setSettings({ ...settings, maxSubmissionsPerUser: parseInt(e.target.value) })}
              min={1}
              max={10}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="input-label">Minimum Karakter</label>
            <input
              type="number"
              value={settings.minCharacters}
              onChange={(e) => setSettings({ ...settings, minCharacters: parseInt(e.target.value) })}
              min={100}
              max={500}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="input-label">Maksimum Karakter</label>
            <input
              type="number"
              value={settings.maxCharacters}
              onChange={(e) => setSettings({ ...settings, maxCharacters: parseInt(e.target.value) })}
              min={200}
              max={1000}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Voting Settings */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
          <Vote className="w-5 h-5 text-[var(--primary)]" />
          Oylama Ayarları
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="input-label">Oylama Süresi (Saat)</label>
            <input
              type="number"
              value={settings.votingPeriodHours}
              onChange={(e) => setSettings({ ...settings, votingPeriodHours: parseInt(e.target.value) })}
              min={1}
              max={24}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="input-label">Kullanıcı Başına Max Oy</label>
            <input
              type="number"
              value={settings.maxVotesPerUser}
              onChange={(e) => setSettings({ ...settings, maxVotesPerUser: parseInt(e.target.value) })}
              min={1}
              max={20}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="input-label">Finalist Sayısı</label>
            <input
              type="number"
              value={settings.finalistCount}
              onChange={(e) => setSettings({ ...settings, finalistCount: parseInt(e.target.value) })}
              min={3}
              max={10}
              className="input-field"
            />
            <p className="text-xs text-[var(--foreground)]/50 mt-1">
              Final turuna kalacak öneri sayısı
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-xl">
            <div>
              <p className="font-medium text-[var(--foreground)]">Kendi Önerisine Oy</p>
              <p className="text-sm text-[var(--foreground)]/60">
                Kullanıcılar kendi önerilerine oy verebilir mi?
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, canVoteOwnSubmission: !settings.canVoteOwnSubmission })}
              className={`w-14 h-8 rounded-full transition-colors ${
                settings.canVoteOwnSubmission ? 'bg-[var(--success)]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                settings.canVoteOwnSubmission ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[var(--primary)]" />
          Bildirim Ayarları
        </h2>
        
        <div className="space-y-4">
          {[
            { key: 'emailOnVotingStart', label: 'Oylama Başlangıcı', desc: 'Oylama başladığında e-posta gönder' },
            { key: 'emailOnWin', label: 'Kazanma Bildirimi', desc: 'Öneri kazandığında e-posta gönder' },
            { key: 'emailOnNewChapter', label: 'Yeni Bölüm', desc: 'Yeni bölüm yayınlandığında e-posta gönder' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-xl">
              <div>
                <p className="font-medium text-[var(--foreground)]">{item.label}</p>
                <p className="text-sm text-[var(--foreground)]/60">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings] ? 'bg-[var(--success)]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  settings[item.key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Settings */}
      <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[var(--primary)]" />
          Gelir Ayarları
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="input-label">Yazar Payı (%)</label>
            <input
              type="number"
              value={settings.winnerSharePercent}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setSettings({ 
                  ...settings, 
                  winnerSharePercent: val,
                  platformSharePercent: 100 - val
                });
              }}
              min={50}
              max={90}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="input-label">Platform Payı (%)</label>
            <input
              type="number"
              value={settings.platformSharePercent}
              disabled
              className="input-field bg-[var(--muted)]"
            />
          </div>
          
          <div>
            <label className="input-label">Min. Çekim (TL)</label>
            <input
              type="number"
              value={settings.minWithdrawalAmount}
              onChange={(e) => setSettings({ ...settings, minWithdrawalAmount: parseInt(e.target.value) })}
              min={10}
              max={500}
              className="input-field"
            />
          </div>
        </div>
        
        {/* Revenue Distribution Preview */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl">
          <p className="text-sm font-medium text-[var(--foreground)] mb-3">Gelir Dağılımı Önizleme</p>
          <div className="flex h-4 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
              style={{ width: `${settings.winnerSharePercent}%` }}
            />
            <div 
              className="bg-gray-300"
              style={{ width: `${settings.platformSharePercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[var(--foreground)]/60">
            <span>Yazar: %{settings.winnerSharePercent}</span>
            <span>Platform: %{settings.platformSharePercent}</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-5 h-5" />
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );
}
