import { FC, useEffect, useState } from "react";

import { SafeAreaView, Text, View, Modal } from "react-native";
import Toast from "react-native-toast-message";
import { SolidButton } from "../../components/solid-button";
import { InputField } from "../../components/card/InputField";
import { BackButton } from "../../components/card/BackButton";
import GetStyle from "../../styles";
import c_style from "../../styles/card";
import {isValidNumberString} from "../../services/helper";
import { creditCardItem } from "../../models/card";
import { detectCardType } from "../../utils/helper";

interface CardInfo {
  cardNumber: string;
  holderName: string;
  expirationDate: string;
  cvv: string;
}

interface CardError {
  cardNumberError?: string;
  holderNameError?: string;
  expirationDateError?: string;
  cvvError?: string;
}

interface Error {
  cardNumberError?: string; 
  holderNameError?: string; 
  expirationDateError?: string; 
  cvvError?: string; 
}

interface Props {
  openAddPaymentCard: boolean;
  onCloseAddPayment: () => void;
  addPaymentHandler: (data: creditCardItem) => void;
}

const AddPaymentCard: FC<Props> = ({
  openAddPaymentCard,
  onCloseAddPayment,
  addPaymentHandler
}) => {
  // const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState<Partial<CardInfo>>({});
  const [cardError, setCardError] = useState<Partial<CardError>>({});
  const [btnStatus, setBtnStatus] = useState("disable");
  const style = GetStyle();
  
  const validate = () => {
    let check = true;
    let errors: Error = {};
    if (!cardInfo.cardNumber) {
      errors.cardNumberError = "Card number is required!";
      check = false;
    }
    if (!cardInfo.holderName) {
      errors.holderNameError = "Holder name is required.";
      check = false;
    }
    if (!cardInfo.expirationDate) {
      errors.expirationDateError = "Expiration date is required.";
      check = false;
    }
    if (!cardInfo.cvv) {
      errors.cvvError = "CVV is required.";
      check = false;
    }
    // if (!isValidNumberString(cardInfo.cardNumber)) {
    //   errors.cardNumberError = "Card number is invalid!";
    //   check = false;
    // }
    if (!isValidNumberString(cardInfo.cvv)) {
      errors.cvvError = "Card CVV is invalid!";
      check = false;
    }
    setCardError(errors)
    return check;
  };

  useEffect(() => {
    if (!cardInfo.cardNumber && !cardInfo.holderName && !cardInfo.expirationDate && !cardInfo.cvv) {
      setCardError({});
    } else {
      setBtnStatus("primary");
    }
  }, [cardInfo]);

  const handler = () => {
    const validation = validate();
    Toast.show({
      type: "custom",
      props: {
        style: "success",
      },
      text1: "You’ve made a deposit!",
      text2: "Check transaction below",
    });
    if (!validation) {
      return;
    }
    const cardType = detectCardType(cardInfo.cardNumber!)
    addPaymentHandler({
      type: cardType,
      cardNumber: cardInfo.cardNumber,
      holderName: cardInfo.holderName,
      expireDate: cardInfo.expirationDate,
      cvv: Number(cardInfo.cvv),
    });
  };

  return (
    <Modal
      visible={openAddPaymentCard}
      style={{ backgroundColor: "#fff" }}
      presentationStyle={"fullScreen"}
    >
      <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
        <View style={[c_style.Fheader]}>
          <BackButton onPress={onCloseAddPayment} />
        </View>
        <View style={style.TContainer} >
          <View>
            <InputField
              value={cardInfo.cardNumber || ""}
              error={cardError.cardNumberError}
              autoCapitalize="words"
              onChangeText={(e) => {
                setCardInfo((prev) => ({ ...prev, cardNumber: e }));
              }}
              title="Card Number"
              placeholder="3434 2323 5353 2121"
              keyboardType='numeric'
            />
            <InputField
              value={cardInfo.holderName || ""}
              error={cardError.holderNameError}
              onChangeText={(e) => {
                setCardInfo((prev) => ({ ...prev, holderName: e }));
              }}
              title="Holder Name"
              placeholder="Jhon Smith"
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <View style={{
                flex: 1,
                marginRight: 9
              }}>
                <InputField
                  value={cardInfo.expirationDate || ""}
                  error={cardError.expirationDateError}
                  onChangeText={(e) => {
                    setCardInfo((prev) => ({ ...prev, expirationDate: e, }));
                  }}
                  title="Expiration Date"
                  placeholder="12/27"
                />
              </View>
              <View style={{
                flex: 1,
                marginLeft: 9
              }}>
                <InputField
                  value={cardInfo.cvv || ""}
                  error={cardError.cvvError}
                  onChangeText={(e) => {
                    setCardInfo((prev) => ({ ...prev, cvv: e }));
                  }}
                  title="CVV"
                  placeholder="323"
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>

          <View style={{flex: 1}}></View>
          
          <View style={[{paddingHorizontal: 24, paddingVertical: 6, borderRadius: 8, marginVertical: 8}, style.BSColor]}>
            <Text style={[style.FPColor, c_style.AgInputText]}>
              Data protected by all aggregators or other important and interesting information
            </Text>
          </View>
          <View style={style.Flex1}>
            <SolidButton
              btn={btnStatus}
              title="Add Payment Method"
              onPress={handler}
            ></SolidButton>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddPaymentCard;
