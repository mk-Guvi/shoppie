import React from "react";
import { cn } from "../../../lib/utils";

interface SwipeIndicatorProps {
  direction: "left" | "right" | "up" | null;
}

interface IndicatorConfig {
  direction: "left" | "right" | "up";
  borderColor: string;
  bgColor: string;
  text: string;
  rotation: string;
}
const indicators: IndicatorConfig[] = [
  {
    direction: "right",
    borderColor: "border-like",
    bgColor: "bg-like",
    text: "LIKE",
    rotation: "rotate-[-20deg]",
  },
  {
    direction: "left",
    borderColor: "border-dislike",
    bgColor: "bg-dislike",
    text: "NOPE",
    rotation: "rotate-[20deg]",
  },
  {
    direction: "up",
    borderColor: "border-addtocart",
    bgColor: "bg-addtocart",
    text: "CART",
    rotation: "",
  },
];

const SwipeIndicators: React.FC<SwipeIndicatorProps> = ({ direction }) => {
  return (
    <>
      {indicators.map((indicator) => (
        <div
          key={indicator.direction}
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl border-4 transition-opacity",
            direction === indicator.direction
              ? `opacity-80 ${indicator.borderColor}`
              : "opacity-0 border-transparent"
          )}
        >
          <div
            className={cn(
              `${indicator.bgColor} text-white text-lg font-bold px-3 py-2 rounded-full`,
              indicator.rotation
            )}
          >
            {indicator.text}
          </div>
        </div>
      ))}
    </>
  );
};

export default SwipeIndicators;
