import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the cart item
type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  desc: string;
  discount: number;
  userName: string;
};

// Define the context type
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap around the app
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log("Cart after adding:", [...cart, item]); // Log after updating
  };

  // Function to remove an item from the cart by ID
  const removeFromCart = (id: string) => {
    // Log the id passed
    if (cart.length > 0) {
      const itemToRemove: any = cart.find(
        (item) => item.id === cart[cart.length - 1].id
      );
      setCart(cart.filter((item) => item.id !== itemToRemove.id));
    }
    console.log(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
