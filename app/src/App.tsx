import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faSquarePlus,
  faHeart as hollowHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import type { Entry } from "./types/entry";
import { ENTRIES } from "./assets/data";
import { getStars } from "./utils/getStars";

function App() {
  function getMediaTypeColor(progressType: string) {
    switch (progressType) {
      case "Movie":
        return "red";
      case "Book":
        return "green";
      case "Game":
        return "purple";
      case "TV-Show":
        return "blue";
    }
  }

  function listEntries(allEntrires: Entry[]): ReactNode {
    const entryList = allEntrires.map((entry) => {
      return (
        <li className="entry" key={entry.id}>
          <div className="last-edited-date">
            {entry.last_edited_date
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              .split(" ")
              .map((part: string) => (
                <p>{part}</p>
              ))}
          </div>
          <div className="entry-thumb">
            <img src="./public/placeholder.jpg" alt="" />
          </div>
          <div className="diary-middle">
            <div className="header">
              <p className="title">{entry.title}</p>
              <p className={`type-${entry.type}`}>{entry.type}</p>
            </div>
            <div className="progress-bar">
              <div
                style={{
                  height: "32px",
                  width: `${Math.floor(((entry.progress ?? 0) / entry.total_length) * 100)}%`,
                  border: "2px solid white",
                  borderTopLeftRadius: "24px",
                  borderBottomLeftRadius: "24px",
                  borderTopRightRadius: `${entry.progress === entry.total_length ? "24px" : "6px"}`,
                  borderBottomRightRadius: `${entry.progress === entry.total_length ? "24px" : "6px"}`,
                  position: "relative",
                  backgroundColor: `${getMediaTypeColor(entry.type)}`,
                }}
              ></div>
              <p className="progress">
                {entry.progress}/{entry.total_length} {entry.progress_type}
              </p>
            </div>
          </div>
          <div className="diary-right">
            <p>{getStars(entry.user_rating)}</p>
            <div className="buttons">
              <button className="like">
                {entry.liked ?
                  <FontAwesomeIcon icon={solidHeart} size="3x" />
                : <FontAwesomeIcon icon={hollowHeart} size="3x" />}
              </button>
              <button className="add">
                <FontAwesomeIcon icon={faSquarePlus} size="3x" />
              </button>
            </div>
          </div>
        </li>
      );
    });
    return <ul id="entries">{...entryList}</ul>;
  }

  return (
    <>
      <main>
        <header>
          <h1>Accumulate</h1>
          <nav>
            <a href="">Diary</a>
          </nav>
        </header>
        <section id="diary">{listEntries(ENTRIES)}</section>
      </main>
    </>
  );
}

export default App;
