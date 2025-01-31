import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import appLogo from "../assets/images/ds-logo.png";
import { useState } from "react";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <img src={appLogo} alt="DS Sons" height={40} width={150} />
        </Link>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <div className="nav-icons">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Link
              to={`/products?search=${searchQuery}`}
              className="search-link"
            >
              <FaSearch className="search-icon" />
            </Link>
          </div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartQuantity > 0 && (
              <span className="cart-count">{cartQuantity}</span>
            )}
            {/* <span className="cart-count">{cartQuantity}</span> */}
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </li>
        </li>
      </ul>
    </header>
  );
};

export default Header;
