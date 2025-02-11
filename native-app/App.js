import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./App/context/AuthContext";
import { AppNavigator } from "./App/Navigator/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
