import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
} from "react-native";
import { useRecoilState } from "recoil";
import { themeState } from "../../../states/appState";
import c_style from "../../../styles/card";
import { BackButton } from "../../../components/card/BackButton";
import { PickerModal } from "../../../components/topup/PickerModal";
import { Button } from "../../../components/card/Button";
import SelectInput from "../../../components/topup/SelectInput";
import DepositedCard from "../../../components/topup/DepositedCard";
import { InputField } from "../../../components/card/InputField";

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
import icon_usd from "../../../assets/images/card/flag_usd.png";
import icon_try from "../../../assets/images/card/flag_try.png";
import icon_eur from "../../../assets/images/card/flag_eur.png";
import icon_krw from "../../../assets/images/card/flag_krw.png";
import icon_gbp from "../../../assets/images/card/flag_gbp.png";
import GetStyle from "../../../styles";


interface CardItem {
  name: string,
  symbol: string,
  logo: any
}

const cardData : CardItem[] = [
  {
    name: "23451",
    symbol: "SXP",
    logo: coin_sxp
  },
  {
    name: "4534",
    symbol: "USD",
    logo: icon_usd
  },
  {
    name: "4534",
    symbol: "Euro",
    logo: icon_eur
  },
  {
    name: "4534",
    symbol: "Turkish Lira",
    logo: icon_try
  },
  {
    name: "4534",
    symbol: "British Pound",
    logo: icon_gbp
  },
  {
    name: "4534",
    symbol: "South Korea Won",
    logo: icon_krw
  },
  {
    name: "23451",
    symbol: "BTC",
    logo: coin_btc
  },
  {
    name: "23451",
    symbol: "ETH",
    logo: coin_eth
  },
  {
    name: "23451",
    symbol: "SOL",
    logo: coin_sol
  },
  {
    name: "23451",
    symbol: "ARB",
    logo: coin_arb
  },
  {
    name: "23451",
    symbol: "AVL",
    logo: coin_avl
  },
  {
    name: "23451",
    symbol: "OPT",
    logo: coin_opt
  },
  {
    name: "23451",
    symbol: "FNT",
    logo: coin_fnt
  },
  {
    name: "23451",
    symbol: "BSC",
    logo: coin_bsc
  },
  {
    name: "23451",
    symbol: "Matic",
    logo: coin_matic
  }
]

interface ParamType {
  fromAddingCardScreen: boolean;
}

interface SendInfo {
  recipient: string,
  amount: string
}

const SendBankCardScreen: FC<
  NativeStackScreenProps<ParamListBase, "SendBankCardScreen">
> = ({ navigation, ...props }) => {

  let param = props.route.params as ParamType;
  const [theme] = useRecoilState(themeState);
  const [selectedValue, setSelectedValue] = useState(0);
  const [showPicker, setShowPicker] = useState<boolean>(param ? true : false);
  const [sendInfo, setSendInfo] = useState<Partial<SendInfo>>({});

  const style = GetStyle();
  const onPressNext = () => {
    navigation.navigate("TransactionDetailsScreen");
  }

  useEffect(() => {
    setShowPicker(param ? true : false)
  }, [param]);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Fheader]}>
        <BackButton onPress={() => {if (navigation.canGoBack()) navigation.goBack()}} />
      </View>
      <PickerModal
        showName={true}
        open={showPicker}
        selectedIndex={selectedValue}
        onPress={(i: number | undefined) => {
          if (i != undefined) {
            setSelectedValue(i);
          }
          setShowPicker(false);
        }}
        title={"Choose the Card Account"}
        data={cardData}
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
          dataList={cardData}
          selectedValue={selectedValue} 
          onPress={() => {setShowPicker(!showPicker)}} 
        />
        <InputField
          value={sendInfo.recipient || ""}
          onChangeText={(e) => {
            setSendInfo((prev) => ({ ...prev, recipient: e }));
          }}
          placeholder="Card Number, Phone, Email"
          containerStyle={{marginTop: 16}}
        />
        <View style={[
          style.SContainer,
          {
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 16,
          marginBottom: 8,
          borderRadius: 16
        }]}>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <TextInput
              keyboardType='numeric'
              style={[
                c_style.AgTransaction,
                {
                  flex: 2,
                  textAlign: "right",
                  marginRight: 10,
                  color: theme === "dark" ? "#fff" : "#000",
                }
              ]}
              value={sendInfo.amount?.toString() || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, amount: e }));
              }}
               />
            <Text style={[c_style.AgH2, style.FGColor, {flex: 1}]}>{cardData[selectedValue].symbol}</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 14}}>
            <Text style={[style.FBColor, c_style.AgH5]}>Conversion Fee:</Text>
            <Text style={[style.FGColor, c_style.AgCaption]}>$0,02</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 14}}>
            <Text style={[style.FBColor, c_style.AgH5]}>Operation Time:</Text>
            <Text style={[style.FGColor, c_style.AgCaption]}>Instantly</Text>
          </View>
        </View>
        <DepositedCard 
          cardName="Cygnus"
          cardNumber="****3743"
          balanceSXP={32342}
          balanceUSD={3500}
        />
        <View style={{ flex: 1 }} />
        <View
          style={{ marginTop: 16 }}
        >
          <Button
            btn="primary"
            title="Next"
            enabled={(sendInfo.amount && sendInfo.recipient) ? true : false}
            onPress={onPressNext}
          />
        </View>

      </View>
      
    </SafeAreaView>
  );
};

export default SendBankCardScreen;
