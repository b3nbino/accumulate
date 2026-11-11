import type { MediaType } from "../types/EntryType";

export default function getMediaTagColor(mediaType: MediaType): {
  color: string;
  backgroundColor: string;
} {
  switch (mediaType) {
    case "Book":
      return { color: "rgb(0, 65, 0)", backgroundColor: "green" };
    case "Movie":
      return { color: "rgb(143, 1, 1)", backgroundColor: "red" };
    case "TV-Show":
      return { color: "rgb(0, 0, 117)", backgroundColor: "blue" };
    case "Game":
      return { color: "rgb(65, 0, 65)", backgroundColor: "purple" };
    default:
      return { color: "rgb(105, 105, 105)", backgroundColor: "darkgrey" };
  }
}
