import { Link } from "react-router-dom";
import "../assets/stylesheet/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="user-page">
      <h1>We&apos;re Working on This Page!</h1>
      <p>
        This section is under development. We appreciate your patience while we
        bring you an amazing shopping experience.
      </p>
      <p>For any inquiries, feel free to contact the page owner.</p>

      <div className="user-options">
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
        <Link to="/contact" className="btn-secondary">
          Contact Support
        </Link>
      </div>

      <div className="info-box">
        <h3>What&apos;s Coming Soon?</h3>
        <ul>
          <li>Secure Payments Methods</li>
          <li>Exclusive member discounts</li>
          <li>Order history & tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorPage;
