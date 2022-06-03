import * as React from "react";
import { Platform } from "react-native";

/* Local Storage */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen, STORAGE_KEY, STORAGE_KEY_USERLIST } from "./Constants";
import { WelcomeScreen, AccountScreen } from "./Navigators";

function App() {
  console.log("App, rePaint", Platform.OS, account, userList, loading);

  const [loading, setLoading] = React.useState(true);
  const [account, setAccount] = React.useState(null);
  const [userList, setUserList] = React.useState([]);

  /* 최초 로컬에 저정된 사용자 정보 가져오기 */
  // React.useEffect(async () => {
  //   loadToAccount();
  //   loadToUserList();
  //   setLoading(false);
  // }, []);

  React.useEffect(() => {
    async function fetchData() {
      loadToAccount();
      loadToUserList();
      setLoading(false);
    }
    fetchData();
  }, []);

  /**
   * 사용자 정보 조회
   */
  const loadToAccount = async () => {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("loadToAccount:", rawData);
    if (rawData !== null) {
      const ac = await JSON.parse(rawData);
      console.log("loadToAccount:", ac);
      setAccount(ac);
    }
  };

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

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : account === null ? (
        <WelcomeScreen account={account} userList={userList} />
      ) : (
        <AccountScreen account={account} userList={userList} />
      )}
    </>
  );
}

export default App;
