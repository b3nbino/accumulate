// Imports
import { useEffect, useState, type ReactNode } from "react";
import Entry from "./Entry";
import CreateEntryModal from "./CreateEntryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faHeart,
  faPencil,
  faSquarePlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// Type imports
import type {
  EntryType,
  NewEntryRequest,
  StatusType,
} from "../types/EntryType";
import convertLastEdited from "../utils/convertLastEdited";
import type { SortOrder, SortType } from "../types/Sorting";
import sortEntries from "../utils/sortEntries";

// Components types
interface FormValuesType {
  title: string;
  media_type: string;
  release_date: string;
  start_date: string;
  finish_date: string;
  progress_type: string;
  total_length: number;
  progress: number;
  status: StatusType;
  user_rating: number;
  review: string;
  liked: boolean;
}

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
  const [isCreationModalShown, setIsCreationModalShown] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesType>({
    title: "",
    media_type: "",
    release_date: "",
    start_date: "",
    finish_date: "",
    progress_type: "",
    total_length: 0,
    progress: 0,
    status: "watching",
    user_rating: 0,
    review: "",
    liked: false,
  });

  // Effects
  useEffect(() => {
    (async () => {
      // Get entries from server
      const res = await fetch("/entries");
      const json = await res.json();

      // Make last edited date into an object
      json.forEach((entry: EntryType) => convertLastEdited(entry));

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
    setIsCreationModalShown(true);
  }

  function hideCreationModal() {
    setIsCreationModalShown(false);
  }

  function clearFormValues(): void {
    setFormValues({
      title: "",
      media_type: "",
      release_date: "",
      start_date: "",
      finish_date: "",
      progress_type: "",
      total_length: 0,
      progress: 0,
      status: "watching",
      user_rating: 0,
      review: "",
      liked: false,
    });
  }

  async function handleSubmit(event: React.SubmitEvent): Promise<void> {
    event.preventDefault();

    // Shape form data into proper json body
    const createdEntry: NewEntryRequest = {
      media_id: Math.floor(Math.random() * 999999) + 1,
      source: "Custom",
      media_type: formValues.media_type,
      title: formValues.title,
      release_date: new Date(formValues.release_date).toJSON(),
      start_date:
        formValues.start_date ?
          new Date(formValues.start_date).toJSON()
        : undefined,
      finish_date:
        formValues.finish_date ?
          new Date(formValues.finish_date).toJSON()
        : undefined,
      status: formValues.status,
      progress: formValues.progress,
      total_length: formValues.total_length,
      progress_type: formValues.progress_type,
      user_rating: formValues.user_rating || undefined,
      review: formValues.review || undefined,
      liked: formValues.liked,
    };

    try {
      const res = await fetch("/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(createdEntry),
      });

      if (res.status !== 201) {
        console.log("failed to create new entry");
        return;
      }

      const json: EntryType = await res.json();
      convertLastEdited(json);

      setEntries([...entries, json]);
      hideCreationModal();
      clearFormValues();
    } catch (e) {
      console.error(e);
    }
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
      <div
        className="overlay"
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          // hideModal();
          clearFormValues();
        }}
        style={{}}
      >
        {" "}
      </div>
      <section id="details-modal" className="modal">
        <div>
          <p>Status: Completed</p>
          <FontAwesomeIcon icon={faHeart} size="2x" />
        </div>
        <div>
          <h2>
            The Gamer <span>Webtoon</span>
          </h2>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p>Release date: 10/7/15</p>
        <div className="progress-bar">
          <div
            className="list-entry-progress"
            style={
              {
                // width: `${Math.floor(((progress ?? 0) / total_length) * 100)}%`,
                // borderTopRightRadius: `${progress === total_length ? "24px" : "6px"}`,
                // borderBottomRightRadius: `${progress === total_length ? "24px" : "6px"}`,
                // backgroundColor: `${getMediaTypeColor(media_type)}`,
              }
            }
          ></div>
          <p className="list-entry-progress-amount">
            {/* {progress}/{total_length} {progress_type} */}
          </p>
          <FontAwesomeIcon icon={faSquarePlus} />
        </div>
        <div>
          <p>Start date: 11/2/20</p>
          <p>Finish date: 12/15/21</p>
        </div>
        <div>
          <h3>Your Review:</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            sollicitudin leo, id mollis ex efficitur quis. Integer imperdiet nec
            lectus et feugiat. In vitae finibus lectus. Donec lobortis arcu sed
            ipsum eleifend, quis laoreet augue vestibulum. Nam interdum
            ultricies lectus. Vestibulum ornare, odio ac egestas ullamcorper,
            purus elit accumsan nunc, ut venenatis magna nunc ut erat. Praesent
            elementum diam sit amet faucibus laoreet. Mauris in nisi ac lectus
            commodo fermentum. Cras molestie erat arcu, et porttitor dui semper
            at. Duis sapien mauris, consectetur in libero ut, lobortis dapibus
            nibh.
          </p>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPencil} /> Edit
          </button>
          <button>Cancel</button>
        </div>
      </section>
      <CreateEntryModal
        formValues={formValues}
        setFormValues={setFormValues}
        clearFormValues={clearFormValues}
        onSubmit={handleSubmit}
        hideModal={hideCreationModal}
        isShown={isCreationModalShown}
      ></CreateEntryModal>
      <div className="bottom-buttons">
        <button onClick={() => showCreationModal()}>
          <FontAwesomeIcon id="create-button" icon={faSquarePlus} size="4x" />
        </button>
      </div>
    </section>
  );
}
