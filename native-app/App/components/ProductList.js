import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductList = ({ searchQuery, selectedCategory }) => {
  const products = useSelector((state) => state.products.products) || [];
  const favoriteProducts = useSelector((state) => state.products.favorites);

  const filteredProducts = products.filter(
    (item) =>
      (selectedCategory === "all" ||
        item.category === selectedCategory ||
        (selectedCategory === "favorites" &&
          favoriteProducts.includes(item.id))) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {filteredProducts.length === 0 ? (
        <View style={styles.noProducts}>
          <Text>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
        />
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
