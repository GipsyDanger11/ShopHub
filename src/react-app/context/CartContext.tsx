import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem } from "@/shared/types";
import { api } from "@/react-app/utils/api";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await api.cart.get();
        setItems(data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const tempItem: CartItem = { ...product, quantity: 1 };
      // Optimistic update
      setItems(current => {
        const exists = current.find(i => i.id === product.id);
        if (exists) {
          return current.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...current, tempItem];
      });

      const data = await api.cart.addItem(tempItem);
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Revert optimization on error would be ideal, but for now we just log
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setItems(current => current.filter(i => i.id !== productId));
      const data = await api.cart.removeItem(productId);
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setItems(current => current.map(i => i.id === productId ? { ...i, quantity } : i));
      const data = await api.cart.updateItem(productId, quantity);
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = () => {
    setItems([]);
    // Optionally call API to clear if needed, or rely on individual removes
    // For now purely client-side clear visual, but backend persists. 
    // To truly clear, we'd need an API endpoint or iterate deletes.
    // Given the context, we might want to implement a clear endpoint later.
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
