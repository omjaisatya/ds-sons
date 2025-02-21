import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { toggleFavorite } from "../store/productSlice";

export default function ProductCard({ product }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites || []);

  if (!product || !product.name) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: product.id })
      }
    >
      <Card style={styles.card}>
        {product.image && (
          <Card.Cover source={{ uri: product.image }} style={styles.image} />
        )}
        <Card.Content>
          <Title style={styles.title}>{product.name}</Title>
          <Paragraph style={styles.price}>₹{product.price}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="cart-plus"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={() => dispatch(cartActions.addItem(product))}
          >
            Add to Cart
          </Button>
          <IconButton
            icon={favorites.includes(product.id) ? "heart" : "heart-outline"}
            onPress={() => dispatch(toggleFavorite(product.id))}
          />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  price: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    borderRadius: 20,
    marginVertical: 8,
    flex: 1,
  },
  buttonLabel: {
    fontSize: 12,
  },
});
