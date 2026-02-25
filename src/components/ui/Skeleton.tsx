'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'image';
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    image: 'h-32 w-full',
  };

  return (
    <div
      className={`skeleton ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function BookCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
      <Skeleton variant="image" className="h-48" />
      <div className="p-5 space-y-3">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="text" className="w-20" />
        </div>
      </div>
    </div>
  );
}

export function SubmissionCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-5">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton variant="avatar" className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-16" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[var(--card)] rounded-2xl p-8 border-2 border-[var(--border)]">
        <div className="flex items-center gap-6">
          <Skeleton variant="avatar" className="w-24 h-24" />
          <div className="flex-1 space-y-3">
            <Skeleton variant="title" className="w-48" />
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="text" className="w-64" />
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[var(--card)] rounded-xl p-4 border-2 border-[var(--border)]">
            <Skeleton variant="text" className="w-16 h-8 mb-2" />
            <Skeleton variant="text" className="w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton variant="text" className={i === 0 ? 'w-32' : 'w-20'} />
        </td>
      ))}
    </tr>
  );
}
