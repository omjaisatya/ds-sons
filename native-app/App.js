// import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./App/store/store";
import "react-native-gesture-handler";
import AppContent from "./AppContent";
import { useEffect, useState } from "react";
import { restoreUser } from "./App/store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeProvider from "./App/theme/ThemeProvider";
import * as Font from "expo-font";
import LoadingScreen from "./App/components/LoadingScreen";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Inter_Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        store.dispatch(restoreUser(JSON.parse(user)));
      }
    };
    checkUser();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
