import React, { useState, useEffect, useCallback } from "react";
import { Product } from "../../../types/products";
import { useCart } from "../../../contexts/CartContext";
import { cn } from "../../../lib/utils";
import EmptyStateCard from "../../../components/cards/EmptyStateCard";
import ProductSkeleton from "../../../components/loaders/ProductSkeleton";
import SwipeableCard from "../../../components/cards/swipeableCard";
import { products } from "../../../data/productData";
import ProductCard from "../../../components/cards/ProductCard";
import { suspenseApi } from "../../../lib/utils";

interface CardStackProps {
  className?: string;
}

const pageSize = 3;
const cardStacks=[0, 1, 2]
type CartPageState = {
  isLoadingMore: boolean;
  currentPage: number;
  totalPages: number;
};
const CardStack: React.FC<CardStackProps> = ({ className }) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartPageState, setCartPageState] = useState<CartPageState>({
    isLoadingMore: true,
    currentPage: 1,
    totalPages: 1,
  });

  // Initialize with first page of products
  useEffect(() => {
    loadProducts(cartPageState);
  }, []);

  const handlePageState = (newState: Partial<CartPageState>) => {
    setCartPageState((prev) => ({ ...prev, ...newState }));
  };
  // Simulate an API call to fetch more products
  const loadProducts = async (cartPageState: CartPageState) => {
    
    if (cartPageState?.totalPages >= cartPageState?.currentPage) {
      handlePageState({ isLoadingMore: true });
      await suspenseApi(2000);
      handlePageState({
        ...cartPageState,
        isLoadingMore: false,
        totalPages: products.length,
      });
    }
  };

  // Handle swipe action on card
  const handleSwipe = (
    direction: "left" | "right" | "up",
    product: Product
  ) => {
    if (isAnimating || cartPageState.isLoadingMore) return; // Prevent actions during animation or loading

    setIsAnimating(true);

    // Timeout to wait for animation to finish
    setTimeout(() => {
      if (direction === "up") {
        addToCart(product);
      }
      moveNext();
      setIsAnimating(false);
    }, 300); // Match this with animation duration
  };

  // Move to next card
  const moveNext = () => {
    setCartPageState((prev) => {
      const currentPage = prev.currentPage + 1;

      if (
        currentPage <= prev.totalPages &&
        currentPage % (pageSize + 1) === 0 &&
        !prev.isLoadingMore
      ) {
        loadProducts({
          ...prev,
          currentPage,
        });
      }
      return {
        ...prev,
        currentPage,
      };
    });
  };

  const onRefresh=useCallback(() => {
    handlePageState({
      currentPage: 1,
      totalPages: products.length,
    });
  },[])

  return (
    <div
      className={cn(
        "flex flex-col justify-center h-full overflow-hidden items-center w-full ",
        className
      )}
    >
      <div className="relative w-full aspect-[3/4] max-w-[250px] mb-6">
        {/* Show empty state when appropriate */}
        {cartPageState.isLoadingMore ? (
          <ProductSkeleton />
        ) : cartPageState.currentPage > cartPageState.totalPages ||
          products?.length === 0 ? (
          <EmptyStateCard
            title="That's all for now!"
            description="You've seen all the products in this category."
            buttonText="Refresh"
            showButton={true}
            onAction={onRefresh}
          />
        ) : (
          <>
            {cardStacks.map((offset) => {
              const product = products[cartPageState.currentPage - 1];
              return !product ? null : (
                <div
                  key={`${product?.id}-${offset}`}
                  className={cn(
                    "absolute inset-0",
                    offset === 0 ? "z-30" : offset === 1 ? "z-20 " : "z-10 "
                  )}
                >
                  {offset === 0 ? (
                    <SwipeableCard product={product} onSwipe={handleSwipe} />
                  ) : (
                    <ProductCard product={product} />
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
      {cartPageState.totalPages &&
      cartPageState.currentPage <= cartPageState.totalPages ? (
        <div className="text-sm text-gray-500 mt-2">
          {cartPageState.currentPage} of {cartPageState.totalPages}
        </div>
      ) : null}
    </div>
  );
};

export default CardStack;
