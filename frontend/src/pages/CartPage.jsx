import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price} x {item.quantity}
                  </p>
                  <div className="item-actions">
                    <button
                      onClick={() => dispatch(cartActions.removeItem(item.id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(cartActions.addItem(item))}>
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
