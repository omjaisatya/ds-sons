import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="Welcome!" subtitle={userData?.name} />

        <Card.Actions>
          <Button mode="contained" onPress={handleLogout} icon="logout">
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    paddingVertical: 10,
  },
  userInfo: {
    marginTop: 10,
  },
});
