import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    app: appReducer,
  },
});
