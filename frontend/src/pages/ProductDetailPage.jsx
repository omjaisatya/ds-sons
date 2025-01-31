import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";
import { selectProductById } from "../store/productSlice";

function ProductDetailPage() {
  const { productId } = useParams();

  const product = useSelector((state) => selectProductById(state, productId)); // Fetch product from Redux store

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>
        <strong>Price:</strong> ₹{product.price} / {product.weight}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Ingredients:</strong> {product.ingredients}
      </p>
      <p>
        <strong>Dietary:</strong> {product.dietary}
      </p>
      <Reviews productId={productId} />
    </div>
  );
}

export default ProductDetailPage;
