import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtomNavigationBar from "./App/components/ButtomNavigationBar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <ButtomNavigationBar />
    </NavigationContainer>
  );
}
