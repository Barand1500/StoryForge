import { create } from 'zustand';
import { User, Book, Chapter, Submission } from '@/types/database';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface BookState {
  books: Book[];
  currentBook: Book | null;
  currentChapter: Chapter | null;
  submissions: Submission[];
  setBooks: (books: Book[]) => void;
  setCurrentBook: (book: Book | null) => void;
  setCurrentChapter: (chapter: Chapter | null) => void;
  setSubmissions: (submissions: Submission[]) => void;
  addSubmission: (submission: Submission) => void;
  updateSubmissionVotes: (submissionId: string, newCount: number) => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  currentBook: null,
  currentChapter: null,
  submissions: [],
  setBooks: (books) => set({ books }),
  setCurrentBook: (currentBook) => set({ currentBook }),
  setCurrentChapter: (currentChapter) => set({ currentChapter }),
  setSubmissions: (submissions) => set({ submissions }),
  addSubmission: (submission) => 
    set((state) => ({ submissions: [...state.submissions, submission] })),
  updateSubmissionVotes: (submissionId, newCount) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === submissionId ? { ...s, vote_count: newCount } : s
      ),
    })),
}));

interface UIState {
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAuthModalOpen: false,
  authModalMode: 'login',
  openAuthModal: (mode) => set({ isAuthModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
