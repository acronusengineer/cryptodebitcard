import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import c_style from "../../styles/card";
import { ImageButton } from "../../components/card/ImageButton";
import { LoadingView } from "../../components/loading-view";
import { Card, CardType } from "../../components/card/Card";
import Carousel from "react-native-reanimated-carousel";
import BottomSheet, {
  BottomSheetRefProps,
} from "../../components/card/BottomSheet";
import Animated from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Button } from "../../components/card/Button";
import Modal from "react-native-modal";

import icon_refresh from "../../assets/images/card/icon_refresh.png";
import icon_topup from "../../assets/images/card/icon_topup.png";
import icon_send from "../../assets/images/card/icon_send.png";
import icon_card_setting from "../../assets/images/card/icon_card_setting.png";
import icon_transaction_no from "../../assets/images/card/icon_transaction_no.png";

import icon_transaction_1 from "../../assets/images/card/icon_transaction_1.png";
import icon_transaction_2 from "../../assets/images/card/icon_transaction_2.png";
import icon_transaction_3 from "../../assets/images/card/icon_transaction_3.png";
import icon_transaction_4 from "../../assets/images/card/icon_transaction_4.png";
import icon_transaction_5 from "../../assets/images/card/icon_transaction_5.png";

import icon_card_setting_currency from "../../assets/images/card/icon_card_setting_currency.png";
import icon_card_setting_block from "../../assets/images/card/icon_card_setting_block.png";
import icon_card_setting_statement from "../../assets/images/card/icon_card_setting_statement.png";

import security_system_bg from "../../assets/images/card/security_system_bg.png";

import flag_usd from "../../assets/images/card/flag_usd.png";
import flag_eur from "../../assets/images/card/flag_eur.png";
import flag_gbp from "../../assets/images/card/flag_gbp.png";
import flag_try from "../../assets/images/card/flag_try.png";
import flag_krw from "../../assets/images/card/flag_krw.png";
import icon_list_check from "../../assets/images/card/icon_list_check.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../states/authState";
import {
  CodegoCardDetail,
  //CardTransaction,
  //PrepaidCardTransaction,
} from "../../models/codego";
import { UpdateUserProfile } from "../../services";
import { debitCardsState, prepaidCardsState } from "../../states/cardsState";
import GetStyle from "../../styles/index";

import { BackButton } from "../../components/card/BackButton";
import { faceIDState } from "../../states/appState";
import { avatarList, avatar } from "./AccountSettingScreen";
import useAPIs from "../../services/hooks/useAPIs";


const fakeTransactions = [
  [
    {
      date: "Today",
      transactions: [
        {
          icon: icon_transaction_5,
          title: "Preply",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_2,
          title: "Spotify",
          time: "16:32",
          amount: -2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "Card Support Services",
          time: "16:32",
          amount: 9.99,
          balance: 213,
        },
        {
          icon: icon_transaction_3,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: -2323,
          balance: 213,
        },
      ],
    },
    {
      date: "Yesterday",
      transactions: [
        {
          icon: icon_transaction_4,
          title: "Preply",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_3,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: -2323,
          balance: 213,
        },
      ],
    },
  ],
  [
    {
      date: "Today",
      transactions: [
        {
          icon: icon_transaction_5,
          title: "Preply",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
        {
          icon: icon_transaction_1,
          title: "4242 **** **** 4534",
          time: "16:32",
          amount: 2323,
          balance: 213,
        },
      ],
    },
  ],
];

const currencyList = [
  {
    flag: flag_usd,
    name: "United States dollar",
    currency: "USD",
  },
  {
    flag: flag_eur,
    name: "Euro",
    currency: "EUR",
  },
  {
    flag: flag_gbp,
    name: "British pound",
    currency: "GBP",
  },
  {
    flag: flag_try,
    name: "Turkish lira",
    currency: "TRY",
  },
  {
    flag: flag_krw,
    name: "South Korean won",
    currency: "KRW",
  },
];

const DashboardScreen: FC<
  NativeStackScreenProps<ParamListBase, "DashboardScreen">
> = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState<CodegoCardDetail | null>(
    null
  );
  const [seletedCardIndex, setSelectedCardIndex] = useState(0);
  const [bottomSheetHeight, setButtonSheetHeight] = useState(0);
  const [_transactions, _] = useState(fakeTransactions);
  const [selectecCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);

  const [showSystemSecurityModal, setShowSystemSecurityModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);

  const [profile, setProfile] = useRecoilState(profileState);

  const [loading, setLoading] = useState(true);
  const busyRef = useRef<boolean>(false);
  const [debitCards, setDebitCards] = useRecoilState(debitCardsState);
  const [prepaidCards, setPrepaidCards] = useRecoilState(prepaidCardsState);
  const faceIdOpen = useRecoilValue(faceIDState);
  const [currentAvatar, setCurrentAvatar] = useState<avatar>(avatarList[0]);

  //const [debitTrans, setDebitTransactions] = useState<CardTransaction[]>([]);
  //const [prepaidTrans, setPrepaidTransactions] = useState<PrepaidCardTransaction[]>([]);

  const { AccountDetails, 
    CheckKYCStatus, 
    DebitCardDetails, 
    DebitUpdateSetting, 
    PrepaidCardDetails,
    PrepaidUpdateSetting } = useAPIs();

  const ref = useRef<BottomSheetRefProps>(null);

  const verified = profile?.kycStatus === "Verified";

  const style = GetStyle();

  useEffect(() => {
    reloadUserData();    
  }, [profile]);

  useEffect(() => {
    if (seletedCardIndex < debitCards.length) {
      setSelectedCard(debitCards[seletedCardIndex]);
    } else if (seletedCardIndex < debitCards.length + prepaidCards.length) {
      setSelectedCard(prepaidCards[seletedCardIndex - debitCards.length]);
    } else {
      setSelectedCard(null);
    }
    if (profile?.kycStatus === "Verified" && profile?.subscription && debitCards.length === 0 && prepaidCards.length === 0){
      console.log("Card reloading");
      reloadUserData();
    }
  }, [seletedCardIndex, debitCards, prepaidCards]);

  useEffect(() => {
    if (bottomSheetHeight > 0) {
      ref?.current?.setTranslateY(-bottomSheetHeight);
    }
  }, [bottomSheetHeight]);

  useEffect(() => {
    const foundAvatar = avatarList.find(item => item.value === profile?.avatar);
    setCurrentAvatar(foundAvatar || avatarList[0]);
  },[profile]);

  const reloadUserData = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setLoading(true);
    setSelectedCardIndex(0);

    if (profile?.codegoId) {
      if (
        profile.kycStatus === "Pending" ||
        profile.idDocStatus === "Pending" ||
        profile.addressDocStatus === "Pending"
      ) {
        await AccountDetails(profile!.codegoId!).then((res) => {
          if (res) {
            let updatedProfile = false;
            CheckKYCStatus(profile.codegoId!).then((s) => {
              if (!s || s.length === 0) {
                res.kyc_status = "Not Verified";
              } else {
                if (
                  s.length === 2 &&
                  s[0].status === "Verified" &&
                  s[1].status === "Verified"
                ) {
                  res.kyc_status = "Verified";
                }
                const idStatus = s.find((x) => x.document_name === "Id Proof");
                const addressStatus = s.find(
                  (x) => x.document_name === "Address Proof"
                );
                if (
                  profile.uid &&
                  (idStatus?.status || addressStatus?.status)
                ) {
                  updatedProfile = true;
                  UpdateUserProfile(profile.uid, {
                    idDocStatus: idStatus?.status || profile.idDocStatus,
                    addressDocStatus:
                      addressStatus?.status || profile.addressDocStatus,
                    accountStatus: res.account_status,
                    kycStatus: res.kyc_status,
                  }).then((pro) => {
                    setProfile(pro);
                  });
                }
              }
              if (!updatedProfile) {
                if (profile?.uid) {
                  UpdateUserProfile(profile?.uid, {
                    accountStatus: res.account_status,
                    kycStatus: res.kyc_status,
                  }).then((pro) => {
                    setProfile(pro);
                  });
                }
              }
            });
          }
        });
      }
      if (profile.kycStatus === "Verified" && profile.subscription) {
        await DebitCardDetails(profile.codegoId).then((res) => {
          if (res) {
            setDebitCards(
              res.map((x) => ({
                ...x,
                card_type:
                  profile.subscription === "Orion"
                    ? CardType.Plastic
                    : CardType.Platinum,
              }))
            );
          } else {
            setDebitCards([]);
          }
        });
        await PrepaidCardDetails(profile.codegoId).then((res) => {
          if (res) {
            setPrepaidCards(
              res.map((x) => ({
                ...x,
                card_type: CardType.Virtual,
              }))
            );
          } else {
            setPrepaidCards([]);
          }
        });
        /*
        const debitModes = ["debit", "refund", "credit"];
        const promises = [] as Promise<any>[];
        debitModes.forEach((mode) => {
          promises.push(
            new Promise((resolve) => {
              GetDebitTransactions(profile.codegoId!, "0", mode).then((trx) => {
                resolve(trx.data);
              });
            })
          );
        });
        const allDebits = await Promise.all(promises);
        await GetPrepaidTransactions(
          profile.codegoId!,
          `${new Date().getMonth()}`,
          `${new Date().getFullYear()}`
        ).then((trx) => {
          setPrepaidTransactions(trx.transaction_history);
        });
        let debit_trans = [] as CardTransaction[];
        allDebits.forEach((res) => {
          if (res && res.length > 0) {
            debit_trans = [...debit_trans, ...res];
          }
        });
        setDebitTransactions(debit_trans);
        */
      }
    }
    setLoading(false);
    setTimeout(() => {
      busyRef.current = false;
    }, 200);
  };

  const settingEnabled =
    __DEV__ ||
    (selectedCard &&
      selectedCard.card_id &&
      (selectedCard.card_lock === "Unlock" ||
        selectedCard.card_lock === "Unlocked"));

  const onActivationCard = () => {
    navigation.navigate("CardActivationScreen");
  };

  const onVerifyCard = (card: CodegoCardDetail) => {
    navigation.navigate("VerifyCardScreen", { type: card.card_type });
  };

  const onPressProfile = () => {
    navigation.navigate("AccountSettingScreen");
  };

  const onPressStatus = () => {    
    navigation.navigate("IDCardScreen");
  };

  const onPressRefresh = () => {
    reloadUserData();
  };

  const onPressTopup = () => {
    Toast.show({
      type: "custom",
      props: {
        style: "default",
      },
      text1: "Topup Feature not available",
      text2: "Detailed Feature will be available soon as possible!",
    });
    navigation.navigate("TopUpOverviewScreen");
    // navigation.navigate("ExportReceiptScreen");
  };

  const onPressSend = () => {
    Toast.show({
      type: "custom",
      props: {
        style: "default",
      },
      text1: "Send Feature not available",
      text2: "Detailed Feature will be available soon as possible!",
    });
    navigation.navigate("SendOverviewScreen");
  };

  const onPressCardSettings = () => {
    if (selectedCard) {
      if (faceIdOpen) {
        // console.log(selectedCard);
        navigation.navigate("CardBlockScreen", {
          card: selectedCard
        });
        // setShowSettingModal(true);
      } else {
        setShowSystemSecurityModal(true);
      }
    }
  };

  const onPressGoToSetting = () => {
    setShowSystemSecurityModal(false);
    navigation.navigate("SecurityPrivacyScreen");
  };

  const onPressCardSettingCurrency = () => {
    setShowSettingModal(false);
    setTimeout(() => {
      setShowAddCurrencyModal(true);
   }, 1500);
  };

  const onPressCardBlock = () => {
    setShowSettingModal(false);
    if (selectedCard) {
      navigation.navigate("CardBlockScreen", { card: selectedCard });
    }
  };

  const onPressCardStatement = () => {
    setShowSettingModal(false);
    navigation.navigate("CardStatementScreen");
  };

  const onPressCurrencyAdd = () => {
    setShowAddCurrencyModal(false);
    Toast.show({
      type: "custom",
      props: {
        style: "success",
      },
      text1: "Currency have been changed",
      text2: "You can check card currency in different way",
    });
  };

  const renderCard = useCallback(({ item }: any) => {
    const card = item as CodegoCardDetail;
    return (
      <Card
        card={card}
        type={card ? card.card_type : CardType.Empty}
        blocked={card?.card_lock === "Locked" || card?.card_lock === "Lock"}
        onUnlock={() => {
          if (
            (card.card_lock == "Locked" || card.card_lock == "Lock") &&
            profile?.codegoId &&
            card.card_id
          ) {
            if (card.card_type === CardType.Virtual) {
              PrepaidUpdateSetting(
                profile.codegoId,
                card.card_id,
                "card_lock",
                "1"
              ).then((res) => {
                Toast.show({
                  type: "custom",
                  props: {
                    style: res.status === 1 ? "success" : "error",
                  },
                  text1: res.status === 1 ? "Card Have Been Unlocked" : "Card Unlock Error",
                  text2: res.status === 1 ? "Feel free to use card! " : res.message,
                });
                PrepaidCardDetails(profile.codegoId!).then((res) => {
                  setPrepaidCards(
                    res.map((x) => ({
                      ...x,
                      card_type: CardType.Virtual,
                    }))
                  );
                });
              });
            } else {
              DebitUpdateSetting(
                profile?.codegoId,
                card.card_id,
                "card_lock",
                "1"
              ).then((res) => {
                Toast.show({
                  type: "custom",
                  props: {
                    style: res.status === 1 ? "success" : "error",
                  },
                  text1: res.status === 1 ? "Card Have Been Unlocked" : "Card Unlock Error",
                  text2: res.status === 1 ? "Feel free to use card! " : res.message,
                });
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
              });
            }
          }
        }}
        onAdd={onActivationCard}
        onVerify={() => onVerifyCard(card)}
      />
    );
  }, []);

  /*
  const transactions1 = selectedCard
    ? selectedCard.card_type === CardType.Virtual
      ? prepaidTrans
      : selectedCard.card_type === CardType.Empty
      ? []
      : debitTrans
    : [];
  */

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <View style={[c_style.Cheader]}>
        <ImageButton source={currentAvatar.icon} onPress={onPressProfile} />
        <Text style={[c_style.AgSpan, style.FBColor, { marginLeft: 10 }]}>
          {profile?.name} {profile?.surname}
        </Text>
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            marginRight: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              c_style.HeaderUserStatus,
              { backgroundColor: verified ? "#BCFFD759" : "#FFB8C059" },
            ]}
            onPress={onPressStatus}
          >
            <Text
              style={[
                c_style.AgCaption,
                { color: verified ? "#03AB00" : "#F62323" },
              ]}
            >
              {profile?.kycStatus || "Not Verified"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onPressRefresh}
          style={[
            style.MainRBText,
            {
              borderRadius: 100,
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image source={icon_refresh} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <Carousel
          loop={false}
          mode="parallax"
          width={Dimensions.get("screen").width}
          height={(Dimensions.get("screen").width * 211) / 327}
          data={
            profile?.subscription ? (debitCards.length === 0 && prepaidCards.length === 0 ? [null] : [...debitCards, ...prepaidCards]) : [null]
          }
          renderItem={renderCard}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index) => {
            setSelectedCardIndex(index);
          }}
        />
      </View>
      <View
        style={[
          c_style.ButtonsContainer,
          { marginTop: 10, paddingHorizontal: 25 },
        ]}
      >
        <TouchableOpacity
          disabled={!settingEnabled}
          style={[
            c_style.ButtonDashboard,
            { opacity: settingEnabled ? 1 : 0.4 },
          ]}
          onPress={onPressTopup}
        >
          <Image source={icon_topup} style={{ width: 24, height: 24 }} />
          <Text style={[c_style.AgInputText, { color: "#9E9E9E" }]}>
            Top Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!settingEnabled}
          style={[
            c_style.ButtonDashboard,
            { opacity: settingEnabled ? 1 : 0.4 },
          ]}
          onPress={onPressSend}
        >
          <Image source={icon_send} style={{ width: 24, height: 24 }} />
          <Text style={[c_style.AgInputText, { color: "#9E9E9E" }]}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!settingEnabled}
          style={[
            c_style.ButtonDashboard,
            { opacity: settingEnabled ? 1 : 0.4 },
          ]}
          onPress={onPressCardSettings}
        >
          <Image source={icon_card_setting} style={{ width: 24, height: 24 }} />
          <Text style={[c_style.AgInputText, { color: "#9E9E9E" }]}>
            Card Settings
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ width: "100%", flex: 1 }}
        onLayout={(event) => {
          var { y } = event.nativeEvent.layout;
          var screenHeight = Dimensions.get("window").height;
          setButtonSheetHeight(screenHeight - y);
        }}
      ></View>
      {loading && <LoadingView />}
      <BottomSheet ref={ref}>
        <Animated.ScrollView>
          {/*seletedCardIndex < transactions.length &&
            transactions[seletedCardIndex].length > 0 &&
            transactions[seletedCardIndex].map((day_transaction, d_index) => {
              return (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 22,
                    marginBottom: 20,
                  }}
                  key={d_index}
                >
                  <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
                    {day_transaction.date}
                  </Text>
                  {day_transaction.transactions &&
                    day_transaction.transactions.length > 0 &&
                    day_transaction.transactions.map((transaction, index) => {
                      return (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            height: 43,
                          }}
                          key={index}
                        >
                          <Image
                            source={transaction.icon}
                            style={{ width: 35, height: 35 }}
                          />
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: "#000", fontSize: 14 }}>
                              {transaction.title}
                            </Text>
                            <Text style={{ color: "#9E9E9E", fontSize: 10 }}>
                              {transaction.time}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }} />
                          <View style={{ alignItems: "flex-end" }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: transaction.amount > 0 ? "#000" : "red",
                              }}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount}$
                            </Text>
                            <Text style={{ color: "#9E9E9E", fontSize: 10 }}>
                              {transaction.balance} SXP
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
              );
            })*/}
          {
            /*(seletedCardIndex >= transactions.length ||
            transactions[seletedCardIndex].length == 0) && (*/
            <View style={{ alignItems: "center", paddingHorizontal: 56 }}>
              <Image
                source={icon_transaction_no}
                style={{ width: 79, height: 59, marginTop: 80 }}
              />
              <Text style={[c_style.AgH2, style.FBColor]}>
                No Transactions yet
              </Text>
              <Text style={[c_style.AgCaption, { color: "#9E9E9E" }]}>
                Before showing Transactions here, you should buy, deposit or
                share money from this card.
              </Text>
            </View>
            //)
          }
        </Animated.ScrollView>
        {/* </ScrollView> */}
      </BottomSheet>
      <Modal
        onBackdropPress={() => {
          setShowSystemSecurityModal(false);
        }}
        isVisible={showSystemSecurityModal}
        style={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        <View style={[c_style.SystemSecurityModal, style.MainRBText]}>
          <Image
            source={security_system_bg}
            style={{ width: 145, height: 145 }}
          />
          <Text style={[c_style.AgH1, style.FBColor, { marginTop: 10 }]}>
            Security system
          </Text>
          <Text
            style={[c_style.AgInputText, { color: "#9E9E9E", marginTop: 10 }]}
          >
            Turn on Face ID in the settings
          </Text>
          <Button
            btn="primary"
            title="Go to settings"
            containerStyle={{ marginTop: 10 }}
            onPress={onPressGoToSetting}
          />
        </View>
      </Modal>

      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        isVisible={showAddCurrencyModal}
      >
        <View style={[c_style.AddCurrencyModal]}>
          <View
            style={{
              marginTop: 15,
              paddingLeft: 8,
              flexDirection: "row",
              alignItems: "center",
              height: 42,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[c_style.AgH4, { color: "#000" }]}>
                Add currency to card
              </Text>
            </View>
            <BackButton
              onPress={() => {
                setShowAddCurrencyModal(false);
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            {currencyList &&
              currencyList.length > 0 &&
              currencyList.map((currency, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      c_style.CurrencyItem,
                      { marginTop: 10 },
                      index == selectecCurrencyIndex && {
                        backgroundColor: "#EBEBEB",
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      setSelectedCurrencyIndex(index);
                    }}
                  >
                    <Image
                      source={currency.flag}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={[c_style.AgH5, { color: "#000" }]}>
                        {currency.name}
                      </Text>
                      <Text style={[c_style.AgInputText, { color: "#9E9E9E" }]}>
                        {currency.currency}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    {index == selectecCurrencyIndex && (
                      <Image
                        source={icon_list_check}
                        style={{ width: 24, height: 24 }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{ flex: 1 }} />
          <Button
            btn="primary"
            title="Submit"
            enabled={selectecCurrencyIndex != -1}
            containerStyle={{ marginBottom: 70, paddingHorizontal: 24 }}
            onPress={onPressCurrencyAdd}
          />
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => {
          setShowSettingModal(false);
        }}
        style={{ justifyContent: "flex-end", margin: 0 }}
        isVisible={showSettingModal}
      >
        <View style={c_style.BottomSheetModal}>
          <View style={c_style.BottomSheetLine} />
          <View style={{ marginTop: 10 }}>
            <Text style={[c_style.AgH4, { color: "#000" }]}>Card settings</Text>
            <TouchableOpacity
              style={[c_style.BottomSheetButton, { marginTop: 20 }]}
              onPress={onPressCardSettingCurrency}
            >
              <Image
                source={icon_card_setting_currency}
                style={{ width: 40, height: 40 }}
              />
              <Text style={[c_style.AgH5, { color: "#000", marginLeft: 7 }]}>
                Card currencies
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[c_style.BottomSheetButton, { marginTop: 10 }]}
              onPress={onPressCardBlock}
            >
              <Image
                source={icon_card_setting_block}
                style={{ width: 40, height: 40 }}
              />
              <Text style={[c_style.AgH5, { color: "#000", marginLeft: 7 }]}>
                Block card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[c_style.BottomSheetButton, { marginTop: 10 }]}
              onPress={onPressCardStatement}
            >
              <Image
                source={icon_card_setting_statement}
                style={{ width: 40, height: 40 }}
              />
              <Text style={[c_style.AgH5, { color: "#000", marginLeft: 7 }]}>
                Statement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DashboardScreen;
