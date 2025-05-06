import React from "react";
import { Product } from "../../types/products";
import { cn } from "../../lib/utils";


interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className='' }) => {
  // Calculate discount percentage if there's an original price
  const discountPercentage = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div
      className={cn(
        "w-full h-full bg-white rounded-xl overflow-hidden flex flex-col card-shadow",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative w-full h-[60%] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {discountPercentage && (
          <div className="absolute top-3 left-3 bg-discount text-white px-2 py-1 rounded-full text-xs font-medium">
            -{discountPercentage}%
          </div>
        )}
        {/* <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {product.brand}
        </div> */}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-2 flex-grow">
          {product.brand}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-baseline">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
