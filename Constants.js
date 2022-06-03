import { Dimensions, View, ActivityIndicator } from "react-native";

/* Constants */
export const SERVER_URL = "http://15.165.64.230:7003";

export const STORAGE_KEY = "@accounts";
export const STORAGE_KEY_USERLIST = "@userlist";

export const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function LoadingScreen() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator
        size={"large"}
        color="tomato"
        style={{ marginTop: 150 }}
      />
    </View>
  );
}
