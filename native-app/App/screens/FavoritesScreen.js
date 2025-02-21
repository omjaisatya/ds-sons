import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const favoriteIds = useSelector((state) => state.products.favorites);
  const products = useSelector((state) => state.products.products);

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <View style={styles.container}>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet!</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: item.id })
              }
            >
              <Card style={styles.card}>
                <Card.Title title={item.name} subtitle={`₹${item.price}`} />
                <Card.Content>
                  <Text>{item.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() =>
                      navigation.navigate("ProductDetails", {
                        productId: item.id,
                      })
                    }
                  >
                    View Details
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});
