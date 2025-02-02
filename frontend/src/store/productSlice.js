import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: "1",
      name: "Premium Raw Poha",
      price: 20,
      category: "breakfast",
      image: "/images/raw-poha-1.png",
      weight: "500g",
      description: "Traditional flattened rice, perfect for quick breakfast",
      ingredients: "Rice, salt",
      dietary: "Vegetarian",
    },
    {
      id: "2",
      name: "Masala Mixture",
      price: 85,
      category: "snacks",
      image: "/images/mixture-namkeen.png",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
    },
    {
      id: "3",
      name: "Roasted Chana",
      price: 85,
      category: "snacks",
      image: "/images/roasted-channa.png",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
    },
    {
      id: "4",
      name: "Channa Sattu",
      price: 85,
      category: "snacks",
      image: "/images/channa-sattu.png",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
    },
  ],
  categories: [
    {
      id: "1",
      name: "Breakfast",
      image: "/images/category/breakfast-category-home.png",
    },
    {
      id: "2",
      name: "Snacks",
      image: "/images/category/snack-category-home.png",
    },
    {
      id: "3",
      name: "Drinks",
      image: "/images/category/drink-category-home.png",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const selectCategories = (state) => state.products.categories;

export default productSlice.reducer;
