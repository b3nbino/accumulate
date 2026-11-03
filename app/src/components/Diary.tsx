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

// Component types
type SortType = "date" | "title" | "progress" | "type" | "rating" | "liked";
type SortOrder = "ascending" | "descending";

export default function Diary(): ReactNode {
  const [entries, setEntries] = useState<EntryType[]>(() => {
    return [];
  });
  const [sortType, setSortType] = useState<SortType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");
  const [displayCreationModal, setDisplayCreationModal] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // Get entries from server
      const res = await fetch("/entries");
      const json = await res.json();

      // Make last edited date into an object
      json.forEach((entry: EntryType) => {
        convertLastEdited(entry);
      });

      // Sort by date descending default
      json.sort((a: EntryType, b: EntryType) => {
        if (a.last_edited_date > b.last_edited_date) {
          return -1;
        } else if (a.last_edited_date < b.last_edited_date) {
          return 1;
        } else {
          return 0;
        }
      });

      setEntries(json);
    })();
  }, []);

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

    const entriesCopy: EntryType[] = [...entries];

    switch (newSort) {
      case "date":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => {
            if (a.last_edited_date < b.last_edited_date) {
              return -1;
            } else if (a.last_edited_date > b.last_edited_date) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.last_edited_date > b.last_edited_date) {
              return -1;
            } else if (a.last_edited_date < b.last_edited_date) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        break;
      case "title":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            } else if (a.title < b.title) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        break;
      case "progress":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => a.progress - b.progress);
        } else {
          entriesCopy.sort((a, b) => b.progress - a.progress);
        }
        break;
      case "type":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => {
            if (a.media_type < b.media_type) {
              return -1;
            } else if (a.media_type > b.media_type) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.media_type > b.media_type) {
              return -1;
            } else if (a.media_type < b.media_type) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        break;
      case "rating":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => {
            if (a.user_rating === null) {
              a.user_rating = -1;
            }

            if (b.user_rating === null) {
              b.user_rating = -1;
            }

            if (a.user_rating < b.user_rating) {
              return -1;
            } else if (a.user_rating > b.user_rating) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.user_rating === null) {
              a.user_rating = -1;
            }

            if (b.user_rating === null) {
              b.user_rating = -1;
            }

            if (a.user_rating > b.user_rating) {
              return -1;
            } else if (a.user_rating < b.user_rating) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        break;
      case "liked":
        if (newOrder === "ascending") {
          entriesCopy.sort((a, b) => {
            if (a.liked < b.liked) {
              return -1;
            } else if (a.liked > b.liked) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.liked > b.liked) {
              return -1;
            } else if (a.liked < b.liked) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        break;
    }

    setEntries(entriesCopy);
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
      {listEntries(entries)}
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
