import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import c_style from "../../../styles/card";
import { BackButton } from "../../../components/card/BackButton";
import { useRecoilState } from "recoil";
import { themeState } from "../../../states/appState";
import icon_topup_from_crypto from "../../../assets/images/card/topup_from_crypto.png";
import icon_topup_from_bank from "../../../assets/images/card/topup_from_bank.png";
import icon_topup_from_IBAN from "../../../assets/images/card/topup_from_iban.png";

import icon_topup_from_crypto_black_mode from "../../../assets/images/card/topup_from_crypto_black_mode.png";
import icon_topup_from_bank_black_mode from "../../../assets/images/card/topup_from_bank_black_mode.png";
import icon_topup_from_IBAN_black_mode from "../../../assets/images/card/topup_from_iban_black_mode.png";
import GetStyle from "../../../styles";


const TopUpOverviewScreen: FC<
  NativeStackScreenProps<ParamListBase, "TopUpOverviewScreen">
> = ({ navigation }) => {

  const [theme] = useRecoilState(themeState);

  const style = GetStyle();

  const goToTopUpCrypto = () => {
    navigation.navigate("TopUpCryptoScreen");
  }
  const goToTopUpBankCard = () => {
    navigation.navigate("TopUpBankCardScreen");
  }
  const goToTopUpIBAN = () => {
    navigation.navigate("TopUpIBANScreen");
  }

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Fheader]}>
        <BackButton onPress={() => {if (navigation.canGoBack()) navigation.goBack()}} />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 70,
          paddingTop: 18
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", width: 182 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              Crypto Wallets
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Share your wallet address to receive cryptocurrency
            </Text>
          </View>
          <TouchableOpacity onPress={goToTopUpCrypto}>
            <Image
              source={(theme === "light" ? icon_topup_from_crypto : icon_topup_from_crypto_black_mode)}
              style={{ width: 86, height: 86 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA', marginVertical: 22 }} />
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", width: 182 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              By Bank Card
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Connect your card to the  Solar Card and any wallet supported by Solar Card
            </Text>
          </View>
          <TouchableOpacity onPress={goToTopUpBankCard}>
            <Image
              source={(theme === "light" ? icon_topup_from_bank : icon_topup_from_bank_black_mode)}
              style={{ width: 86, height: 86 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA', marginVertical: 22 }} />
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", width: 182 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              By IBAN
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Top up balance of your card by IBAN, assets will be converted into SXP
            </Text>
          </View>
          <TouchableOpacity onPress={goToTopUpIBAN}>
            <Image
              source={(theme === "light" ? icon_topup_from_IBAN : icon_topup_from_IBAN_black_mode)}
              style={{ width: 86, height: 86 }}
            />
          </TouchableOpacity>
        </View>
        
        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

export default TopUpOverviewScreen;
