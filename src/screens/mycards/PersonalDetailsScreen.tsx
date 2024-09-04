import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { InputField } from "../../components/card/InputField";
import { useRecoilValue } from "recoil";
import { profileState } from "../../states/authState";
import { themeState } from "../../states/appState";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";
import { Country } from "../../models/codego";
import { CodegoCountries } from "../../services/codego/constant";
import { CountryPickerModal } from "../../components/country-picker";
import CountryFlag from "../../components/country-flag";
import { LoadingView } from "../../components/loading-view";
import { SendPhoneVerification } from "../../services";

const PersonalDetailsScreen: FC<
  NativeStackScreenProps<ParamListBase, "PersonalDetailsScreen">
> = ({ navigation }) => {
  const profile = useRecoilValue(profileState);
  const theme = useRecoilValue(themeState);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState(profile?.name);
  const [lastname, setLastname] = useState(profile?.surname);
  const [birthday, setBirthday] = useState(profile?.dob);
  const [address, setAddress] = useState(
    [profile?.address, profile?.city, profile?.zipcode].join(", ")
  );
  const [verified, _] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPhone, setOldPhone] = useState('');
  const [country, setCountry] = useState<Country>();
  const [showPicker, setShowPicker] = useState(false);
  const [enableSave, setEnableSave] = useState(false);


  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSave = () => {
    if (!profile?.uid) return;
    
    setLoading(true);

    const phone = "+" + country?.phonecode + phoneNumber;
    SendPhoneVerification(profile?.uid, phone)
      .then((_res) => {
        console.log(_res);
        navigation.navigate("PhoneVerificationScreen", {
          from: "PersonalDetailsScreen",
          //verificationId: verificationId,
          phoneCode: country?.country_code,
          phone: phone,
        });
        setLoading(false);
      })
      .catch((ex) => {
        console.log("Error", ex);
        setLoading(false);
      });
  };

  const loadPhoneNumber = () => {
    if(profile?.mobile && country?.phonecode){
      setPhoneNumber(profile?.mobile.slice(country?.phonecode.length+ 1));
      setOldPhone(profile?.mobile.slice(country?.phonecode.length+ 1));
    }
  }

  useEffect(()=> {
    if (profile?.phonecode){
      setCountry(
        CodegoCountries.find((x) => x.country_code === profile?.phonecode)
      );  
    } else {
      setCountry(
        CodegoCountries.find((x) => x.id === profile?.country_id + "")
      );  
    }
  }, [profile]);

  useEffect(()=> {
    loadPhoneNumber();
  }, [country]);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
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
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: 70,
          }}
        >
          <Text style={[c_style.AgH1, style.FBColor]}>Personal details</Text>
          <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>Account info</Text>
          <View style={[style.VContainer, style.Flex4, style.MTop20]}>
            <View style={[style.FBase1, styles.container, style.MainRBText, theme != "dark" ? {backgroundColor: "#f7f7f7"}  : {}]}>
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
                value={phoneNumber}
                autoCapitalize="none"
                error=''
                onChangeText={(e) => {
                  setPhoneNumber(e);
                  setEnableSave(oldPhone != e);
                }}
                placeholder="Mobile number"
                keyboardType="numeric"
                autoComplete="tel"
              />
            </View>
          </View>
          <View style={{
            width: "100%",
            height: 1,
            marginBottom: 15,
            backgroundColor: '#E0E0E0'
          }}/>
          <InputField
            value={firstname}
            disabled={!verified}
            title="First Name"
            placeholder="Jhon"
            onChangeText={(text) => {
              setFirstname(text);
            }}
          />
          <InputField
            value={lastname}
            title="Last Name"
            placeholder="Smith"
            disabled={!verified}
            onChangeText={(text) => {
              setLastname(text);
            }}
          />
          <InputField
            value={birthday}
            title="Date of Birth"
            placeholder="DD/MM/YYYY"
            disabled={!verified}
            editable={false}
            datePicker={true}
            onChangeText={(text) => {
              setBirthday(text);
            }}
          />
          <InputField
            value={address}
            title="Address"
            placeholder="Wall Street 21"
            disabled={!verified}
            containerStyle={{ marginBottom: 5 }}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <View >
            <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
              If you want to change your name, date of{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
                birth you should proceed KYC again
              </Text>
              {
                /*
                <TouchableOpacity style={{ marginLeft: 5 }}>
                <Text style={[c_style.AgP, { color: "#F7873C" }]}>KYC again</Text>
              </TouchableOpacity>
                */
              }
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <Button
            btn="primary"
            enabled={enableSave}
            title="Save"
            onPress={onPressSave}
          />
        </View>
        {loading && <LoadingView />}
      </ScrollView>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    height: 45,
    borderRadius: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    flex: 1,
  },
});

export default PersonalDetailsScreen;
