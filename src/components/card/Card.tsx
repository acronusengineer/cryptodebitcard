import { FC, useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import c_style from "../../styles/card";
import card_virtual_bg from "../../assets/images/card/card_virtual.png";
import card_plastic_bg from "../../assets/images/card/card_plastic.png";
import card_platium_bg from "../../assets/images/card/card_platium.png";
import card_blocked_bg from "../../assets/images/card/card_blocked.png";
import card_empty_bg from "../../assets/images/card/card_empty.png";
import icon_plus from "../../assets/images/card/icon_plus.png";

import DropShadow from "react-native-drop-shadow";
import { CodegoCardDetail } from "../../models/codego";
import { useRecoilValue } from "recoil";
import { profileState } from "../../states/authState";

export enum CardType {
  Virtual,
  Plastic,
  Platinum,
  Empty,
}

interface Props {
  card?: CodegoCardDetail;
  type?: CardType;
  blocked?: boolean;
  amount?: number;
  number?: string;
  openned?: boolean;
  pricing?: string;
  pricing1?: string;
  containerStyle?: any;
  onUnlock?: () => void;
  onAdd?: () => void;
  onVerify?: () => void;
}

const amountFormat = (value: number | undefined) => {
  if (value == undefined) return "";

  return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

export const Card: FC<Props> = ({
  card,
  type = CardType.Virtual,
  blocked = true,
  number,
  pricing,
  pricing1,
  openned = true,
  containerStyle,
  onUnlock,
  onAdd,
  onVerify,
}) => {
  const [cardBg, setCardBg] = useState(card_virtual_bg);
  const [cardNumber, setCardNumber] = useState(number);
  const [cardAmount, setCardAmount] = useState(
    card ? amountFormat(Number(card.balance)) : ""
  );
  const [sxpBalance, setSXPBalance] = useState(0);
  const [cardName, setCardName] = useState("");
  const profile = useRecoilValue(profileState);

  const empty = !card && type === CardType.Empty;
  const toVerify = card && card.card_status === "Already Order";

  useEffect(() => {
    if (type == CardType.Virtual) {
      setCardBg(card_virtual_bg);
      setCardName("Virtual Cygnus");
      if (!openned) {
        setCardAmount("Cygnus");
      }
    } else if (type == CardType.Plastic) {
      setCardBg(card_plastic_bg);
      setCardName("Plastic Orion");
      if (!openned) {
        setCardAmount("Orion");
      }
    } else if (type == CardType.Platinum) {
      setCardBg(card_platium_bg);
      setCardName("Platinum Omega");
      if (!openned) {
        setCardAmount("Omega");
      }
    }
    if (!openned) {
      setCardNumber("XXXX  XXXX  XXXX  XXXX");
    } else {
      setCardNumber(card?.card_number);
    }
    setSXPBalance(Number(card?.balance || "0"));
  }, [type, card, openned]);

  return (
    <View style={containerStyle}>
      {empty && (
        <TouchableOpacity
          style={c_style.CardContainer}
          onPress={() => {
            if (onAdd) onAdd();
          }}
        >
          <ImageBackground
            source={card_empty_bg}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[c_style.AgH2, { color: "#F7873C" }]}>
                  Activate new card
                </Text>
                <Image
                  source={icon_plus}
                  style={{ width: 34, height: 34, marginLeft: 5 }}
                />
              </View>
              <Text style={[c_style.AgInputText, { color: "#888888" }]}>
                Activate your personal Solar Card!{" "}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
      {toVerify && (
        <View style={c_style.CardContainer}>
          <ImageBackground
            source={cardBg}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (onVerify) onVerify();
                  }}
                >
                  <Text
                    style={[
                      c_style.AgH2,
                      { color: "#FFF", textAlign: "center", fontWeight: "500" },
                    ]}
                  >
                    Open Card
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[c_style.AgInputText, { color: "#888888" }]}>
                Verify now and start using Solar Card!
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
      {!empty && !toVerify && (
        <View style={[c_style.CardContainer]}>
          <ImageBackground
            source={cardBg}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={{ width: "100%", height: "100%" }}>
              <View style={{ marginTop: 21, marginLeft: 12 }}>
                <Text style={[c_style.AgH1, { color: "white" }]}>
                  {cardAmount}
                </Text>
                {pricing && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[c_style.AgH3, { color: "white" }]}>
                      {pricing}
                    </Text>
                    <Text
                      style={[
                        c_style.AgCaption,
                        { color: "white" },
                        { marginLeft: 5 },
                      ]}
                    >
                      Per month{pricing1 ? ", " + pricing1 : ""}
                    </Text>
                  </View>
                )}
                {openned && (
                  <Text
                    style={[
                      c_style.AgCaption,
                      { color: type == CardType.Virtual ? "gray" : "white" },
                    ]}
                  >
                    {sxpBalance} SXP
                  </Text>
                )}
              </View>
              <View style={{ flex: 1 }}></View>
              <View
                style={{
                  marginBottom: 15,
                  marginHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        c_style.AgH5,
                        {
                          color: type == CardType.Virtual ? "#F7873C" : "white",
                        },
                      ]}
                    >
                      Solar
                    </Text>
                    <Text style={[c_style.AgH5, { color: "white" }]}>Card</Text>
                    <Text
                      style={[
                        c_style.AgH5,
                        { color: "white" },
                        { marginHorizontal: 5 },
                      ]}
                    >
                      |
                    </Text>
                    <Text
                      style={[
                        c_style.AgH5,
                        {
                          color: type != CardType.Plastic ? "#F7873C" : "white",
                        },
                      ]}
                    >
                      {cardName}
                    </Text>
                  </View>
                  <Text
                    style={[
                      c_style.AgH5,
                      { color: "white" },
                      { marginVertical: 3 },
                    ]}
                  >
                    {cardNumber}
                  </Text>
                  {openned && (
                    <Text style={[c_style.AgCaption, { color: "white" }]}>
                      {profile?.name} {profile?.surname}
                    </Text>
                  )}
                </View>
                {openned && (
                  <View style={{ alignItems: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "#FFFFFF33",
                        padding: 4,
                        borderRadius: 4,
                        width: 40,
                        marginBottom: 3,
                      }}
                    >
                      <Text style={[c_style.AgCaption, { color: "white" }]}>
                        CVV2
                      </Text>
                    </View>
                    <Text style={[c_style.AgCaption, { color: "white" }]}>
                      Exp {card?.expiry_date}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
      {!empty && !toVerify && blocked && (
        <View
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
        >
          <ImageBackground
            source={card_blocked_bg}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ opacity: 0.8 }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[c_style.AgH2, { color: "white" }]}>
                Card Blocked
              </Text>
              <Text style={[c_style.AgCaption, { color: "white" }]}>
                You can’t use card till unlocked moment
              </Text>
              <DropShadow style={[c_style.UnBlockShadow, { marginTop: 10 }]}>
                <TouchableOpacity
                  style={c_style.UnBlockButton}
                  onPress={() => {
                    if (onUnlock) onUnlock();
                  }}
                >
                  <Text style={[c_style.AgButton, { color: "white" }]}>
                    Unlock
                  </Text>
                </TouchableOpacity>
              </DropShadow>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};
