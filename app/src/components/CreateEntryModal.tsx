import React, { useState } from "react";
import type { PartialEntry, StatusType } from "../types/EntryType";

interface CreateEntryModalProps {
  displayCreationModal: boolean;
  hideCreationModal: () => void;
}

export default function CreateEntryModal({
  displayCreationModal,
  hideCreationModal,
}: CreateEntryModalProps) {
  const [formValues, setFormValues] = useState<{
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
  }>({
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

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    hideCreationModal();

    const createdEntry: PartialEntry = {
      media_id: Math.floor(Math.random() * 999999) + 1,
      source: "Custom",
      media_type: formValues.media_type,
      title: formValues.title,
      release_date: new Date(formValues.release_date),
      start_date: new Date(formValues.start_date),
      finish_date: new Date(formValues.finish_date),
      status: formValues.status,
      progress: formValues.progress,
      total_length: formValues.total_length,
      progress_type: formValues.progress_type,
      user_rating: formValues.user_rating || undefined,
      review: formValues.review || undefined,
      liked: formValues.liked,
    };

    try {
      console.log("sending...");
      const result = await fetch("/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdEntry),
      });
      console.log(result);
      if (result.status === 201) {
        console.log("entry created");
      } else {
        console.log("failed to create entry");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div
        className="overlay"
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          hideCreationModal();
        }}
        style={{ display: displayCreationModal ? "" : "none" }}
      >
        {" "}
      </div>
      <section
        id="creation-modal"
        className="modal"
        style={{ display: displayCreationModal ? "" : "none" }}
      >
        <form
          id="creation-form"
          action="/entries"
          method="post"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={formValues.title}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ title: event.target.value },
                  });
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="mediaType">
              Format
              <input
                type="text"
                id="mediaType"
                placeholder="TV-Show"
                value={formValues.media_type}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ media_type: event.target.value },
                  });
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="releaseDate">
              Released
              <input
                type="date"
                id="releaseDate"
                value={formValues.release_date}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ release_date: event.target.value },
                  });
                }}
              />
            </label>
            <label htmlFor="startDate">
              Started
              <input
                type="date"
                id="startDate"
                min={formValues.release_date}
                value={formValues.start_date}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ start_date: event.target.value },
                  });
                }}
              />
            </label>
            <label htmlFor="finishDate">
              Finished
              <input
                type="date"
                id="finishDate"
                min={formValues.start_date}
                value={formValues.finish_date}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ finish_date: event.target.value },
                  });
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="progress">
              Progress
              <div id="progress-div">
                <input
                  type="number"
                  id="progress"
                  max={formValues.total_length}
                  min={0}
                  value={formValues.progress}
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      ...{ progress: Number(event.target.value) },
                    });
                  }}
                />
                <span id="progress-divider">/</span>
                <input
                  type="number"
                  id="total-length"
                  min={0}
                  value={formValues.total_length}
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      ...{ total_length: Number(event.target.value) },
                    });
                  }}
                />
              </div>
            </label>
            <label htmlFor="progress-type">
              Type
              <input
                type="text"
                id="progress-type"
                placeholder="episodes"
                value={formValues.progress_type}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ progress_type: event.target.value },
                  });
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={formValues.status}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ status: event.target.value as StatusType },
                  });
                }}
              >
                <option value="watching">watching</option>
                <option value="completed">completed</option>
                <option value="plan to watch">plan to Watch</option>
                <option value="on-hold">on-hold</option>
                <option value="dropped">dropped</option>
              </select>
            </label>
            <label htmlFor="rating">
              Rating
              <input
                type="number"
                id="rating"
                max={10}
                min={0}
                value={formValues.user_rating}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    ...{ user_rating: Number(event.target.value) },
                  });
                }}
              />
            </label>
          </div>
          <label htmlFor="review">
            Review
            <textarea
              name="review"
              id="review"
              cols={87}
              rows={5}
              value={formValues.review}
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  ...{ review: event.target.value },
                });
              }}
            ></textarea>
          </label>
          <label htmlFor="liked">
            Liked
            <input
              type="checkbox"
              id="liked"
              value={formValues.liked.toString()}
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  ...{ liked: Boolean(event.target.value) },
                });
              }}
            />
          </label>
          <div className="form-buttons">
            <button id="create-entry-button">Create</button>
            <button
              id="cancel-entry-button"
              onClick={() => hideCreationModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
