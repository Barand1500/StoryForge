'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { calculateTimeRemaining, formatTimeRemaining } from '@/lib/utils';
import { TimeRemaining } from '@/types/database';

interface CountdownTimerProps {
  endDate: string;
  label?: string;
  onExpire?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({
  endDate,
  label = 'Kalan Süre',
  onExpire,
  size = 'md',
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(endDate);
      setTimeRemaining(remaining);

      if (remaining.isExpired && onExpire) {
        onExpire();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, onExpire]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const boxSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  if (timeRemaining.isExpired) {
    return (
      <div className={`flex items-center gap-2 text-[var(--error)] ${sizeClasses[size]}`}>
        <Clock className="w-5 h-5" />
        <span className="font-semibold">Süre doldu!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-[var(--foreground)]/70 text-sm">{label}</span>
      )}
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-[var(--primary)]" />
        <div className="flex gap-2">
          {timeRemaining.days > 0 && (
            <div
              className={`${boxSizeClasses[size]} bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg flex flex-col items-center justify-center text-white`}
            >
              <span className={`font-bold ${sizeClasses[size]} countdown`}>
                {timeRemaining.days}
              </span>
              <span className="text-xs opacity-80">gün</span>
            </div>
          )}
          <div
            className={`${boxSizeClasses[size]} bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg flex flex-col items-center justify-center text-white`}
          >
            <span className={`font-bold ${sizeClasses[size]} countdown`}>
              {String(timeRemaining.hours).padStart(2, '0')}
            </span>
            <span className="text-xs opacity-80">saat</span>
          </div>
          <div
            className={`${boxSizeClasses[size]} bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg flex flex-col items-center justify-center text-white`}
          >
            <span className={`font-bold ${sizeClasses[size]} countdown`}>
              {String(timeRemaining.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs opacity-80">dk</span>
          </div>
          {timeRemaining.days === 0 && (
            <div
              className={`${boxSizeClasses[size]} bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-lg flex flex-col items-center justify-center text-white`}
            >
              <span className={`font-bold ${sizeClasses[size]} countdown`}>
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs opacity-80">sn</span>
            </div>
          )}
        </div>
      </div>
      <span className={`text-[var(--foreground)]/50 ${sizeClasses[size]}`}>
        {formatTimeRemaining(timeRemaining)}
      </span>
    </div>
  );
}
