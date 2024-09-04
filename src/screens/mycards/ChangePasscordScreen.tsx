import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { InputField } from "../../components/card/InputField";
import { firebase } from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";


const ChangePasscordScreen: FC<
  NativeStackScreenProps<ParamListBase, "ChangePasscordScreen">
> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordErr, setOldPasswordErr] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSave = () => {
    if (!oldPassword) {
      setOldPasswordErr("Password is required.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setNewPasswordErr("Too weak. Minimum password length is 8.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordErr("Passwords do not match.");
      return;
    }
    var user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email!,
      oldPassword
    );

    user
      .reauthenticateWithCredential(cred)
      .then((_success) => {
        var user = firebase.auth().currentUser;
        user
          ?.updatePassword(newPassword)
          .then(() => {
            Toast.show({
              type: "custom",
              props: {
                style: "success",
              },
              text1: "Change Password",
              text2: "Passcode changed updated successfully.",
            });
          })
          .catch((error) => {
            Toast.show({
              type: "custom",
              props: {
                style: "error",
              },
              text1: "Change Password",
              text2: error.message,
            });
            console.log(error);
          });
      })
      .catch((ex) => {
        if (ex.code === "auth/wrong-password") {
          setOldPasswordErr("Wrong password.");
        } else {
          setOldPasswordErr(ex.message);
        }
      });
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
        <Text style={[c_style.AgH1, style.FBColor]}>Change passcode</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E", marginBottom: 20 }]}>
          We need document that confirm you ID and address
        </Text>

        <InputField
          value={oldPassword}
          error={oldPasswordErr}
          title="Old Password"
          placeholder="Put Password"
          textContentType="password"
          autoCapitalize="none"
          containerStyle={{ marginBottom: 15 }}
          onChangeText={(text) => {
            setOldPassword(text);
            setOldPasswordErr("");
          }}
        />
        <InputField
          value={newPassword}
          error={newPasswordErr}
          autoCapitalize="none"
          title="New Password"
          placeholder="At least 8 characters"
          textContentType="password"
          containerStyle={{ marginBottom: 15 }}
          onChangeText={(text) => {
            setNewPassword(text);
            setNewPasswordErr("");
          }}
        />
        <InputField
          value={confirmPassword}
          error={confirmPasswordErr}
          title="Confirm Password"
          placeholder="Put Password again"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordErr("");
          }}
        />
        <View style={{ flex: 1 }} />
        <Button btn="primary" title="Save" onPress={onPressSave} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasscordScreen;
