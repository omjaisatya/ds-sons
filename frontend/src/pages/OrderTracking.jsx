import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("Order created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order: ", error);
  }
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const trackOrder = async () => {
    const orderDoc = await getDoc(doc(db, "orders", orderId));
    if (orderDoc.exists()) {
      setOrder(orderDoc.data());
    } else {
      alert("Order not found!");
    }
  };

  return (
    <div className="order-tracking">
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={trackOrder}>Track Order</button>
      {order && (
        <div className="order-details">
          <h3>Order Status: {order.status}</h3>
          <p>Total Amount: ₹{order.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
