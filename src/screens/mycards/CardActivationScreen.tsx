import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useCallback, useState } from "react";
import {
  SafeAreaView,
    View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import c_style from "../../styles/card";
import Carousel from "react-native-reanimated-carousel";
import { Card, CardType } from "../../components/card/Card";
import icon_check from "../../assets/images/card/icon_check.png";
import { Button } from "../../components/card/Button";
import { useRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import Toast from "react-native-toast-message";
import { UpdateUserProfile } from "../../services";
import GetStyle from "../../styles";
import { BackButton } from "../../components/card/BackButton";
import useAPIs from "../../services/hooks/useAPIs";


const CardItems = [
  {
    type: CardType.Virtual,
    pricing: "€0.99",
    pricing1: "First month free",
  },
  {
    type: CardType.Plastic,
    pricing: "€4.99",
  },
  {
    type: CardType.Platinum,
    pricing: "€9.99",
  },
];

const CardActivationScreen: FC<
  NativeStackScreenProps<ParamListBase, "CardActivationScreen">
> = ({ navigation }) => {
  const [seletedCardIndex, setSelectedCardIndex] = useState(0);
  const [profile, setProfile] = useRecoilState(profileState);

  const { DebitOrderCard, PrepaidOrderCard } = useAPIs();

  const style = GetStyle();
  const onPressBack = () => {
    navigation.goBack();
  };

  let verified = profile?.kycStatus === "Verified";

  const onPressOpen = async () => {
    let response_status;
    if (seletedCardIndex === 0) {
      if (profile?.codegoId) {
        await PrepaidOrderCard(profile!.codegoId).then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: res.message,
          });
          response_status = res.status;
        });
      }
    } else if (seletedCardIndex == 1) {
      if (profile?.codegoId) {
        await DebitOrderCard(profile!.codegoId, "plastic").then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: res.message,
          });
          response_status = res.status;
        });
        await PrepaidOrderCard(profile!.codegoId).then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: res.message,
          });
          response_status = res.status;
        });
      }
    } else if (seletedCardIndex == 2) {
      if (profile?.codegoId) {
        await DebitOrderCard(profile!.codegoId, "metal").then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: res.message,
          });
          response_status = res.status;
        });
        await PrepaidOrderCard(profile!.codegoId).then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: res.message,
          });
          response_status = res.status;
        });
      }
    }

    if (profile?.uid && response_status === 1) {
      UpdateUserProfile(profile.uid, {
        subscription:
          seletedCardIndex === 0
            ? "Cygnus"
            : seletedCardIndex === 1
            ? "Orion"
            : "Omega",
      }).then((pro) => {
        setProfile(pro);
        navigation.goBack();
      });
    }
  };

  const onPressVerification = () => {
    navigation.navigate("IDCardScreen");
  };

  const renderIcon = () => {
    return (
      <View
        style={[
          {
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            width: 28,
            height: 28,
          },
          style.ImageBg,
        ]}
      >
        <Image source={icon_check} />
      </View>
    );
  };

  const renderCard = useCallback(({ item }: any) => {
    return (
      <Card
        blocked={false}
        openned={false}
        type={item.type}
        pricing={item.pricing}
        pricing1={item.pricing1}
      />
    );
  }, []);

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <ScrollView>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={[c_style.AgH1, style.FBColor]}>Select a Card</Text>
            <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
              Please select a card, which you wants to open inside Solar
            </Text>
          </View>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Carousel
              loop={false}
              mode="parallax"
              width={Dimensions.get("screen").width}
              height={(Dimensions.get("screen").width * 211) / 327}
              data={CardItems}
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
          <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
            {seletedCardIndex == 0 && (
              <View>
                <View style={[c_style.CardDetails]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Crypto Wallet
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    1x Virtual Debit Card
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Dedicated IBAN account
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    USD, EUR, GBP accounts
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    $5000 monthly card load limit
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    24/7 Support
                  </Text>
                </View>
              </View>
            )}
            {seletedCardIndex == 1 && (
              <View>
                <View style={[c_style.CardDetails]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Crypto Wallet
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    1x Virtual Debit Card
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    1x Plastic Mastercard
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Dedicated IBAN account
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    USD, EUR, GBP, TRY Accounts
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    $10000 Monthly Card Load Limit
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    24/7 Support
                  </Text>
                </View>
              </View>
            )}
            {seletedCardIndex == 2 && (
              <View>
                <View style={[c_style.CardDetails]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Crypto Wallet
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    1x Virtual Debit Card
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    1x Platinum Mastercard
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    Dedicated IBAN account
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    USD, EUR, GBP, TRY, **KRW Accounts
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    $50000 Monthly Card Load Limit
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    24/7 Support
                  </Text>
                </View>
                <View style={[c_style.CardDetails, { marginTop: 8 }]}>
                  {renderIcon()}
                  <Text
                    style={[c_style.AgButton, style.FBColor, { marginLeft: 5 }]}
                  >
                    VIP Services
                  </Text>
                </View>
              </View>
            )}
          </View>
          {verified ? (
            <View
              style={{
                paddingHorizontal: 24,
                marginTop: 20,
                paddingBottom: 50,
              }}
            >
              <Button btn="primary" title="Open" onPress={onPressOpen} />
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 24,
                marginTop: 20,
                paddingBottom: 50,
                alignItems: "center",
              }}
            >
              {/*
                    <View
                style={{
                  backgroundColor: "#EFE1FFA1",
                  paddingHorizontal: 11,
                  borderRadius: 24,
                  height: 24,
                  justifyContent: "center",
                }}
              >
                <Text style={[c_style.AgCaption, { color: "#481B75" }]}>
                  Pending
                </Text>
              </View>
                    */}
              <Text
                style={[
                  c_style.AgP,
                  {
                    color: "#9E9E9E",
                    marginVertical: 10,
                    marginHorizontal: 20,
                    textAlign: "center",
                  },
                ]}
              >
                You should be verified by KYC before openning the card
              </Text>
              <View style={{ width: "100%" }}>
                <Button
                  btn="primary"
                  title="Go to KYC Verification"
                  onPress={onPressVerification}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardActivationScreen;
