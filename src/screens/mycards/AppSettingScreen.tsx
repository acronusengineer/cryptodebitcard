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
} from "react-native";
import c_style from "../../styles/card";
import { Switch } from "../../components/card/Switch";
import icon_language from "../../assets/images/card/icon_language.png";
import icon_face_id from "../../assets/images/card/icon_face_id.png";
import storage from "../../utils/storage";
import { useRecoilState } from "recoil";
import { themeState } from "../../states/appState";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";

const AppSettingScreen: FC<
  NativeStackScreenProps<ParamListBase, "AppSettingScreen">
> = ({ navigation }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    storage.get("theme-state").then((value) => {
      if (value === "dark") setTheme("dark");
    });
  });

  const onChangeFaceId = (value: boolean) => {
    if (value) {
      storage.set("theme-state", "dark");
      setTheme("dark");
    } else {
      storage.set("theme-state", "light");
      setTheme("light");
    }
  };
  const onPressCloseAccount = () => {};

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
        <Text style={[c_style.AgH1, style.FBColor]}>App Settings</Text>
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
            onPress={() => {
              onChangeFaceId(theme === "dark" ? false : true);
            }}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_face_id} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={[c_style.AgH5, style.FBColor]}>Theme</Text>
              <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
                {theme === "light" ? "Light Theme" : "Dark Theme"}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <Switch
              value={theme == "light" ? false : true}
              onChange={onChangeFaceId}
            />
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
            activeOpacity={1}
            style={[styles.SettingContainer, { marginTop: 10 }]}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_language} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={[c_style.AgH5, style.FBColor]}>Language</Text>
              <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
                Available only English
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onPressCloseAccount}>
            <Text style={[c_style.AgP, { color: "#F7873C" }]}>
              Close account
            </Text>
          </TouchableOpacity>
          <Text
            style={[c_style.AgCaption, { color: "#9E9E9E", marginTop: 10 }]}
          >
            Сomplete the following steps
          </Text>
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

export default AppSettingScreen;
