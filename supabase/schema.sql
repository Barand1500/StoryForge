-- StoryForge Veritabanı Şeması
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- Enum tipleri
CREATE TYPE genre_type AS ENUM ('science_fiction', 'fantasy', 'horror', 'romance', 'mystery');
CREATE TYPE book_status AS ENUM ('active', 'voting', 'completed');
CREATE TYPE chapter_status AS ENUM ('writing', 'voting', 'completed');
CREATE TYPE submission_status AS ENUM ('pending', 'finalist', 'winner', 'rejected');
CREATE TYPE badge_requirement AS ENUM ('first_submission', 'finalist', 'winner', 'triple_winner', 'multi_book');

-- Kullanıcı profilleri (Supabase Auth ile entegre)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  total_wins INTEGER DEFAULT 0,
  total_finalists INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  total_votes_received INTEGER DEFAULT 0,
  earnings DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rozetler
CREATE TABLE badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement_type badge_requirement NOT NULL,
  requirement_value INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kullanıcı rozetleri
CREATE TABLE user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Kitaplar
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image_url TEXT,
  genre genre_type NOT NULL,
  status book_status DEFAULT 'active',
  current_chapter INTEGER DEFAULT 1,
  total_chapters INTEGER DEFAULT 15,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bölümler
CREATE TABLE chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Başlangıç metni veya kazanan metin
  status chapter_status DEFAULT 'writing',
  writing_start TIMESTAMPTZ NOT NULL,
  writing_end TIMESTAMPTZ NOT NULL,
  voting_start TIMESTAMPTZ,
  voting_end TIMESTAMPTZ,
  winner_submission_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, chapter_number)
);

-- Öneriler
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) >= 300 AND char_length(content) <= 400),
  status submission_status DEFAULT 'pending',
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign key for winner_submission_id
ALTER TABLE chapters 
ADD CONSTRAINT fk_winner_submission 
FOREIGN KEY (winner_submission_id) REFERENCES submissions(id);

-- Oylar
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(submission_id, user_id) -- Aynı öneriye birden fazla oy verilemez
);

-- Kullanıcının kendi önerisine oy vermesini engelleyen constraint
CREATE OR REPLACE FUNCTION check_self_vote()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM submissions 
    WHERE id = NEW.submission_id AND user_id = NEW.user_id
  ) THEN
    RAISE EXCEPTION 'Kendi önerinize oy veremezsiniz';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_self_vote
BEFORE INSERT ON votes
FOR EACH ROW EXECUTE FUNCTION check_self_vote();

-- Oy sayısını otomatik güncelleme
CREATE OR REPLACE FUNCTION update_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE submissions SET vote_count = vote_count + 1 WHERE id = NEW.submission_id;
    UPDATE profiles SET total_votes_received = total_votes_received + 1 
    WHERE id = (SELECT user_id FROM submissions WHERE id = NEW.submission_id);
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE submissions SET vote_count = vote_count - 1 WHERE id = OLD.submission_id;
    UPDATE profiles SET total_votes_received = total_votes_received - 1 
    WHERE id = (SELECT user_id FROM submissions WHERE id = OLD.submission_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vote_count_trigger
AFTER INSERT OR DELETE ON votes
FOR EACH ROW EXECUTE FUNCTION update_vote_count();

-- Öneri sayısını otomatik güncelleme
CREATE OR REPLACE FUNCTION update_submission_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET total_submissions = total_submissions + 1 WHERE id = NEW.user_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER submission_count_trigger
AFTER INSERT ON submissions
FOR EACH ROW EXECUTE FUNCTION update_submission_count();

-- Yeni kullanıcı profili oluşturma (Auth trigger)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, username, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    LOWER(SPLIT_PART(NEW.email, '@', 1)) || '_' || SUBSTRING(NEW.id::text, 1, 4),
    COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security (RLS) Politikaları
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Profiller herkese açık" ON profiles FOR SELECT USING (true);
CREATE POLICY "Rozetler herkese açık" ON badges FOR SELECT USING (true);
CREATE POLICY "Kullanıcı rozetleri herkese açık" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Kitaplar herkese açık" ON books FOR SELECT USING (true);
CREATE POLICY "Bölümler herkese açık" ON chapters FOR SELECT USING (true);
CREATE POLICY "Öneriler herkese açık" ON submissions FOR SELECT USING (true);
CREATE POLICY "Oylar herkese açık" ON votes FOR SELECT USING (true);

-- Kendi profilini güncelleyebilir
CREATE POLICY "Kendi profilini güncelle" ON profiles FOR UPDATE 
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Giriş yapmış kullanıcılar öneri gönderebilir
CREATE POLICY "Öneri gönder" ON submissions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Giriş yapmış kullanıcılar oy kullanabilir
CREATE POLICY "Oy kullan" ON votes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Kendi oyunu silebilir
CREATE POLICY "Kendi oyunu sil" ON votes FOR DELETE 
USING (auth.uid() = user_id);

-- Başlangıç rozetlerini ekle
INSERT INTO badges (name, description, icon, requirement_type, requirement_value) VALUES
('İlk Adım', 'İlk önerinizi gönderdiniz', '✨', 'first_submission', 1),
('Finalist', 'Bir bölümde finale kaldınız', '🏅', 'finalist', 1),
('Bölüm Kazananı', 'Bir bölümü kazandınız', '🏆', 'winner', 1),
('Üçlü Şampiyon', 'Üç bölüm kazandınız', '👑', 'triple_winner', 3),
('Çok Yönlü Yazar', 'Birden fazla kitaba katkıda bulundunuz', '📚', 'multi_book', 2);

-- İndeksler
CREATE INDEX idx_submissions_chapter ON submissions(chapter_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_votes_submission ON votes(submission_id);
CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_chapters_book ON chapters(book_id);
CREATE INDEX idx_chapters_status ON chapters(status);
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_status ON books(status);
