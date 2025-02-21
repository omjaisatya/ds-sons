import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

const categories = [
  { id: "all", name: "All" },
  { id: "poha", name: "Poha" },
  { id: "mixture", name: "Mixture" },
  { id: "sattu", name: "Sattu" },
  { id: "favorites", name: "Favorites" },
];

const CategoryFilter = ({ selectedCategory = "all", setSelectedCategory }) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Chip
          mode="outlined"
          selected={selectedCategory === item.id}
          selectedColor={selectedCategory === item.id ? "#4CAF50" : undefined}
          onPress={() => setSelectedCategory(item.id)}
          style={[
            styles.chip,
            selectedCategory === item.id && styles.selectedChip,
          ]}
        >
          {item.name}
        </Chip>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
  },
  chip: {
    marginHorizontal: 4,
  },
  selectedChip: {
    backgroundColor: "#E8F5E9",
  },
});
