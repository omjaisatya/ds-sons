import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function WelcomeScreen({ navigation }) {
  return (
    <Card style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Card.Content>
        <Title style={{ textAlign: "center" }}>
          Welcome to Our General Store
        </Title>
        <Paragraph style={{ textAlign: "center", marginVertical: 20 }}>
          Discover authentic Indian snacks like Poha, Mixture, Sattu, and more!
        </Paragraph>
      </Card.Content>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button
        mode="outlined"
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Register")}
      >
        Register
      </Button>
    </Card>
  );
}
