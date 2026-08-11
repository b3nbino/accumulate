export interface EntryType {
  id: number;
  media_id: number;
  source: string;
  type: "Movie" | "Book" | "Game" | "TV-Show";
  title: string;
  release_date: string;
  start_date?: string | undefined;
  finish_date?: string | undefined;
  last_edited_date: string;
  status: "watching" | "completed" | "plan to watch" | "on-hold" | "dropped";
  progress?: number | undefined;
  total_length: number;
  progress_type: string;
  user_rating?: number | undefined;
  review?: string | undefined;
  liked: boolean;
}

export type NewEntryType = Omit<EntryType, "id" | "last_edited_date">;
export type PartialEntryType = Partial<EntryType>;
