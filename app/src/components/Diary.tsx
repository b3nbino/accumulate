// Imports
import { useEffect, useState, type ReactNode } from "react";
import Entry from "./Entry";
import CreateEntryModal from "./CreateEntryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

// Type imports
import type { EntryType } from "../types/EntryType";
import convertLastEdited from "../utils/convertLastEdited";
import type { SortOrder, SortType } from "../types/Sorting";
import sortEntries from "../utils/sortEntries";

export default function Diary(): ReactNode {
  const [entries, setEntries] = useState<EntryType[]>(() => {
    return [];
  });
  const [sortedEntries, setSortedEntries] = useState<EntryType[]>(() => {
    return [];
  });
  const [sortType, setSortType] = useState<[SortType, SortOrder]>([
    "date",
    "descending",
  ]);
  const [displayCreationModal, setDisplayCreationModal] =
    useState<boolean>(false);

  // Effects
  useEffect(() => {
    (async () => {
      // Get entries from server
      const res = await fetch("/entries");
      const json = await res.json();

      // Make last edited date into an object
      json.forEach((entry: EntryType) => {
        convertLastEdited(entry);
      });

      setEntries(json);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // Sorts entries when sorting selection or entries changes
      const newEntries: EntryType[] = sortEntries(
        entries,
        sortType[0],
        sortType[1],
      );
      setSortedEntries(newEntries);
    })();
  }, [entries, sortType]);

  async function handleLike(id: number, liked: boolean): Promise<void> {
    // Send update request to like entry
    const res = await fetch(`/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        liked,
      }),
    });
    const json: EntryType = await res.json();
    convertLastEdited(json);

    const entriesCopy = [...entries];

    entriesCopy.splice(
      entriesCopy.findIndex((elem) => elem.id === id),
      1,
      json,
    );
    setEntries(entriesCopy);
  }

  async function updateProgress(id: number, progress: number): Promise<void> {
    // Send update request to increment entry
    const res = await fetch(`/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        progress,
      }),
    });
    const json: EntryType = await res.json();
    convertLastEdited(json);

    const entriesCopy = [...entries];

    entriesCopy.splice(
      entriesCopy.findIndex((elem) => elem.id === id),
      1,
      json,
    );
    setEntries(entriesCopy);
  }

  function updateSort(type: SortType) {
    // Change the sort order
    let newSort: SortType;
    let newOrder: SortOrder;

    // If the current sort type was clicked, change the order instead
    if (type === sortType[0]) {
      newSort = sortType[0];
      if (sortType[1] === "ascending") {
        newOrder = "descending";
      } else {
        newOrder = "ascending";
      }
    } else {
      newSort = type;
      newOrder = "ascending";
    }

    setSortType([newSort, newOrder]);
  }

  function listEntries(allEntrires: EntryType[]): ReactNode {
    const entryList = allEntrires.map((entry) => {
      return (
        <Entry
          key={entry.id}
          {...entry}
          onLike={handleLike}
          onIncrement={updateProgress}
        ></Entry>
      );
    });

    return <ul id="entries">{...entryList}</ul>;
  }

  function showCreationModal() {
    setDisplayCreationModal(true);
  }

  function hideCreationModal() {
    setDisplayCreationModal(false);
  }

  return (
    <section id="diary">
      <div id="diary-topper">
        <ul id="diary-sort-options">
          <li>
            <button onClick={() => updateSort("date")}>Last Edited</button>
            {sortType[0] === "date" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li className="spacer"></li>
          <li>
            <button onClick={() => updateSort("title")}>Title</button>
            {sortType[0] === "title" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("progress")}>Progress</button>
            {sortType[0] === "progress" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("type")}>Type</button>
            {sortType[0] === "type" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li className="spacer"></li>
          <li>
            <button onClick={() => updateSort("rating")}>Rating</button>
            {sortType[0] === "rating" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("liked")}>Liked</button>
            {sortType[0] === "liked" ?
              sortType[1] === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
        </ul>
      </div>
      {listEntries(sortedEntries)}
      <CreateEntryModal
        hideCreationModal={hideCreationModal}
        displayCreationModal={displayCreationModal}
      ></CreateEntryModal>
      <div className="bottom-buttons">
        <button onClick={() => showCreationModal()}>
          <FontAwesomeIcon id="create-button" icon={faSquarePlus} size="4x" />
        </button>
      </div>
    </section>
  );
}
