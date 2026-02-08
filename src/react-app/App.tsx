import { BrowserRouter as Router, Routes, Route } from "react-router";
import Products from "@/react-app/pages/Products";
import Cart from "@/react-app/pages/Cart";
import { CartProvider } from "@/react-app/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
