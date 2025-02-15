// features/appSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkFirstLaunch = createAsyncThunk(
  "app/checkFirstLaunch",
  async () => {
    const hasLaunched = await AsyncStorage.getItem("hasLaunched");
    return hasLaunched === "true";
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    isFirstLaunch: false,
    appLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkFirstLaunch.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(checkFirstLaunch.fulfilled, (state, action) => {
        state.isFirstLaunch = !action.payload;
        state.appLoading = false;
      });
  },
});

export default appSlice.reducer;
