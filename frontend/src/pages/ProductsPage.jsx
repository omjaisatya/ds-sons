import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Temporary mock data
  const products = [
    {
      id: 1,
      name: "Premium Poha",
      price: 45,
      category: "breakfast",
      image: "/images/poha.jpg",
      weight: "500g",
      description: "Traditional flattened rice, perfect for quick breakfast",
      ingredients: "Rice, salt",
      dietary: "Vegetarian",
    },
    {
      id: 2,
      name: "Masala Mixture",
      price: 85,
      category: "snacks",
      image: "/images/mixture.jpg",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
    },
  ];

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
