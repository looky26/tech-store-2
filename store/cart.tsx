import { create } from 'zustand';

import { persist } from 'zustand/middleware';


export const useCartStore = create(persist((set) => ({
  cart: [], // Initialize cart with an empty array initially

  // Function to asynchronously load cart data from localStorage
  initializeCart: async () => {
    if (typeof window !== 'undefined') {
      const savedCart = await JSON.parse(localStorage.getItem('cart') || '[]');
      set({ cart: savedCart });
    }
  },

  addToCart: (newItem:any) => {
    set((state:any) => {
      const updatedCart = [...state.cart];
      const existingItemIndex = updatedCart.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        // Item already exists in cart, update quantity
        updatedCart[existingItemIndex].quantity += newItem.quantity || 1; // Increment quantity by newItem's quantity or 1 if not provided
      } else {
        // Item doesn't exist in cart, add it
        updatedCart.push(newItem);
      }

      if (typeof window !== 'undefined') {
        // Check if running in the browser
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
      }

      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      if (typeof window !== 'undefined') {
        // Check if running in the browser
        localStorage.removeItem('cart'); // Remove cart from local storage
      }

      return { cart: [] };
    });
  },
}), {
  name: 'cart-storage', // Name for the persisted storage
}));


