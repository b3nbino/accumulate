export interface EntryType {
  id: number;
  media_id: number;
  source: string;
  media_type: "Movie" | "Book" | "Game" | "TV-Show";
  title: string;
  release_date: string;
  start_date?: string | null;
  finish_date?: string | null;
  last_edited_date: string;
  status: "watching" | "completed" | "plan to watch" | "on-hold" | "dropped";
  progress?: number | null;
  total_length: number;
  progress_type: string;
  user_rating?: number | null;
  review?: string | null;
  liked: boolean;
}

export type NewEntryType = Omit<EntryType, "id">;
export type PartialEntryType = Partial<EntryType>;
