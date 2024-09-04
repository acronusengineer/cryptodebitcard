import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { LoadingView } from "../../components/loading-view";
import { GetUserProfile, SendPhoneVerification, UpdateUserProfile } from "../../services";
import GetStyle from "../../styles";
import { useRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { BackButton } from "../../components/card/BackButton";

interface ParamsProps {
  phone: string;
  verificationId: string;
  from: string;
  phoneCode?: string;
}

const PhoneVerificationScreen: FC<
  NativeStackScreenProps<ParamListBase, "PhoneVerificationScreen">
> = ({ navigation, ...props }) => {
  const params = props.route.params as ParamsProps;
  const [profile, setProfile] = useRecoilState(profileState);

  const [phone, _] = useState(params.phone);  
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [cprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const style = GetStyle();  

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressResend = () => {
    if (!profile?.uid) return;
    setLoading(true);

    SendPhoneVerification(profile?.uid, phone)
      .then((_res) => {
        setLoading(false);
      })
      .catch((ex) => {
        console.log("Error", ex);
        setLoading(false);
      });
  };

  const onPressVerify = () => {
    if (!profile?.uid) return;
    setLoading(true);

    try {
      const verificationCode = value;
      GetUserProfile(profile.uid).then((_profile) => {
        if (_profile.verification === verificationCode) {
          UpdateUserProfile(_profile.uid!, {
            mobile: params.phone,
            phonecode: params.phoneCode,
          }).then((prof) => {
            setProfile(prof);
            setLoading(false);
            navigation.pop(2);
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

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 70,
        }}
      >
        <Text style={[c_style.AgH1, { color: "black" }]}>6-digit code</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
          Code sent to {phone}
        </Text>

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

        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
            Not yet got the code?{" "}
          </Text>
          <TouchableOpacity style={{ marginLeft: 5 }} onPress={onPressResend}>
            <Text style={[c_style.AgP, { color: "#F7873C" }]}>Resend code</Text>
          </TouchableOpacity>
        </View>
        <Button
          btn="primary"
          title="Verify"
          containerStyle={{ marginTop: 10 }}
          onPress={onPressVerify}
        />
      </View>
      {loading && <LoadingView />}
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

export default PhoneVerificationScreen;
