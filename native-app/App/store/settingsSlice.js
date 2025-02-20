import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadSettings = createAsyncThunk("settings/load", async () => {
  try {
    const [darkMode, notifications] = await Promise.all([
      AsyncStorage.getItem("darkMode"),
      AsyncStorage.getItem("notifications"),
    ]);

    return {
      darkMode: darkMode !== null ? JSON.parse(darkMode) : false,
      notifications: notifications !== null ? JSON.parse(notifications) : true,
    };
  } catch (error) {
    console.error("Failed to load settings:", error);
    return { darkMode: false, notifications: true };
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    darkMode: false,
    notifications: true,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      state.darkMode = action.payload.darkMode;
      state.notifications = action.payload.notifications;
    });
  },
});

export const { setDarkMode, setNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
