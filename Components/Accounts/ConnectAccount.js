import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

/* Local Storage */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL, STORAGE_KEY, STORAGE_KEY_USERLIST } from "../../Constants";

function ConnectAccountScreen({ navigation, route }) {
  console.log("conn-scr, rePaint!!!!", route, loading);

  const [userName, setUserName] = React.useState("");
  const [passwd, setPasswd] = React.useState("");
  const [notify, setNotify] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [userList, setUserList] = React.useState(route.params.userList);

  /* 최초 로컬에 저정된 사용자 정보 가져오기 */
  React.useEffect(() => {
    async function fetchData() {
      loadToUserList();
    }
    fetchData();
  }, []);

  /**
   * 사용자 리스트 정보 조회
   */
  const loadToUserList = async () => {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY_USERLIST);
    console.log("loadToUserList:", rawData);
    if (rawData !== null) {
      const usrlist = await JSON.parse(rawData);
      console.log("loadToUserList:", usrlist);
      setUserList(usrlist);
    }
  };
  const onChangeUserName = (payload) => {
    setUserName(payload);
  };

  const onChangePasswd = (payload) => {
    setPasswd(payload);
  };

  const onCheckAccount = () => {
    if (userName.length < 4 && passwd.length < 8) {
      setNotify(
        "Account는 최소 4자이상, Passwd는 최소 8자이상 입력해야 합니다."
      );
      return;
    }

    /* 로딩 시작 */
    setLoading(true);

    /* Delay */
    setTimeout(() => connectAccount(userName, passwd), 1000);
  };

  const connectAccount = async (userName, passwd) => {
    const findAc = userList.filter(
      (item) => item.account === userName && item.password === passwd
    );
    console.log("connectAccount", findAc);

    /* 비동기 처리 필요 */
    setLoading(false);

    if (findAc.length === 0) {
      setNotify("이전에 생성한 지갑정보를 로컬이력에서 찾을 수 없습니다.");
      return;
    }

    const account = findAc[0];
    console.log("account", account);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));

    navigation.navigate("Wallets", { account, userList });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color="tomato"
            style={{ marginTop: 150 }}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.notifyTxt}>
            ID: {userName}, PW: {passwd} : {notify}
          </Text>
          <TextInput
            onSubmitEditing={onCheckAccount}
            onChangeText={onChangeUserName}
            returnKeyType="default"
            value={userName}
            placeholder={"Please, Write Account..."}
            style={styles.input}
          />
          <TextInput
            onSubmitEditing={onCheckAccount}
            onChangeText={onChangePasswd}
            returnKeyType="done"
            secureTextEntry={true}
            value={passwd}
            placeholder={"Please, Write Password..."}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onCheckAccount}>
            <Text style={styles.text}>Connect</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "100%",
            }}
          >
            <Image
              style={styles.tinyLog}
              source={require("../../img/logo_h.png")}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default ConnectAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "tomato",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 18,
    color: "white",
  },
  notifyTxt: {
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
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
  },
  tinyLog: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
