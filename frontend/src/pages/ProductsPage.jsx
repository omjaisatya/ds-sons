import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/productSlice";

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
      {searchQuery === "" && (
        <div className="filters">
          <button onClick={() => setSelectedCategory("all")}>All</button>
          <button onClick={() => setSelectedCategory("breakfast")}>
            Breakfast
          </button>
          <button onClick={() => setSelectedCategory("snacks")}>Snacks</button>
        </div>
      )}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
