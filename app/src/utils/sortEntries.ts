import type { EntryType } from "../types/EntryType";
import type { SortOrder, SortType } from "../types/Sorting";

export default function sortEntries(
  entries: EntryType[],
  sortType: SortType,
  sortOrder: SortOrder,
): EntryType[] {
  const entriesCopy: EntryType[] = [...entries];

  switch (sortType) {
    case "date":
      if (sortOrder === "ascending") {
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
      if (sortOrder === "ascending") {
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
      if (sortOrder === "ascending") {
        entriesCopy.sort((a, b) => a.progress - b.progress);
      } else {
        entriesCopy.sort((a, b) => b.progress - a.progress);
      }
      break;
    case "type":
      if (sortOrder === "ascending") {
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
      if (sortOrder === "ascending") {
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
      if (sortOrder === "ascending") {
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

  return entriesCopy;
}
