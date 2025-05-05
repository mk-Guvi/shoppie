import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/products";

interface CartContextType {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      // Check if product is already in cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
