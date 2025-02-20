import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";

const ThemedText = ({ children, style, ...props }) => {
  const theme = useTheme();
  return (
    <Text style={[{ color: theme.colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
