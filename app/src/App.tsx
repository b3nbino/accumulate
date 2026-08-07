import {
  faStar,
  faStarHalf,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquarePlus,
  faHeart as hollowHeart,
  faStar as hollowStar,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

function App() {
  const ENTRIES = [
    {
      id: 1,
      media_id: 1,
      source: "",
      type: "Movie",
      title: "Baby Driver",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2026"),
      finish_date: new Date("July 7 2026"),
      last_edited_date: new Date("August 8 2026"),
      status: "completed",
      progress: 115,
      total_length: 115,
      progress_type: "minutes",
      user_rating: 10,
      review: "",
      liked: true,
    },
    {
      id: 2,
      media_id: 2,
      source: "",
      type: "Book",
      title: "Neuromancer",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2026"),
      last_edited_date: new Date("August 8 2026"),
      status: "in-progress",
      progress: 5,
      total_length: 24,
      progress_type: "chapters",
      liked: false,
    },
    {
      id: 3,
      media_id: 23,
      source: "",
      type: "Game",
      title: "Minecraft",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2016"),
      finish_date: new Date("February 6 2026"),
      last_edited_date: new Date("July 10 2026"),
      status: "completed",
      progress: 100,
      total_length: 100,
      progress_type: "percent",
      user_rating: 9,
      review: "I Love Minecraft",
      liked: true,
    },
    {
      id: 4,
      media_id: 14,
      source: "",
      type: "TV-Show",
      title: "Squid Game S1",
      release_date: new Date("September 12 2011"),
      start_date: new Date("July 7 2026"),
      finish_date: new Date("August 25 2026"),
      last_edited_date: new Date("June 30 2026"),
      status: "dropped",
      progress: 8,
      total_length: 9,
      progress_type: "episodes",
      user_rating: 1,
      review: "",
      liked: true,
    },
  ];

  function listRating(rating: number): ReactNode {
    if (rating === undefined) {
      return (
        <>
          <FontAwesomeIcon icon={hollowStar} size="1x" />
          <FontAwesomeIcon icon={hollowStar} size="1x" />
          <FontAwesomeIcon icon={hollowStar} size="1x" />
          <FontAwesomeIcon icon={hollowStar} size="1x" />
          <FontAwesomeIcon icon={hollowStar} size="1x" />
        </>
      );
    }
    const stars = [];

    for (let i = 0; i < Math.floor(rating / 2); i++) {
      stars.push(<FontAwesomeIcon icon={faStar} size="1x" />);
    }

    if (rating % 2 !== 0) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} size="1x" />);
    }

    return <>{...stars}</>;
  }

  function getProgressColor(progressType: string) {
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

  function listEntries(allEntrires): ReactNode {
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
                  width: `${Math.floor((entry.progress / entry.total_length) * 100)}%`,
                  border: "2px solid white",
                  borderTopLeftRadius: "24px",
                  borderBottomLeftRadius: "24px",
                  borderTopRightRadius: `${entry.progress === entry.total_length ? "24px" : "6px"}`,
                  borderBottomRightRadius: `${entry.progress === entry.total_length ? "24px" : "6px"}`,
                  position: "relative",
                  backgroundColor: `${getProgressColor(entry.type)}`,
                }}
              ></div>
              <p className="progress">
                {entry.progress}/{entry.total_length} {entry.progress_type}
              </p>
            </div>
          </div>
          <div className="diary-right">
            <p>{listRating(entry.user_rating)}</p>
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
        <section id="diary">
          {/* Eventually we'll need to add the thumb URL. Once we connect the API. Make sure to change finish date to last edited date */}
          {listEntries(ENTRIES)}
        </section>
      </main>
    </>
  );
}

export default App;
