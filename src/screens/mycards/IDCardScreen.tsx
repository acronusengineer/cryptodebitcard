import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import Toast from "react-native-toast-message";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import c_style from "../../styles/card";
import icon_upload_image from "../../assets/images/card/icon_upload_image.png";
import icon_upload_address from "../../assets/images/card/icon_upload_address.png";
import icon_input_error from "../../assets/images/card/icon_input_error.png";
import { Button } from "../../components/card/Button";
import { useRecoilValue } from "recoil";
import { profileState } from "../../states/authState";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";

const IDCardScreen: FC<
  NativeStackScreenProps<ParamListBase, "IDCardScreen">
> = ({ navigation }) => {
  const style = GetStyle();
  const profile = useRecoilValue(profileState);

  /*
  useFocusEffect(() => {
    CheckKYCStatus(profile!.codegoId!).then((s) => {
      setKYCStatus(s || []);
    });
  });
  */

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressUploadIdCard = () => {
    if (profile?.idDocStatus === "Verified" || profile?.idDocStatus === "Pending") return;

    navigation.navigate("VerifyIdentityScreen", {
      item: "ID",
    });
  };

  const onPressUploadAddress = () => {
    if (profile?.idDocStatus === "Verified" || profile?.idDocStatus === "Pending") {
      if (profile?.addressDocStatus === "Verified" || profile?.addressDocStatus === "Pending") return;

      navigation.navigate("VerifyIdentityScreen", {
        item: "Address",
      });
    } else {
      Toast.show({
        type: "custom",
        props: {
          style: "default",
        },
        text1: "Operation Warning",
        text2: "Please upload the ID & passport at first.",
      });
    }
  };

  const onPressFinish = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      {/* <StatusBar translucent backgroundColor="white" hidden={false} barStyle = "dark-content" /> */}
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
        <Text style={[c_style.AgH1, style.FBColor]}>
          KYC ID card and address
        </Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
          We need document that confirm your ID and address
        </Text>
        <TouchableOpacity
          style={[c_style.UploadButton, style.MainRBText, { marginTop: 16, backgroundColor: "#F7F7F7A0" }]}
          onPress={onPressUploadIdCard}
        >
          <Image source={icon_upload_image} style={{ width: 40, height: 40 }} />
          <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
            ID Card or Passport
          </Text>
          <View style={{ flex: 1 }} />
          {profile?.idDocStatus && (
            <View
              style={{
                backgroundColor: "#EFE1FFA1",
                paddingHorizontal: 11,
                borderRadius: 24,
                height: 24,
                justifyContent: "center",
              }}
            >
              <Text style={[c_style.AgCaption, { color: profile?.idDocStatus === "Verified" ? "#03AB00" : (profile?.addressDocStatus === "Rejected"? "#F62323" : "#481B75") }]}>
                {profile?.idDocStatus}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[c_style.UploadButton, style.MainRBText, { marginTop: 16, backgroundColor: "#F7F7F7A0"}]}
          onPress={onPressUploadAddress}
        >
          <Image
            source={icon_upload_address}
            style={{ width: 40, height: 40 }}
          />
          <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
            Proof of Address
          </Text>
          <View style={{ flex: 1 }} />
          {profile?.addressDocStatus && (
            <View
              style={{
                backgroundColor: "#EFE1FFA1",
                paddingHorizontal: 11,
                borderRadius: 24,
                height: 24,
                justifyContent: "center",
              }}
            >
              <Text style={[c_style.AgCaption, { color: profile?.addressDocStatus === "Verified" ? "#03AB00" : (profile?.addressDocStatus === "Rejected"? "#F62323" : "#481B75") }]}>
                {profile?.addressDocStatus}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        { (profile?.idDocStatus === "Rejected" || profile?.addressDocStatus === "Rejected") && (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 16
            }}>
              <Image source={icon_input_error} style={{ width: 12, height: 12 }} />
              <Text style={[c_style.AgCaption, { color: "#F62323", marginStart: 6}]}>
                We found issues with your documents! Check your document
                it looks wrong! More details we sent to your email.
                Try again to upload your document.
              </Text>
          </View>
        )}
        <View style={{ flex: 1 }} />
        <Button btn="primary" title="Finish" onPress={onPressFinish} />
      </View>
    </SafeAreaView>
  );
};

export default IDCardScreen;
