import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Home Screen!</Text>
      <Button title="Logout" />
    </View>
  );
};

export default HomeScreen;
