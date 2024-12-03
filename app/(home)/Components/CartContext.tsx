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
  quantity: number; // Quantity of the item in the cart
};

// Define the context type
type CartContextType = {
  check: number;
  count: number;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void; // Remove item by title
  checkProduct: (pro: CartItem) => void;
  setCheck: (check: number) => void;
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0); // Total items in the cart
  const [check, setCheck] = useState(0); // Check count for current product

  useEffect(() => {
    setCheck(check - 1);
  }, []);

  // Function to check if a product is already in the cart
  const checkProduct = (pro: CartItem) => {
    const existingItem = cart.find((item) => item.title === pro.title);
    setCheck(existingItem ? existingItem.quantity : 0); // Set check to quantity if found
  };

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.title === item.title
      );

      if (existingItem) {
        // If the item already exists, increase its quantity
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCount((prevCount) => prevCount + 1); // Increment the total count
        checkProduct(item); // Update check count
        return updatedCart;
      } else {
        // Add new item with quantity of 1
        const newItem = { ...item, quantity: 1 };
        setCount((prevCount) => prevCount + 1); // Increment total count
        checkProduct(newItem); // Update check count
        return [...prevCart, newItem];
      }
    });
  };

  // Function to remove an item from the cart by title
  const removeFromCart = (title: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === title);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Reduce quantity if greater than 1
          const updatedCart = prevCart.map((item) =>
            item.title === title
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          setCount((prevCount) => prevCount - 1); // Decrease total count
          setCheck(1); // Decrease check count
          return updatedCart;
        } else {
          // Remove item if quantity is 1
          const updatedCart = prevCart.filter((item) => item.title !== title);
          setCount((prevCount) => prevCount - 1); // Decrease total count
          setCheck(0); // Reset check count
          return updatedCart;
        }
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        count,
        cart,
        addToCart,
        removeFromCart,
        check,
        checkProduct,
        setCheck,
      }}
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
