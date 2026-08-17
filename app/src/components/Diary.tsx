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

  async function updateLike(id: number, liked: boolean) {
    const res = await fetch(`/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        liked,
      }),
    });
    const json = await res.json();

    if ("last_edited_date" in json) {
      json.last_edited_date = new Date(json.last_edited_date);
    }

    const entriesCopy = [...entries];

    entriesCopy.splice(
      entriesCopy.findIndex((elem) => elem.id === id),
      1,
      json,
    );
    setEntries(entriesCopy);
  }

  async function updateProgress(id: number, progress: number) {
    const res = await fetch(`/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        progress,
      }),
    });
    const json = await res.json();

    if ("last_edited_date" in json) {
      json.last_edited_date = new Date(json.last_edited_date);
    }

    const entriesCopy = [...entries];

    entriesCopy.splice(
      entriesCopy.findIndex((elem) => elem.id === id),
      1,
      json,
    );
    setEntries(entriesCopy);
  }

  function listEntries(allEntrires: EntryType[]): ReactNode {
    const entryList = allEntrires.map((entry) => {
      return (
        <Entry
          key={entry.id}
          {...entry}
          onLike={updateLike}
          onIncrement={updateProgress}
        ></Entry>
      );
    });

    return <ul id="entries">{...entryList}</ul>;
  }

  return (
    <section id="diary">
      <div id="diary-topper">
        <ul id="diary-sort-options">
          <li>
            <button>Last Edited</button>
          </li>
          <li className="spacer"></li>
          <li>
            <button>Title</button>
          </li>
          <li>
            <button>Progress</button>
          </li>
          <li>
            <button>Type</button>
          </li>
          <li className="spacer"></li>
          <li>
            <button>Rating</button>
          </li>
          <li>
            <button>Liked</button>
          </li>
        </ul>
      </div>
      {listEntries(entries)}
    </section>
  );
}
