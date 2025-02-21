import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Appbar, Button, Card, Paragraph, Text } from "react-native-paper";
import {
  selectCartItems,
  selectTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} from "../store/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Your Cart" />
      </Appbar.Header>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.title}>{item.name}</Text>
                  <Paragraph>
                    ₹{item.price} x {item.quantity}
                  </Paragraph>
                  <Paragraph>Total: ₹{item.price * item.quantity}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </Button>
                  <Button onPress={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </Button>
                  <Button onPress={() => dispatch(removeItem(item.id))}>
                    Remove
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{totalPrice}</Text>
            <Button mode="contained" onPress={() => dispatch(clearCart())}>
              Checkout
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
