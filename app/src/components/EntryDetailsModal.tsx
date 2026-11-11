import {
  faHeart as solidHeart,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as hollowHeart,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import type { EntryType } from "../types/EntryType";
import { getStars } from "../utils/getStars";
import getMediaTypeColor from "../utils/getMediaTypeColor";

interface EntryDetailsModalProps extends EntryType {
  onLike(id: number, liked: boolean): void;
}

export default function EntryDetailsModal({
  id,
  media_type,
  title,
  release_date,
  start_date,
  finish_date,
  status,
  progress,
  total_length,
  progress_type,
  user_rating,
  review,
  liked,
  onLike,
}: EntryDetailsModalProps): React.ReactElement {
  console.log(typeof release_date, release_date);
  return (
    <>
      <div
        className="overlay"
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          // hideModal();
        }}
        style={{}}
      >
        {" "}
      </div>
      <section id="details-modal" className="modal">
        <div>
          <p>Status: {status}</p>
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
        </div>
        <div>
          <h2>
            {title} <span>{media_type}</span>
          </h2>
          {getStars(user_rating)}
        </div>
        <p>
          {release_date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
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
          <FontAwesomeIcon icon={faSquarePlus} />
        </div>
        <div>
          <p>
            Start date: {start_date ? start_date.toISOString() : "Not started"}
          </p>
          <p>
            Finish date:{" "}
            {finish_date ? finish_date.toISOString() : "Not finished"}
          </p>
        </div>
        <div>
          {review ?
            <>
              <h3>Your Review:</h3>
              <p>{review}</p>
            </>
          : <p>Not reviewed</p>}
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPencil} /> Edit
          </button>
          <button>Cancel</button>
        </div>
      </section>
    </>
  );
}
