import React, { FC, useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { InputField } from "../../components/card/InputField";
import { validateEmail } from "../../utils/validator";
import { firebase } from "@react-native-firebase/auth";
import { TextView } from "../../components/text-view";
import { LoadingView } from "../../components/loading-view";
import { User } from "../../models/user";
import { GetUserProfile } from "../../services";
import { useSetRecoilState } from "recoil";
import { multiFactorResolver, profileState } from "../../states/authState";
import GetStyle from "../../styles";
import storage from "../../utils/storage";
// import { RSA } from 'react-native-rsa-native';

interface SigninUser {
  email: string;
  password: string;

  emailError?: string;
  pwdError?: string;
}
const validate = (user: Partial<SigninUser>, updateErr = false) => {
  if (updateErr) {
    user.emailError = "";
    user.pwdError = "";
  }
  let check = true;
  if (!user.email) {
    if (updateErr) {
      user.emailError = "Email is required!";
    }
    check = false;
  } else if (!validateEmail(user.email)) {
    if (updateErr) {
      user.emailError = "Email is not valid!";
    }
    check = false;
  }

  if (!user.password) {
    if (updateErr) {
      user.pwdError = "Password is required.";
    }
    check = false;
  }
  return check;
};
const LoginScreen: FC<NativeStackScreenProps<ParamListBase, "LoginScreen">> = ({
  navigation,
}) => {
  const [user, setUser] = useState<Partial<SigninUser>>({});
  const [loading, setLoading] = useState(false);
  const [btnStatus, setBtnStatus] = useState("disable");

  const setProfile = useSetRecoilState(profileState);
  const setPhoneResolver = useSetRecoilState(multiFactorResolver);

  const style = GetStyle();

  const handleSignIn = () => {
    setLoading(true);
    setUser((prev) => ({ ...prev, emailError: "", pwdError: "" }));
    signInWithParams(user.email!, user.password!);    
  };

  const signInWithParams = (userEmail: string, userPass: string) =>{
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .then((res) => {
        setUser(res.user as User);
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
              navigation.popToTop();
              navigation.replace("AppNavigator");
            }
          });
        } else {
          setLoading(false);
          navigation.navigate("EmailVerification");
        }
      })
      .catch((error) => {
        console.log(error.code, error.message);
        if (error.code === "auth/wrong-password") {
          setLoading(false);
          setUser((prev) => ({ ...prev, pwdError: "Wrong password." }));
        } else if (error.code === "auth/user-not-found") {
          setLoading(false);
          setUser((prev) => ({ ...prev, emailError: "User not found." }));
        } else if (error.code === "auth/too-many-requests") {
          setLoading(false);
          setUser((prev) => ({
            ...prev,
            emailError: "Too many failed requests. Try again later.",
          }));
        } else if (error.code === "auth/multi-factor-auth-required") {
          const resolver = firebase.auth().getMultiFactorResolver(error);
          const hint = resolver.hints[0];
          const sessionId = resolver.session;

          setPhoneResolver(resolver);

          firebase
            .auth()
            .verifyPhoneNumberWithMultiFactorInfo(hint, sessionId) // triggers the message to the user
            .then((verificationId) => {
              setLoading(false);
              navigation.navigate("DigitScreen", {
                phone: hint.displayName,
                from: "login",
                verificationId: verificationId,
              });
            });
        } else {
          setLoading(false);
          setUser((prev) => ({ ...prev, emailError: error.message }));
        }
      });
  }

  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user]);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={style.CContainer}>
          <TextView title="Login" details="Login to account" />
          <View style={[style.Flex5, style.MTop20]}>
            <InputField
              value={user.email || ""}
              error={user.emailError}
              autoCapitalize="none"
              onChangeText={(e) => {
                const ee = e.replace(/\s/g, '');
                if (ee !== user.email) {
                  setUser((prev) => ({ ...prev, email: ee, emailError: "" }));
                }
              }}
              placeholder="example@mail.com"
              title="Your Email"
              keyboardType="email-address"
            />
            <InputField
              textContentType="password"
              value={user.password || ""}
              autoCapitalize="none"
              error={user.pwdError}
              onChangeText={(e) => {
                const ee = e.replace(/\s/g, '');
                if (ee !== user.password) {
                  setUser((prev) => ({ ...prev, password: ee, pwdError: "" }));
                }
              }}
              title="Password"
              placeholder="Your Main Password"
            />
            <View style={[style.VContainer, style.TLCenter, style.MV20]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPasswordScreen");
                }}
              >
                <Text
                  style={{
                    color: "#AAAAAA",
                    textDecorationLine: "underline",
                  }}
                >
                  Forgot password? 
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <SolidButton
            btn={btnStatus}
            onPress={handleSignIn}
            title="Sign In"
          ></SolidButton>
          <View style={[style.VContainer, style.TACenter, style.MV20]}>
            <Text style={{ color: "#666666", marginRight: 6 }}>
              Don’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("SetLoginData");
              }}
            >
              <Text style={[style.FPColor]}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <LoadingView />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
