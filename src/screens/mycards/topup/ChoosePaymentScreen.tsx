import React, { FC, useState } from "react";
import {  FlatList, SafeAreaView, View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import { PickerItem } from "../../../components/topup/PickerItem";
import { PageHeader } from "../../../components/page-header";
import GetStyle from "../../../styles/";
import { Button } from "../../../components/card/Button";
import AddPaymentCard from "../AddPaymentCard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedPaymentState, creditCardsState } from "../../../states/cardsState";
import { creditCardItem } from "../../../models/card";

const ChoosePaymentScreen: FC<
  NativeStackScreenProps<ParamListBase, "ChoosePaymentScreen">
> = ({ navigation }) => {
  const [creditCards] = useRecoilState(creditCardsState);
  const setCreditCards = useSetRecoilState(creditCardsState);
  const [selectedPayment, setSelectedPayment] = useRecoilState(selectedPaymentState);
  const [openAddPaymentCard, setOpenAddPaymentCard] = useState<boolean>(false);
  const style = GetStyle();

  const onPressItem = (i: number | undefined) => {
    if (i != undefined) {
      setSelectedPayment(i);
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }

  const onPressNewCard = () => {
    setOpenAddPaymentCard(true);
  }

  const addPaymentHandler = (newPayment: creditCardItem) => {
    setOpenAddPaymentCard(false);
    // const resultDeposit = Math.random() >= 0.5;
    if (newPayment.type !== "Unknown") {
      setCreditCards([...creditCards, newPayment]);
      Toast.show({
        type: "custom",
        props: {
          style: "success",
        },
        text1: "New card successfully added",
        text2: "You can select new payment method",
      });
    } else {
      Toast.show({
        type: "custom",
        props: {
          style: "error",
        },
        text1: "The invalid card",
        text2: "Please try other credit cards",
      });
    }
  };

  const onCloseAddPayment = () => {
    setOpenAddPaymentCard(false);
  }

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <PageHeader
        title={"Choose the Card Wallet"}
        onBack={() => {if (navigation.canGoBack()) navigation.goBack()}}
      />
      <AddPaymentCard
        openAddPaymentCard={openAddPaymentCard}
        onCloseAddPayment={onCloseAddPayment}
        addPaymentHandler={addPaymentHandler}
      />
      <View style={{ height: 24 }} />
      <FlatList
        data={creditCards}
        renderItem={({ item, index }) => (
          <View key={index} style={{paddingHorizontal: 22}}>
            <PickerItem
              showName={false}
              item={item}
              onPress={() => onPressItem(index)}
              active={selectedPayment === index}
            />
          </View>
        )}
      />
      <View
        style={{ marginBottom: 45, marginHorizontal: 22 }}
      >
        <Button
          btn="secondary"
          title="Add new card"
          onPress={onPressNewCard}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChoosePaymentScreen;