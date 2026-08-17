import { useEffect, useState, type ReactNode } from "react";
import type { EntryType } from "../types/EntryType";
import Entry from "./Entry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

type SortTypeType = "date" | "title" | "progress" | "type" | "rating" | "liked";
type SortOrderType = "ascending" | "descending";

export default function Diary(): ReactNode {
  const [entries, setEntries] = useState<EntryType[]>(() => {
    return [];
  });
  const [sortType, setSortType] = useState<SortTypeType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("descending");

  console.log(sortType, sortOrder);

  useEffect(() => {
    (async () => {
      const req = await fetch("/entries");
      const json = await req.json();

      json.forEach((entry: EntryType) => {
        if ("last_edited_date" in entry) {
          entry.last_edited_date = new Date(entry.last_edited_date);
        }
      });
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

  function updateSort(type: SortTypeType) {
    let newSort: SortTypeType;
    let newOrder: SortOrderType;

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
            if (a.type < b.type) {
              return -1;
            } else if (a.type > b.type) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          entriesCopy.sort((a, b) => {
            if (a.type > b.type) {
              return -1;
            } else if (a.type < b.type) {
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
            if (a.user_rating === undefined) {
              a.user_rating = -1;
            }

            if (b.user_rating === undefined) {
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
            if (a.user_rating === undefined) {
              a.user_rating = -1;
            }

            if (b.user_rating === undefined) {
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
    </section>
  );
}
