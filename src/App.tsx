import Navbar from "./components/bars/Navbar";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./contexts/CartContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <CartProvider>
      <Toaster />
      <div className="h-[100dvh] w-[100dvw] flex flex-col bg-background overflow-x-hidden overflow-y-auto">
        <Navbar />
        <section className="flex-1  h-full overflow-y-auto overflow-x-hidden">
          <HomePage />
        </section>
      </div>
    </CartProvider>
  );
}

export default App;
