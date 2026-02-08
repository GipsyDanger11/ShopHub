/**
 * @deprecated This static data has been migrated to MongoDB.
 * Please use the API to fetch products.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium wireless headphones with noise cancellation",
    category: "Audio"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Feature-rich smartwatch with health tracking",
    category: "Wearables"
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Ergonomic aluminum laptop stand",
    category: "Accessories"
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop",
    description: "RGB mechanical keyboard with custom switches",
    category: "Peripherals"
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description: "Precision wireless mouse for productivity",
    category: "Peripherals"
  },
  {
    id: "6",
    name: "USB-C Hub",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    description: "Multi-port USB-C hub with 4K HDMI support",
    category: "Accessories"
  },
  {
    id: "7",
    name: "Portable Charger",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    description: "20,000mAh portable power bank",
    category: "Accessories"
  },
  {
    id: "8",
    name: "Phone Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
    description: "Premium protective phone case",
    category: "Accessories"
  }
];
