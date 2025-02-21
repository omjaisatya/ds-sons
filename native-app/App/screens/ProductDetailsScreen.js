import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={styles.subtitle}>Ingredients</Text>
        <Text style={styles.text}>{product.ingredients}</Text>

        <Text style={styles.subtitle}>Customer Reviews</Text>
        <Text style={styles.text}>⭐ 4.5/5 (120 Reviews)</Text>

        <Button
          mode="contained"
          icon="cart"
          onPress={() => dispatch(cartActions.addItem(product))}
          style={styles.button}
        >
          Add to Cart
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
