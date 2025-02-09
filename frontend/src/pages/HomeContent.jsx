import { Link } from "react-router-dom";
import "../assets/stylesheet/HomeContent.css";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import { selectCategories, selectProducts } from "../store/productSlice";
import Footer from "../components/Footer";
import {
  FaCheckCircle,
  FaExchangeAlt,
  FaHeadset,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";
import CustomerReviews from "../components/CustomerReviews";

function HomeContent() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Fast & Secure Payments",
      desc: "Multiple payment options",
    },
    {
      icon: <FaShippingFast />,
      title: "Quick Delivery",
      desc: "Get your order within 24-48 hours",
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Assurance",
      desc: "100% genuine & fresh products",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Easy Returns & Refunds",
      desc: "Hassle-free policies",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Customer Support",
      desc: "Always available to help",
    },
  ];

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
          <p>
            Enjoy the goodness of fresh Sattu, Roasted Channa, Poha, and
            more—all sourced with care to <br />
            bring you the best quality at unbeatable prices. Perfect for healthy
            snacking and everyday essentials. <br /> Order now and get them
            delivered straight to your home!
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
            <p>
              Ready to order more delicious snacks? <br /> Discover fresh
              produce, dairy, and more at unbeatable prices! <br /> Shop from a
              wide range products with amazing discounts and quick delivery.
            </p>
          </>
        )}
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CustomerReviews />
      <section className="about-us">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Welcome to <strong>D S & Sons</strong>, your trusted online
            marketplace for high-quality products. We bring the best deals with
            a seamless shopping experience. Enjoy fast delivery, secure
            payments, and customer-friendly services!
          </p>
          <Link to="/about" className="cta-button">
            Learn More About Us
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomeContent;
