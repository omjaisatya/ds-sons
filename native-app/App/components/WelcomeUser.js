import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const WelcomeUser = ({ username }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">Welcome, {username || "Server Error"}</Text>
      </Card.Content>
    </Card>
  );
};

export default WelcomeUser;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
