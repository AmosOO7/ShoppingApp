import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  check: number;
  count: number;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  checkProduct: any;
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap around the app
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0); // Initialize count to 0
  const [check, setCheck] = useState(0);

  useEffect(() => {
    setCheck(check - 1);
  }, []);

  // Function to check if product is already in the cart
  const checkProduct = (pro: any) => {
    // Iterate through the cart to check for matching title
    const existingProduct = cart.filter((item) => item.title === pro.title);

    if (existingProduct.length > 0) {
      // If the product is found in the cart, update check with the count of matching products
      setCheck(existingProduct.length);
    } else {
      // If not found, reset the check count to 0
      setCheck(0);
    }
  };

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
    setCount((prevCount) => prevCount + 1); // Increment the count when an item is added
  };

  // Function to remove an item from the cart by ID
  const removeFromCart = (id: string) => {
    // Filter out the item by the exact ID passed in
    const updatedCart = cart.filter((item) => item.id !== id);

    // Update the cart and count
    setCart(updatedCart);
    setCount(updatedCart.length); // Update the count to reflect the new cart size
    setCheck(check - 1);
  };

  return (
    <CartContext.Provider
      value={{ count, cart, addToCart, removeFromCart, check, checkProduct }}
    >
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
