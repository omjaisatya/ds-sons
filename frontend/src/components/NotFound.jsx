import { Link } from "react-router-dom";
import "../assets/stylesheet/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="home-button">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
