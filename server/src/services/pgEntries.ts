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
