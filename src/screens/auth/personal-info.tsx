import { FC, useEffect, useState } from "react";

import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { SolidButton } from "../../components/solid-button";
import { InputField } from "../../components/card/InputField";
import { Select } from "../../components/card/Select";
import { PageHeader } from "../..//components/page-header";
import { LoadingView } from "../../components/loading-view";
import { UpdateUserProfile } from "../../services";
import { useRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import GetStyle from "../../styles";


interface SignupUser {
  first: string;
  last: string;
  birthday: string;
  gender: "Male" | "Female";

  firstError?: string;
  lastError?: string;
  birthdayError?: string;
  genderError?: string;
}

const validate = (user: Partial<SignupUser>, updateErr = false) => {
  if (updateErr) {
    user.firstError = "";
    user.lastError = "";
    user.birthdayError = "";
    user.genderError = "";
  }
  let check = true;
  if (!user.first) {
    if (updateErr) {
      user.firstError = "First Name is required!";
    }
    check = false;
  }
  if (!user.last) {
    if (updateErr) {
      user.lastError = "Last Name is required.";
    }
    check = false;
  }
  if (!user.birthday) {
    if (updateErr) {
      user.birthdayError = "Birthday is required.";
    }
    check = false;
  }
  if (!user.gender){
    user.genderError = "Gender is required.";
    check = false;
  }
  console.log("User , ", user);
  console.log("check , ", check);
  return check;
};
const PersonalInfo: FC<
  NativeStackScreenProps<ParamListBase, "PersonalInfo">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Partial<SignupUser>>({});
  const [btnStatus, setBtnStatus] = useState("disable");
  const style = GetStyle();
  const [profile, setProfile] = useRecoilState(profileState);
  const [gender, setGender] = useState(2);

  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user, gender]);

  const handler = () => {
    if (!validate(user, true)) {
      return;
    }
    setLoading(true);
    UpdateUserProfile(profile!.uid!, {
      dob: user.birthday,
      name: user.first,
      surname: user.last,
      gender: user.gender,
      step: "name",
    })
      .then((profile) => {
        setProfile(profile);
        navigation.navigate("PersonalData");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        title=""
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        count={5}
        active={3}
        slide={true}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={style.CContainer} /*key={updated} */>
          <Text style={[style.FBColor, style.FSizeH1]}>Personal info</Text>
          <Text style={[style.FSizeP, style.FGColor]}>
            Name as in your official document and date of birth
          </Text>
          <View style={[style.MTop20, style.Flex4]}>
            <InputField
              value={user.first || ""}
              error={user.firstError}
              autoCapitalize="words"
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, first: e, firstError: "" }));
              }}
              title="First Name"
              placeholder="Robert"
            />
            <InputField
              value={user.last || ""}
              error={user.lastError}
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, last: e, lastError: "" }));
              }}
              title="Last Name"
              placeholder="Smith"
            />
            <InputField
              value={user.birthday}
              error={user.birthdayError}
              onChangeText={(e) => {
                setUser((prev) => ({
                  ...prev,
                  birthday: e,
                  birthdayError: "",
                }));
              }}
              datePicker={true}
              keyboardType="number-pad"
              placeholder="YYYY-MM-DD *"
              title="Date of Birth"
            />

            <Select
              title="Sex"
              error={user.genderError}
              data={[
                {
                  title: "Male",
                  value: 0,
                },
                {
                  title: "Female",
                  value: 1,
                },
                {
                  title: "None",
                  value: 2,
                },
              ]}
              containerStyle={{ marginTop: 20 }}
              placeholder="Gender"
              value={gender}
              onSelect={(value) => {
                setGender(value);
                if (value == 0){
                  setUser((prev) => ({
                    ...prev,
                    gender: "Male",
                    genderError: "",
                  }));
                } else if (value == 1) {
                  setUser((prev) => ({
                    ...prev,
                    gender: "Female",
                    genderError: "",
                  }));
                } else if (value == 2) {
                  setUser((prev) => ({
                    ...prev,
                    gender: undefined,
                    genderError: "",
                  }));
                }
              }}
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

export default PersonalInfo;
