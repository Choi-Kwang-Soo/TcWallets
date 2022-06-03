import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { SERVER_URL, STORAGE_KEY } from "../../Constants";

function ConfirmScreen({ navigation, route }) {
  console.log("confirm-scr, rePaint", route, account, target, balance);

  const [account, setAccount] = React.useState(route.params.account);
  const [target, setTarget] = React.useState(route.params.selected);
  const [balance, setBalance] = React.useState("");

  React.useEffect(() => {
    console.log("useEffect", route);
    if (route.params) {
      console.log("route.params.account", route.params.account);
      console.log("route.params.selected", route.params.selected);
      setAccount(route.params.account);
      setTarget(route.params.selected);
    }
  }, [route.params.account]);

  const onChangeBalance = (payload) => {
    setBalance(payload);
  };

  const transfer = async (userName, password, targetAddree, amount) => {
    /* 계정 생성 : Cron-Domain 이슈를 서버에서 해결 */
    const response = await fetch(
      `${SERVER_URL}/v1/rpc/eth/transfer?account=${userName}&password=${password}&toAddress=${targetAddree}&amount=${amount}`
    );
    const json = await response.json();

    console.log("transfer", json);

    const resCode = json.code;
    if (resCode !== 200) {
      setNotify(resCode + " : " + json.message);
      return;
    }

    /** 지갑으로 이동
     *  "data": {
          "account": "trackchain",
          "address": "0x5e483bf7b01e75279513f4bb1cadd7e6ce87d407",
          "balance": 0.2822180899992
        },
     */
    if (account !== null) {
      account.balance = json.data.balance;
      setAccount(account);
      console.log("account", account);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    }
  };

  const onTransfer = async () => {
    await transfer(account.account, account.password, target.address, balance);

    console.log("onTransfer", account);
    navigation.navigate("Wallets", { account });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Source</Text>
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
      <View style={{ alignItems: "center" }}>
        <Fontisto name="arrow-down" size={24} color="black" />
      </View>
      <Text style={styles.text}>Target</Text>

      <View style={styles.infoBox}>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <Text style={styles.infoLab}>UserName</Text>
          <Text style={styles.infoVal}>{`${target.account}`}</Text>
        </View>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <Text style={styles.infoLab}>Address</Text>
          <Text style={styles.infoVal}>
            {`${target.address.substring(0, 15)}`}...
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TextInput
          onSubmitEditing={onTransfer}
          onChangeText={onChangeBalance}
          returnKeyType="default"
          value={balance}
          placeholder={"Write Transfer balance..."}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={onTransfer}>
          <Text style={styles.text}>Transfer</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.tinyLog}
          source={require("../../img/logo_h.png")}
        />
      </View>
    </ScrollView>
  );
}

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  input: {
    backgroundColor: "tomato",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontSize: 18,
    color: "white",
  },
  button: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "white",
    textShadowColor: "#3A3D40",
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
    marginLeft: 10,
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
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
