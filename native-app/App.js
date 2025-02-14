import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./App/store/store";
import { RootNavigator } from "./App/navigation";
import { useEffect } from "react";
import { restoreUser } from "./App/store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function App() {
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        store.dispatch(restoreUser(JSON.parse(user)));
      }
    };
    checkUser();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
  );
}
