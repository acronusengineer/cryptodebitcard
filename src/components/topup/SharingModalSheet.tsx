import React, { FC } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import c_style from "../../styles/card";
import GetStyle from "../../styles";

import coin_sxp from "../../assets/images/coin_logos/sxp.png";
import close_circle from "../../assets/images/card/close_circle.png";
import close_circle_black_mode from "../../assets/images/card/close_circle_black_mode.png";
import avatar_7 from "../../assets/images/card/avatar_7.png";
import app_icon from "../../assets/images/app_icon.png";

import copy_icon from "../../assets/images/copy_icon.png";
import bookmark_icon from "../../assets/images/bookmark_icon.png";
import reading_icon from "../../assets/images/reading_icon.png";
import favorites_icon from "../../assets/images/favorites_icon.png";
import find_icon from "../../assets/images/find_icon.png";

import copy_icon_black_mode from "../../assets/images/copy_icon_black_mode.png";
import bookmark_icon_black_mode from "../../assets/images/bookmark_icon_black_mode.png";
import reading_icon_black_mode from "../../assets/images/reading_icon_black_mode.png";
import favorites_icon_black_mode from "../../assets/images/favorites_icon_black_mode.png";
import find_icon_black_mode from "../../assets/images/find_icon_black_mode.png";

interface Props {
  theme: string,
  showSharingModal: boolean,
  setShowSharingModal: (v: boolean) => void
  copyHandler: () => void
}

export const SharingModalSheet: FC<Props> = ({
  theme = "light",
  showSharingModal,
  setShowSharingModal,
  copyHandler
}) => {
  const style = GetStyle();
  return (
    <Modal
      onBackdropPress={() => {
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
      isVisible={showSharingModal}
    >
      <View style={[styles.BottomSheetModal, {backgroundColor: theme === "light" ? "#FAFAFA" : "#1C1C1E"}]}>
        <View style={{ 
          flexDirection: "row", 
          justifyContent: "space-between", 
          paddingHorizontal: 7, 
          paddingVertical: 16 
        }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={coin_sxp} style={{width: 40, height: 40}} />
            <View style={{ flexDirection: "column", marginLeft: 8 }}>
              <Text style={[c_style.AgH4, style.FBColor]}>Wallet Address</Text>
              <Text style={[c_style.AgInputText, { color: theme === "light" ? "#3C3C43" : "#EBEBF5" }]}>Solar Card</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowSharingModal(false)}>
            <Image source={theme === "light" ? close_circle : close_circle_black_mode} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: "row", 
          borderBottomWidth: 1, 
          borderTopWidth: 1,
          borderColor: '#3C3C4330',
          paddingTop: 19.5,
          paddingBottom: 17
        }}>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={avatar_7} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={avatar_7} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={avatar_7} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={avatar_7} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
        </View>

        <View style={{
          flexDirection: "row", 
          borderColor: '#3C3C43',
          paddingTop: 19.5,
          paddingBottom: 17
        }}>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={app_icon} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={app_icon} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={app_icon} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
          <View style={{flexDirection: "column", marginHorizontal: 18}}>
            <Image source={app_icon} style={{width: 63, height: 63,}} />
            <Text style={[c_style.FontSF2, style.FBColor, {textAlign: "center", marginVertical: 4}]}>Fist Last</Text>
          </View>
        </View>

        <TouchableOpacity onPress={copyHandler} style={{
          flexDirection: "row", 
          justifyContent: "space-between",
          backgroundColor: theme === "light" ? "white" : "#2C2C2E",
          borderRadius: 13,
          marginHorizontal: 7,
          paddingLeft: 16,
          paddingRight: 19,
          paddingVertical: 13
        }}>
          <Text style={[c_style.FontSF1, style.FBColor]}>Copy Link</Text>
          <Image source={theme === "light" ? copy_icon : copy_icon_black_mode} style={{width: 16.98, height: 20.88}} />
        </TouchableOpacity>

        <View style={{
          flexDirection: "column", 
          backgroundColor: theme === "light" ? "white" : "#2C2C2E",
          borderRadius: 13,
          marginTop: 16,
          marginHorizontal: 7,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 13,
            paddingVertical: 13,
            borderBottomWidth: 1, 
            borderColor: '#3C3C4330',
          }}>
            <Text style={[c_style.FontSF1, style.FBColor]}>Add to Reading List</Text>
            <Image source={theme === "light" ? reading_icon : reading_icon_black_mode} style={{width: 27, height: 22}} />
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 13,
            borderBottomWidth: 1, 
            borderColor: '#3C3C4330',
          }}>
            <Text style={[c_style.FontSF1, style.FBColor]}>Add Bookmark</Text>
            <Image source={theme === "light" ? bookmark_icon : bookmark_icon_black_mode} style={{width: 24, height: 24}} />
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 13,
            borderBottomWidth: 1, 
            borderColor: '#3C3C4330',
          }}>
            <Text style={[c_style.FontSF1, style.FBColor]}>Add to Favorites</Text>
            <Image source={theme === "light" ? favorites_icon : favorites_icon_black_mode} style={{width: 24, height: 24}} />
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 17,
            paddingVertical: 13,
          }}>
            <Text style={[c_style.FontSF1, style.FBColor]}>Find on Page</Text>
            <Image source={theme === "light" ? find_icon : find_icon_black_mode} style={{width: 24, height: 24}} />
          </View>
        </View>

        <View style={{marginHorizontal: 7, marginVertical: 16}}>
          <TouchableOpacity onPress={() => {}} style={{marginHorizontal: 16}}>
            <Text style={{color: '#007AFF'}}>Edit Actions...</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
  
};

const styles = StyleSheet.create({
  BottomSheetModal: {
    minHeight: 300,
    paddingBottom: 24,
  }
});