import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import appLogo from "../assets/images/ds-logo.png";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <img src={appLogo} alt="DS Sons" height={40} width={150} />
        </Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/products/:id">Product Details</Link>
        </div>
        <div className="nav-icons">
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
          </div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">{cartQuantity}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
