import { Star } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number | undefined;
  size?: number;
}

const Rating: React.FC<StarRatingProps> = ({ rating = 0, size = 16 }) => (
  <>
    {Array(5)
      .fill(null)
      .map((_, i) => (
        <Star key={i} size={size} className={rating > i ? "text-yellow-500" : "text-gray-300"} />
      ))}
  </>
);

export default Rating;
