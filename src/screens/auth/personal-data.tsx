import { FC, useState, useEffect } from "react";

import {
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { InputField } from "../../components/card/InputField";
import { PageHeader } from "../..//components/page-header";
import { TextView } from "../../components/text-view";
import { LoadingView } from "../../components/loading-view";

import { useRecoilState } from "recoil";
import { Country, GetCustomerFromProfile } from "../../models/codego";
import { CountryPickerModal } from "../../components/country-picker";
import { UpdateUserProfile } from "../../services";
import { profileState } from "../../states/authState";
import { UserProfile } from "../../models/user";
import useAPIs from "../../services/hooks/useAPIs";
import {
  CodegoCountries,
  CodegoIncomeSources,
  CodegoNationalities,
} from "../../services/codego/constant";
import GetStyle from "../../styles";
import storage from "../../utils/storage";


interface Persondata {
  country: Country;
  city: string;
  zipcode: string;
  address: string;
  countryError?: string;
  cityError?: string;
  zipcodeError?: string;
  addressError?: string;
}
const validate = (user: Partial<Persondata>, updateErr = false) => {
  if (updateErr) {
    user.countryError = "";
    user.cityError = "";
    user.zipcodeError = "";
    user.addressError = "";
  }
  let check = true;
  if (!user.city) {
    if (updateErr) {
      user.cityError = "City is required";
    }
    check = false;
  }
  if (!user.address) {
    if (updateErr) {
      user.addressError = "Address is required";
    }
    check = false;
  }
  if (!user.zipcode) {
    if (updateErr) {
      user.zipcodeError = "Zipcode is required";
    }
    check = false;
  }
  if (!user.country) {
    if (updateErr) {
      user.countryError = "Country is required";
    }
    check = false;
  }
  return check;
};
const PersonalData: FC<
  NativeStackScreenProps<ParamListBase, "PersonalData">
> = ({ navigation }) => {
  const [user, setUser] = useState<Partial<Persondata>>({});
  const [btnStatus, setBtnStatus] = useState("disable");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<Country>();
  const nationalties = CodegoNationalities;
    const [showPicker, setShowPicker] = useState(false);
  const incomes = CodegoIncomeSources;
  const style = GetStyle();
  const [profile, setProfile] = useRecoilState<UserProfile | null>(
    profileState
  );

  const { CreateCustomer } = useAPIs();

  useEffect(() => {
    setCountry(
      CodegoCountries.find((x) => x.country_code === profile?.phonecode)
    );
  }, []);

  useEffect(() => {
    if (validate(user)) {
      setBtnStatus("primary");
    } else {
      setBtnStatus("disable");
    }
  }, [user]);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      country: country,
      countryError: "",
    }));
  }, [country]);

  const handler = () => {
    if (!validate(user, true)) {
      return;
    }
    const countryId = Number(user.country?.id);
    let income = "Salary";
    if (incomes && !incomes.includes(income)) {
      if (incomes.length > 0) income = incomes[0];
    }
    const nationality =
      nationalties &&
      nationalties.find((x) => x.country_code === user.country?.country_code);
    navigation.navigate("AppNavigator");
    setLoading(true);
    UpdateUserProfile(profile!.uid!, {
      country_of_residence: countryId,
      country: countryId,
      country_id: countryId,
      work_country: countryId,
      country_pay_tax: countryId,
      is_same: 1,
      receive_card_city: user.city,
      receive_card_capital: "",
      receive_card_address: user.address,
      receive_card_country: countryId,
      receive_card_zipcode: user.zipcode,
      nationality: nationality ? Number(nationality.id) : countryId,
      address: user.address,
      zipcode: user.zipcode,
      city: user.city,
      political_person: "No",
      income_source: income,
    }).then((_pro) => {
      setProfile(_pro);
      CreateCustomer(GetCustomerFromProfile(_pro))
        .then((data) => {
          setLoading(false);
          if (data.status === 1) {
            UpdateUserProfile(profile!.uid!, {
              codegoId: data.user_id,
              step: "finished",
            }).then((up) => {
              setProfile(up);
              storage.set("userInfo", {email : up?.email, encyptPass: up?.password });
              storage.set("activeTime", {activeTime: Date.now()});
              navigation.popToTop();
              navigation.navigate("AppNavigator");
            });
          } else {
            console.log(data.status, data.message);
            Toast.show({
              type: "error",
              props: {
                style: "error",
              },
              text1: data.status+"",
              text2: data.message,
            });
          }
        })
        .catch((ex) => {
          console.log("Error", ex);
          setLoading(false);   
        });
    }).catch((error) => {
      Toast.show({
        type: "error",
        props: {
          style: "error",
        },
        text1: "User update error",
        text2: error.message,
      });
      setLoading(false);
    })
  };
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        title=""
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        count={5}
        active={4}
        slide={true}
      />
      <CountryPickerModal
        open={showPicker}
        selected={country?.country_code}
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
        <View style={style.CContainer} /*key={updated}*/>
          <TextView
            title="Personal Data"
            details="We need this for future verification"
          />
          <View style={[style.MTop20, style.Flex4]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setShowPicker(true);
              }}
            >
              <InputField
                disabled={true}
                onPressIn={()=>{
                  if (Platform.OS === 'ios') {
                    setShowPicker(true);
                  }
                }}
                value={user.country?.country_name || ""}
                error={user.countryError}
                autoCapitalize="words"
                title="Country of residence"
                placeholder="United States"
              />
            </TouchableOpacity>
            <View style={[style.VContainer, style.TACenter]}>
              <View style={[style.FBase1, { marginRight: 10 }]}>
                <InputField
                  value={user.city || ""}
                  error={user.cityError}
                  onChangeText={(e) => {
                    setUser((prev) => ({ ...prev, city: e, cityError: "" }));
                  }}
                  title="City"
                  placeholder="New York"
                />
              </View>
              <View style={style.FBase1}>
                <InputField
                  value={user.zipcode || ""}
                  autoCapitalize="characters"
                  error={user.zipcodeError}
                  onChangeText={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      zipcode: e,
                      zipcodeError: "",
                    }));
                  }}
                  title="Zipcode"
                  placeholder="32434"
                />
              </View>
            </View>
            <InputField
              error={user.addressError}
              value={user.address || ""}
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, address: e, addressError: "" }));
              }}
              title="Address"
              placeholder="Wall Street 21"
            />
          </View>
          <View style={style.Flex1}>
            <SolidButton
              btn={btnStatus}
              title="Continue"
              onPress={handler}
            ></SolidButton>
          </View>
        </View>
        {loading && <LoadingView />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalData;
