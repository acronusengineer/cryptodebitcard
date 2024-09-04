import { FC, useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { SolidButton } from "../../components/solid-button";
import { InputField } from "../../components/card/InputField";
import { PageHeader } from "../../components/page-header";
import { TextView } from "../../components/text-view";
import { validatePhone } from "../../utils/validator";
import { LoadingView } from "../../components/loading-view";
import CountryFlag from "../../components/country-flag";
import { Country } from "../../models/codego";
import { CountryPickerModal } from "../../components/country-picker";
import { firebase } from "@react-native-firebase/auth";
import { SendPhoneVerification } from "../../services";
import GetStyle from "../../styles";


interface SignupUser {
  country?: Country;
  mobile: string;

  codeError?: string;
  mobileError?: string;
}

const validate = (user: Partial<SignupUser>, updateErr = false) => {
  if (updateErr) {
    user.codeError = "";
    user.mobileError = "";
  }
  let check = true;
  if (!user.country) {
    if (updateErr) {
      user.codeError = "Country Code is required.";
    }
    check = false;
  }
  if (!user.mobile) {
    if (updateErr) {
      user.mobileError = "Mobile Number is required.";
    }
    check = false;
  }
  if (user.mobile) {
    let result = validatePhone("+" + user.country?.phonecode + user.mobile);
    if (!result.isValid) {
      check = false;
      if (updateErr) {
        user.mobileError = result.err;
      }
    }
  }
  return check;
};

const MakeAccountSafe: FC<
  NativeStackScreenProps<ParamListBase, "MakeAccountSafe">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [user, setUser] = useState<Partial<SignupUser>>({});
  const [btnStatus, setBtnStatus] = useState("disable");

  const [showPicker, setShowPicker] = useState(false);
  const [country, setCountry] = useState<Country>();
  const style = GetStyle();
  
  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user]);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      country: country,
      countryError: "",
    }));
  }, [country]);

  const handleVerify = async () => {
    if (!validate(user, true)) {
      setUpdated((x) => x + 1);
      return;
    }
    setLoading(true);

    const phone = "+" + user.country?.phonecode + user.mobile;
    SendPhoneVerification(firebase.auth().currentUser!.uid, phone)
      .then((_res) => {
        console.log(_res);
        navigation.navigate("DigitScreen", {
          from: "signup",
          //verificationId: verificationId,
          phoneCode: user.country?.country_code,
          phone: phone,
        });
        setLoading(false);
      })
      .catch((ex) => {
        console.log("Error", ex);
        setLoading(false);
        setUser((prev) => ({ ...prev, mobileError: ex.message }));
      });
    // navigation.navigate("DigitScreen", {
    //     from: "signup",
    //     //verificationId: verificationId,
    //     phoneCode: user.country?.country_code,
    //     phone: phone,
    //   });
  };
  
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={5}
        active={1}
        slide={true}
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
      />
      <CountryPickerModal
        showPhone={true}
        selected={country?.country_code}
        open={showPicker}
        onPress={(v) => {
          if (v) {
            setCountry(v);
          }
          setShowPicker(false);
        }}
      ></CountryPickerModal>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[style.CContainer, style.Flex1]} key={updated}>
          <TextView
            title={"Make Account Safe"}
            details={
              "Enter your phone number. We will send you a confirmation code there"
            }
          />
          <View style={[style.VContainer, style.Flex4, style.MTop20]}>
            <View style={[style.FBase1, style.MainRBText, styles.container]}>
              <TouchableOpacity
                onPress={() => {
                  setShowPicker(true);
                }}
              >
                {country ? (
                  <View style={[style.VContainer, { alignItems: "center" }]}>
                    <CountryFlag flag={country.flag!} size={30} />
                    <Text style={[style.FBColor]}> +{country.phonecode}</Text>
                  </View>
                ) : (
                  <View style={[style.VContainer]}>
                    <Text style={[{ paddingLeft: 5 }, style.FGColor]}>
                      Country
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={style.FBase3}>
              <InputField
                value={user.mobile || ""}
                autoCapitalize="none"
                error={user.mobileError}
                onChangeText={(e) => {
                  setUser((prev) => ({ ...prev, mobile: e, mobileError: "" }));
                }}
                placeholder="Mobile number"
                keyboardType="numeric"
                autoComplete="tel"
              />
            </View>
          </View>
          <View style={style.Flex1}>
            <SolidButton
              btn={btnStatus}
              title="Continue"
              onPress={handleVerify}
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
          {loading && <LoadingView />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  width70: {
    width: "70%",
  },
  width30: {
    width: "30%",
  },
  container: {
    height: 45,
    borderRadius: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    flex: 1,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 20,
  },
  imageStyle: {
    margin: 2,
    padding: 10,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    alignItems: "flex-end",
  },
  error: {
    height: 12,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 10,
    fontSize: 10,
  },
});

export default MakeAccountSafe;
