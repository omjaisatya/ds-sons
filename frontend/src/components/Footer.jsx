import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../assets/stylesheet/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Fresh Ready-to-Eat delivered to your doorstep with quality and care.
          </p>
          <p>📍 Updating Location once Complete Pages</p>
          <p>📞 +91 9812****17</p>
          <p>📧 support@dsdummy.com</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Shop</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/returns">Returns & Refunds</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Information</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div> */}

        {/* Social Media & Apps */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <h3>Download Our App</h3>
          <br />
          <img
            src="/images/google-play.png"
            alt="Google Play"
            className="app-store"
          />
          <img
            src="/images/app-store.png"
            alt="App Store"
            className="app-store"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DS & Sons. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
