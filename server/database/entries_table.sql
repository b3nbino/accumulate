CREATE TABLE entries (
  id serial PRIMARY KEY,
  media_id TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL,
  media_type TEXT NOT NULL,
  title TEXT NOT NULL,
  release_date TEXT NOT NULL,
  start_date TEXT,
  finish_date TEXT,
  last_edited_date TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER NOT NULL,
  total_length INTEGER NOT NULL,
  progress_type TEXT NOT NULL,
  user_rating INTEGER,
  review TEXT,
  liked BOOLEAN NOT NULL
);