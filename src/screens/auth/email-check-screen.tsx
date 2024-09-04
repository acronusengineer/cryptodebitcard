import React, { FC } from "react";

import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { PageHeader } from "../../components/page-header";
import { TextView } from "../../components/text-view";

import emailIcon from "../../assets/images/email.png";
import backIcon from "../../assets/images/back.png";
import darkBackIcon from "../../assets/images/dark_back.png";
import { openInbox } from "react-native-email-link";
import GetStyle from "../../styles";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";


const HEIGHT = Math.round(Dimensions.get("window").height * 0.53);
const EmailCheckScreen: FC<
  NativeStackScreenProps<ParamListBase, "EmailCheckScreen">
> = ({ navigation }) => {
  const style = GetStyle();
  const theme = useRecoilValue(themeState);
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={3}
        active={1}
        slide={true}
        onBack={() => {
          navigation.replace("LoginScreen");
        }}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={style.CContainer}>
          <Image
            source={theme === "dark" ? darkBackIcon : backIcon}
            style={styles.backImg}
          ></Image>
          <TextView
            title="Check your email"
            details="We have sent a password recover instructions to your email"
          />
          <View style={style.Flex3}>
            <Image source={emailIcon}></Image>
          </View>
          <View style={[style.CContainer, style.Flex3]}>
            <DropShadow style={style.shadowProp}>
              <SolidButton
                btn="primary"
                onPress={() => {
                  openInbox();
                }}
                title="Open Email App"
              ></SolidButton>
            </DropShadow>
            <SolidButton
              btn="secondary"
              onPress={() => {
                navigation.replace("LoginScreen");
              }}
              title="Skip, I’ll confirm later"
            ></SolidButton>
            <View style={[style.TACenter, { paddingTop: 10 }]}>
              <Text style={{ color: "#666666", marginRight: 6 }}>
                Did not receive the email? Check your Spam
              </Text>
            </View>
            <View style={[style.TACenter, style.VContainer]}>
              <Text style={{ color: "#666666", marginRight: 6 }}>
                folder or
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("SignupScreen");
                }}
              >
                <Text style={[style.FPColor]}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backImg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  slideView: {
    position: "absolute",
    top: HEIGHT,
  },
});
export default EmailCheckScreen;
