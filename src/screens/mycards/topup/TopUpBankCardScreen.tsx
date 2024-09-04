import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRecoilState } from "recoil";
import { themeState } from "../../../states/appState";
import { selectedPaymentState, creditCardsState } from "../../../states/cardsState";
import { BackButton } from "../../../components/card/BackButton";
import { Button } from "../../../components/card/Button";
import SelectInput from "../../../components/topup/SelectInput";
import DepositedCard from "../../../components/topup/DepositedCard";

import GetStyle from "../../../styles";
import c_style from "../../../styles/card";

const TopUpBankCardScreen: FC<
  NativeStackScreenProps<ParamListBase, "TopUpBankCardScreen">
> = ({ navigation }) => {

  const [theme] = useRecoilState(themeState);
  const [creditCards] = useRecoilState(creditCardsState);
  const [selectedPayment] = useRecoilState(selectedPaymentState);
  const [amount, setAmount] = useState<string | undefined>();

  const style = GetStyle();
  const onPressGetUSD = () => {
    // Deposit code
    const resultDeposit = Math.random() >= 0.5;

    navigation.navigate("DashboardScreen");
    if (resultDeposit) {
      Toast.show({
        type: "custom",
        props: {
          style: "success",
        },
        text1: "You’ve made a deposit!",
        text2: "Check transaction below",
      });
    } else {
      Toast.show({
        type: "custom",
        props: {
          style: "error",
        },
        text1: "Something went wrong",
        text2: "Please check your Payment Method, looks like issue from their side.",
      });
    }
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
        }}
      >
        <Text style={[c_style.AgH5, style.FBColor, {paddingBottom: 8}]}>
          From
        </Text>
        <SelectInput
          dataList={creditCards}
          selectedValue={selectedPayment} 
          onPress={() => {navigation.navigate("ChoosePaymentScreen")}} 
        />
        <View style={[
          style.SContainer,
          {
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 16,
          marginBottom: 8,
          marginTop: 16,
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
              onChangeText={(value: string) => {
                setAmount(value);
              }}
              value={amount?.toString()}
               />
            <Text style={[c_style.AgH2, style.FGColor, {flex: 1}]}>USD</Text>
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
        <Text style={[c_style.AgH5, style.FBColor, {marginTop: 16}]}>
          To
        </Text>
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
            btn="secondary"
            title="Get USD"
            enabled={amount ? true : false}
            onPress={onPressGetUSD}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopUpBankCardScreen;
