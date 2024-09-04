import React, { useEffect } from "react";
import "./src/services/reactotron";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/screens/root-navigator";
import { RecoilRoot } from "recoil";
import SplashScreen from "react-native-splash-screen";
import { PermissionsAndroid, Platform, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import style from "./src/styles/card";

const toastConfig = {
  custom: (props: any) => (
    <>
      {props.props.style == "success" && (
        <View
          style={{
            width: "100%",
            backgroundColor: "#37B235",
            paddingHorizontal: 24,
            paddingVertical: 6,
            zIndex: 1000,
          }}
        >
          <Text style={[style.AgH3, { color: "white" }]}>{props.text1}</Text>
          <Text style={[style.AgP, { color: "white" }]}>{props.text2}</Text>
        </View>
      )}
      {props.props.style == "error" && (
        <View
          style={{
            width: "100%",
            backgroundColor: "red",
            paddingHorizontal: 24,
            paddingVertical: 6,
            zIndex: 1000,
          }}
        >
        <Text style={[style.AgH3, { color: "white" }]}>{props.text1}</Text>
        <Text style={[style.AgP, { color: "white" }]}>{props.text2}</Text>
        </View>
      )}
      {props.props.style == "default" && (
        <View
          style={{
            width: "100%",
            backgroundColor: "#EAEAEA",
            paddingHorizontal: 24,
            paddingVertical: 6,
            zIndex: 1000,
          }}
        >
          <Text style={[style.AgH3, { color: "#9E9E9E" }]}>{props.text1}</Text>
          <Text style={[style.AgP, { color: "#9E9E9E" }]}>{props.text2}</Text>
        </View>
      )}
    </>
  ),
};

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RecoilRoot>
          <NavigationContainer>
            <RootNavigator></RootNavigator>
          </NavigationContainer>
        </RecoilRoot>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
