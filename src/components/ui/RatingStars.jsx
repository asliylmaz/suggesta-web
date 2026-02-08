import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RatingStars({ rating, max = 10, size = 16, interactive = false, onRatingChange, className }) {
    const [hoverRating, setHoverRating] = React.useState(0);

    const stars = Array.from({ length: max }, (_, i) => i + 1);

    const isActive = (starValue) => {
        if (interactive && hoverRating > 0) {
            return starValue <= hoverRating;
        }
        return starValue <= rating;
    };

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {stars.map((starValue) => (
                <button
                    key={starValue}
                    type={interactive ? "button" : "div"}
                    onClick={() => interactive && onRatingChange?.(starValue)}
                    onMouseEnter={() => interactive && setHoverRating(starValue)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    disabled={!interactive}
                    className={cn(
                        "transition-all duration-200 focus:outline-none",
                        interactive && "hover:scale-110 active:scale-95 cursor-pointer",
                        !interactive && "cursor-default"
                    )}
                >
                    <Star
                        size={size}
                        className={cn(
                            "transition-colors duration-200",
                            isActive(starValue)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted border-none fill-none"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
