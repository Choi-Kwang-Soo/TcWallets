import * as React from "react";
import { Image, Text, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* 메인 스크린 */
import HomeScreen from "./Components/Home";
import WalletsScreen from "./Components/Wallets";

/* Wallets 스크린 */
import SendScreen from "./Components/Wallets/SendScreen";
import ActivityScreen from "./Components/Wallets/ActivityScreen";
import CreateAccountScreen from "./Components/Accounts/CreateAccount";
import ConnectAccountScreen from "./Components/Accounts/ConnectAccount";
import ConfirmScreen from "./Components/Wallets/ConfirmScreen";

/* Stack Navigation */
const WholeStack = createNativeStackNavigator();

/* Header Icon */
export function LogoIconTitle({ title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Image
        style={{ width: 25, height: 25, resizeMode: "contain" }}
        source={require("./img/logo.png")}
      />
      <Text style={{ marginLeft: 10, fontWeight: "bold", color: "tomato" }}>
        {`${title}`}
      </Text>
    </View>
  );
}

export function WelcomeScreen({ account, userList }) {
  return (
    <NavigationContainer>
      <WholeStack.Navigator initialRouteName="Home">
        <WholeStack.Group>
          <WholeStack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ account, userList }}
            options={{ headerShown: false }}
          />
          <WholeStack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Create Account"} />
                    ),
                  }
                : {
                    title: "Create Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="ConnectAccount"
            component={ConnectAccountScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Connect Account"} />
                    ),
                  }
                : {
                    title: "Connect Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Wallets"
            component={WalletsScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => <LogoIconTitle title={"Wallets"} />,
                  }
                : {
                    title: "Wallets",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Send"
            component={SendScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Select Transfer-Account"} />
                    ),
                  }
                : {
                    title: "Select Transfer-Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Confirm Account"} />
                    ),
                  }
                : {
                    title: "Confirm Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Activity"
            component={ActivityScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => <LogoIconTitle title={"Activity"} />,
                  }
                : {
                    title: "Activity",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
        </WholeStack.Group>
      </WholeStack.Navigator>
    </NavigationContainer>
  );
}

export function AccountScreen({ account, userList }) {
  console.log("AccountScreen", account, userList);

  return (
    <NavigationContainer>
      <WholeStack.Navigator initialRouteName="Wallets">
        <WholeStack.Group initialParams={{ account, userList }}>
          <WholeStack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ account, userList }}
            options={{ headerShown: false }}
          />
          <WholeStack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Create Account"} />
                    ),
                  }
                : {
                    title: "Create Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="ConnectAccount"
            component={ConnectAccountScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Connect Account"} />
                    ),
                  }
                : {
                    title: "Connect Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Wallets"
            component={WalletsScreen}
            initialParams={{ account, userList }}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => <LogoIconTitle title={"Wallets"} />,
                  }
                : {
                    title: "Wallets",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Send"
            component={SendScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Select Transfer-Account"} />
                    ),
                  }
                : {
                    title: "Select Transfer-Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => (
                      <LogoIconTitle title={"Confirm Account"} />
                    ),
                  }
                : {
                    title: "Confirm Account",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
          <WholeStack.Screen
            name="Activity"
            component={ActivityScreen}
            options={
              Platform.OS === "web"
                ? {
                    headerTitle: () => <LogoIconTitle title={"Activity"} />,
                  }
                : {
                    title: "Activity",
                    headerStyle: {
                      backgroundColor: "tomato",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }
            }
          />
        </WholeStack.Group>
      </WholeStack.Navigator>
    </NavigationContainer>
  );
}
