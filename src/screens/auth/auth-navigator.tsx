import React, { FC } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import LoginScreen from "./login-screen";
import FirstScreen from "./first-screen";
import MakeAccountSafe from "./make-account";
import DigitcodeScreen from "./digitcode-screen";
import ForgotPasswordScreen from "./forgot-password-screen";
import EmailCheckScreen from "./email-check-screen";
import ResetPassword from "./reset-password";
import PersonalInfo from "./personal-info";
import PersonalData from "./personal-data";
import { ParamListBase } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import VerifiedScreen from "./verified-screen";
import SetLoginData from "./set-login-screen";
import EmailVerification from "./email-verification";
import { themeState } from "../../states/appState";

const Stack = createNativeStackNavigator();

export const AuthNavigator: FC<
  NativeStackScreenProps<ParamListBase, "AuthNavigator">
> = ({}) => {
  const theme = useRecoilValue(themeState);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        statusBarStyle: theme === "dark" ? "light" : "dark",
        statusBarColor: theme === "dark" ? "#1c1c1c" : "#fff",
        statusBarTranslucent: true,
      }}
      initialRouteName="FirstScreen"
    >
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MakeAccountSafe" component={MakeAccountSafe} />
      <Stack.Screen name="DigitScreen" component={DigitcodeScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="EmailCheckScreen" component={EmailCheckScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerifiedScreen" component={VerifiedScreen} />
      <Stack.Screen name="SetLoginData" component={SetLoginData} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
