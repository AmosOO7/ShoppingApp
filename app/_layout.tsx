import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
// Import your global CSS file
import "../global.css";
import { CartProvider } from "./(home)/Components/CartContext";

export default function RootLayout() {
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <CartProvider>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={
          "pk_test_bm90ZWQtcGlyYW5oYS04Ni5jbGVyay5hY2NvdW50cy5kZXYk"
        }
      >
        <ClerkLoaded>
          <Slot />
        </ClerkLoaded>
      </ClerkProvider>
    </CartProvider>
  );
}
