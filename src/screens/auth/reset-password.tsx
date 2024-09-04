import { FC, useState, useEffect } from "react";

import { SafeAreaView, ScrollView, View } from "react-native";
import { SolidButton } from "../../components/solid-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { InputField } from "../../components/card/InputField";
import { PageHeader } from "../../components/page-header";
import { TextView } from "../../components/text-view";
import { LoadingView } from "../../components/loading-view";
import GetStyle from "../../styles";


interface PasswordUser {
  password: string;
  confirm: string;

  pwdError?: string;
  cfmError?: string;
}
const validate = (user: Partial<PasswordUser>, updateErr = false) => {
  if (updateErr) {
    user.pwdError = "";
    user.cfmError = "";
  }
  let check = true;

  if (!user.password) {
    if (updateErr) {
      user.pwdError = "Password is required.";
    }
    check = false;
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

const ResetPassword: FC<
  NativeStackScreenProps<ParamListBase, "ResetPassword">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Partial<PasswordUser>>({});
  const [btnStatus, setBtnStatus] = useState("disable");

  const style = GetStyle();
  useEffect(() => {
    if (!validate(user)) {
      setBtnStatus("disable");
    } else {
      setBtnStatus("primary");
    }
  }, [user.confirm, user.password]);

  const handler = () => {
    if (!validate(user, true)) {
      return;
    }
    setLoading(true);
  };
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <PageHeader
        count={3}
        active={2}
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
            title="Create New Password"
            details="Create new password  for safe funds"
          />
          <View style={[style.Flex5, style.MTop20]}>
            <InputField
              secureTextEntry={true}
              //secureTextEntry={hiddenPwd}
              //setshow={handlerPwdHidde}
              value={user.password || ""}
              autoCapitalize="none"
              error={user.pwdError}
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, password: e, pwdError: "" }));
              }}
              title="Password"
              placeholder="At least 8 characters"
            />
            <InputField
              secureTextEntry={true}
              //setshow={handlerCfmHidde}
              value={user.confirm || ""}
              autoCapitalize="none"
              error={user.cfmError}
              onChangeText={(e) => {
                setUser((prev) => ({ ...prev, confirm: e, cfmError: "" }));
              }}
              title="Conform Password"
              placeholder="Put Password again"
            />
          </View>
          <View style={style.Flex1}>
            <SolidButton
              btn={btnStatus}
              // onPress={() => {
              //   navigation.navigate("FirstScreen");
              // }}
              onPress={handler}
              title="Save"
            ></SolidButton>
          </View>
        </View>
        {loading && <LoadingView />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
