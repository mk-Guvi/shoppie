import React, { useState, useRef } from "react";

import SwipeIndicators from "./SwipeIndicators";
import { Product } from "../../../types/products";
import ProductCard from "../ProductCard";
import { cn } from "../../../lib/utils";

interface SwipeableCardProps {
  product: Product;
  onSwipe: (direction: "left" | "right" | "up", product: Product) => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  product,
  onSwipe,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<
    "left" | "right" | "up" | null
  >(null);
  const [isAnimatingToCart, setIsAnimatingToCart] = useState(false);
  const [isRebounding, setIsRebounding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Threshold for considering a swipe action complete
  const SWIPE_THRESHOLD = 100;

  // Amount of rotation during drag
  const ROTATION_FACTOR = 0.1;

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

    // Normal behavior for "all" filter
    setOffset({ x: deltaX, y: deltaY });

    // Determine swipe direction for visual indicator
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > SWIPE_THRESHOLD / 2) {
        setSwipeDirection(deltaX > 0 ? "right" : "left");
      } else {
        setSwipeDirection(null);
      }
    } else if (deltaY < -SWIPE_THRESHOLD / 2) {
      setSwipeDirection("up");
    } else {
      setSwipeDirection(null);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;

    // Normal behavior for "all" filter
    if (Math.abs(offset.x) > SWIPE_THRESHOLD) {
      // Horizontal swipe
      onSwipe(offset.x > 0 ? "right" : "left", product);
    } else if (offset.y < -SWIPE_THRESHOLD) {
      // Upward swipe - add to cart animation
      setIsAnimatingToCart(true);

      // Wait for the animation to complete, then call onSwipe
      setTimeout(() => {
        onSwipe("up", product);
        setIsAnimatingToCart(false);
      }, 600); // Animation duration
    } else {
      // Incomplete swipe - animate back to center with rebound
      setIsRebounding(true);

      // Reset position
      setOffset({ x: 0, y: 0 });
      setSwipeDirection(null);

      // Clear rebound state after animation completes
      setTimeout(() => {
        setIsRebounding(false);
      }, 300); // Match this with CSS transition duration
    }

    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Calculate rotation based on horizontal offset
  const rotation = offset.x * ROTATION_FACTOR;

  return (
    <div
      ref={cardRef}
      className={cn(
        "swipeable-card absolute w-full h-full",
        {
          "animate-swipe-right": swipeDirection === "right" && !isDragging,
          "animate-swipe-left": swipeDirection === "left" && !isDragging,
          "animate-swipe-up":
            swipeDirection === "up" && !isDragging && !isAnimatingToCart,
          "animate-to-cart": isAnimatingToCart,
          "animate-rebound": isRebounding,
        },
        className
      )}
      style={{
        transform: isDragging
          ? `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`
          : undefined,
        transition: isDragging ? "none" : "transform 0.3s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ProductCard product={product} />

      {/* Swipe Direction Indicators */}
      <SwipeIndicators direction={swipeDirection} />
    </div>
  );
};

export default SwipeableCard;
