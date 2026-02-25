'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Reply, 
  MoreVertical, 
  Flag, 
  Trash2, 
  Edit2,
  Send,
  Smile,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
  };
  created_at: string;
  updated_at?: string;
  likes_count: number;
  is_liked?: boolean;
  is_edited?: boolean;
  is_author?: boolean;
  replies?: Comment[];
  parent_id?: string;
}

interface CommentSystemProps {
  comments: Comment[];
  chapterId: string;
  currentUserId?: string;
  onAddComment?: (content: string, parentId?: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onEditComment?: (commentId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string, reason: string) => void;
}

// Demo comments
const demoComments: Comment[] = [
  {
    id: '1',
    content: 'Bu bölüm gerçekten muhteşemdi! Karakterlerin gelişimi çok iyi işlenmiş. Özellikle son sahne beni çok etkiledi.',
    author: {
      id: 'u1',
      username: 'kitap_kurdu',
      display_name: 'Ayşe Kitapkurdu',
    },
    created_at: '2024-01-20T14:30:00Z',
    likes_count: 24,
    is_liked: true,
    replies: [
      {
        id: '1-1',
        content: 'Kesinlikle katılıyorum! Son sahne çok güçlüydü.',
        author: {
          id: 'u2',
          username: 'yazar_mehmet',
          display_name: 'Mehmet',
        },
        created_at: '2024-01-20T15:00:00Z',
        likes_count: 8,
        parent_id: '1',
      },
      {
        id: '1-2',
        content: 'Ben de aynı şeyi düşündüm! Devamını sabırsızlıkla bekliyorum.',
        author: {
          id: 'u3',
          username: 'zeynep_r',
          display_name: 'Zeynep R.',
        },
        created_at: '2024-01-20T15:30:00Z',
        likes_count: 3,
        parent_id: '1',
      },
    ],
  },
  {
    id: '2',
    content: 'Harika bir yazım stili! Yazar gerçekten yetenekli. 🌟',
    author: {
      id: 'u4',
      username: 'ali_okuyucu',
      display_name: 'Ali',
    },
    created_at: '2024-01-20T12:00:00Z',
    likes_count: 15,
  },
  {
    id: '3',
    content: 'Biraz daha aksiyon olabilirdi bence ama genel olarak güzel bir bölüm.',
    author: {
      id: 'u5',
      username: 'selin_m',
      display_name: 'Selin M.',
    },
    created_at: '2024-01-19T18:00:00Z',
    likes_count: 5,
    is_edited: true,
    updated_at: '2024-01-19T19:00:00Z',
  },
];

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'az önce';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dk önce`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} gün önce`;
  return date.toLocaleDateString('tr-TR');
}

function CommentItem({ 
  comment, 
  onReply, 
  onLike, 
  onDelete, 
  onEdit, 
  onReport, 
  currentUserId,
  depth = 0 
}: { 
  comment: Comment; 
  onReply: (id: string) => void;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  onReport: (id: string, reason: string) => void;
  currentUserId?: string;
  depth?: number;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReportModal, setShowReportModal] = useState(false);

  const isOwner = currentUserId === comment.author.id;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleEdit = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-semibold overflow-hidden">
            {comment.author.avatar_url ? (
              <img src={comment.author.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              comment.author.display_name.charAt(0)
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.display_name}</span>
                <span className="text-sm text-gray-500">@{comment.author.username}</span>
                {comment.is_author && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium">
                    Yazar
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{timeAgo(comment.created_at)}</span>
                {comment.is_edited && (
                  <span className="text-xs">(düzenlendi)</span>
                )}

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      {isOwner && (
                        <>
                          <button
                            onClick={() => { setIsEditing(true); setShowMenu(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Düzenle
                          </button>
                          <button
                            onClick={() => { onDelete(comment.id); setShowMenu(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </>
                      )}
                      {!isOwner && (
                        <button
                          onClick={() => { setShowReportModal(true); setShowMenu(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-orange-500"
                        >
                          <Flag className="w-4 h-4" />
                          Bildir
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1.5 text-sm bg-[var(--primary)] text-white rounded-lg hover:opacity-90"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2 px-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                comment.is_liked 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.is_liked ? 'fill-current' : ''}`} />
              <span>{comment.likes_count}</span>
            </button>
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>Yanıtla</span>
            </button>
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors"
              >
                {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{comment.replies!.length} yanıt</span>
              </button>
            )}
          </div>

          {/* Replies */}
          {hasReplies && showReplies && (
            <div className="mt-4 space-y-4">
              {comment.replies!.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onReport={onReport}
                  currentUserId={currentUserId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowReportModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5 text-orange-500" />
              Yorumu Bildir
            </h3>
            <div className="space-y-2 mb-4">
              {['Spam', 'Hakaret', 'Spoiler', 'Uygunsuz İçerik', 'Diğer'].map(reason => (
                <button
                  key={reason}
                  onClick={() => {
                    onReport(comment.id, reason);
                    setShowReportModal(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-2 text-gray-500 hover:text-gray-700"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommentSystem({
  comments: initialComments = demoComments,
  chapterId,
  currentUserId = 'u1',
  onAddComment,
  onDeleteComment,
  onEditComment,
  onLikeComment,
  onReportComment,
}: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'popular':
        return b.likes_count - a.likes_count;
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const comment: Comment = {
      id: `new-${Date.now()}`,
      content: newComment,
      author: {
        id: currentUserId,
        username: 'kullanici',
        display_name: 'Kullanıcı',
      },
      created_at: new Date().toISOString(),
      likes_count: 0,
      parent_id: replyingTo || undefined,
    };

    if (replyingTo) {
      setComments(prev => prev.map(c => {
        if (c.id === replyingTo) {
          return { ...c, replies: [...(c.replies || []), comment] };
        }
        return c;
      }));
    } else {
      setComments(prev => [comment, ...prev]);
    }

    onAddComment?.(newComment, replyingTo || undefined);
    setNewComment('');
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const handleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          is_liked: !c.is_liked,
          likes_count: c.is_liked ? c.likes_count - 1 : c.likes_count + 1,
        };
      }
      if (c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === id) {
              return {
                ...r,
                is_liked: !r.is_liked,
                likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1,
              };
            }
            return r;
          }),
        };
      }
      return c;
    }));
    onLikeComment?.(id);
  };

  const handleDelete = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id).map(c => ({
      ...c,
      replies: c.replies?.filter(r => r.id !== id),
    })));
    onDeleteComment?.(id);
  };

  const handleEdit = (id: string, content: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, content, is_edited: true, updated_at: new Date().toISOString() };
      }
      if (c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === id) {
              return { ...r, content, is_edited: true, updated_at: new Date().toISOString() };
            }
            return r;
          }),
        };
      }
      return c;
    }));
    onEditComment?.(id, content);
  };

  const handleReport = (id: string, reason: string) => {
    onReportComment?.(id, reason);
    // Show success message
    alert('Yorum başarıyla bildirildi. İncelendikten sonra gerekli işlemler yapılacaktır.');
  };

  const replyingToComment = replyingTo ? comments.find(c => c.id === replyingTo) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Yorumlar
          <span className="text-sm font-normal text-gray-500">
            ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
          </span>
        </h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
        >
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
          <option value="popular">En Popüler</option>
        </select>
      </div>

      {/* Comment Input */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {replyingToComment && (
          <div className="flex items-center justify-between mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
            <span>
              <span className="text-gray-500">Yanıtlıyorsun:</span>{' '}
              <span className="font-medium">@{replyingToComment.author.username}</span>
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-semibold flex-shrink-0">
            K
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? 'Yanıtınızı yazın...' : 'Yorumunuzu yazın...'}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 resize-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim() || isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {replyingTo ? 'Yanıtla' : 'Yorum Yap'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={setReplyingTo}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onReport={handleReport}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Henüz yorum yok. İlk yorumu sen yap!</p>
          </div>
        )}
      </div>
    </div>
  );
}
