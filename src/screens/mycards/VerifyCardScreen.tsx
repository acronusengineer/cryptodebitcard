import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import c_style from "../../styles/card";
import { InputField } from "../../components/card/InputField";
import { Button } from "../../components/card/Button";
import useAPIs from "../../services/hooks/useAPIs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import Toast from "react-native-toast-message";
import { CardType } from "../../components/card/Card";
import { debitCardsState, prepaidCardsState } from "../../states/cardsState";
import GetStyle from "../../styles";

import { BackButton } from "../../components/card/BackButton";

interface ParamType {
  type: number;
}
const VerifyCardScreen: FC<
  NativeStackScreenProps<ParamListBase, "VerifyCardScreen">
> = ({ navigation, ...props }) => {
  const param = props.route.params as ParamType;
  const [cardNumber, setCardNumber] = useState(
    ""
    //param.type === CardType.Virtual ? "4542323146113794" : "4542323115728452"
  );
  const [cvv, setCVV] = useState("");
  const [expire, setExpire] = useState("");
  const profile = useRecoilValue(profileState);
  const setPrepaidCards = useSetRecoilState(prepaidCardsState);
  const setDebitCards = useSetRecoilState(debitCardsState);
  const style = GetStyle();

  const {
    DebitActivateCard,
    DebitCardDetails,
    PrepaidActivateCard,
    PrepaidCardDetails,
  } = useAPIs();
  
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSubmit = () => {
    if (profile?.codegoId) {
      if (param.type === CardType.Virtual) {
        PrepaidActivateCard(profile?.codegoId, {
          card_number: cardNumber,
          cvv: cvv,
          mm: expire.substring(0, 2),
          yy: "20" + expire.substring(3, 5),
        }).then((res) => {
          
          if (res.status === 1 && res.card_pin) {
            PrepaidCardDetails(profile.codegoId!).then((res) => {
              setPrepaidCards(
                res.map((x) => ({
                  ...x,
                  card_type: CardType.Virtual,
                }))
              );
            });
            Alert.alert('', `${res.message} Your card pin is ${res.card_pin}. Please save it in secure place.`,
              [
                { 
                  text: "Confirm", 
                  onPress: async () => {
                    navigation.goBack();
                }, }], { cancelable: false, }
            );
          } else {
            Toast.show({
              type: "custom",
              props: {
                style: "error",
              },
              text1: res.message,
            });
          }
        });
      } else {
        DebitActivateCard(profile?.codegoId, {
          card_number: cardNumber,
          cvv: cvv,
          mm: expire.substring(0, 2),
          yy: "20" + expire.substring(3, 5),
        }).then((res) => {
          
          if (res.status === 1 && res.card_pin) {
            DebitCardDetails(profile.codegoId!).then((res) => {
              setDebitCards(
                res.map((x) => ({
                  ...x,
                  card_type:
                    profile.subscription === "Orion"
                      ? CardType.Plastic
                      : CardType.Platinum,
                }))
              );
            });
            Alert.alert('', `${res.message} Your card pin is ${res.card_pin}. Please save it in secure place.`,
              [
                { 
                  text: "Confirm", 
                  onPress: async () => {
                    navigation.goBack();
                }, }], { cancelable: false, }
            );
          } else {
            Toast.show({
              type: "custom",
              props: {
                style: "error",
              },
              text1: res.message,
            });
          }
        });
      }
    }
  };

  const valid = cardNumber && cvv && expire;

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <View style={{ width: "100%", flex: 1, paddingHorizontal: 24 }}>
        <View style={{ marginBottom: 20}}>
          <Text style={[c_style.AgH1, style.FBColor]}>
            Submit card activation
          </Text>
          <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
            Please confirm that this is you and your desire to activate the card
          </Text>
        </View>
        <InputField
          value={cardNumber}
          autoCapitalize="none"
          onChangeText={(e) => {
            setCardNumber(e);
          }}       
          containerStyle={{ marginBottom: 10 }}   
          title="Card Number"
          placeholder="3434 2323 5353 2121"
          keyboardType="number-pad"
        ></InputField>
        <InputField
          value={cvv}
          autoCapitalize="none"
          maxLength={4}
          onChangeText={(e) => {
            setCVV(e);
          }}
          containerStyle={{ marginBottom: 10 }}
          title="CVV"
          placeholder="323"
          keyboardType="number-pad"
        />
        <InputField
          value={expire}
          autoCapitalize="none"
          maxLength={5}
          onChangeText={(e) => {
            if (e.length >= 2 && !e.includes("/")) {
              setExpire(e.substring(0, 2) + "/" + e.substring(2));
            } else setExpire(e);
          }}          
          title="Card Expiration"
          placeholder="MM/YY"
          keyboardType="number-pad"
        />
        <View style={{ flex: 1 }} />
        <View
          style={{ paddingBottom: 50, alignItems: "center", width: "100%" }}
        >
          <Button
            btn="primary"
            title="Submit"
            enabled={valid ? true : false}
            onPress={onPressSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCardScreen;
