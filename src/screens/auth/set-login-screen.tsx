import { FC, useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
    Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { firebase } from "@react-native-firebase/auth";
import { ParamListBase } from "@react-navigation/native";

import { SolidButton } from "../../components/solid-button";
import { InputField } from "../../components/card/InputField";
import { PageHeader } from "../../components/page-header";
import { LoadingView } from "../../components/loading-view";
import { TextView } from "../../components/text-view";
import { validateEmail } from "../../utils/validator";
import { CreateUserProfile } from "../../services";
import { useSetRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import { User } from "../../models/user";
import GetStyle from "../../styles";


interface SignupUser {
  // name: string;
  email: string;
  password: string;
  confirm: string;

  // nameError?: string;
  emailError?: string;
  pwdError?: string;
  cfmError?: string;
}
const validate = (user: Partial<SignupUser>, updateErr = false) => {
  if (updateErr) {
    user.emailError = "";
    user.pwdError = "";
    user.cfmError = "";
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
  if (updateErr) {
    if (user.password && user.password.length < 8) {
      if (updateErr) {
        user.pwdError = "Too weak. Minimum password length is 8.";
      }
      check = false;
    }
  }

  if (!user.confirm) {
    if (updateErr) {
      user.cfmError = "Confirm Password is required.";
    }
    check = false;
  }
  if (user.confirm != user.password) {
    if (updateErr) {
      user.cfmError = "Confirm Password is not matched";
    }
    check = false;
  }
  
  return check;
};
const SetLoginData: FC<
  NativeStackScreenProps<ParamListBase, "SetLoginData">
> = ({ navigation }) => {
  const setProfile = useSetRecoilState(profileState);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Partial<SignupUser>>({});
  const [updated, setUpdated] = useState(0);
  const [btnStatus, setBtnStatus] = useState("disable");
  const style = GetStyle();

  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user]);

  const handlerSignup = () => {
    if (btnStatus === "disable") return;
    if (!validate(user, true)) {
      setUpdated((x) => x + 1);
      return;
    }
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email!, user.password!)
      .then((res) => {
        res.user.sendEmailVerification();
        CreateUserProfile(res.user as User, user.password!).then((profile) => {
          setProfile(profile);
        });
        setLoading(false);
        setUpdated(0);
        setUser({ password: "", confirm: "", email: "" });
        navigation.navigate("EmailVerification");
      })
      .catch((er) => {
        setLoading(false);
        if (er.code === "auth/email-already-in-use") {
          setUser((prev) => ({
            ...prev,
            emailError:
              "The email address is already in use by another account.",
          }));
        } else {
          setUser((prev) => ({
            ...prev,
            nameError: er.message,
          }));
        }
      });
  };
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={5}
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
        <View style={[style.CContainer, style.Flex1]} key={updated}>
          <TextView
            title={"Set a Login Data"}
            details={
              "Set an email and password to create your login data inside Solar"
            }
          />
          <View style={[style.Flex4, style.MTop20]}>
            <InputField
              value={user.email || ""}
              error={user.emailError}
              autoCapitalize="none"
              onChangeText={(e) => {
                const ee = e.replace(/\s/g, '');
                setUser((prev) => ({ ...prev, email: ee, emailError: "" }));
              }}
              placeholder="example@mail.com"
              title="Email"
            />
            <InputField
              textContentType="password"
              value={user.password || ""}
              autoCapitalize="none"
              error={user.pwdError}
              onChangeText={(e) => {
                const ee = e.replace(/\s/g, '');
                setUser((prev) => ({ ...prev, password: ee, pwdError: "" }));
              }}
              placeholder="At least 8 characters"
              title="Password"
            />
            <InputField
              textContentType="password"
              value={user.confirm || ""}
              autoCapitalize="none"
              error={user.cfmError}
              onChangeText={(e) => {
                const ee = e.replace(/\s/g, '');
                setUser((prev) => ({ ...prev, confirm: ee, cfmError: "" }));
              }}
              title="Conform Password"
              placeholder="Put password again"
            />
          </View>
          <View style={style.Flex1}>
            <SolidButton
              btn={btnStatus}
              title="Continue"
              onPress={handlerSignup}
            ></SolidButton>
            <View style={[style.VContainer, style.TACenter, style.MV20]}>
              <Text style={[style.FSizeP, style.FGColor]}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("LoginScreen");
                }}
              >
                <Text style={[style.FSizeP, style.FPColor]}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loading && <LoadingView />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetLoginData;
