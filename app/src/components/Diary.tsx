import type { ReactNode } from "react";
import type { EntryType } from "../types/EntryType";
import { ENTRIES } from "../assets/data";
import Entry from "./Entry";

export default function Diary(): ReactNode {
  function listEntries(allEntrires: EntryType[]): ReactNode {
    const entryList = allEntrires.map((entry) => {
      return <Entry {...entry}></Entry>;
    });

    return <ul id="entries">{...entryList}</ul>;
  }

  return <section id="diary">{listEntries(ENTRIES)}</section>;
}
