import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Toast from "react-native-toast-message";
import Clipboard from '@react-native-community/clipboard';
import { useRecoilState } from "recoil";
import { themeState } from "../../../states/appState";

import c_style from "../../../styles/card";
import { BackButton } from "../../../components/card/BackButton";
import { PickerModal } from "../../../components/topup/PickerModal";
import { genRandomString } from "../../../utils/helper";
import { Button } from "../../../components/card/Button";
import SelectInput from "../../../components/topup/SelectInput";
import DepositedCard from "../../../components/topup/DepositedCard";
import { SharingModalSheet } from "../../../components/topup/SharingModalSheet";

import coin_sxp from "../../../assets/images/coin_logos/sxp.png";
import coin_btc from "../../../assets/images/coin_logos/btc.png";
import coin_eth from "../../../assets/images/coin_logos/eth.png";
import coin_sol from "../../../assets/images/coin_logos/sol.png";
import coin_arb from "../../../assets/images/coin_logos/arb.png";
import coin_avl from "../../../assets/images/coin_logos/avl.png";
import coin_opt from "../../../assets/images/coin_logos/opt.png";
import coin_fnt from "../../../assets/images/coin_logos/fnt.png";
import coin_bsc from "../../../assets/images/coin_logos/bsc.png";
import coin_matic from "../../../assets/images/coin_logos/matic.png";

import GetStyle from "../../../styles";


interface CryptoItem {
  name: string,
  symbol: string,
  logo: any
}

const cryptoData : CryptoItem[] = [
  {
    name: "Solar",
    symbol: "SXP",
    logo: coin_sxp
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: coin_btc
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: coin_eth
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: coin_sol
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    logo: coin_arb
  },
  {
    name: "AVL",
    symbol: "AVL",
    logo: coin_avl
  },
  {
    name: "Optimism",
    symbol: "OPT",
    logo: coin_opt
  },
  {
    name: "FNT",
    symbol: "FNT",
    logo: coin_fnt
  },
  {
    name: "BSC",
    symbol: "BSC",
    logo: coin_bsc
  },
  {
    name: "Polygon",
    symbol: "Matic",
    logo: coin_matic
  },

]

const TopUpCryptoScreen: FC<
  NativeStackScreenProps<ParamListBase, "TopUpCryptoScreen">
> = ({ navigation }) => {
  
  const [theme] = useRecoilState(themeState);
  const [selectedValue, setSelectedValue] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [walletAddress] = useState<string>(genRandomString(43))
  const [showSharingModal, setShowSharingModal] = useState(false);
  const style = GetStyle();
  const copyHandler = () => {
    setShowSharingModal(false);
    Clipboard.setString(walletAddress);
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
      {/* <Image
        source={coin_sxp}
        style={{ width: 86, height: 86 }}
      /> */}
      <PickerModal
        open={showPicker}
        selectedIndex={selectedValue}
        onPress={(i: number | undefined) => {
          if (i != undefined) {
            setSelectedValue(i);
          }
          setShowPicker(false);
        }}
        title={"Choose the Card Wallet"}
        data={cryptoData}
      ></PickerModal>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 70,
        }}
      >
        <SelectInput 
          dataList={cryptoData}
          selectedValue={selectedValue} 
          onPress={() => {setShowPicker(true)}} 
        />

        <View style={[styles.QRWrapper, style.SContainer]}>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 14
            }}>
            <QRCode
              value={walletAddress}
              size={220}
              color={(theme === "light" ? style.FBColor.color : style.FPColor.color)}
              backgroundColor={style.SContainer.backgroundColor}
            />
          </View>
          <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={[c_style.AgH4, style.FBColor, {width: 225, textAlign: "center"}]}>
              {walletAddress}
            </Text>
          </View>
        </View>

        <DepositedCard 
          cardName="Cygnus"
          cardNumber="****3743"
          balanceSXP={32342}
          balanceUSD={3500}
        />

        <View style={[style.BSColor, {paddingHorizontal: 24, paddingVertical: 6, borderRadius: 8, marginVertical: 8}]}>
          <Text style={[style.FPColor, c_style.AgInputText]}>
            Use only SXP20 for this Transaction and SXP Asset to avoid issues.
          </Text>
        </View>

        <View
          style={{ marginVertical: 8, flexDirection: "row", justifyContent: "space-between"}}
        >
          <Button
            btn="primary"
            title="Copy"
            containerStyle={{width: "48%"}}
            onPress={copyHandler}
          />
          <Button
            btn="secondary"
            title="Share"
            containerStyle={{width: "48%"}}
            onPress={onPressShare}
          />
        </View>

        <View style={{ flex: 1 }} />
      </View>
      
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
  SelectModalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 100,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  line: {
    width: 48,
    height: 6,
    backgroundColor: "#EAEAEA",
    alignSelf: "center",
    marginVertical: 14,
    borderRadius: 3,
  },
  SelectOptionContainer: {
    width: "100%",
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  QRWrapper: {
    borderRadius: 16,
    paddingVertical: 33,
    marginTop: 16,
    marginBottom: 8
  },
  BottomSheetModal: {
    minHeight: 300,
    paddingBottom: 24,
  }
});

export default TopUpCryptoScreen;
