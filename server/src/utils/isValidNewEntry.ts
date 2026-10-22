import type { NewEntryType } from "../types/EntryType.ts";

export function isValidNewEntry(newEntry: unknown): newEntry is NewEntryType {
  const MAX_SAFE_INTEGER = 9007199254740991;

  // Check required properties
  if (
    newEntry !== null &&
    typeof newEntry === "object" &&
    "media_id" in newEntry &&
    typeof newEntry.media_id === "number" &&
    "source" in newEntry &&
    typeof newEntry.source === "string" &&
    "media_type" in newEntry &&
    (newEntry.media_type === "Book" ||
      newEntry.media_type === "Movie" ||
      newEntry.media_type === "Game" ||
      newEntry.media_type === "TV-Show") &&
    "title" in newEntry &&
    typeof newEntry.title === "string" &&
    "release_date" in newEntry &&
    typeof newEntry.release_date === "string" &&
    "status" in newEntry &&
    (newEntry.status === "watching" ||
      newEntry.status === "completed" ||
      newEntry.status === "plan to watch" ||
      newEntry.status === "dropped") &&
    "total_length" in newEntry &&
    typeof newEntry.total_length === "number" &&
    newEntry.total_length < MAX_SAFE_INTEGER &&
    "progress_type" in newEntry &&
    typeof newEntry.progress_type === "string" &&
    "liked" in newEntry &&
    typeof newEntry["liked"] === "boolean"
  ) {
    // Check optional properties
    if (
      !(
        (("start_date" in newEntry &&
          typeof newEntry.start_date === "string") ||
          !("start_date" in newEntry)) &&
        (("finish_date" in newEntry &&
          typeof newEntry.finish_date === "string") ||
          !("finish_date" in newEntry)) &&
        (("progress" in newEntry && typeof newEntry.progress === "number") ||
          !("progress" in newEntry)) &&
        (("user_rating" in newEntry &&
          typeof newEntry.user_rating === "number" &&
          newEntry.user_rating <= 10) ||
          !("user_rating" in newEntry)) &&
        (("review" in newEntry && typeof newEntry.review === "string") ||
          !("review" in newEntry))
      )
    ) {
      return false;
    }
    return true;
  }
  return false;
}
