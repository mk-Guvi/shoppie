import logo from "../../assets/logo.webp";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
function Navbar() {
  const { items } = useCart();
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  useEffect(() => {
    setIsCartAnimating(true);
    const timer = setTimeout(() => {
      setIsCartAnimating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        <img src={logo} className="w-24" alt="Shoppie" />
        <div
          aria-label="Shopping cart"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
        >
          <ShoppingCart
            className={cn(
              "h-5 w-5 transition-transform",
              isCartAnimating ? "animate-cart-bounce" : ""
            )}
          />
          <span
            className={cn(
              "absolute -top-1 -right-1 bg-primary text-xs text-white rounded-full w-5 h-5 flex items-center justify-center",
              items.length > 0 && isCartAnimating ? "animate-cart-bounce" : ""
            )}
          >
            {items.length}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
