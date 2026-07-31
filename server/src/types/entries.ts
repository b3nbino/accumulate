type MovieId = number;
type BookId = number;
type GameId = number;
type ShowId = number;

export interface Entry {
  id: number;
  db_id: MovieId | BookId | GameId | ShowId;
  title: string;
  release_date: string;
  start_date?: string | undefined;
  finish_date?: string | undefined;
  status: "watching" | "completed" | "plan to watch" | "on-hold" | "dropped";
  progress?: string | undefined;
  user_rating?: number | undefined;
  review?: string | undefined;
  liked: boolean;
  tags?: string[] | undefined;
}

export type NewEntry = Omit<Entry, "id">;
