import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useTheme, Button, ActivityIndicator } from "react-native-paper";
import {
  getAuth,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updatePhoneNumber,
} from "firebase/auth";
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
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

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

  const sendOtp = async () => {
    if (!mobile.match(/^\d{10}$/)) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setSendingOtp(true);

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${mobile}`,
        null
      );

      setVerificationId(verificationId);
      Alert.alert("OTP Sent", "Please check your SMS for the OTP.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", error.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtpAndUpdate = async () => {
    if (!verificationId || !otp.match(/^\d{6}$/)) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await updatePhoneNumber(auth.currentUser, credential);

      await updateDoc(doc(db, "users", user.uid), { mobile });

      const updatedUserData = { ...userData, mobile };
      setUserData(updatedUserData);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));

      Alert.alert("Success", "Mobile number updated successfully!");
      setVerificationId(null);
      setOtp("");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setVerifyingOtp(false);
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
        placeholder="Enter Mobile (10-digit)"
        keyboardType="phone-pad"
        placeholderTextColor={theme.colors.placeholder}
      />

      <Button
        mode="contained"
        onPress={sendOtp}
        style={styles.updateButton}
        loading={sendingOtp}
        disabled={sendingOtp}
      >
        {sendingOtp ? "Sending OTP..." : "Send OTP"}
      </Button>

      {verificationId && (
        <>
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            placeholderTextColor={theme.colors.placeholder}
          />
          <Button
            mode="contained"
            onPress={verifyOtpAndUpdate}
            style={styles.updateButton}
            loading={verifyingOtp}
            disabled={verifyingOtp}
          >
            {verifyingOtp ? "Verifying..." : "Verify OTP & Update"}
          </Button>
        </>
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
});

export default ProfileScreen;
