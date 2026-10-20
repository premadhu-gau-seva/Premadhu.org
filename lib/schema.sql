-- Schema for Premadhu Gau Seva Samiti
-- Members table

CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_core BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for ordering members efficiently
CREATE INDEX IF NOT EXISTS idx_members_sort_order ON members (sort_order ASC, id ASC);
CREATE INDEX IF NOT EXISTS idx_members_is_core ON members (is_core, sort_order ASC, id ASC);

-- About Us Photos table
CREATE TABLE IF NOT EXISTS about_photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for ordering about photos efficiently
CREATE INDEX IF NOT EXISTS idx_about_photos_sort_order ON about_photos (sort_order ASC, id ASC);
