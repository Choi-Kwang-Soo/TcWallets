import * as React from "react";
import { View, Text, Button } from "react-native";

function ActivityScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Activity Screen</Text>
      <Button title="Go to Walltes" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ActivityScreen;
