import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen, SERVER_URL } from "../Constants";
import { STORAGE_KEY } from "../Constants";

function WalletScreen({ navigation, route }) {
  console.log("wallerts-scr - rePaint", route, account);

  const [account, setAccount] = React.useState(route.params.account);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("useEffect", route);
    if (route.params) {
      console.log("route.params.account", route.params.account);
      getBalance(route.params.account);
    }
  }, [route.params]);

  const getBalance = async (account) => {
    console.log("getBalance", account);

    /* 계정 생성 : Cron-Domain 이슈를 서버에서 해결 */
    const response = await fetch(
      `${SERVER_URL}/v1/rpc/eth/balance/${account.address}`
    );
    const json = await response.json();

    console.log("getBalance", json);

    const resCode = json.code;
    if (resCode !== 200) {
      setNotify(resCode + " : " + json.message);
      return;
    }

    /** 지갑으로 이동
     *  "data": {
     *     "balance": 0.297922299998425
     *  },
     */
    console.log("getBalance", account);

    if (account !== null) {
      account.balance = json.data.balance;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));
      setAccount(account);
      setLoading(false);
    }
  };

  const onLogout = async () => {
    if (Platform.OS === "web") {
      const ok = confirm("Account LogOut?");
      if (ok) {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setAccount(null);
        navigation.navigate("Home");
      }
    } else {
      Alert.alert("Account LogOut", "Are you sure?", [
        { text: "Cancel" },
        {
          text: "I'm Sure",
          onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setAccount(null);
            navigation.navigate("Home");
          },
        },
      ]);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          {account !== null ? (
            <View style={styles.infoBox}>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <Text style={styles.infoLab}>UserName</Text>
                <Text style={styles.infoVal}>{`${account.account}`}</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <Text style={styles.infoLab}>Address</Text>
                <Text style={styles.infoVal}>
                  {`${account.address.substring(0, 15)}`}...
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <Text style={styles.infoLab}>Balance</Text>
                <Text style={styles.infoVal}>{`${account.balance}`} ETH</Text>
              </View>
            </View>
          ) : (
            <View style={styles.infoBox} />
          )}
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Send", { account })}
            >
              <Text style={styles.text}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Activity")}
            >
              <Text style={styles.text}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "100%",
            }}
          >
            <Image
              style={styles.tinyLog}
              source={require("../img/logo_h.png")}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoBox: {
    height: 200,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  infoLab: {
    fontSize: 20,
    backgroundColor: "white",
    color: "tomato",
    width: 100,
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 10,
    textShadowColor: "gray",
    textShadowOffset: {
      width: 4,
      height: 4,
    },
    textShadowRadius: 7,
  },
  infoVal: {
    fontSize: 20,
    backgroundColor: "gray",
    color: "white",
    // width: 500,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  btnBox: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "white",
    marginVertical: 5,
    textShadowColor: "gray",
    textShadowOffset: {
      width: 4,
      height: 4,
    },
    textShadowRadius: 7,
    width: 200,
    height: 50,
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "tomato",
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default WalletScreen;
