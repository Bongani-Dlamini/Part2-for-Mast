import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChefsChoice = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadDishes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadDishes = async () => {
    try {
      const chefChoiceJSON = await AsyncStorage.getItem("chefChoice");
      if (chefChoiceJSON !== null) {
        setDishes(JSON.parse(chefChoiceJSON));
      }
    } catch (error) {
      console.error("Error loading Chef's Choice:", error);
    }
  };

  const removeDish = async (id) => {
    try {
      const updatedDishes = dishes.filter((dish) => dish.id !== id);
      await AsyncStorage.setItem("chefChoice", JSON.stringify(updatedDishes));
      setDishes(updatedDishes);
    } catch (error) {
      console.error("Error removing dish:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.dishItem}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeDish(item.id)}
      >
        <Text style={styles.removeButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Choice</Text>
      <FlatList
        data={dishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFB56D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  dishItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dishPrice: {
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "white",
  },
});

export default ChefsChoice;

