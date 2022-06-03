import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SERVER_URL, SCREEN_WIDTH } from "../../Constants";

function SendScreen({ navigation, route }) {
  console.log("send-scr, rePaint", route, account, userList, SCREEN_WIDTH);

  const [userList, setUserList] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const getUserLists = async () => {
    /* 계정 생성 : Cron-Domain 이슈를 서버에서 해결 */
    const response = await fetch(`${SERVER_URL}/v1/rpc/eth/account/list`);
    const json = await response.json();

    console.log("getUserLists", json);

    const resCode = json.code;
    if (resCode !== 200) {
      setNotify(resCode + " : " + json.message);
      return;
    }

    /** 지갑으로 이동
      "data": [
          {
              "account": "trackchain",
              "address": "0xfbe355ec1de4a4f1d255eac6a26215e2d64e6291",
              "balance": 0.098953799999496
          },
          {
              "account": "test",
              "address": "0x6b13c1635cc62300085f55a78d9a662c3e1cacfb",
              "balance": 0.003
          },
          {
              "account": "maxchoi",
              "address": "0xa97200131b571cd6ee9807b7a5b7f5d93278cd4a",
              "balance": 0
          }
        }
     */
    console.log("json.data", json.data);
    setUserList(json.data);
  };

  const onSelectPress = (key) => {
    if (selected !== null && userList[key].address === selected.address) {
      setSelected(null);
    } else {
      setSelected(userList[key]);
    }
  };

  const onGotoConfirm = () => {
    if (selected !== null) {
      navigation.navigate("Confirm", {
        account,
        selected,
      });
    }
  };

  React.useEffect(() => {
    console.log("useEffect", route);
    if (route.params) {
      console.log("route.params.account", route.params.account);
      setAccount(route.params.account);
    }

    getUserLists();
  }, [route.params.account]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.input}>Please, Select Transfer-Account</Text>
        <TouchableOpacity onPressOut={onGotoConfirm}>
          <Text style={styles.input}>Next</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 0.8 }}>
        {userList !== null ? (
          Object.keys(userList).map((key) => (
            <View style={styles.userList} key={key}>
              <Text style={styles.userListName}>{userList[key].account}</Text>
              <Text style={styles.userListAddr}>
                {userList[key].address.substring(0, 15)}...
              </Text>
              {userList[key].account !== account.account ? (
                <TouchableOpacity onPressOut={() => onSelectPress(key)}>
                  {selected !== null &&
                  selected.address === userList[key].address ? (
                    <Fontisto name="checkbox-active" size={18} color="gray" />
                  ) : (
                    <Fontisto name="checkbox-passive" size={18} color="gray" />
                  )}
                </TouchableOpacity>
              ) : (
                <Text />
              )}
            </View>
          ))
        ) : (
          <View />
        )}
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
    </View>
  );
}

export default SendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1C20",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    color: "tomato",
    // resizeMode: "contain",
    textShadowColor: "gray",
    textShadowOffset: {
      width: 4,
      height: 4,
    },
    textShadowRadius: 7,
  },
  userList: {
    backgroundColor: "#1A1C20",
    marginBottom: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 20,
  },
  userListName: {
    color: "white",
    fontWeight: "200",
    width: 100,
  },
  userListAddr: {
    color: "white",
    fontWeight: "600",
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
