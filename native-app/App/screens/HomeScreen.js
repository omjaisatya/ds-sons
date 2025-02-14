import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            await AsyncStorage.setItem("userData", JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const loadUserFromStorage = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data from storage:", error);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
      } else {
        await AsyncStorage.removeItem("userData");
        setUserData(null);
      }
    });

    loadUserFromStorage();

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userData"); // Clear stored user data
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="Welcome!"
          subtitle={userData?.name || "Failed to Load Name"}
        />
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
});
