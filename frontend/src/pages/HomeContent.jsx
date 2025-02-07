import { Link } from "react-router-dom";
import "../assets/stylesheet/HomeContent.css";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import { selectCategories, selectProducts } from "../store/productSlice";
import Footer from "../components/Footer";

function HomeContent() {
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const product1 = products[0];
  const product2 = products[1];
  const product3 = products[2];
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home-container">
      <HomePage />
      <section className="hero-container">
        <div className="hero-content">
          <h1>Fresh Snacks Delivered to Your Doorstep</h1>
          <p>
            Shop fresh Sattu, Roasted Channa, Poha, and more at the best prices.
          </p>
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-item">
            <img src={product1.image} alt={product1.name} />
            <p>{product1.name}</p>
            <span>
              ₹{product1.price} / {product1.weight}
            </span>
          </div>

          <div className="product-item">
            <img src={product2.image} alt={product2.name} />
            <p>{product2.name}</p>
            <span>
              ₹{product2.price} / {product2.weight}
            </span>
          </div>

          <div className="product-item">
            <img src={product3.image} alt={product3.name} />
            <p>{product3.name}</p>
            <span>
              ₹{product3.price} / {product3.weight}
            </span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Get Fresh Snacks Delivered Instantly!</h2>
        {!user ? (
          <>
            <p>
              Sign up now and enjoy exclusive discounts on your first order.
            </p>
            <Link to="/register" className="btn-secondary">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <p>Ready to order more delicious snacks?</p>
            <p>Discover fresh produce, dairy, and more at unbeatable prices!</p>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default HomeContent;
