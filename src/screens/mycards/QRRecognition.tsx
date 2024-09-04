import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, StatusBar } from "react-native";
// import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCodeScanner from "../../components/react-native-qrcode-scanner";

const QRRecognition: FC<
  NativeStackScreenProps<ParamListBase, "QRRecognition">
> = ({navigation}) => {

  const onSuccess = (e: any) => {
    navigation.navigate("SendCryptoScreen", {qr_string: e.data})
  }

  const returnBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  }
  
  const marker = (
    color: string,
    size: string | number,
    borderLength: string | number,
    thickness: number = 2,
    borderRadius: number = 0,
  ): JSX.Element => {
    return (
      <View style={{height: size, width: size}}>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            top: 0,
            left: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderLeftWidth: thickness,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: 1,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            top: 0,
            right: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderRightWidth: thickness,
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: 1,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            bottom: 0,
            left: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderLeftWidth: thickness,
            borderBottomLeftRadius: borderRadius,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            bottom: 0,
            right: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderRightWidth: thickness,
            borderBottomRightRadius: borderRadius,
          }}></View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <QRCodeScanner
        reactivate={true}
        showMarker={true}
        customMarker={marker('white', 250, '25%', 4, 20)}
        onRead={onSuccess}
        closeCamera={returnBack}
      />
    </View>
  );
};

export default QRRecognition;
