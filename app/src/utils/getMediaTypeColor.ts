import type { MediaType } from "../types/EntryType";

export default function getMediaTypeColor(mediaType: MediaType): string {
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
