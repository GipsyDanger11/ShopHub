import { Link } from "react-router";
import { useCart } from "@/react-app/context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/react-app/components/Header";
import WavesBackground from "@/react-app/components/WavesBackground";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <WavesBackground />
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-24 h-24 text-purple-300 mb-6" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-3">
              Your cart is empty
            </h2>
            <p className="text-purple-700 mb-8">
              Add some products to get started
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <WavesBackground />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-purple-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-purple-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm text-purple-700 mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 rounded-lg border border-purple-300 hover:bg-purple-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-purple-700" />
                        </button>
                        
                        <span className="text-lg font-medium text-purple-900 w-12 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 rounded-lg border border-purple-300 hover:bg-purple-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-purple-700" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-purple-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-purple-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-purple-700">
                  <span>Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-purple-700">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-purple-200 pt-3">
                  <div className="flex justify-between text-lg font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
                Proceed to Checkout
              </button>

              <p className="text-xs text-purple-600 text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
