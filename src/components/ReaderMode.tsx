'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck,
  Sun,
  Moon,
  Type,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Minus,
  Plus,
  Maximize,
  Minimize,
  List
} from 'lucide-react';

interface Chapter {
  id: string;
  chapter_number: number;
  content: string;
  author?: {
    username: string;
    display_name: string;
  };
}

interface ReaderModeProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  chapters: Chapter[];
  initialChapter?: number;
}

type Theme = 'light' | 'sepia' | 'dark';
type TextAlign = 'left' | 'center' | 'justify';

const themes = {
  light: { bg: '#ffffff', text: '#1a1a1a', name: 'Açık' },
  sepia: { bg: '#f4ecd8', text: '#5c4b37', name: 'Sepya' },
  dark: { bg: '#1a1a1a', text: '#e0e0e0', name: 'Koyu' },
};

export default function ReaderMode({ 
  isOpen, 
  onClose, 
  bookTitle, 
  chapters, 
  initialChapter = 1 
}: ReaderModeProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Reader settings
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [textAlign, setTextAlign] = useState<TextAlign>('left');
  const [fontFamily, setFontFamily] = useState('Georgia');

  const chapter = chapters.find(c => c.chapter_number === currentChapter);
  const hasPrev = currentChapter > 1;
  const hasNext = currentChapter < chapters.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (hasPrev) setCurrentChapter(prev => prev - 1);
          break;
        case 'ArrowRight':
          if (hasNext) setCurrentChapter(prev => prev + 1);
          break;
        case 'Escape':
          if (showSettings) setShowSettings(false);
          else if (showChapterList) setShowChapterList(false);
          else if (isFullscreen) toggleFullscreen();
          else onClose();
          break;
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrev, hasNext, showSettings, showChapterList, isFullscreen, onClose]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Save reading progress
  useEffect(() => {
    if (isOpen && chapter) {
      localStorage.setItem(`reading-progress-${bookTitle}`, String(currentChapter));
    }
  }, [isOpen, currentChapter, bookTitle, chapter]);

  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('reader-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'light');
      setFontSize(settings.fontSize || 18);
      setLineHeight(settings.lineHeight || 1.8);
      setTextAlign(settings.textAlign || 'left');
      setFontFamily(settings.fontFamily || 'Georgia');
    }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('reader-settings', JSON.stringify({
      theme, fontSize, lineHeight, textAlign, fontFamily
    }));
  }, [theme, fontSize, lineHeight, textAlign, fontFamily]);

  if (!isOpen) return null;

  const currentTheme = themes[theme];

  return (
    <div 
      className="fixed inset-0 z-[100] transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-10 px-4 py-3 flex items-center justify-between transition-colors duration-300"
        style={{ 
          backgroundColor: currentTheme.bg,
          borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            style={{ color: currentTheme.text }}
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h1 
              className="font-semibold text-sm md:text-base truncate max-w-[200px] md:max-w-none"
              style={{ color: currentTheme.text }}
            >
              {bookTitle}
            </h1>
            <p className="text-xs opacity-60" style={{ color: currentTheme.text }}>
              Bölüm {currentChapter} / {chapters.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            style={{ color: isBookmarked ? '#f59e0b' : currentTheme.text }}
            title="Yer İmi"
          >
            {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            style={{ color: currentTheme.text }}
            title="Bölüm Listesi"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors hidden md:block"
            style={{ color: currentTheme.text }}
            title="Tam Ekran"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            style={{ color: currentTheme.text }}
            title="Ayarlar"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div 
          className="fixed top-16 right-4 w-80 rounded-xl shadow-2xl z-20 p-4 animate-in slide-in-from-top-2"
          style={{ 
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
            border: `1px solid ${theme === 'dark' ? '#444' : '#e0e0e0'}`
          }}
        >
          <h3 className="font-semibold mb-4" style={{ color: currentTheme.text }}>
            Okuma Ayarları
          </h3>

          {/* Theme */}
          <div className="mb-4">
            <label className="text-sm opacity-70 mb-2 block" style={{ color: currentTheme.text }}>
              Tema
            </label>
            <div className="flex gap-2">
              {(Object.keys(themes) as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    theme === t ? 'ring-2 ring-[var(--primary)]' : ''
                  }`}
                  style={{ 
                    backgroundColor: themes[t].bg, 
                    color: themes[t].text,
                    border: `1px solid ${t === 'dark' ? '#444' : '#e0e0e0'}`
                  }}
                >
                  {themes[t].name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="mb-4">
            <label className="text-sm opacity-70 mb-2 block" style={{ color: currentTheme.text }}>
              Yazı Boyutu: {fontSize}px
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="p-2 rounded-lg hover:bg-black/10"
                style={{ color: currentTheme.text }}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="12"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                className="p-2 rounded-lg hover:bg-black/10"
                style={{ color: currentTheme.text }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Line Height */}
          <div className="mb-4">
            <label className="text-sm opacity-70 mb-2 block" style={{ color: currentTheme.text }}>
              Satır Aralığı: {lineHeight.toFixed(1)}
            </label>
            <input
              type="range"
              min="1.2"
              max="2.5"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Text Align */}
          <div className="mb-4">
            <label className="text-sm opacity-70 mb-2 block" style={{ color: currentTheme.text }}>
              Metin Hizalama
            </label>
            <div className="flex gap-2">
              {[
                { value: 'left', icon: AlignLeft },
                { value: 'center', icon: AlignCenter },
                { value: 'justify', icon: AlignJustify },
              ].map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTextAlign(value as TextAlign)}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${
                    textAlign === value ? 'bg-[var(--primary)] text-white' : 'hover:bg-black/10'
                  }`}
                  style={{ color: textAlign === value ? '#fff' : currentTheme.text }}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="text-sm opacity-70 mb-2 block" style={{ color: currentTheme.text }}>
              Yazı Tipi
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 rounded-lg"
              style={{ 
                backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
                color: currentTheme.text,
                border: 'none'
              }}
            >
              <option value="Georgia">Georgia (Serif)</option>
              <option value="system-ui">System UI (Sans)</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      )}

      {/* Chapter List */}
      {showChapterList && (
        <div 
          className="fixed top-16 right-4 w-72 max-h-[70vh] rounded-xl shadow-2xl z-20 overflow-hidden animate-in slide-in-from-top-2"
          style={{ 
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
            border: `1px solid ${theme === 'dark' ? '#444' : '#e0e0e0'}`
          }}
        >
          <div className="p-3 border-b" style={{ borderColor: theme === 'dark' ? '#444' : '#e0e0e0' }}>
            <h3 className="font-semibold" style={{ color: currentTheme.text }}>
              Bölümler
            </h3>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-50px)]">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setCurrentChapter(ch.chapter_number);
                  setShowChapterList(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-black/5 transition-colors ${
                  currentChapter === ch.chapter_number ? 'bg-[var(--primary)]/10' : ''
                }`}
                style={{ color: currentTheme.text }}
              >
                <span className="font-medium">Bölüm {ch.chapter_number}</span>
                {ch.author && (
                  <span className="text-sm opacity-60 ml-2">
                    by @{ch.author.username}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <main 
        className="pt-20 pb-24 px-4 md:px-8 max-w-3xl mx-auto"
        onClick={() => {
          if (showSettings) setShowSettings(false);
          if (showChapterList) setShowChapterList(false);
        }}
      >
        {chapter && (
          <>
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: currentTheme.text }}
            >
              Bölüm {chapter.chapter_number}
            </h2>
            {chapter.author && (
              <p className="text-sm opacity-60 mb-8" style={{ color: currentTheme.text }}>
                Yazan: {chapter.author.display_name} (@{chapter.author.username})
              </p>
            )}
            <div
              className="whitespace-pre-wrap"
              style={{
                color: currentTheme.text,
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                textAlign: textAlign,
                fontFamily: fontFamily,
              }}
            >
              {chapter.content}
            </div>
          </>
        )}
      </main>

      {/* Navigation */}
      <footer 
        className="fixed bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between transition-colors duration-300"
        style={{ 
          backgroundColor: currentTheme.bg,
          borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`
        }}
      >
        <button
          onClick={() => hasPrev && setCurrentChapter(prev => prev - 1)}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            hasPrev ? 'hover:bg-black/10' : 'opacity-30 cursor-not-allowed'
          }`}
          style={{ color: currentTheme.text }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Önceki</span>
        </button>

        <div className="flex items-center gap-1">
          {chapters.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentChapter(i + 1)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentChapter === i + 1 
                  ? 'w-6 bg-[var(--primary)]' 
                  : 'bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => hasNext && setCurrentChapter(prev => prev + 1)}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            hasNext ? 'hover:bg-black/10' : 'opacity-30 cursor-not-allowed'
          }`}
          style={{ color: currentTheme.text }}
        >
          <span className="hidden sm:inline">Sonraki</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
