import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import "../assets/stylesheet/CartPage.css";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={() => console.log("Image failed to load")}
                />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">
                    ₹{item.price} x {item.quantity}
                  </p>
                  <div className="item-actions">
                    <button
                      onClick={() => dispatch(cartActions.removeItem(item.id))}
                      className="action-button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(cartActions.addItem(item))}
                      className="action-button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{totalAmount}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
