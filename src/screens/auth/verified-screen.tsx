import React, { FC, useEffect } from "react";
import VerifiedIcon from "../../assets/images/verified.png";

import {
  Image,
  SafeAreaView,
    StyleSheet,
  Text,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";


const VerifiedScreen: FC<
  NativeStackScreenProps<ParamListBase, "VerifiedScreen">
> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop();
      navigation.replace("AppNavigator");
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.bgContainer}>
      
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={VerifiedIcon}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#101010",
              borderRadius: 100,
            }}
          ></Image>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Congratulation</Text>
          <Text style={styles.description}>
            Your account is ready to use. You will be redirected to the home
            page in a few seconds
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#222222",
    marginHorizontal: 50,
    height: "50%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    color: "#666666",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
  },
});

export default VerifiedScreen;
