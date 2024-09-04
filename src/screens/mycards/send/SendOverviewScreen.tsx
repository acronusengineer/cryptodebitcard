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
import icon_qr from "../../../assets/images/card/icon_qr.png";
import icon_card from "../../../assets/images/card/icon_card.png";
import icon_bag from "../../../assets/images/card/icon_bag.png";
import GetStyle from "../../../styles";


const SendOverviewScreen: FC<
  NativeStackScreenProps<ParamListBase, "SendOverviewScreen">
> = ({ navigation }) => {
    const style = GetStyle();

  const goToSendCrypto = () => {
    navigation.navigate("SendCryptoScreen");
  }
  const goToSendBankCard = () => {
    navigation.navigate("SendBankCardScreen");
  }
  const goToSendIBAN = () => {
    navigation.navigate("SendIBANScreen");
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
          <View style={{ flexDirection: "column", justifyContent: "center", marginRight: 28, flex: 1 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              Crypto Wallets
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Send Assets to Crypto Wallets
            </Text>
          </View>
          <TouchableOpacity onPress={goToSendCrypto}>
            <Image
              source={icon_qr}
              style={{ width: 86, height: 86 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA', marginVertical: 22 }} />
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", marginRight: 28, flex: 1 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              To Bank Card, Emails, phone
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Send money directly to the contacts which you want
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={goToSendBankCard}>
              <Image
                source={icon_card}
                style={{ width: 86, height: 86 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA', marginVertical: 22 }} />
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", marginRight: 28, flex: 1 }}>
            <Text style={[c_style.AgH4, style.FBColor, { paddingVertical: 5 }]}>
              By IBAN
            </Text>
            <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
              Send money to IBAN Accounts
            </Text>
          </View>
          <TouchableOpacity onPress={goToSendIBAN}>
            <Image
              source={icon_bag}
              style={{ width: 86, height: 86 }}
            />
          </TouchableOpacity>
        </View>
        
        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

export default SendOverviewScreen;
