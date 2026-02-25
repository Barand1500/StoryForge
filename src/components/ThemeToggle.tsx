'use client';

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const options = [
    { value: 'light' as const, label: 'Açık', icon: Sun },
    { value: 'dark' as const, label: 'Koyu', icon: Moon },
    { value: 'system' as const, label: 'Sistem', icon: Monitor },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
        aria-label="Tema Değiştir"
      >
        {getIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[var(--muted)] transition-colors ${
                  theme === option.value
                    ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                    : 'text-[var(--foreground)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
