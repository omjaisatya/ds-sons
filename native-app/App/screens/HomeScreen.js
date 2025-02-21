import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Badge, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../components/LoadingScreen";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import WelcomeUser from "../components/WelcomeUser";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  const dispatch = useDispatch();
  const auth = getAuth();
  const navigation = useNavigation();
  const totalItems = useSelector((state) => state.cart?.totalQuantity || 0);

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
      if (currentUser) {
        await fetchUserData(currentUser);
      } else {
        await AsyncStorage.removeItem("userData");
        setUserData(null);
      }
    });

    const loadSearches = async () => {
      const searches = await AsyncStorage.getItem("recentSearches");
      setRecentSearches(searches ? JSON.parse(searches) : []);
    };
    loadSearches();
    loadUserFromStorage();

    return () => unsubscribe();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const updatedSearches = [
      query,
      ...recentSearches.filter((q) => q !== query),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const renderHeader = () => (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Our Products" />
        <View style={{ position: "relative" }}>
          <Appbar.Action
            icon="cart"
            onPress={() => navigation.navigate("Cart")}
          />
          {totalItems > 0 && (
            <Badge
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "red",
              }}
            >
              {totalItems}
            </Badge>
          )}
        </View>
      </Appbar.Header>

      <WelcomeUser username={userData?.name} />

      <Searchbar
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 16 }}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={[{ key: "content" }]}
      renderItem={() => (
        <ProductList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

export default HomeScreen;
