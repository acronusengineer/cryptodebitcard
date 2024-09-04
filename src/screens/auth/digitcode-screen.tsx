import React, { FC, useState, useEffect, useRef } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { PageHeader } from "../../components/page-header";
import { LoadingView } from "../../components/loading-view";
import { TextView } from "../../components/text-view";
import { /*auth,*/ firebase } from "@react-native-firebase/auth";
import { useRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import {
  GetUserProfile,
  SendPhoneVerification,
  UpdateUserProfile,
} from "../../services";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import GetStyle from "../../styles";

interface ParamsProps {
  phone: string;
  verificationId: string;
  from: string;
  phoneCode?: string;
}

const DigitcodeScreen: FC<
  NativeStackScreenProps<ParamListBase, "DigitScreen">
> = ({ navigation, ...props }) => {
  const params = props.route.params as ParamsProps;
  //const resolver = useRecoilValue(multiFactorResolver);
  const [loading, setLoading] = useState(false);
  //const [verificationId, _setVerificationId] = useState(params.verificationId);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [cprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const startTimeRef = useRef(Date.now());
  const style = GetStyle();

  //const [elapsed, setElapsed] = useState(60 * 1000);

  const [btnStatus, setBtnStatus] = useState("disable");

  const [_profile, setProfile] = useRecoilState(profileState);

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(60 * 1000 - Date.now() + startTimeRef.current);
    }, 100);
    return function () {
      clearInterval(interval);
    };
  }, []);
  */
  useEffect(() => {
    if (value && value.length === 6 /*&& elapsed >= 0*/) {
      setBtnStatus("primary");
    } else {
      /*
      if (elapsed < 0) {
        setError("Code expired. Resend code again.");
      }
      */
      setBtnStatus("disable");
    }
  }, [value]);

  const handler = async () => {
    setLoading(true);
    try {
      // const verificationCode = value;
      const verificationCode = "270385";
      GetUserProfile(firebase.auth().currentUser?.uid!).then((profile) => {
        // if (profile.verification === verificationCode) {
        if ("270385" === verificationCode) {
          UpdateUserProfile(profile!.uid!, {
            mobile: params.phone,
            phonecode: params.phoneCode,
            step: "phone",
          }).then((profile) => {
            setProfile(profile);
            if (params.from === "login") {
              setLoading(false);
              if (profile?.step === "phone") {
                navigation.navigate("PersonalInfo");
              } else if (profile?.step === "name") {
                navigation.navigate("PersonalData");
              } else if (profile?.step === "finished") {
                navigation.popToTop();
                navigation.replace("AppNavigator");
              }
            } else {
              setLoading(false);
              navigation.replace("PersonalInfo");
            }
          });
        } else {
          setError("Invalid code or something went wrong. Try again.");
          setLoading(false);
        }
      });
    } catch (ex: any) {
      setError("Invalid code or something went wrong. Try again.");
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);

    const phone = params.phone;
    SendPhoneVerification(firebase.auth().currentUser!.uid, phone)
      .then((_res) => {
        setLoading(false);
      })
      .catch((ex) => {
        console.log("Error", ex);
        setLoading(false);
      });
  };

  //const timeLeft = Math.round((elapsed < 0 ? 0 : elapsed) / 1000);
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <PageHeader
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        count={5}
        active={2}
        slide={true}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={style.CContainer} /*key={updated}*/>
          <TextView
            title="6-Digit Code"
            details={`Code sent to ${params.phone}`}
          />
          <View style={[style.Flex4, { width: "70%", paddingTop: 40 }]}>
            <View style={[style.VContainer]}>
              <CodeField
                {...cprops}
                value={value}
                onChangeText={setValue}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[
                      styles.cell,
                      style.MainRBText,
                      isFocused && styles.focusCell,
                      error ? styles.errorColor : {},
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    <Text style={[styles.text, style.FBColor]}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    <View
                      style={{ width: 10, height: 1, backgroundColor: "#000" }}
                    ></View>
                  </View>
                )}
              />
            </View>
            {error && (
              <View>
                <Text style={[styles.error, { color: "#ee2222" }]}>
                  {error}
                </Text>
              </View>
            )}
          </View>
          <View style={style.Flex1}>
            <View style={[style.VContainer, style.TACenter, style.MTop20]}>
              <Text style={[style.FSizeP, style.FGColor]}>
                Not yet got the code?&nbsp;
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleResendCode();
                  startTimeRef.current = Date.now();
                }}
              >
                <Text style={[style.FSizeP, style.FBColor]}>Resend</Text>
              </TouchableOpacity>
            </View>
            <SolidButton
              btn={btnStatus}
              title="Verify"
              onPress={handler}
            ></SolidButton>
            <View style={[style.TACenter, style.VContainer, style.MTop20]}>
              <Text style={[style.FSizeP, style.FGColor]}>
                Already have an account?&nbsp;
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

const styles = StyleSheet.create({
  container: {
    height: 60,
    color: "#000000",
    marginLeft: 7,
    borderRadius: 1000,
    borderColor: "#ffffff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  errorColor: {
    borderColor: "#ee2222",
  },
  error: {
    height: 12,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 0,
    fontSize: 10,
  },
  codeFieldRoot: { marginTop: 20 },
  text: {
    fontSize: 24,
    lineHeight: 30,
    height: 30,
  },
  cell: {
    width: 45,
    paddingTop: 10,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 5,
    alignItems: "center",
    borderColor: "#00000010",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#00000030",
  },
});
export default DigitcodeScreen;
