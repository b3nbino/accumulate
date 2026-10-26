interface CreateEntryModalProps {
  displayCreationModal: boolean;
  hideCreationModal: () => void;
}

export default function CreateEntryModal({
  displayCreationModal,
  hideCreationModal,
}: CreateEntryModalProps) {
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
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <label htmlFor="title">
              Title
              <input type="text" id="title" />
            </label>
          </div>
          <div>
            <label htmlFor="mediaType">
              Media Type
              <input type="text" id="mediaType" />
            </label>
          </div>
          <div>
            <label htmlFor="releaseDate">
              Release Date
              <input type="date" id="releaseDate" />
            </label>
            <label htmlFor="startDate">
              Start Date
              <input type="date" id="startDate" />
            </label>
            <label htmlFor="finishDate">
              Finish Date
              <input type="date" id="finishDate" />
            </label>
          </div>
          <div>
            <label htmlFor="progressType">
              Progress Type
              <input type="text" id="progressType" />
            </label>
            <label htmlFor="totalLength">
              Max Progress
              <input type="number" id="totalLength" />
            </label>
            <label htmlFor="progress">
              Progress
              <input type="number" id="progress" />
            </label>
          </div>
          <div>
            <label htmlFor="status">
              Status
              <select name="status" id="status">
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
                <option value="plan to watch">Plan to Watch</option>
                <option value="on-hold">On-hold</option>
                <option value="dropped">Dropped</option>
              </select>
            </label>
            <label htmlFor="rating">
              Rating (x/10)
              <input type="number" id="rating" max={10} min={0} />
            </label>
          </div>
          <label htmlFor="review">
            Review
            <textarea name="review" id="review" cols={87} rows={5}></textarea>
          </label>
          <label htmlFor="liked">
            Liked
            <input type="checkbox" id="liked" />
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
