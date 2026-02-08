import { Link } from "react-router";
import { ShoppingCart, Store, LogIn } from "lucide-react";
import { useCart } from "@/react-app/context/CartContext";

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:from-purple-700 hover:to-purple-900 transition-all">
            <Store className="w-6 h-6 text-purple-600" />
            ShopHub
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Login</span>
            </button>
            
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5 text-purple-700" />
              <span className="font-medium text-purple-700">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
