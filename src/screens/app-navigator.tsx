import React, { FC, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardsNavigator from "./mycards/MyCardsNavigator";
import PersonalInfo from "./auth/personal-info";
import { firebase } from "@react-native-firebase/auth";
import { firebase as fmessage } from "@react-native-firebase/messaging";
import { UpdateDeviceToken } from "../services";
import { Platform } from "react-native";
import { useRecoilValue } from "recoil";
import { themeState } from "../states/appState";

const Stack = createNativeStackNavigator();

export const AppNavigator: FC<
  NativeStackScreenProps<ParamListBase, "AppNavigator">
> = ({}) => {
  const theme = useRecoilValue(themeState);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (Platform.OS === "android") {
          fmessage
            .messaging()
            .registerDeviceForRemoteMessages()
            .then(() => {
              fmessage
                .messaging()
                .getToken()
                .then((token) => {
                  UpdateDeviceToken(user.uid, token);
                });
            });
        }
      }
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        statusBarStyle: theme === 'dark' ? 'light' : 'dark',
        statusBarColor: theme === "dark" ? "#1c1c1c" : "#fff",
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen
        name="CardsNavigator"
        component={CardsNavigator}
        options={{ title: "My Cards" }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
