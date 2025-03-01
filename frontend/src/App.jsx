import "./App.css";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import OrderTracking from "./pages/OrderTracking";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLogin from "./components/AdminLogin";
import HomeContent from "./pages/HomeContent";
import NotFound from "./components/NotFound";
import ErrorPage from "./pages/ErrorPage";
import NotificationBar from "./components/NotificationBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(authActions.setUser(userData));
    }
  }, [dispatch]);

  return (
    <Router basename="/">
      <NotificationBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
