import { useEffect, useState, type ReactNode } from "react";
import type { EntryType } from "../types/EntryType";
import Entry from "./Entry";

export default function Diary(): ReactNode {
  const [entries, setEntries] = useState<EntryType[]>(() => {
    return [];
  });

  useEffect(() => {
    (async () => {
      const req = await fetch("/entries");
      const json = await req.json();

      json.forEach((entry: EntryType) => {
        if ("last_edited_date" in entry) {
          entry.last_edited_date = new Date(entry.last_edited_date);
        }
      });

      setEntries(json);
    })();
  }, []);

  function listEntries(allEntrires: EntryType[]): ReactNode {
    const entryList = allEntrires.map((entry) => {
      return <Entry key={entry.id} {...entry}></Entry>;
    });

    return <ul id="entries">{...entryList}</ul>;
  }

  return <section id="diary">{listEntries(entries)}</section>;
}
