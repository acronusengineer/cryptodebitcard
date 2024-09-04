import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import c_style from "../../styles/card";
import { BackButton } from "../../components/card/BackButton";
import { reduceStr } from "../../services/helper";

import icon_transaction_1 from "../../assets/images/card/icon_transaction_1.png";
import icon_sxp from "../../assets/images/coin_logos/sxp.png";
import CardOpened from "../../assets/images/card_opened.png";
import icon_recepit from "../../assets/images/card/icon_recepit.png";
import icon_support from "../../assets/images/card/icon_support.png";
import icon_report_tx from "../../assets/images/card/icon_report_tx.png";
import GetStyle from "../../styles";


const TransactionDetailsScreen: FC<
  NativeStackScreenProps<ParamListBase, "TransactionDetailsScreen">
> = ({ navigation }) => {

  const style = GetStyle();
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus("completed")
    }, 2000);
    const timer2 = setTimeout(() => {
      setStatus("rejected")
    }, 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, [])

  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.Container]}>
          <View style={{position: 'absolute', top: 30, left: 24, zIndex: 100}}>
            <BackButton onPress={() => {if (navigation.canGoBack()) navigation.goBack()}} />
          </View>
          <View style={{flexDirection: "row", justifyContent: "center", marginBottom:6}}>
            <Image source={icon_transaction_1} style={{height: 52, width: 52}} />
          </View>
          <Text style={[c_style.AgH4, style.FBColor, {textAlign: "center"}]}>4hfbvhbfhrfb848hfurhrfr</Text>
          <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "center"}]}>22 September 2023  16:32</Text>
          <View style={{flexDirection: "row", justifyContent: "center", marginTop: 8}}>
            {status === "pending" ? 
              <View style={[styles.Status, styles.StatusPending]}><Text style={[c_style.AgCaption]}>Pending</Text></View> 
              : (status === "completed" ? 
                  <View style={[styles.Status, styles.StatusCompleted]}><Text style={[c_style.AgCaption]}>Completed</Text></View>
                  :
                  <View style={[styles.Status, styles.StatusRejected]}><Text style={[c_style.AgCaption]}>Rejected</Text></View>
                  )
            }
          </View>
          <Text style={[c_style.AgTransaction, style.FBColor, {textAlign: "center", marginTop: 8, padding: 0}]}>-$2323</Text>
          <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "center"}]}>3432 SXP</Text>


          <View style={[styles.CContainer, style.SContainer]}>
            <View style={{flexDirection: "row"}}>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1
              }}>
                <Image source={CardOpened} style={{width: 37, height: 25.57, marginRight: 8}} />
                <View style={{flexDirection: "column"}}>
                  <Text style={[c_style.AgH4, style.FBColor]}>
                    Cygnus
                  </Text>
                  <Text style={[c_style.AgCaption, style.FBColor]}>
                    ****3732
                  </Text>
                </View>
              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: "#D9D9D9",
                paddingLeft: 6
              }}>
                <Image source={icon_sxp} style={{width: 29, height: 29, marginRight: 8}} />
                <View style={{flexDirection: "column"}}>
                  <Text style={[c_style.AgH4, style.FBColor]}>
                    SXP Wallet
                  </Text>
                  <Text style={[c_style.AgCaption, style.FBColor]}>
                    ****5gfw
                  </Text>
                </View>
              </View>
            </View>
            <View style={{borderBottomWidth: 1, borderBottomColor: "#D9D9D9", marginVertical : 8}}></View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor]}>Balance:</Text>
              <View style={{
                flexDirection: "column",
              }}>
                <Text style={[c_style.AgP, style.FBColor, {textAlign: "right"}]}>${'1277'}</Text>
                <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "right"}]}>{2} SXP</Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Transaction ID:</Text>
              <View style={{
                flexDirection: "column",
              }}>
                <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "right"}]}>#4343</Text>
              </View>
            </View>
          </View>
          <View style={[styles.CContainer, style.SContainer]}>
            <Text style={[c_style.AgH4, style.FBColor]}>conversion Details</Text>
            <View style={{borderBottomWidth: 1, borderBottomColor: "#D9D9D9", marginVertical : 8}}></View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Pair:</Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Image source={icon_sxp} style={{height: 16, width: 16}} />
                <Text style={[c_style.AgP, style.FBColor, {textAlign: "right", marginLeft: 5}]}>SXP</Text>
                <Text style={[c_style.AgH5, style.FBColor, {textAlign: "right", marginHorizontal: 8}]}>To</Text>
                <Image source={icon_sxp} style={{height: 16, width: 16}} />
                <Text style={[c_style.AgP, style.FBColor, {textAlign: "right", marginLeft: 5}]}>SXP</Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Amount Taken:</Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Text style={[c_style.AgP, style.FBColor, {textAlign: "right", marginLeft: 5}]}>{213000} SXP</Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Cas Fee:</Text>
              <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "right"}]}>0,0232 SXP</Text>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Sender:</Text>
              <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "right"}]}>{reduceStr("0x88er2341adf324522")}</Text>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={[c_style.AgH5, style.FBColor, {marginTop: 8}]}>Receiver:</Text>
              <Text style={[c_style.AgCaption, style.FGColor, {textAlign: "right"}]}>{reduceStr("0x88er2341adf324522")}</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 8}}>
              <TouchableOpacity>
                <Text style={[style.FPColor, c_style.AgButton]}>View on block explorer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }} />
            
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 16}}>
            <Image source={icon_recepit} style={{height: 32, width: 32, marginRight: 6}} />
            <TouchableOpacity onPress={() => navigation.navigate("ExportReceiptScreen")}>
              <Text style={[c_style.AgButton, style.FPColor]}>Receipt</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 16}}>
            <Image source={icon_support} style={{height: 32, width: 32, marginRight: 6}} />
            <TouchableOpacity>
              <Text style={[c_style.AgButton, style.FPColor]}>Support</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 16, marginBottom: 24}}>
            <Image source={icon_report_tx} style={{height: 32, width: 32, marginRight: 6}} />
            <TouchableOpacity>
              <Text style={[c_style.AgButton, style.FPColor]}>Report Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  CContainer: {
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F7F7F7",
    marginVertical: 8
  },
  Status: {
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 24 
  },
  StatusPending: {
    color: "#481B75",
    backgroundColor: "#EFE1FF",
  },
  StatusCompleted: {
    color: "#03AB00",
    backgroundColor: "#BCFFD7",
  },
  StatusRejected: {
    color: "#F62323",
    backgroundColor: "#FFB8C059",
  },
});

export default TransactionDetailsScreen;
