import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Inter_Regular: require("../../assets/fonts/Inter_Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash-light.png")}
        style={styles.logo}
      />
      <Text style={styles.footerText}>Satya Prakash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    fontSize: 14,
    color: "#667781",
    fontFamily: "Inter_Regular",
  },
});
