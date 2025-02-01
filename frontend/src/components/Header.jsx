import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import appLogo from "../assets/images/ds-logo.png";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { authActions } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(authActions.setUser(currentUser));
      } else {
        dispatch(authActions.logout());
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
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
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/track-order">Track Order</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
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
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
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
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </li>
          <li>
            <Link to="/track-order" onClick={() => setMenuOpen(false)}>
              Track Order
            </Link>
          </li>
        </li>
        {!user ? (
          <>
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
          </>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
