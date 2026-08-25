import type { EntryType } from "node:perf_hooks";
import pgQuery from "../utils/pgQuery.js";

export async function getEntries(): Promise<EntryType[]> {
  try {
    let result = await pgQuery("SELECT * FROM entries;");
    return result.rows;
  } catch {
    throw new Error("Failed to get entries from database.");
  }
}

export async function getEntry(entryId: number): Promise<EntryType> {
  try {
    let result = await pgQuery("SELECT * FROM entries where id = $1;", entryId);
    return result.rows[0];
  } catch {
    throw new Error("Failed to get entry from database.");
  }
}

export async function deleteEntry(entryId: number): Promise<boolean> {
  try {
    let result = await pgQuery("DELETE FROM entries where id = $1;", entryId);
    return result.rowCount === 1;
  } catch {
    throw new Error("Failed to delete entry from database.");
  }
}
