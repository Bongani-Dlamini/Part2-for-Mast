import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground // background image for the screen when they are on the homepage
      source={require("../assets/Useback.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          Welcome to the ChrisFoodie Restuarant
        </Text>

        <Image source={require("../assets/chef2.jpg")} style={styles.image} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
// these are the styles/designs for this screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default HomeScreen;
