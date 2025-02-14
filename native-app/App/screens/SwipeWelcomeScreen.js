import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
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
    <Swiper loop={false} dotColor="#ccc" activeDotColor="#ff9800">
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.slide}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}> Welcome to DS & Sons! </Text>
          <Text style={styles.subtitle}>
            Your One-Stop Shop for Authentic Indian Groceries
          </Text>
        </View>
      </ImageBackground>

      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.slide}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}> Fresh, Organic & Handpicked! </Text>
          <Text style={styles.subtitle}>
            Discover farm-fresh Sattu, Poha, Chivda & more.
          </Text>
        </View>
      </ImageBackground>

      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.slide}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}> Get Groceries Delivered Fast!</Text>
          <Text style={styles.subtitle}>
            Easy shopping, quick checkout, and doorstep delivery.
          </Text>
          <Button mode="contained" style={styles.button} onPress={finishIntro}>
            Get Started
          </Button>
        </View>
      </ImageBackground>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#f1f1f1",
  },
  button: {
    marginTop: 20,
    // backgroundColor: "#ff9800",
  },
});
