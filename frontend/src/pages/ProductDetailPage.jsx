import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../store/productSlice";
import "../assets/stylesheet/ProductDetailPage.css";
import { cartActions } from "../store/cartSlice";

function ProductDetailPage() {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={() => console.log("Image failed to load")}
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-price">
            <span className="price">₹{product.price}</span> / {product.weight}
          </div>
          <button className="add-to-cart-btn" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>

      <div className="product-ingredients">
        <h2>Ingredients</h2>
        <p>{product.ingredients}</p>
      </div>

      <div className="product-dietary">
        <h2>Dietary Information</h2>
        <p>{product.dietary}</p>
      </div>

      <div className="product-reviews">
        <Reviews productId={productId} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
