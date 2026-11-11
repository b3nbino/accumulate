import type { EntryType } from "../types/EntryType";

export default function convertLastEdited(entry: EntryType): void {
  // Mutates entry objects to use Date objects instead of strings

  entry.last_edited_date = new Date(entry.last_edited_date);
  entry.release_date = new Date(entry.release_date);

  return;
}
