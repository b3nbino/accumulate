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
  const [sortType, setSortType] = useState<SortType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");
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
      const newEntries = sortEntries(entries, sortType, sortOrder);
      setSortedEntries(newEntries);
    })();
  }, [entries, sortType, sortOrder]);

  async function handleLike(id: number, liked: boolean): Promise<void> {
    // Send update request
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
    let newSort: SortType;
    let newOrder: SortOrder;

    if (type === sortType) {
      newSort = sortType;
      if (sortOrder === "ascending") {
        newOrder = "descending";
      } else {
        newOrder = "ascending";
      }
    } else {
      newSort = type;
      newOrder = "ascending";
    }

    setSortType(newSort);
    setSortOrder(newOrder);
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
            {sortType === "date" ?
              sortOrder === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li className="spacer"></li>
          <li>
            <button onClick={() => updateSort("title")}>Title</button>
            {sortType === "title" ?
              sortOrder === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("progress")}>Progress</button>
            {sortType === "progress" ?
              sortOrder === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("type")}>Type</button>
            {sortType === "type" ?
              sortOrder === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li className="spacer"></li>
          <li>
            <button onClick={() => updateSort("rating")}>Rating</button>
            {sortType === "rating" ?
              sortOrder === "ascending" ?
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              : <FontAwesomeIcon icon={faArrowDown} size="xs" />
            : null}
          </li>
          <li>
            <button onClick={() => updateSort("liked")}>Liked</button>
            {sortType === "liked" ?
              sortOrder === "ascending" ?
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
