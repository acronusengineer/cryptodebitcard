import React, { FC, useCallback, useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import solarIcon from "../../assets/images/solar.png";
import cardsIcon from "../../assets/images/cards.png";
import lockIcon from "../../assets/images/lock.png";
import backIcon from "../../assets/images/back.png";
import darkBackIcon from "../../assets/images/dark_back.png";
import walletIcon from "../../assets/images/wallet.png";

import { SlideView } from "../../components/slide-view";
import { TextView } from "../../components/text-view";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeState } from "../../states/appState";
import GetStyle from "../../styles";
import storage from "../../utils/storage";
import { decryptText } from "../../services";
import { firebase } from "@react-native-firebase/auth";
import ReactNativeBiometrics from "react-native-biometrics";
import { LoadingView } from "../../components/loading-view";
import { GetUserProfile } from "../../services";
import { profileState } from "../../states/authState";
import Toast from "react-native-toast-message";


const HEIGHT = Math.round(Dimensions.get("window").height * 0.53);
const FirstScreen: FC<NativeStackScreenProps<ParamListBase, "FirstScreen">> = ({
  navigation,
}) => {
  const [active, setActive] = useState<Number>(0);
  const theme = useRecoilValue(themeState);

  const setProfile = useSetRecoilState(profileState);
  const [loading, setLoading] = useState(false);

  const style = GetStyle();

  const activeHandler = useCallback(
    (index: Number) => {
      setActive(index);
    },
    [active]
  );

  const handleActiveSession = () => {
    
    storage.get("activeTime").then( async (object) => {
      if (!object) return;
      setLoading(true);
      const { activeTime } = object;
      if ((Date.now() - activeTime)/(60*60*1000) < 24){ // active time is 24hrs from signin
        const faceID = await storage.get("faceID");
        if (faceID==="true"){
          const rnBiometrics = new ReactNativeBiometrics({
            allowDeviceCredentials: true,
          });
          const { success } = await rnBiometrics.simplePrompt({
            promptMessage: "Sign in With TouchID",
            cancelButtonText: "Close",
          });
          if (success){
            const { email, encyptPass } = await storage.get("userInfo");
            const password = decryptText(encyptPass);
            signInWithParams(email, password);
            return;
          } else {
            setLoading(false);
            Toast.show({
              type: "custom",
              props: {
                style: "error",
              },
              text1: "Biometrics error",
              text2: "Failed to pass biometrics check.",
            });
            navigation.navigate("LoginScreen");
          }
        } else {
          setLoading(false);
          navigation.navigate("LoginScreen");
        }      
      } else {
        setLoading(false);
      }
    });
  }

  const signInWithParams = (userEmail: string, userPass: string) =>{
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .then((res) => {
        if (res.user.emailVerified) {
          GetUserProfile(res.user.uid).then((profile) => {
            setProfile(profile);
            storage.set("userInfo", {email : profile?.email, encyptPass: profile?.password });
            storage.set("activeTime", {activeTime: Date.now()});
            setLoading(false);
            if (profile?.step === "email") {
              navigation.navigate("MakeAccountSafe");
            } else if (profile?.step === "phone") {
              navigation.navigate("PersonalInfo");
            } else if (profile?.step === "name") {
              navigation.navigate("PersonalData");
            } else if (profile?.step === "finished") { 
              navigation.replace("AppNavigator");
            }
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    handleActiveSession();
  }, []);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={style.WBContainer}>
        <Image
          source={theme === "dark" ? darkBackIcon : backIcon}
          style={styles.backImg}
        ></Image>
        <SlideView count="4" active={active} style={styles.slideView} />
        <View style={style.Flex3}>
          <Swiper
            onIndexChanged={activeHandler}
            removeClippedSubviews={false}
            containerStyle={{ flex: 1 }}
            autoplay={true}
            showsPagination={false}
            autoplayTimeout={3}
            loop={false}
          >
            <View style={[style.TACenter, style.Flex1]}>
              <View style={[style.Flex7, style.PTop40]}>
                <Image source={solarIcon}></Image>
              </View>
              <View style={style.Flex2}>
                <TextView
                  style={style.Padding5}
                  title="Welcome to Solar!"
                  details="Digital payments with crypto debit cards and IBAN accounts combined with concierge services."
                />
              </View>
            </View>
            <View style={[style.TACenter, style.Flex1]}>
              <View style={[style.Flex7, style.PTop40]}>
                <Image source={cardsIcon}></Image>
              </View>
              <View style={style.Flex2}>
                <TextView
                  style={style.Padding5}
                  title="Crypto Cards"
                  details="Get your Crypto Mastercard card right now and pay by crypto like in fiat across the world"
                />
              </View>
            </View>
            <View style={[style.TACenter, style.Flex1]}>
              <View style={[style.Flex7, style.PTop40]}>
                <Image source={walletIcon}></Image>
              </View>
              <View style={style.Flex2}>
                <TextView
                  style={style.Padding5}
                  title="Crypto Wallet"
                  details="Get your Crypto Wallet with USD, EUR, GBP, TRY, KRW Accounts support and card limit at least $50 000"
                />
              </View>
            </View>
            <View style={[style.TACenter, style.Flex1]}>
              <View style={[style.Flex7, style.PTop40]}>
                <Image source={lockIcon}></Image>
              </View>
              <View style={style.Flex2}>
                <TextView
                  style={style.Padding5}
                  title="Full Secure & Support"
                  details="VIP Service, High Security and 24/7 Support, all of these included in Solar Card!"
                />
              </View>
            </View>
          </Swiper>
        </View>
        <View style={[style.CContainer, style.Flex1]}>
          <DropShadow style={style.shadowProp}>
            <SolidButton
              btn="primary"
              onPress={() => {
                navigation.navigate("SetLoginData");
              }}
              title="Create Account"
            ></SolidButton>
          </DropShadow>
          <SolidButton
            btn="secondary"
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            title="Sign In"
          ></SolidButton>
        </View>
      </View>
      {loading && <LoadingView />}
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
export default FirstScreen;
