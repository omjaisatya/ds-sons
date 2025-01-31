import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: "1",
      name: "Premium Poha",
      price: 45,
      category: "breakfast",
      image: "/images/raw-poha.png",
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
      image: "/images/raw-poha-1.png",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
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

export default productSlice.reducer;
