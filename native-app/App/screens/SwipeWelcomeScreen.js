import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { Button } from "react-native-paper";

export default function SwipeWelcomeScreen({ navigation }) {
  const finishIntro = async () => {
    await AsyncStorage.setItem("hasLaunched", "true");
    console.log("Navigating Route");
    navigation.navigate("Welcome");
  };

  return (
    <Swiper loop={false}>
      <View style={styles.slide}>
        <Text style={styles.text}>Welcome to Our Store!</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Discover Authentic Indian Snacks</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Start Shopping Now!</Text>
        <Button mode="contained" onPress={finishIntro}>
          Get Started
        </Button>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
