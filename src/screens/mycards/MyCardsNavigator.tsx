import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./DashboardScreen";
import IDCardScreen from "./IDCardScreen";
import CardActivationScreen from "./CardActivationScreen";
import SubmitActivationScreen from "./SubmitActivationScreen";
import CardBlockScreen from "./CardBlockScreen";
import CardStatementScreen from "./CardStatementScreen";
import AccountSettingScreen from "./AccountSettingScreen";
import PersonalDetailsScreen from "./PersonalDetailsScreen";
import PhoneVerificationScreen from "./PhoneVerificationScreen";
import SecurityPrivacyScreen from "./SecurityPrivacyScreen";
import ChangePasscordScreen from "./ChangePasscordScreen";
import AppSettingScreen from "./AppSettingScreen";
import VerifyIdentityScreen from "./VerifyIdentityScreen";
import VerifyCardScreen from "./VerifyCardScreen";
import TopUpOverviewScreen from "./topup/TopUpOverviewScreen";
import TopUpCryptoScreen from "./topup/TopUpCryptoScreen";
import TopUpBankCardScreen from "./topup/TopUpBankCardScreen";
import TopUpIBANScreen from "./topup/TopUpIBANScreen";
import SendOverviewScreen from "./send/SendOverviewScreen";
import SendCryptoScreen from "./send/SendCryptoScreen";
import SendIBANScreen from "./send/SendIBANScreen";
import SendBankCardScreen from "./send/SendBankCardScreen";
import TransactionDetailsScreen from "./TransactionDetailsScreen";
import ExportReceiptScreen from "./ExportReceiptScreen";
import QRRecognition from "./QRRecognition";
import ChoosePaymentScreen from "./topup/ChoosePaymentScreen";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";

const Stack = createNativeStackNavigator();

const CardsNavigator = () => {
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
    >
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen name="IDCardScreen" component={IDCardScreen} />
      <Stack.Screen
        name="CardActivationScreen"
        component={CardActivationScreen}
      />
      <Stack.Screen
        name="SubmitActivationScreen"
        component={SubmitActivationScreen}
      />
      <Stack.Screen name="VerifyCardScreen" component={VerifyCardScreen} />
      <Stack.Screen name="CardBlockScreen" component={CardBlockScreen} />
      <Stack.Screen
        name="CardStatementScreen"
        component={CardStatementScreen}
      />
      <Stack.Screen
        name="AccountSettingScreen"
        component={AccountSettingScreen}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
      />
      <Stack.Screen
        name="PhoneVerificationScreen"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen
        name="SecurityPrivacyScreen"
        component={SecurityPrivacyScreen}
      />
      <Stack.Screen
        name="ChangePasscordScreen"
        component={ChangePasscordScreen}
      />
      <Stack.Screen name="AppSettingScreen" component={AppSettingScreen} />
      <Stack.Screen
        name="VerifyIdentityScreen"
        component={VerifyIdentityScreen}
      />

      {/* Top Up Feature */}
      <Stack.Screen
        name="TopUpOverviewScreen"
        component={TopUpOverviewScreen}
      />
      <Stack.Screen name="TopUpCryptoScreen" component={TopUpCryptoScreen} />
      <Stack.Screen
        name="TopUpBankCardScreen"
        component={TopUpBankCardScreen}
      />
      <Stack.Screen name="TopUpIBANScreen" component={TopUpIBANScreen} />
      <Stack.Screen name="ChoosePaymentScreen" component={ChoosePaymentScreen} />

      {/* Send Feature */}
      <Stack.Screen name="SendOverviewScreen" component={SendOverviewScreen} />
      <Stack.Screen name="SendCryptoScreen" component={SendCryptoScreen} />
      <Stack.Screen name="SendIBANScreen" component={SendIBANScreen} />
      <Stack.Screen name="SendBankCardScreen" component={SendBankCardScreen} />

      <Stack.Screen
        name="TransactionDetailsScreen"
        component={TransactionDetailsScreen}
      />
      <Stack.Screen
        name="ExportReceiptScreen"
        component={ExportReceiptScreen}
      />
      <Stack.Screen name="QRRecognition" component={QRRecognition} />
    </Stack.Navigator>
  );
};

export default CardsNavigator;
