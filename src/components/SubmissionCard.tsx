'use client';

import { useState } from 'react';
import { ThumbsUp, User, Trophy, Medal } from 'lucide-react';
import { Submission } from '@/types/database';
import { useAuthStore, useUIStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import { formatRelativeTime, getInitials } from '@/lib/utils';

interface SubmissionCardProps {
  submission: Submission;
  rank?: number;
  isVotingPhase?: boolean;
  hasVoted?: boolean;
  onVote?: () => void;
}

export default function SubmissionCard({
  submission,
  rank,
  isVotingPhase = false,
  hasVoted = false,
  onVote,
}: SubmissionCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(hasVoted);
  const [voteCount, setVoteCount] = useState(submission.vote_count);
  const { user } = useAuthStore();
  const { openAuthModal } = useUIStore();

  const isOwnSubmission = user?.id === submission.user_id;

  const handleVote = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    if (isOwnSubmission) {
      alert('Kendi önerinize oy veremezsiniz!');
      return;
    }

    if (voted) return;

    setIsVoting(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.from('votes').insert({
        submission_id: submission.id,
        user_id: user.id,
      });

      if (error) throw error;

      setVoted(true);
      setVoteCount((prev) => prev + 1);
      onVote?.();
    } catch (err) {
      console.error('Oy verme hatası:', err);
      alert('Oy verirken bir hata oluştu');
    } finally {
      setIsVoting(false);
    }
  };

  const getRankIcon = () => {
    if (!rank) return null;
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getStatusBadge = () => {
    switch (submission.status) {
      case 'winner':
        return (
          <span className="badge badge-gold">
            <Trophy className="w-3 h-3" /> Kazanan
          </span>
        );
      case 'finalist':
        return (
          <span className="badge badge-silver">
            <Medal className="w-3 h-3" /> Finalist
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article
      className={`bg-[var(--card)] rounded-xl border-2 ${
        submission.status === 'winner'
          ? 'border-yellow-400'
          : submission.status === 'finalist'
          ? 'border-[var(--primary)]'
          : 'border-[var(--border)]'
      } p-5 transition-all hover:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {rank && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--muted)] font-bold text-[var(--primary)]">
              {getRankIcon() || `#${rank}`}
            </div>
          )}
          <div className="flex items-center gap-2">
            {submission.user?.avatar_url ? (
              <img
                src={submission.user.avatar_url}
                alt={submission.user.display_name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-medium">
                {getInitials(submission.user?.display_name || 'Anonim')}
              </div>
            )}
            <div>
              <p className="font-medium text-[var(--foreground)]">
                {submission.user?.display_name || 'Anonim'}
              </p>
              <p className="text-xs text-[var(--foreground)]/50">
                {formatRelativeTime(submission.created_at)}
              </p>
            </div>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-[var(--foreground)] leading-relaxed story-textarea whitespace-pre-wrap">
          {submission.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-[var(--foreground)]/50">
          <ThumbsUp className="w-4 h-4" />
          <span className="font-medium">{voteCount} oy</span>
        </div>

        {isVotingPhase && !isOwnSubmission && (
          <button
            onClick={handleVote}
            disabled={voted || isVoting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              voted
                ? 'bg-[var(--success)] text-white cursor-default'
                : 'bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${voted ? 'fill-current' : ''}`} />
            {isVoting ? 'Yükleniyor...' : voted ? 'Oy verildi' : 'Oy ver'}
          </button>
        )}

        {isOwnSubmission && (
          <span className="text-sm text-[var(--foreground)]/50 italic">
            Sizin öneriniz
          </span>
        )}
      </div>
    </article>
  );
}
