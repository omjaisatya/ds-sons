import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFavorites = createAsyncThunk(
  "products/loadFavorites",
  async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  }
);

const initialState = {
  products: [
    {
      id: "1",
      name: "Premium Raw Poha",
      price: 20,
      category: "poha",
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
      category: "mixture",
      image: "/images/mixture-namkeen.png",
      weight: "1kg",
      description: "Crispy savory snack mix",
      ingredients: "Chickpea flour, peanuts, spices",
      dietary: "Vegetarian",
    },
    {
      id: "3",
      name: "Channa Sattu",
      price: 85,
      category: "sattu",
      image: "/images/channa-sattu.png",
      weight: "1kg",
      description: "Nutrient-rich roasted gram flour",
      ingredients: "Roasted gram",
      dietary: "Vegetarian",
    },
  ],
  favorites: [],
  selectedCategory: "all",
  searchQuery: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }

      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites)).catch(
        (error) => console.error("Error saving favorites:", error)
      );
    },

    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const selectFilteredProducts = (state) => {
  const { products, selectedCategory, searchQuery, favorites } = state.products;

  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const isFavorite =
      selectedCategory === "favorites" ? favorites.includes(product.id) : true;

    return matchesSearch && matchesCategory && isFavorite;
  });
};

export const { toggleFavorite, setSelectedCategory, setSearchQuery } =
  productSlice.actions;
export default productSlice.reducer;
