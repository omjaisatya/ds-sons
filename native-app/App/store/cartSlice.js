import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : { items: [], totalQuantity: 0 };
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return { items: [], totalQuantity: 0 };
  }
};

const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      saveCartToStorage(state);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      saveCartToStorage(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      AsyncStorage.removeItem("cart");
    },
  },
});

export const cartActions = cartSlice.actions;

export const loadCart = () => async (dispatch) => {
  const cart = await loadCartFromStorage();
  dispatch(cartActions.setCart(cart));
};

export default cartSlice.reducer;
