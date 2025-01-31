import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/productSlice";
import "../assets/stylesheet/ProductsPage.css";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const products = useSelector(selectProducts);

  const filteredProducts = products
    .filter(
      (p) => selectedCategory === "all" || p.category === selectedCategory
    )
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="products-page">
      <div className="filters">
        {searchQuery === "" && (
          <div className="category-filters">
            <button
              className={`category-btn ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>
            <button
              className={`category-btn ${
                selectedCategory === "breakfast" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("breakfast")}
            >
              Breakfast
            </button>
            <button
              className={`category-btn ${
                selectedCategory === "snacks" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("snacks")}
            >
              Snacks
            </button>
          </div>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
