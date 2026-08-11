export interface Entry {
  id: number;
  media_id: number;
  source: string;
  type: "Movie" | "Book" | "Game" | "TV-Show";
  title: string;
  release_date: Date;
  start_date?: Date;
  finish_date?: Date;
  last_edited_date: Date;
  status: "watching" | "completed" | "plan to watch" | "on-hold" | "dropped";
  progress?: number;
  total_length: number;
  progress_type: string;
  user_rating?: number;
  review?: string;
  liked: boolean;
}
