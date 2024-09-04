import React, { FC, useEffect } from "react";

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
import { openInbox } from "react-native-email-link";
import DropShadow from "react-native-drop-shadow";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { PageHeader } from "../../components/page-header";
import { TextView } from "../../components/text-view";

import emailIcon from "../../assets/images/email.png";
import backIcon from "../../assets/images/back.png";
import darkBackIcon from "../../assets/images/dark_back.png";
import Toast from "react-native-toast-message";
import GetStyle from "../../styles";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";


const HEIGHT = Math.round(Dimensions.get("window").height * 0.53);
const EmailVerification: FC<
  NativeStackScreenProps<ParamListBase, "EmailVerification">
> = ({ navigation }) => {
  const style = GetStyle();
  const theme = useRecoilValue(themeState);
  useEffect(() => {
    const interval = setInterval(() => {
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .currentUser?.reload()
          .then((_) => {
            if (firebase.auth().currentUser?.emailVerified) {
              clearInterval(interval);
              navigation.replace("MakeAccountSafe");
            }
          });
      } else {
        if (navigation.canGoBack()) navigation.goBack();
      }
    }, 1000);
    return function () {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={3}
        active={1}
        slide={true}
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
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
            details="We have sent a email verification link to your email"
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
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
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
                  firebase
                    .auth()
                    .currentUser?.sendEmailVerification()
                    .then(() => {
                      Toast.show({
                        type: "custom",
                        props: {
                          style: "success",
                        },
                        text1: "Email Verification",
                        text2: "We have sent email verification link again.",
                      });
                    });
                }}
              >
                <Text style={[style.FPColor]}>Resend</Text>
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
export default EmailVerification;
