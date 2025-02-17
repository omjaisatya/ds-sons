import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./App/navigation";
import { StatusBar } from "expo-status-bar";
import SplashScreenComponent from "./App/components/SplashScreen";

export default function AppContent() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootNavigator />
      <StatusBar style="auto" />
    </View>
  );
}
