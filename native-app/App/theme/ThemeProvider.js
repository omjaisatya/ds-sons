import React from "react";
import { useSelector } from "react-redux";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";

const fontConfig = {
  regular: {
    fontFamily: "Roboto-Regular",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "Roboto-Medium",
    fontWeight: "normal",
  },
  light: {
    fontFamily: "Roboto-Light",
    fontWeight: "normal",
  },
  thin: {
    fontFamily: "Roboto-Thin",
    fontWeight: "normal",
  },
};

export const lightTheme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF6F61",
    accent: "#FFD166",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#333333",
    placeholder: "#B0BEC5",
    success: "#06D6A0",
    error: "#EF476F",
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 12,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FF6F61",
    accent: "#FFD166",
    background: "#1E1E1E",
    surface: "#292929",
    text: "#E0E0E0",
    placeholder: "#A0A0A0",
    success: "#06D6A0",
    error: "#EF476F",
  },
  fonts: configureFonts({ config: fontConfig }),
};

const ThemeProvider = ({ children }) => {
  const darkMode = useSelector((state) => state.settings.darkMode);

  return (
    <PaperProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;
