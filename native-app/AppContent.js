import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./App/navigation";
import { StatusBar } from "expo-status-bar";
import CustomSplashScreen from "./App/components/SplashScreen";

export default function AppContent() {
  const [appIsReady, setAppIsReady] = useState(false);

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
      <StatusBar style="auto" />
    </View>
  );
}
