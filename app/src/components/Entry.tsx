import type { ReactNode } from "react";
import type { EntryType } from "../types/EntryType";
import { getStars } from "../utils/getStars";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faSquarePlus,
  faHeart as hollowHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Entry({
  id,
  last_edited_date,
  title,
  type,
  progress,
  total_length,
  progress_type,
  user_rating,
  liked,
}: EntryType): ReactNode {
  function getMediaTypeColor(
    progressType: "Movie" | "Game" | "Book" | "TV-Show",
  ): string {
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

  return (
    <li className="entry" key={id}>
      <div className="last-edited-date">
        {last_edited_date
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          .split(" ")
          .map((part: string) => (
            <p key={part}>{part}</p>
          ))}
      </div>
      <div className="entry-thumb">
        <img src="./public/placeholder.jpg" alt="" />
      </div>
      <div className="diary-middle">
        <div className="header">
          <p className="title">{title}</p>
          <p className={`type-${type}`}>{type}</p>
        </div>
        <div className="progress-bar">
          <div
            style={{
              height: "32px",
              width: `${Math.floor(((progress ?? 0) / total_length) * 100)}%`,
              border: "2px solid white",
              borderTopLeftRadius: "24px",
              borderBottomLeftRadius: "24px",
              borderTopRightRadius: `${progress === total_length ? "24px" : "6px"}`,
              borderBottomRightRadius: `${progress === total_length ? "24px" : "6px"}`,
              position: "relative",
              backgroundColor: `${getMediaTypeColor(type)}`,
            }}
          ></div>
          <p className="progress">
            {progress}/{total_length} {progress_type}
          </p>
        </div>
      </div>
      <div className="diary-right">
        <p>{getStars(user_rating)}</p>
        <div className="buttons">
          <button className="like">
            {liked ?
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
}
