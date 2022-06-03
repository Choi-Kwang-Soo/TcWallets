import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

function HomeScreen({ navigation, route }) {
  console.log("home-scr, rePaint", route);

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, marginTop: 100 }}>
        <Image style={styles.tinyLog} source={require("../img/logo.png")} />
      </View>
      <View style={{ flex: 4, justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CreateAccount", route.params.userList)
          }
        >
          <Text style={styles.text}>Account Creation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ConnectAccount", route.params.userList)
          }
        >
          <Text style={styles.text}>Account Connect</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.tinyLog} source={require("../img/logo_h.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    alignItems: "center",
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "white",
    textShadowColor: "gray",
    textShadowOffset: {
      width: 4,
      height: 4,
    },
    textShadowRadius: 7,
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "tomato",
  },
});

export default HomeScreen;
