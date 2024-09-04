import { FC, useState, useEffect } from "react";

import {
  // ActivityIndicator,
  SafeAreaView,
  ScrollView,
    Text,
  TouchableOpacity,
  // useWindowDimensions,
  View,
} from "react-native";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { InputField } from "../../components/card/InputField";
import { PageHeader } from "../../components/page-header";
import { validateEmail } from "../../utils/validator";
import { LoadingView } from "../../components/loading-view";
import { TextView } from "../../components/text-view";
import { firebase } from "@react-native-firebase/auth";
import GetStyle from "../../styles";


interface ForgotUser {
  email: string;
  emailError?: string;
}

const validate = (user: Partial<ForgotUser>, updateErr = false) => {
  if (updateErr) {
    user.emailError = "";
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
  return check;
};

const ForgotPasswordScreen: FC<
  NativeStackScreenProps<ParamListBase, "ForgotPasswordScreen">
> = ({ navigation }) => {
  const style = GetStyle();
  const [user, setUser] = useState<Partial<ForgotUser>>({});
  const [loading, setLoading] = useState(false);
  const [btnStatus, setBtnStatus] = useState("disable");
  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user]);

  const handler = () => {
    if (!validate(user, true)) {
      return;
    }
    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(user.email!)
      .then(() => {
        setLoading(false);
        navigation.navigate("EmailCheckScreen");
      })
      .catch((ex) => {
        if (ex.code === "auth/user-not-found") {
          setLoading(false);
          setUser((prev) => ({
            ...prev,
            emailError: "No user found by that email.",
          }));
          return;
        }
      });
  };

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={3}
        active={0}
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
          <TextView
            title="Forgot password"
            details="Write your email and we will send you a letter with instructions"
          />
          <View style={[style.Flex5, style.MTop20]}>
            <InputField
              value={user.email || ""}
              error={user.emailError}
              autoCapitalize="none"
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, email: e, emailError: "" }));
              }}
              title="Your Email"
              placeholder="example@mail.com"
              keyboardType="email-address"
            />
          </View>
          <SolidButton
            btn={btnStatus}
            onPress={handler}
            title="Continue"
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

export default ForgotPasswordScreen;
