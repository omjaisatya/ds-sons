import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useTheme, Button, ActivityIndicator } from "react-native-paper";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const theme = useTheme();
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setName(data.name || "");
            setMobile(data.mobile);
            await AsyncStorage.setItem("userData", JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const loadUserFromStorage = async () => {
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

  const handleUpdateProfile = async () => {
    if (!user) return;
    setUpdating(true);
    try {
      await updateProfile(user, { displayName: name, mobile });
      await updateDoc(doc(db, "users", user.uid), { name, mobile });
      const updatedUserData = { ...userData, name, mobile };
      setUserData(updatedUserData);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={theme.colors.placeholder}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={mobile}
        onChangeText={setMobile}
        placeholder="Enter Mobile"
        placeholderTextColor={theme.colors.placeholder}
      />

      {updating ? (
        <ActivityIndicator animating={true} />
      ) : (
        <Button
          mode="contained"
          onPress={handleUpdateProfile}
          style={styles.updateButton}
        >
          Update Profile
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  updateButton: {
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  logoutButton: {
    marginTop: 30,
  },
  authMessage: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});

export default ProfileScreen;
