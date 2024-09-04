import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import Clipboard from '@react-native-community/clipboard';
import { useRecoilState } from "recoil";
import { themeState } from "../../../states/appState";

import c_style from "../../../styles/card";
import { BackButton } from "../../../components/card/BackButton";
import { genRandomString } from "../../../utils/helper";
import { Button } from "../../../components/card/Button";
import { SharingModalSheet } from "../../../components/topup/SharingModalSheet";

import usd_icon from "../../../assets/images/usd_icon.png";
import GetStyle from "../../../styles";


const TopUpIBANScreen: FC<
  NativeStackScreenProps<ParamListBase, "TopUpIBANScreen">
> = ({ navigation }) => {
  
  const [theme] = useRecoilState(themeState);
  const [walletAddress] = useState<string>(genRandomString(43))
  const [showSharingModal, setShowSharingModal] = useState(false);
  const style = GetStyle();
  const copyHandler = () => {
    setShowSharingModal(false);
    Clipboard.setString(walletAddress);
    navigation.navigate("DashboardScreen");
    Toast.show({
      type: "custom",
      props: {
        style: "success",
      },
      text1: "Copied To Clipboard",
      text2:
        "Feel free to send address to somebody",
    });
  };

  const onPressShare = () => {
    setShowSharingModal(true);
  }

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Fheader]}>
        <BackButton onPress={() => {if (navigation.canGoBack()) navigation.goBack()}} />
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: 70,
          }}
        >
          <View style={[styles.Container, style.SContainer]}>
            <Text style={[c_style.AgH4, style.FBColor]}>Beneficiary</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>IBAN</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>US 523220010000026202313576604</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Account No</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>3232324434343</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Receiver</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>TARAS OLIINYK, 32342,, ukraine, reg. lvivska, district Lviv, mury street 32b</Text>
          </View>
          <View style={[styles.Container, style.SContainer]}>
            <Text style={[c_style.AgH4, style.FBColor]}>Account with institution</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Bank</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>SOLAR INTERNATIONAL</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>City</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>TALIN, ESTONIA</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Swift Code</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>UNJE43453</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Сurrency</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Image source={usd_icon} style={{height: 17, width: 17, borderRadius: 50, marginRight: 4}} />
              <Text style={[c_style.AgP, style.FBColor]}>$ USD</Text>
            </View>
          </View>
          <View style={[styles.Container, style.SContainer]}>
            <Text style={[c_style.AgH4, style.FBColor]}>Details Of Payment</Text>
            <Text style={[c_style.AgCaption, style.FGColor, {paddingTop: 14}]}>Details</Text>
            <Text style={[c_style.AgH4, style.FBColor]}>Private Transfer</Text>
          </View>
          <View style={[{paddingHorizontal: 24, paddingVertical: 6, borderRadius: 8, marginVertical: 8}, style.BSColor]}>
            <Text style={[style.FPColor, c_style.AgInputText]}>
              All USD Amount will be automatically converted to SXP according to our policy.
            </Text>
          </View>
          <View
            style={{ marginVertical: 8, flexDirection: "row", justifyContent: "space-between"}}
          >
            <Button
              btn="primary"
              title="Share"
              onPress={onPressShare}
            />
          </View>

          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
      
      <SharingModalSheet 
        theme = {theme}
        showSharingModal = {showSharingModal}
        setShowSharingModal = {setShowSharingModal}
        copyHandler = {copyHandler}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F7F7F7",
    marginVertical: 8
  },
  BottomSheetModal: {
    backgroundColor: '#FAFAFA',
    minHeight: 300,
    paddingBottom: 24,
  }
});

export default TopUpIBANScreen;
