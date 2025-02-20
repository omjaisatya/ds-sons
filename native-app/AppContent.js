import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./App/navigation";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import CustomSplashScreen from "./App/components/SplashScreen";

export default function AppContent() {
  const [appIsReady, setAppIsReady] = useState(false);
  const darkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const handleSplashFinish = () => {
    setAppIsReady(true);
  };

  if (!appIsReady) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <RootNavigator />
      <StatusBar style={darkMode ? "light" : "dark"} />
    </View>
  );
}
