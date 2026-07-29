export interface Entry {
  id: number;
  movie_id?: number;
  book_id?: number;
  game_id?: number;
  show_id?: number;
  title: string;
  release_date: string;
  start_date: string;
  finish_date: string;
  status: "watching" | "completed" | "plan to watch" | "on-hold" | "dropped";
  progress: string;
  user_rating: number;
  review: string;
  liked: boolean;
  tags: string[];
}
