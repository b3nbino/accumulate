import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as hollowStar } from "@fortawesome/free-regular-svg-icons";
import type { ReactNode } from "react";

export function getStars(rating: number | undefined): ReactNode {
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
    stars.push(<FontAwesomeIcon icon={faStar} size="1x" key={i} />);
  }

  if (rating % 2 !== 0) {
    stars.push(<FontAwesomeIcon icon={faStarHalf} size="1x" key={"last"} />);
  }

  return <>{...stars}</>;
}
