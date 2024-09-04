import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { SafeAreaView, Text, View, StatusBar, ScrollView } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { launchCamera } from "react-native-image-picker";

import c_style from "../../../styles/card";
import { PickerModal } from "../../../components/topup/PickerModal";
import { Button } from "../../../components/card/Button";
import SelectInput from "../../../components/topup/SelectInput";
import DepositedCard from "../../../components/topup/DepositedCard";
import { BackButton } from "../../../components/card/BackButton";
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
import GetStyle from "../../../styles";

interface CryptoItem {
  name: string;
  symbol: string;
  logo: any;
}

const cryptoData: CryptoItem[] = [
  {
    name: "Solar",
    symbol: "SXP",
    logo: coin_sxp,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: coin_btc,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: coin_eth,
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: coin_sol,
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    logo: coin_arb,
  },
  {
    name: "AVL",
    symbol: "AVL",
    logo: coin_avl,
  },
  {
    name: "Optimism",
    symbol: "OPT",
    logo: coin_opt,
  },
  {
    name: "FNT",
    symbol: "FNT",
    logo: coin_fnt,
  },
  {
    name: "BSC",
    symbol: "BSC",
    logo: coin_bsc,
  },
  {
    name: "Polygon",
    symbol: "Matic",
    logo: coin_matic,
  },
];

interface SendInfo {
  type: string;
  receiver: string;
  VATNumber: string;
  IBAN: string;
  amount: string;
  purpose: string;
}

const SendIBANScreen: FC<
  NativeStackScreenProps<ParamListBase, "SendIBANScreen">
> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [sendInfo, setSendInfo] = useState<Partial<SendInfo>>({ type: "iban" });
  const [sendable, setSendable] = useState(false);
  const style = GetStyle();

  const pasteHandler = async () => {
    const text = await Clipboard.getString();
    setSendInfo((prev) => ({ ...prev, IBAN: text }));
  };

  const openCameraHandler = () => {
    const address = "US 3737 3737 7272 7272 7272 ";
    launchCamera(
      {
        maxHeight: 1000,
        maxWidth: 1200,
        saveToPhotos: true,
        mediaType: "photo",
      },
      (result) => {
        if (
          result &&
          result.assets &&
          result.assets.length > 0 &&
          result.assets[0].uri
        ) {
          setSendInfo((prev) => ({ ...prev, IBAN: address }));
        }
      }
    );
  };

  const pressMaxHandler = () => {
    const maxAmount = Math.floor(Math.random() * (100 - 10) + 1) + 10;
    setSendInfo((prev) => ({ ...prev, amount: String(maxAmount) }));
  };

  const onPressNext = () => {
    navigation.navigate("TransactionDetailsScreen");
  };

  useEffect(() => {
    if (
      !sendInfo.receiver ||
      !sendInfo.VATNumber ||
      !sendInfo.IBAN ||
      !sendInfo.amount ||
      !sendInfo.purpose
    )
      setSendable(false);
    else setSendable(true);
  }, [sendInfo]);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <StatusBar
        translucent
        backgroundColor="white"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={[c_style.Fheader]}>
        <BackButton
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}
        />
      </View>
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
          <SelectInput
            dataList={cryptoData}
            selectedValue={selectedValue}
            onPress={() => {
              setShowPicker(true);
            }}
          />
          <View style={{ marginTop: 16 }}>
            <InputField
              value={sendInfo.receiver || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, receiver: e }));
              }}
              placeholder="Receiver"
              autoCapitalize="words"
            />
          </View>
          <View>
            <InputField
              value={sendInfo.VATNumber || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, VATNumber: e }));
              }}
              placeholder="VAT Number"
              keyboardType="numeric"
            />
          </View>
          <View>
            <InputField
              value={sendInfo.IBAN || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, IBAN: e }));
              }}
              placeholder="IBAN"
              onPaste={pasteHandler}
              onCamera={openCameraHandler}
            />
          </View>
          <View>
            <InputField
              value={sendInfo.amount || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, amount: e }));
              }}
              placeholder="Amount"
              keyboardType="numeric"
              onMax={pressMaxHandler}
            />
          </View>
          <View>
            <InputField
              value={sendInfo.purpose || ""}
              onChangeText={(e) => {
                setSendInfo((prev) => ({ ...prev, purpose: e }));
              }}
              placeholder="Payment purposes"
              containerStyle={{ borderRadius: 16, height: 79 }}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View
            style={[
              {
                paddingHorizontal: 24,
                paddingVertical: 6,
                borderRadius: 8,
                marginBottom: 16,
              },
              style.BSColor,
            ]}
          >
            <Text style={[style.FPColor, c_style.AgInputText]}>
              SXP will be converted to currency of IBAN Account
            </Text>
          </View>

          <DepositedCard
            cardName="Cygnus"
            cardNumber="****3743"
            balanceSXP={32342}
            balanceUSD={3500}
          />

          <View style={{ flex: 1 }}></View>
          <View
            style={{ marginTop: 30 }}
          >
            <Button
              btn="primary"
              title="Next"
              onPress={onPressNext}
              enabled={sendable}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendIBANScreen;
