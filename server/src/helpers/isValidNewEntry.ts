import type { NewEntry } from "../types/entries.js";

export function isValidNewEntry(newEntry: unknown): newEntry is NewEntry {
  // Check required properties
  if (
    newEntry !== null &&
    typeof newEntry === "object" &&
    "title" in newEntry &&
    typeof newEntry["title"] === "string" &&
    "release_date" in newEntry &&
    typeof newEntry["release_date"] === "string" &&
    "status" in newEntry &&
    typeof newEntry["status"] === "string" &&
    "liked" in newEntry &&
    typeof newEntry["liked"] === "boolean" &&
    "db_id" in newEntry &&
    typeof newEntry["db_id"] === "number"
  ) {
    // Check optional properties
    if (
      !(
        (("start_date" in newEntry &&
          typeof newEntry["start_date"] === "string") ||
          !("start_date" in newEntry)) &&
        (("finish_date" in newEntry &&
          typeof newEntry["finish_date"] === "string") ||
          !("finish_date" in newEntry)) &&
        (("progress" in newEntry && typeof newEntry["progress"] === "string") ||
          !("progress" in newEntry)) &&
        (("user_rating" in newEntry &&
          typeof newEntry["user_rating"] === "number") ||
          !("user_rating" in newEntry)) &&
        (("review" in newEntry && typeof newEntry["review"] === "string") ||
          !("review" in newEntry)) &&
        (("tags" in newEntry &&
          Array.isArray(newEntry.tags) &&
          newEntry.tags.every((elem) => typeof elem === "string")) ||
          !("tags" in newEntry))
      )
    ) {
      return false;
    }
    return true;
  }
  return false;
}
