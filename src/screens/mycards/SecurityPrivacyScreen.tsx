import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import c_style from "../../styles/card";
import { Switch } from "../../components/card/Switch";
import Toast from "react-native-toast-message";
import icon_change_passcord from "../../assets/images/card/icon_change_passcode.png";
import icon_face_id from "../../assets/images/card/icon_face_id.png";
import storage from "../../utils/storage";
import { useRecoilState } from "recoil";
import { faceIDState } from "../../states/appState";
import { profileState } from "../../states/authState";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";
import ReactNativeBiometrics from "react-native-biometrics";


const SecurityPrivacyScreen: FC<
  NativeStackScreenProps<ParamListBase, "SecurityPrivacyScreen">
> = ({ navigation }) => {
  const [faceId, setFaceId] = useRecoilState(faceIDState);
  const [profile] = useRecoilState(profileState);
  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    storage.get("faceID").then((value) => {
      if (value === "true") {
        setFaceId(true);
      }
    });
  }, []);

  const onChangeFaceId = (value: boolean) => {
    if (value) {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });

      rnBiometrics.isSensorAvailable().then( async (result) => {
        const { available, biometryType } = result;
        if (available) {   
          if (biometryType === 'FaceID' || biometryType === 'TouchID' || biometryType === 'Biometrics')
          {
            console.log('Biometric is supported : ', biometryType);
            rnBiometrics
            .simplePrompt({
              promptMessage: "Enable Biometrics",
              cancelButtonText: "Close",
            })
            .then(async (resultObject) => { 
              const { success, error } = resultObject;
              if (success) {
                const { publicKey } = await rnBiometrics.createKeys();
                storage.set("faceID", "true");
                storage.set("signData", { pubKey: publicKey, uid: profile?.uid });
                            
                Toast.show({
                  type: "custom",
                  props: {
                    style: "success",
                  },
                  text1: biometryType === 'Biometrics'? "Fingerprint enabled!" : "Face ID enabled!",
                  text2: "Congratulations!",
                });
                setFaceId(true);
              } else {
                Toast.show({
                  type: "custom",
                  props: {
                    style: "error",
                  },
                  text1: "Biometrics error",
                  text2: error || "Failed to pass biometrics",
                });
              }
            })
            .catch((_ex) => {
              Toast.show({
                type: "custom",
                props: {
                  style: "default",
                },
                text1: "Biometrics error",
                text2: _ex.code,
              });
            });
          } 
        } else {
          Toast.show({
            type: "custom",
            props: {
              style: "default",
            },
            text1: "Biometrics",
            text2:
              "Biometrics is not supported in this device. Check your device setting to enable biometrics.",
          });
        }
      });
    } else {
      setFaceId(value);
      storage.set("faceID", "false");
    }
  };

  const onPressChangePasscord = () => {
    navigation.navigate("ChangePasscordScreen");
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
        <Text style={[c_style.AgH1, style.FBColor]}>Security & Privacy</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
          We need document that confirm you ID and address
        </Text>
        <View
          style={[
            styles.SettingGroupContainer,
            style.MainRBText,
            { marginTop: 20 },
          ]}
        >
          <TouchableOpacity
            style={[styles.SettingContainer, { marginTop: 10 }]}
            onPress={onPressChangePasscord}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_change_passcord} />
            </View>
            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              Change passcode
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "white",
              marginTop: 9,
            }}
          />
          <TouchableOpacity
            style={[styles.SettingContainer, { marginTop: 10 }]}
            onPress={() => {
              onChangeFaceId(!faceId);
            }}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_face_id} />
            </View>
            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              Sign in with { Platform.OS === "android" ? "Fingerprint" :  "Face ID" }
            </Text>
            <View style={{ flex: 1 }} />
            <Switch value={faceId} onChange={onChangeFaceId} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfileContainer: {
    height: 56,
    width: "100%",
    borderRadius: 32,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    flexDirection: "row",
  },
  SettingGroupContainer: {
    height: 120,
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  SettingContainer: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  AvatarModalContainer: {
    position: "absolute",
    top: 10,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  iconImage: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SecurityPrivacyScreen;
