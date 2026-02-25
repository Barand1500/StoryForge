'use client';

import { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Eye,
  Shield,
  Trash2,
  Save,
  Camera,
  Mail,
  AtSign,
  Edit3,
  Check
} from 'lucide-react';

interface UserSettings {
  // Profile
  displayName: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  website: string;
  twitter: string;
  // Privacy
  profileVisibility: 'public' | 'followers' | 'private';
  showEmail: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyNewFollower: boolean;
  notifyNewComment: boolean;
  notifyNewLike: boolean;
  notifyNewChapter: boolean;
  weeklyDigest: boolean;
  // Reading
  defaultTheme: 'light' | 'sepia' | 'dark';
  fontSize: number;
  autoBookmark: boolean;
}

const defaultSettings: UserSettings = {
  displayName: 'Kullanıcı',
  username: 'kullanici',
  email: 'kullanici@email.com',
  bio: '',
  avatarUrl: '',
  website: '',
  twitter: '',
  profileVisibility: 'public',
  showEmail: false,
  showActivity: true,
  allowMessages: true,
  emailNotifications: true,
  pushNotifications: true,
  notifyNewFollower: true,
  notifyNewComment: true,
  notifyNewLike: true,
  notifyNewChapter: true,
  weeklyDigest: false,
  defaultTheme: 'light',
  fontSize: 18,
  autoBookmark: true,
};

type Tab = 'profile' | 'privacy' | 'notifications' | 'reading' | 'account';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const tabs = [
    { id: 'profile' as Tab, label: 'Profil', icon: User },
    { id: 'privacy' as Tab, label: 'Gizlilik', icon: Eye },
    { id: 'notifications' as Tab, label: 'Bildirimler', icon: Bell },
    { id: 'reading' as Tab, label: 'Okuma', icon: Palette },
    { id: 'account' as Tab, label: 'Hesap', icon: Shield },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ayarlar</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hesap ve uygulama tercihlerinizi yönetin
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 lg:sticky lg:top-24">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === id 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profil Bilgileri
                  </h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                        {settings.avatarUrl ? (
                          <img src={settings.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          settings.displayName.charAt(0).toUpperCase()
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium">Profil Fotoğrafı</p>
                      <p className="text-sm text-gray-500 mb-2">JPG, PNG veya GIF. Max 2MB.</p>
                      <button className="text-sm text-[var(--primary)] hover:underline">
                        Fotoğraf Yükle
                      </button>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Görünen Ad
                    </label>
                    <div className="relative">
                      <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.displayName}
                        onChange={(e) => updateSetting('displayName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kullanıcı Adı
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.username}
                        onChange={(e) => updateSetting('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      storyforge.com/@{settings.username}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      E-posta
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Biyografi
                    </label>
                    <textarea
                      value={settings.bio}
                      onChange={(e) => updateSetting('bio', e.target.value)}
                      placeholder="Kendinizden bahsedin..."
                      rows={4}
                      maxLength={300}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-1 text-right">
                      {settings.bio.length}/300
                    </p>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Web Sitesi
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={settings.website}
                        onChange={(e) => updateSetting('website', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Gizlilik Ayarları
                  </h2>

                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Profil Görünürlüğü
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Herkese Açık', desc: 'Herkes profilinizi görebilir' },
                        { value: 'followers', label: 'Sadece Takipçiler', desc: 'Sadece takipçileriniz görebilir' },
                        { value: 'private', label: 'Gizli', desc: 'Sadece siz görebilirsiniz' },
                      ].map(opt => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                            settings.profileVisibility === opt.value
                              ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="visibility"
                            value={opt.value}
                            checked={settings.profileVisibility === opt.value}
                            onChange={(e) => updateSetting('profileVisibility', e.target.value as UserSettings['profileVisibility'])}
                            className="w-4 h-4 text-[var(--primary)]"
                          />
                          <div>
                            <span className="font-medium">{opt.label}</span>
                            <p className="text-sm text-gray-500">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Options */}
                  <div className="space-y-4">
                    {[
                      { key: 'showEmail' as const, label: 'E-posta Görünür', desc: 'E-posta adresiniz profilinizde gösterilsin' },
                      { key: 'showActivity' as const, label: 'Aktivite Görünür', desc: 'Okuma ve yazma aktiviteniz görünsün' },
                      { key: 'allowMessages' as const, label: 'Mesaj İzni', desc: 'Diğer kullanıcılar size mesaj gönderebilsin' },
                    ].map(opt => (
                      <div key={opt.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <span className="font-medium">{opt.label}</span>
                          <p className="text-sm text-gray-500">{opt.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[opt.key]}
                            onChange={(e) => updateSetting(opt.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Bildirim Tercihleri
                  </h2>

                  {/* General */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-600 dark:text-gray-400">Genel</h3>
                    {[
                      { key: 'emailNotifications' as const, label: 'E-posta Bildirimleri', desc: 'Önemli güncellemeleri e-posta ile alın' },
                      { key: 'pushNotifications' as const, label: 'Push Bildirimleri', desc: 'Tarayıcı bildirimleri alın' },
                      { key: 'weeklyDigest' as const, label: 'Haftalık Özet', desc: 'Haftalık aktivite özetini e-posta ile alın' },
                    ].map(opt => (
                      <div key={opt.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <span className="font-medium">{opt.label}</span>
                          <p className="text-sm text-gray-500">{opt.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[opt.key]}
                            onChange={(e) => updateSetting(opt.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Activity */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-600 dark:text-gray-400">Aktivite Bildirimleri</h3>
                    {[
                      { key: 'notifyNewFollower' as const, label: 'Yeni Takipçi', desc: 'Birisi sizi takip ettiğinde' },
                      { key: 'notifyNewComment' as const, label: 'Yeni Yorum', desc: 'Bölümlerinize yorum yapıldığında' },
                      { key: 'notifyNewLike' as const, label: 'Yeni Beğeni', desc: 'Çalışmanız beğenildiğinde' },
                      { key: 'notifyNewChapter' as const, label: 'Yeni Bölüm', desc: 'Takip ettiğiniz kitaplara yeni bölüm eklendiğinde' },
                    ].map(opt => (
                      <div key={opt.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <span className="font-medium">{opt.label}</span>
                          <p className="text-sm text-gray-500">{opt.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[opt.key]}
                            onChange={(e) => updateSetting(opt.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Tab */}
              {activeTab === 'reading' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Okuma Tercihleri
                  </h2>

                  {/* Default Theme */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Varsayılan Okuma Teması
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: 'light', label: 'Açık', bg: '#ffffff', text: '#1a1a1a' },
                        { value: 'sepia', label: 'Sepya', bg: '#f4ecd8', text: '#5c4b37' },
                        { value: 'dark', label: 'Koyu', bg: '#1a1a1a', text: '#e0e0e0' },
                      ].map(theme => (
                        <button
                          key={theme.value}
                          onClick={() => updateSetting('defaultTheme', theme.value as UserSettings['defaultTheme'])}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                            settings.defaultTheme === theme.value
                              ? 'border-[var(--primary)] ring-4 ring-[var(--primary)]/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                          style={{ backgroundColor: theme.bg }}
                        >
                          <p className="font-medium" style={{ color: theme.text }}>{theme.label}</p>
                          <p className="text-sm opacity-70" style={{ color: theme.text }}>Aa Bb</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Varsayılan Yazı Boyutu: {settings.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="28"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Küçük</span>
                      <span>Büyük</span>
                    </div>
                  </div>

                  {/* Auto Bookmark */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium">Otomatik Yer İmi</span>
                      <p className="text-sm text-gray-500">Okuma ilerlemenizi otomatik kaydet</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoBookmark}
                        onChange={(e) => updateSetting('autoBookmark', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Hesap Güvenliği
                  </h2>

                  {/* Change Password */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Şifre Değiştir
                        </h3>
                        <p className="text-sm text-gray-500">Son değişiklik: 30 gün önce</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                        Değiştir
                      </button>
                    </div>
                  </div>

                  {/* Two Factor */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">İki Faktörlü Doğrulama</h3>
                        <p className="text-sm text-gray-500">Hesabınıza ekstra güvenlik katmanı ekleyin</p>
                      </div>
                      <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                        Etkinleştir
                      </button>
                    </div>
                  </div>

                  {/* Connected Accounts */}
                  <div>
                    <h3 className="font-medium mb-3">Bağlı Hesaplar</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-sm text-green-600">Bağlı</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-500 hover:underline">
                          Bağlantıyı Kes
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            G
                          </div>
                          <div>
                            <p className="font-medium">Google</p>
                            <p className="text-sm text-gray-500">Bağlı değil</p>
                          </div>
                        </div>
                        <button className="text-sm text-[var(--primary)] hover:underline">
                          Bağla
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                    <h3 className="font-medium text-red-600 mb-4">Tehlikeli Bölge</h3>
                    <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Hesabı Sil
                          </h4>
                          <p className="text-sm text-red-600 dark:text-red-400/80">
                            Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                          Hesabı Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-4">
                {showSaved && (
                  <span className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    Kaydedildi!
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
