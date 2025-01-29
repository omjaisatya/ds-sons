import { useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Temporary mock data
  const products = [
    {
      id: 1,
      name: "Premium Poha",
      price: 45,
      category: "breakfast",
      image: "/images/poha.jpg",
      weight: "500g",
    },
    {
      id: 2,
      name: "Masala Mixture",
      price: 85,
      category: "snacks",
      image: "/images/mixture.jpg",
      weight: "1kg",
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="products-page">
      <div className="filters">
        <button onClick={() => setSelectedCategory("all")}>All</button>
        <button onClick={() => setSelectedCategory("breakfast")}>
          Breakfast
        </button>
        <button onClick={() => setSelectedCategory("snacks")}>Snacks</button>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
