import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const restoreUser = createAsyncThunk("user/restoreUser", async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(restoreUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
