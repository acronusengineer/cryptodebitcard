import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import c_style from "../../styles/card";
import { InputField } from "../../components/card/InputField";
import { Button } from "../../components/card/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import GetStyle from "../../styles";

import { BackButton } from "../../components/card/BackButton";

const SubmitActivationScreen: FC<
  NativeStackScreenProps<ParamListBase, "SubmitActivationScreen">
> = ({ navigation }) => {
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  //const [ loading, setLoading ] = useState(false);

  const style = GetStyle();

  useEffect(() => {
    if (email != "" && password != "" && emailErr == "" && passwordErr == "") {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSubmit = () => {
    navigation.popToTop();
  };

  const onPressReset = () => {};

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <View style={{ width: "100%", flex: 1, paddingHorizontal: 24 }}>
        <View>
          <Text style={[c_style.AgH1, style.FBColor]}>Submit activation</Text>
          <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
            Please confirm that this is you and your desire to activate the card
          </Text>
        </View>
        <InputField
          value={email}
          autoCapitalize="none"
          error={emailErr}
          onChangeText={(e) => {
            setEmail(e || "");
            setEmailErr("");
            setPasswordErr("");
          }}
          containerStyle={{ marginTop: 20 }}
          placeholder="example@mail.com"
          title="Your Email"
          keyboardType="email-address"
        />
        <View>
          <InputField
            textContentType="password"
            value={password}
            error={passwordErr}
            onChangeText={(e) => {
              setPassword(e);
              setEmailErr("");
              setPasswordErr("");
            }}
            containerStyle={{ marginTop: 10 }}
            title="Password"
            placeholder="Your Main Password"
          />
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{ paddingBottom: 50, alignItems: "center", width: "100%" }}
        >
          <Button
            btn="primary"
            title="Submit"
            enabled={valid}
            onPress={onPressSubmit}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Forget password?
            </Text>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={onPressReset}>
              <Text style={[c_style.AgCaption, { color: "#F7873C" }]}>
                Reset it
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubmitActivationScreen;
