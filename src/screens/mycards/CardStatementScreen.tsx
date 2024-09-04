import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import c_style from "../../styles/card";
import { Button } from "../../components/card/Button";
import { InputField } from "../../components/card/InputField";
import { Select } from "../../components/card/Select";
import Toast from "react-native-toast-message";
import GetStyle from "../../styles";

import { BackButton } from "../../components/card/BackButton";

const CardStatementScreen: FC<
  NativeStackScreenProps<ParamListBase, "CardStatementScreen">
> = ({ navigation }) => {
  const [card, setCard] = useState(0);
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const style = GetStyle();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSubmit = () => {
    Toast.show({
      type: "custom",
      props: {
        style: "success",
      },
      text1: "Card have been blocked",
      text2: "You and nobody can’t use card!",
    });
    navigation.goBack();
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
        <Text style={[c_style.AgH1, style.FBColor]}>USD statement</Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E", marginBottom: 20 }]}>
          Create statement for your Cygnus USD currency account
        </Text>

        <Select
          title="Type of card"
          data={[
            {
              title: "Virtual Cygnus",
              value: 0,
            },
            {
              title: "Virtual Cygnus",
              value: 1,
            },
          ]}
          containerStyle={{ marginTop: 20, marginBottom: 15 }}
          placeholder="Select a Card"
          value={card}
          disabled={false}
          onSelect={(value) => {
            setCard(value);
          }}
        />
        <InputField
          value={starting}
          datePicker={true}
          title="Starting on"
          placeholder="MM/YYYY *"
          onChangeText={(text) => {
            setStarting(text);
          }}
        />
        <InputField
          value={ending}
          datePicker={true}
          title="Ending on"
          placeholder="MM/YYYY *"
          onChangeText={(text) => {
            setEnding(text);
          }}
        />
        <View style={{ flex: 1 }} />
        <Button btn="primary" title="Generate" onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default CardStatementScreen;
