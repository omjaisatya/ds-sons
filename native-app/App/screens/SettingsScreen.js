import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  List,
  Switch,
  Divider,
  Button,
  ActivityIndicator,
  Snackbar,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDarkMode, setNotifications } from "../store/settingsSlice";
import { logout } from "../store/userSlice";
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = () => {
  const theme = useTheme();
  const auth = getAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { darkMode, notifications } = useSelector((state) => state.settings);
  const { status } = useSelector((state) => state.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userData");
      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const persistSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving setting:", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
      }}
    >
      <List.Section>
        <List.Subheader style={{ color: theme.colors.text }}>
          Preferences
        </List.Subheader>
        <List.Item
          title="Dark Mode"
          titleStyle={{ color: theme.colors.text }}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={(value) => {
                dispatch(setDarkMode(value));
                persistSetting("darkMode", value);
              }}
            />
          )}
        />
        <List.Item
          title="Enable Notifications"
          titleStyle={{ color: theme.colors.text }}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={(value) => {
                dispatch(setNotifications(value));
                persistSetting("notifications", value);
              }}
            />
          )}
        />
      </List.Section>

      <Divider style={{ backgroundColor: theme.colors.placeholder }} />

      <List.Section>
        <List.Subheader style={{ color: theme.colors.text }}>
          Account
        </List.Subheader>
        <List.Item
          title="Profile"
          description="Edit your profile details"
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.placeholder }}
          left={() => <List.Icon icon="account" color={theme.colors.primary} />}
          onPress={() => navigation.navigate("Profile")}
        />
        <List.Item
          title="Security"
          description="Change password and security settings"
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.placeholder }}
          left={() => (
            <List.Icon icon="shield-lock" color={theme.colors.primary} />
          )}
          onPress={() => navigation.navigate("Security")}
        />
      </List.Section>

      <Divider style={{ backgroundColor: theme.colors.placeholder }} />

      <List.Section>
        <List.Subheader style={{ color: theme.colors.text }}>
          Support
        </List.Subheader>
        <List.Item
          title="Help & Support"
          titleStyle={{
            color: theme.colors.text,
            fontFamily: theme.fonts.light.fontFamily,
          }}
          left={() => (
            <List.Icon
              icon="help-circle-outline"
              color={theme.colors.primary}
            />
          )}
          onPress={() => navigation.navigate("Support")}
        />
        <List.Item
          title="About"
          titleStyle={{ color: theme.colors.text }}
          left={() => (
            <List.Icon
              icon="information-outline"
              color={theme.colors.primary}
            />
          )}
          onPress={() => navigation.navigate("About")}
        />
      </List.Section>

      <Divider style={{ backgroundColor: theme.colors.placeholder }} />

      <View style={{ margin: 20, alignItems: "center" }}>
        {isLoggingOut ? (
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        ) : (
          <>
            <Button
              mode="contained"
              onPress={handleLogout}
              disabled={status === "loading"}
              style={{
                width: "100%",
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
              }}
            >
              Logout
            </Button>
            {logoutError ? (
              <Snackbar
                visible={true}
                onDismiss={() => setLogoutError("")}
                style={{ backgroundColor: theme.colors.error }}
              >
                {logoutError}
              </Snackbar>
            ) : null}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
