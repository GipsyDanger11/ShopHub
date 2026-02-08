import type { Product } from "@/data/products";
import { useCart } from "@/react-app/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-purple-200 hover:border-purple-400">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-purple-700 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
            ₹{product.price.toFixed(2)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
