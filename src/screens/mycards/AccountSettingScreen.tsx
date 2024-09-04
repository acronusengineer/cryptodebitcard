import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { ImageButton } from "../../components/card/ImageButton";
import { UpdateUserProfile } from "../../services";
import c_style from "../../styles/card";
import { LoadingView } from "../../components/loading-view";
import avata_1 from "../../assets/images/card/avatar_1.png";
import avata_2 from "../../assets/images/card/avatar_2.png";
import avata_3 from "../../assets/images/card/avatar_3.png";
import avata_4 from "../../assets/images/card/avatar_4.png";
import avata_5 from "../../assets/images/card/avatar_5.png";
import avata_6 from "../../assets/images/card/avatar_6.png";
import avata_7 from "../../assets/images/card/avatar_7.png";
import avata_8 from "../../assets/images/card/avatar_8.png";
import avata_9 from "../../assets/images/card/avatar_9.png";
import avata_10 from "../../assets/images/card/avatar_10.png";
import avata_11 from "../../assets/images/card/avatar_11.png";
import avata_12 from "../../assets/images/card/avatar_12.png";
import avata_13 from "../../assets/images/card/avatar_13.png";
import avata_14 from "../../assets/images/card/avatar_14.png";
import avata_15 from "../../assets/images/card/avatar_15.png";
import avata_16 from "../../assets/images/card/avatar_16.png";
import avata_17 from "../../assets/images/card/avatar_17.png";
import avata_18 from "../../assets/images/card/avatar_18.png";
import avata_19 from "../../assets/images/card/avatar_19.png";
import avata_20 from "../../assets/images/card/avatar_20.png";
import avata_21 from "../../assets/images/card/avatar_21.png";
import avata_22 from "../../assets/images/card/avatar_22.png";
import avata_23 from "../../assets/images/card/avatar_23.png";
import avata_24 from "../../assets/images/card/avatar_24.png";
import avata_25 from "../../assets/images/card/avatar_25.png";
import avata_26 from "../../assets/images/card/avatar_26.png";
import avata_27 from "../../assets/images/card/avatar_27.png";
import avata_28 from "../../assets/images/card/avatar_28.png";
import avata_29 from "../../assets/images/card/avatar_29.png";
import avata_30 from "../../assets/images/card/avatar_30.png";

import icon_arrow_right from "../../assets/images/card/icon_arrow_right.png";
import icon_arrow_upright from "../../assets/images/card/icon_arrow_upright.png";
import icon_security from "../../assets/images/card/icon_security.png";
import icon_app_setting from "../../assets/images/card/icon_app_setting.png";
import icon_privacy_police from "../../assets/images/card/icon_privacy_police.png";
import icon_terms_conditions from "../../assets/images/card/icon_terms_conditions.png";
import { Button } from "../../components/card/Button";
import { firebase } from "@react-native-firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, profileState } from "../../states/authState";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";
import storage from "../../utils/storage";

export interface avatar {
  icon: any;
  value: number;
}

export const avatarList: avatar[] = [
  {
    icon: avata_1,
    value: 1,
  },
  {
    icon: avata_2,
    value: 2,
  },
  {
    icon: avata_3,
    value: 3,
  },
  {
    icon: avata_4,
    value: 4,
  },
  {
    icon: avata_5,
    value: 5,
  },
  {
    icon: avata_6,
    value: 6,
  },
  {
    icon: avata_7,
    value: 7,
  },
  {
    icon: avata_8,
    value: 8,
  },
  {
    icon: avata_9,
    value: 9,
  },
  {
    icon: avata_10,
    value: 10,
  },
  {
    icon: avata_11,
    value: 11,
  },
  {
    icon: avata_12,
    value: 12,
  },
  {
    icon: avata_13,
    value: 13,
  },
  {
    icon: avata_14,
    value: 14,
  },
  {
    icon: avata_15,
    value: 15,
  },
  {
    icon: avata_16,
    value: 16,
  },
  {
    icon: avata_17,
    value: 17,
  },
  {
    icon: avata_18,
    value: 18,
  },
  {
    icon: avata_19,
    value: 19,
  },
  {
    icon: avata_20,
    value: 20,
  },
  {
    icon: avata_21,
    value: 21,
  },
  {
    icon: avata_22,
    value: 22,
  },
  {
    icon: avata_23,
    value: 23,
  },
  {
    icon: avata_24,
    value: 24,
  },
  {
    icon: avata_25,
    value: 25,
  },
  {
    icon: avata_26,
    value: 26,
  },
  {
    icon: avata_27,
    value: 27,
  },
  {
    icon: avata_28,
    value: 28,
  },
  {
    icon: avata_29,
    value: 29,
  },
  {
    icon: avata_30,
    value: 30,
  },
];

const AccountSettingScreen: FC<
  NativeStackScreenProps<ParamListBase, "AccountSettingScreen">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const [currentAvatar, setCurrentAvatar] = useState<avatar>(avatarList[0]);

  const [profile, setProfile] = useRecoilState(profileState);
  const setUser = useSetRecoilState(authState);

  useEffect(() => {
    const foundAvatar = avatarList.find(
      (item) => item.value === profile?.avatar
    );
    setCurrentAvatar(foundAvatar || avatarList[0]);
  }, [profile]);

  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressAvatar = () => {
    setShowAvatarModal(true);
  };

  const onPressProfile = () => {
    navigation.navigate("PersonalDetailsScreen");
  };

  const onPressSecurity = () => {
    navigation.navigate("SecurityPrivacyScreen");
  };

  const onPressAppSetting = () => {
    navigation.navigate("AppSettingScreen");
  };

  const onPressLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        storage.set("activeTime", { activeTime: 0 });
        setProfile(null);
        setUser(null);
        navigation.navigate("AuthNavigator");
      });
  };

  const openUrl = (url: string) => {
    Linking.canOpenURL(url).then((_) => {
      Linking.openURL(url);
      // if (supported) {
      //     Linking.openURL(url);
      // } else {
      //     console.log("Don't know how to open URI: " + url);
      // }
    });
  };

  const verified = profile?.kycStatus === "Verified";

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
        <Text style={[c_style.AgH1, style.FBColor]}>Account settings</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
          You can find settings here
        </Text>
        <View style={[styles.ProfileContainer, { marginTop: 20 }]}>
          <ImageButton
            source={currentAvatar.icon}
            style={{ width: 48, height: 48 }}
            onPress={onPressAvatar}
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              alignItems: "center",
              flexDirection: "row",
              flex: 1,
            }}
            onPress={onPressProfile}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Text style={[c_style.AgSpan, style.FBColor]}>
                {profile?.name} {profile?.surname}
              </Text>
              <View
                style={[
                  c_style.HeaderUserStatus,
                  { backgroundColor: verified ? "#BCFFD759" : "#FFB8C059" },
                ]}
              >
                <Text
                  style={[
                    c_style.AgCaption,
                    { color: verified ? "#03AB00" : "#F62323" },
                  ]}
                >
                  {profile?.kycStatus || "Not Verified"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <Image
              source={icon_arrow_right}
              style={{ width: 16, height: 16, marginRight: 8 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.SettingGroupContainer,
            style.MainRBText,
            { marginTop: 20 },
          ]}
        >
          <TouchableOpacity
            style={[styles.SettingContainer, { marginTop: 10 }]}
            onPress={onPressSecurity}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_security} />
            </View>
            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              Security & privacy
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
            onPress={onPressAppSetting}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_app_setting} />
            </View>
            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              App Settings
            </Text>
          </TouchableOpacity>
        </View>
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
              openUrl("https://google.com");
            }}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_privacy_police} />
            </View>
            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              Privacy police
            </Text>
            <View style={{ flex: 1 }} />
            <Image
              source={icon_arrow_upright}
              style={{ width: 16, height: 16 }}
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
            style={[styles.SettingContainer, { marginTop: 10 }]}
            onPress={() => {
              openUrl("https://google.com");
            }}
          >
            <View style={[styles.iconImage, style.ImageBg]}>
              <Image source={icon_terms_conditions} />
            </View>

            <Text style={[c_style.AgH5, style.FBColor, { marginLeft: 10 }]}>
              Terms & conditions
            </Text>
            <View style={{ flex: 1 }} />
            <Image
              source={icon_arrow_upright}
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onPressLogout}>
            <Text style={[c_style.AgP, { color: "#F7873C" }]}>Log out</Text>
          </TouchableOpacity>
          <Text
            style={[c_style.AgCaption, { color: "#9E9E9E", marginTop: 20 }]}
          >
            Version 1.09.3
          </Text>
        </View>
      </View>

      <Modal
        isVisible={showAvatarModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={[styles.AvatarModalContainer, style.WBContainer]}>
          <View
            style={{
              marginTop: 24,
              paddingLeft: 8,
              flexDirection: "row",
              alignItems: "center",
              height: 42,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[c_style.AgH4, style.FBColor]}>
                Choose your avatar
              </Text>
            </View>
            <BackButton
              onPress={() => {
                setShowAvatarModal(false);
              }}
            />
          </View>
          <ScrollView style={{ marginTop: 30, marginBottom: 20 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 50,
                gap: 10,
                alignItems: "center",
              }}
            >
              {avatarList.map((avatar, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      {
                        width: 64,
                        height: 64,
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      },
                      selectedAvatar == avatar.value && {
                        borderColor: "#9E9E9E4D",
                        borderWidth: 4,
                        borderRadius: 32,
                      },
                    ]}
                    onPress={() => {
                      setSelectedAvatar(avatar.value);
                    }}
                  >
                    <Image
                      source={avatar.icon}
                      key={avatar.value}
                      style={{ width: 56, height: 56 }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <Button
            btn="primary"
            title="Save"
            containerStyle={{ paddingHorizontal: 24, marginBottom: 50 }}
            onPress={() => {
              if (profile?.uid) {
                setLoading(true);
                UpdateUserProfile(profile?.uid, {
                  avatar: selectedAvatar,
                })
                  .then((pro) => {
                    setProfile(pro);
                    setShowAvatarModal(false);
                  })
                  .catch((_) => {
                    setSelectedAvatar(profile?.avatar || -1);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              } else {
                setSelectedAvatar(profile?.avatar || -1);
              }
            }}
          />
        </View>
        {loading && <LoadingView />}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfileContainer: {
    height: 56,
    width: "100%",
    borderRadius: 32,
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
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
  },
  backButton: {
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountSettingScreen;
