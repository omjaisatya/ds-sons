import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      AsyncStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
