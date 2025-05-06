
import React from "react";
import { cn } from "../../../lib/utils";

interface SwipeIndicatorProps {
  direction: "left" | "right" | "up" | null;
}

const SwipeIndicators: React.FC<SwipeIndicatorProps> = ({ direction }) => {
  // Determine UI indicators for swipe direction
  const showLikeIndicator = direction === "right";
  const showDislikeIndicator = direction === "left";
  const showAddToCartIndicator = direction === "up";

  return (
    <>
      {/* Like Indicator */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl border-4 transition-opacity",
          showLikeIndicator ? "opacity-80 border-like" : "opacity-0 border-transparent"
        )}
      >
        <div className="bg-like text-white text-2xl font-bold px-6 py-2 rounded-full rotate-[-20deg]">
          LIKE
        </div>
      </div>
      
      {/* Dislike Indicator */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl border-4 transition-opacity",
          showDislikeIndicator ? "opacity-80 border-dislike" : "opacity-0 border-transparent"
        )}
      >
        <div className="bg-dislike text-white text-2xl font-bold px-6 py-2 rounded-full rotate-[20deg]">
          NOPE
        </div>
      </div>
      
      {/* Add to Cart Indicator */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl border-4 transition-opacity",
          showAddToCartIndicator ? "opacity-80 border-addtocart" : "opacity-0 border-transparent"
        )}
      >
        <div className="bg-addtocart text-white text-2xl font-bold px-6 py-2 rounded-full">
          CART
        </div>
      </div>
    </>
  );
};

export default SwipeIndicators;
