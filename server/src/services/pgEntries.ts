import type {
  EntryType,
  NewEntryType,
  PartialEntryType,
} from "../types/EntryType.ts";
import pgQuery from "../utils/pgQuery.js";

export async function getEntries(): Promise<EntryType[]> {
  try {
    let result = await pgQuery("SELECT * FROM entries;");
    return result.rows;
  } catch (e) {
    throw new Error("Failed to get entries from database.");
  }
}

export async function getEntry(entryId: number): Promise<EntryType> {
  try {
    let result = await pgQuery("SELECT * FROM entries where id = $1;", entryId);
    return result.rows[0];
  } catch (e) {
    throw new Error("Failed to get entry from database.");
  }
}

export async function createEntry(newEntry: NewEntryType): Promise<boolean> {
  try {
    let result = await pgQuery(
      `INSERT INTO entries (
      media_id,
      source,
      media_type,
      title,
      release_date,
      start_date,
      finish_date,
      last_edited_date,
      status,
      progress,
      total_length,
      progress_type,
      user_rating,
      review,
      liked
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`,
      newEntry.media_id,
      newEntry.source,
      newEntry.media_type,
      newEntry.title,
      newEntry.release_date,
      newEntry.start_date,
      newEntry.finish_date,
      newEntry.last_edited_date,
      newEntry.status,
      newEntry.progress,
      newEntry.total_length,
      newEntry.progress_type,
      newEntry.user_rating,
      newEntry.review,
      newEntry.liked,
    );
    return result.rowCount === 1;
  } catch (e) {
    throw new Error("Failed to create a new entry.");
  }
}

export async function deleteEntry(entryId: number): Promise<boolean> {
  try {
    let result = await pgQuery("DELETE FROM entries where id = $1;", entryId);
    return result.rowCount === 1;
  } catch (e) {
    throw new Error("Failed to delete entry from database.");
  }
}

export async function updateEntry(entryId: number, updates: PartialEntryType) {
  try {
    // Dynamically create set clause for variable length updates.
    const keys = Object.keys(updates);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(",");
    const values = [entryId, ...keys.map((key) => updates[key])];

    const result = await pgQuery(
      `UPDATE entries SET ${setClause} WHERE id = $1;`,
      ...values,
    );
    return result.rowCount > 0;
  } catch (e) {
    throw new Error("Failed to update entry in database.");
  }
}
