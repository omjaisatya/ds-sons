import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import ButtomNavigationBar from "../navigation/ButtomNavigationBar";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        setStoredUser(JSON.parse(savedUser));
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user || storedUser ? (
        <Stack.Screen name="HomeApp" component={ButtomNavigationBar} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
