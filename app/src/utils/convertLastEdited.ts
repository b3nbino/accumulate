import type { EntryType } from "../types/EntryType";

export default function convertLastEdited(entry: EntryType): void {
  // Mutates entry objects to use Date objects instead of strings
  if ("last_edited_date" in entry) {
    entry.last_edited_date = new Date(entry.last_edited_date);
  }

  return;
}
