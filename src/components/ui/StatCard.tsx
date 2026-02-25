'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'gradient';
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  variant = 'default',
}: StatCardProps) {
  const variants = {
    default: 'bg-[var(--card)] border-[var(--border)]',
    primary: 'bg-[var(--muted)] border-[var(--primary)]',
    gradient: 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border-transparent text-white',
  };

  const iconBg = {
    default: 'bg-[var(--muted)]',
    primary: 'bg-[var(--primary)]/10',
    gradient: 'bg-white/20',
  };

  const iconColor = {
    default: 'text-[var(--primary)]',
    primary: 'text-[var(--primary)]',
    gradient: 'text-white',
  };

  return (
    <div className={`stat-card ${variants[variant]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconBg[variant]}`}>
          <Icon className={`w-6 h-6 ${iconColor[variant]}`} />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium px-2 py-1 rounded-lg ${
              trend.isPositive
                ? 'bg-[var(--success)]/10 text-[var(--success)]'
                : 'bg-[var(--error)]/10 text-[var(--error)]'
            }`}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className={variant === 'gradient' ? 'text-white' : ''}>
        <div className={variant === 'gradient' ? 'text-3xl font-bold' : 'stat-value'}>
          {value}
        </div>
        <div className={`text-sm mt-1 ${variant === 'gradient' ? 'text-white/80' : 'text-[var(--foreground)]/60'}`}>
          {label}
        </div>
      </div>
    </div>
  );
}
