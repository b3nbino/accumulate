// Object imports
import type { ReactNode } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faSquarePlus,
  faHeart as hollowHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Function imports
import { getStars } from "../utils/getStars";

// Type imports
import type { EntryType, MediaType } from "../types/EntryType";

interface EntryProps extends EntryType {
  onLike: (id: number, liked: boolean) => void;
  onIncrement: (id: number, progress: number) => void;
}

export default function Entry({
  id,
  last_edited_date,
  title,
  media_type,
  progress,
  total_length,
  progress_type,
  user_rating,
  liked,
  onLike,
  onIncrement,
}: EntryProps): ReactNode {
  function getMediaTypeColor(mediaType: MediaType): string {
    // Customize the color of the media type tag
    switch (mediaType) {
      case "Movie":
        return "red";
      case "Book":
        return "green";
      case "Game":
        return "purple";
      case "TV-Show":
        return "blue";
      default:
        return "grey";
    }
  }

  function createDateElement(date: Date): ReactNode {
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .split(" ")
      .map((part: string) => <p key={part}>{part}</p>);
  }

  return (
    <li className="entry" id={`entry-${id}`} key={id}>
      <div className="list-entry-date">
        {createDateElement(last_edited_date)}
      </div>
      <div className="list-entry-thumb">
        <img src="./public/placeholder.jpg" alt="" />
      </div>
      <div className="list-entry-middle">
        <div className="list-entry-header">
          <p className="list-entry-title">{title}</p>
          <p className={`type-${media_type}`}>{media_type}</p>
        </div>
        <div className="progress-bar">
          <div
            className="list-entry-progress"
            style={{
              width: `${Math.floor(((progress ?? 0) / total_length) * 100)}%`,
              borderTopRightRadius: `${progress === total_length ? "24px" : "6px"}`,
              borderBottomRightRadius: `${progress === total_length ? "24px" : "6px"}`,
              backgroundColor: `${getMediaTypeColor(media_type)}`,
            }}
          ></div>
          <p className="list-entry-progress-amount">
            {progress}/{total_length} {progress_type}
          </p>
        </div>
      </div>
      <div className="list-entry-right">
        <p>{getStars(user_rating)}</p>
        <div className="list-entry-buttons">
          <button
            className="list-entry-like"
            onClick={() => {
              onLike(id, !liked);
            }}
          >
            {liked ?
              <FontAwesomeIcon icon={solidHeart} size="3x" />
            : <FontAwesomeIcon icon={hollowHeart} size="3x" />}
          </button>
          <button
            className="list-entry-add"
            onClick={() => {
              if (progress < total_length) {
                onIncrement(id, progress + 1);
              }
            }}
            disabled={progress === total_length}
          >
            <FontAwesomeIcon icon={faSquarePlus} size="3x" />
          </button>
        </div>
      </div>
    </li>
  );
}
