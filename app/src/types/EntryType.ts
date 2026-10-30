export type MediaType = "Movie" | "Book" | "Game" | "TV-Show" | string;
export type StatusType =
  | "watching"
  | "completed"
  | "plan to watch"
  | "on-hold"
  | "dropped";

export interface EntryType {
  id: number;
  media_id: number;
  source: string;
  media_type: MediaType;
  title: string;
  release_date: Date;
  start_date?: Date;
  finish_date?: Date;
  last_edited_date: Date;
  status: StatusType;
  progress: number;
  total_length: number;
  progress_type: string;
  user_rating?: number;
  review?: string;
  liked: boolean;
}

export type PartialEntry = Partial<EntryType>;
