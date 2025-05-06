import React from "react";
import { cn } from "../../lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full h-full bg-white rounded-xl overflow-hidden flex flex-col shadow-md animate-pulse",
        className
      )}
    >
      {/* Image Skeleton */}
      <div className="relative w-full h-[60%] bg-gray-200">
        <div className="absolute top-3 left-3 bg-gray-300 w-10 h-5 rounded-full" />
      </div>

      {/* Details Skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-baseline">
            <div className="h-5 bg-gray-200 rounded w-12 mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
