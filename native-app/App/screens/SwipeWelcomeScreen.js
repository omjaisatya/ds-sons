import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { Button } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { checkFirstLaunch } from "../store/appSlice";

const { width, height } = Dimensions.get("window");

export default function SwipeWelcomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const finishIntro = async () => {
    try {
      await AsyncStorage.setItem("hasLaunched", "true");
      dispatch(checkFirstLaunch());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        })
      );
    } catch (error) {
      console.error("Error finishing intro:", error);
    }
  };

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      <View style={styles.slide}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to DS Sons!</Text>
          <Text style={styles.description}>
            Your one-stop shop for fresh and authentic Indian groceries.
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/slideWelcome/slide4.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Wide Range of Essentials</Text>
          <Text style={styles.description}>
            From Poha to Sattu, Mixtures, Roasted Chana, and etc. – we’ve got it
            all!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/slideWelcome/slide2.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Fast & Reliable Delivery</Text>
          <Text style={styles.description}>
            Get your groceries delivered to your doorstep, hassle-free!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/slideWelcome/slide3.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Button mode="contained" onPress={finishIntro} style={styles.button}>
          Get Started
        </Button>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
    backgroundColor: "#563A9C",
  },
  textContainer: {
    position: "absolute",
    top: 80,
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#000",
    width: "80%",
  },
  dot: {
    backgroundColor: "#8B5DFF",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#AA60C8",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
