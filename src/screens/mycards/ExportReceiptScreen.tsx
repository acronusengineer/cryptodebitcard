import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Toast from "react-native-toast-message";

import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { BackButton } from "../../components/card/BackButton";
import { LoadingView } from "../../components/loading-view";
import { genRandomString } from "../../utils/helper";
import GetStyle from "../../styles";

interface Transaction {
  date: string,
  description: string,
  withdrawal?: number,
  deposit?: number
}

const ExportReceiptScreen: FC<
  NativeStackScreenProps<ParamListBase, "ExportReceiptScreen">
> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const style = GetStyle();
  const [transactions, setTransactions] = useState<Transaction[] | never[]>([]);
  const [transactionID, setTransactionID] = useState(genRandomString(4));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTransactions(() => {
      return [
        {
          date: "02/01",
          description: "PGD EasyPay Debit",
          withdrawal: 203.24,
        },
        {
          date: "02/03",
          description: "Payroll Direct Dep 23422342 Giants",
          deposit: 450.12,
        },
        {
          date: "02/01",
          description: "PGD EasyPay Debit",
          withdrawal: 203.24,
        },
        {
          date: "02/03",
          description: "Payroll Direct Dep 23422342 Giants",
          deposit: 450.12,
        },
        {
          date: "02/01",
          description: "PGD EasyPay Debit",
          withdrawal: 203.24,
        },
        {
          date: "02/03",
          description: "Payroll Direct Dep 23422342 Giants",
          deposit: 450.12,
        },
        {
          date: "02/01",
          description: "PGD EasyPay Debit",
          withdrawal: 203.24,
        },
        {
          date: "02/03",
          description: "Payroll Direct Dep 23422342 Giants",
          deposit: 450.12,
        },
        {
          date: "02/01",
          description: "PGD EasyPay Debit",
          withdrawal: 203.24,
        },
        {
          date: "02/03",
          description: "Payroll Direct Dep 23422342 Giants",
          deposit: 450.12,
        },
      ]
    })
  }, [])
  
  // const HTMLStyle = {
  // table: {
  //   width: "100%"
  // },
  // body: {
  //   fontSize: 12
  // },
  // td: {
  //   fontSize: 12,
  //   borderWidth: 0,
  //   padding: 8
  // },
  // th: {
  //   borderWidth: 0,
  //   padding: 8
  // },
  // "tr:nth-child(even)": {
  //   backgroundColor: "#efefef",
  // },
  // "tr:nth-child(odd)": {
  //   backgroundColor: "white",
  // },
  // "tr:first-child": {
  //   backgroundColor: "black",
  //   color: "white"
  // },
  // detail: {
  //   display: "flex",
  //   flexDirection: "row",
  //   padding: "20px 24px"
  // },
  // "detail p": {
  //   fontSize: 12
  // }
  // };

  const HTMLsource = {
  html: `
  <html>
    <div style="border-radius: 8px; background-color: #fff;">
      <div style="background-color: #efefef; padding: 26px 18px">
        <p style="font-size: 16px; font-weight: bold; margin: 0">
          First Platypus Bank
        </p>
        <p style="font-size: 12px; margin: 3px 0 0 0">
          1234 Kings St., New York, NY 12123
        </p>
      </div>
      <div style="display: flex; flex-direction: row; padding: 20px 18px;">
        <div style="flex: 4">
            <p style="font-size: 10px; margin: 3px 0;">Mary G. Orta</p>
            <p style="font-size: 10px; margin: 3px 0;">1459 Sherman St.</p>
            <p style="font-size: 10px; margin: 3px 0;">Salina, KS 67401</p>
        </div>
        <div style="display: flex; flex-direction: row; flex: 5">
            <div style="flex: 1">
                <p style="font-size: 10px; margin: 3px 0;">Account Number:</p>
                <p style="font-size: 10px; margin: 3px 0;">Statement Date:</p>
                <p style="font-size: 10px; margin: 3px 0;">Period Covered:</p>
            </div>
            <div style="flex: 1">
                <p style="font-size: 10px; margin: 3px 0;">12345678901</p>
                <p style="font-size: 10px; margin: 3px 0;">3/1/2022</p>
                <p style="font-size: 10px; margin: 3px 0;">2/1/2022 - 3/</p>
            </div>
        </div>
      </div>
      <hr style="border-color: #F4F4F4;">
      <div style="display: flex; flex-direction: row; padding: 10px 18px;">
        <div style="display: flex; flex-direction: row; flex: 3">
            <div style="flex: 1">
                <p style="font-size: 10px; margin: 3px 0;">Account Number:</p>
                <p style="font-size: 10px; margin: 3px 0;">Statement Date:</p>
                <p style="font-size: 10px; margin: 3px 0;">Period Covered:</p>
            </div>
            <div style="flex: 1">
                <p style="font-size: 10px; margin: 3px 0;">12345678901</p>
                <p style="font-size: 10px; margin: 3px 0;">3/1/2022</p>
                <p style="font-size: 10px; margin: 3px 0;">2/1/2022 - 3/</p>
            </div>
        </div>
        <div style="flex: 2">
        </div>
      </div>
      <hr style="border-color: #F4F4F4;">
      <P style="font-size: 14px; padding-left: 18px">Transactions</P>
      <table>
        <tr style="background-color: black; color: white;">
          <td style="borderWidth: 0; flex: 2;"><span style="font-size: 12px; padding: 4px 6px;">Date</span></td>
          <td style="borderWidth: 0; flex: 5;"><span style="font-size: 12px; padding: 4px 6px;">Description</span></td>
          <td style="borderWidth: 0; flex: 3;"><span style="font-size: 12px; padding: 4px 6px;">Withdrawal</span></td>
          <td style="borderWidth: 0; flex: 3;"><span style="font-size: 12px; padding: 4px 6px;">Deposit</span></td>
        </tr>
        ${transactions.map((transaction, index) => `
          ${index%2 === 0 ? '<tr style="background-color: #efefef;">' : '<tr>'}
            <td style="borderWidth: 0; flex: 2;"><span style="font-size: 12px; padding: 4px 6px;">${transaction.date}</span></td>
            <td style="borderWidth: 0; flex: 5;"><span style="font-size: 12px; padding: 4px 6px;">${transaction.description}</span></td>
            <td style="borderWidth: 0; flex: 3"><span style="font-size: 12px; padding: 4px 6px;">${transaction.withdrawal || ''}</span></td>
            <td style="borderWidth: 0; flex: 3;"><span style="font-size: 12px; padding: 4px 6px;">${transaction.deposit || ''}</span></td>
          </tr>
        `).join('')}
      </table>
    </div>
  </html>
  `,
  };

  const onPressExport = async () => {
    setLoading(true);
    let options = {
      html: HTMLsource.html,
      fileName: `receipt_${transactionID}`,
      directory: 'Receipts',
    };

    let file = await RNHTMLtoPDF.convert(options);
    setTransactionID(genRandomString(4));
    Toast.show({
      type: "custom",
      props: {
        style: "success",
      },
      text1: "Receipt have been exported",
      text2: `You can check the receipt in ${file.filePath}`,
    });
    setLoading(false);
  };

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

      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 30,
          flexDirection: "column",
        }}
      >
        <Text style={[c_style.AgH1, style.FBColor]}>Receipt</Text>
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={style.FLayout}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 30,
            flexDirection: "column",
          }}
        >
          <RenderHtml
            contentWidth={width}
            source={HTMLsource}
            // tagsStyles={HTMLStyle}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 30,
          flexDirection: "column",
        }}
      >
        <Button btn="primary" title="Export" onPress={onPressExport} />
      </View>
      {loading && <LoadingView />}
    </SafeAreaView>
  );
};

export default ExportReceiptScreen;
