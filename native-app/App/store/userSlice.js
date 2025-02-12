import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user");
    },
    restoreUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { login, logout, restoreUser } = userSlice.actions;
export default userSlice.reducer;
