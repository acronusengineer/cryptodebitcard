import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { InputField } from "../../components/card/InputField";
import { Select } from "../../components/card/Select";
import Toast from "react-native-toast-message";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import auth, { firebase } from "@react-native-firebase/auth";
import GetStyle from "../../styles";

import { BackButton } from "../../components/card/BackButton";
import { CodegoCardDetail } from "../../models/codego";
import ReactNativeBiometrics from "react-native-biometrics";
import { CardType } from "../../components/card/Card";
import { debitCardsState, prepaidCardsState } from "../../states/cardsState";
import { LoadingView } from "../../components/loading-view";
import useAPIs from "../../services/hooks/useAPIs";

interface ParamType {
  card: CodegoCardDetail;
}
const CardBlockScreen: FC<
  NativeStackScreenProps<ParamListBase, "CardBlockScreen">
> = ({ navigation, ...props }) => {
  const param = props.route.params as ParamType;
  const card = param.card;

  const [reason, setReason] = useState(-1);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const style = GetStyle();
  const profile = useRecoilValue(profileState);

  const [loading, setLoading] = useState(false);

  const setPrepaidCards = useSetRecoilState(prepaidCardsState);
  const setDebitCards = useSetRecoilState(debitCardsState);

  const {
    DebitCardDetails,
    DebitOrderCard,
    DebitUpdateSetting,
    PrepaidCardDetails,
    PrepaidOrderCard,
    PrepaidUpdateSetting,
    RequestStolenOrReplace,
  } = useAPIs();

  const onPressBack = () => {
    navigation.goBack();
  };

  const handleBiometrics = () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    rnBiometrics.isSensorAvailable().then((result) => {
      const { available } = result;
      if (available) {
        rnBiometrics
          .simplePrompt({
            promptMessage: "Update card setting",
          })
          .then((resultObject) => {
            const { success } = resultObject;
            if (success) {
              blockCard();
            } else {
              setLoading(false);
              Toast.show({
                type: "custom",
                props: {
                  style: "error",
                },
                text1: "Biometrics error",
                text2: "Failed to pass biometrics check.",
              });
            }
          })
          .catch((_ex) => {
            setLoading(false);
            Toast.show({
              type: "custom",
              props: {
                style: "error",
              },
              text1: "Biometrics error",
              text2: _ex.code,
            });
          });
      } else {
        setLoading(false);
        Toast.show({
          type: "custom",
          props: {
            style: "error",
          },
          text1: "Biometrics error",
          text2: "Biometrics is not enabled",
        });
      }
    });
  };

  const blockCard = () => {
    if (profile?.codegoId) {
      if (reason === 0 || reason === 1) {
        RequestStolenOrReplace(profile.codegoId, card.card_id!).then((res) => {
          Toast.show({
            type: "custom",
            props: {
              style: res.status === 1 ? "success" : "error",
            },
            text1: "Card Update",
            text2: res.message,
          });
          if (profile?.codegoId) {
            if (card.card_type === CardType.Virtual) {
              PrepaidOrderCard(profile!.codegoId).then((res) => {
                Toast.show({
                  type: "custom",
                  props: {
                    style: res.status === 1 ? "success" : "error",
                  },
                  text1: res.message,
                });
                setLoading(false);
                navigation.goBack();
              });
            } else {
              DebitOrderCard(
                profile!.codegoId,
                card.card_type === CardType.Plastic ? "plastic" : "metal"
              ).then((res) => {
                Toast.show({
                  type: "custom",
                  props: {
                    style: res.status === 1 ? "success" : "error",
                  },
                  text1: res.message,
                });
                setLoading(false);
                navigation.goBack();
              });
            }
          }
        });
      } else if (reason === 2) {
        //Lock Unlock
        if (card.card_type === CardType.Virtual) {
          PrepaidUpdateSetting(
            profile.codegoId,
            card.card_id!,
            "card_lock",
            "0"
          ).then((res) => {
            Toast.show({
              type: "custom",
              props: {
                style: res.status === 1 ? "success" : "error",
              },
              text1: res.status === 1 ? "Card Have Been Locked" : "Card Lock Error",
              text2: res.status === 1 ? "You and nobody can't use card! " : res.message,
            });
            PrepaidCardDetails(profile.codegoId!).then((res) => {
              setPrepaidCards(
                res.map((x) => ({
                  ...x,
                  card_type: CardType.Virtual,
                }))
              );
              setLoading(false);
              navigation.goBack();
            });
          });
        } else {
          DebitUpdateSetting(
            profile?.codegoId,
            card.card_id!,
            "card_lock",
            "0"
          ).then((res) => {
            Toast.show({
              type: "custom",
              props: {
                style: res.status === 1 ? "success" : "error",
              },
              text1: res.status === 1 ? "Card Have Been Locked" : "Card Lock Error",
              text2: res.status === 1 ? "You and nobody can't use card! " : res.message,
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
              setLoading(false);
              navigation.goBack();
            });
          });
        }
      }
    }
  };
  const onPressSubmit = () => {
    if (email !== profile?.email || reason === -1 || !comment) {
      Toast.show({
        type: "custom",
        props: {
          style: "error",
        },
        text1: "Input Error",
        text2: "Please fill the form with correct reason.",
      });
      return;
    }
    setLoading(true);
    const cred = auth.EmailAuthProvider.credential(email, password);

    firebase
      .auth()
      .currentUser?.reauthenticateWithCredential(cred)
      .then((_) => {
        // console.log("Success", user);
        handleBiometrics();
      })
      .catch((ex) => {
        if (ex.code === "auth/multi-factor-auth-required") {
          handleBiometrics();
        } else {
          Toast.show({
            type: "custom",
            props: {
              style: "error",
            },
            text1: "Input Error",
            text2:
              ex.code === "auth/wrong-password" ? "Wrong password" : ex.message,
          });
          setLoading(false);
        }
      });
  };

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 70,
        }}
      >
        <Text style={[c_style.AgH1, style.FBColor]}>Card Setting</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E", marginBottom: 15 }]}>
          Card request for stolen or replace
        </Text>
        <Select
          title="Type of problem"
          data={[
            {
              title: "Card have been stolen",
              value: 0,
            },
            {
              title: "Card have been lost",
              value: 1,
            },
            {
              title: "Just want to stop using the card",
              value: 2,
            },
          ]}
          containerStyle={{ marginTop: 20, marginBottom: 15 }}
          placeholder="Choose type of problem *"
          value={reason}
          onSelect={(value) => {
            setReason(value);
          }}
        />
        <InputField
          value={comment}
          title="Leave comment"
          placeholder="More details about request"          
          onChangeText={(text) => {
            setComment(text);
          }}
        />
        <InputField
          value={email}
          autoCapitalize="none"
          title="Your Email*"
          placeholder="example@mail.com"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <InputField
          value={password}
          textContentType="password"
          autoCapitalize="none"
          title="Password *"
          placeholder="Your Main Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <View style={{ flex: 1 }} />
        <Button btn="primary" title="Submit" onPress={onPressSubmit} />
      </View>
      {loading && <LoadingView />}
    </SafeAreaView>
  );
};

export default CardBlockScreen;
