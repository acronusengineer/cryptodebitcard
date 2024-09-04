import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import c_style from "../../styles/card";
import GetStyle from "../../styles";
import icon_select_arrow_down from "../../assets/images/card/icon_select_arrow_down.png";
import mastercardLogo from "../../assets/images/card/mastercard.png";
import visacardLogo from "../../assets/images/card/visacard.png";

interface Props {
  onPress: () => void;
  selectedValue: number | undefined;
  dataList: any[];
}

const SelectInput = (props: Props) => {
  const style = GetStyle();
  const { selectedValue, dataList, onPress } = props;

  return (
    <TouchableOpacity onPress={() => {onPress()}}>
      <View
        style={[
          styles.SelectContainer,
          style.InputBGColor,
        ]}
      >
        {selectedValue === undefined && (
          <>
          </>
        )}
        {selectedValue === -1 && (
          <>
          <View style={{overflow: 'hidden'}}><Image source={dataList[0].logo || ((dataList[0].type === "Visa" && visacardLogo) || (dataList[0].type === "MasterCard" && mastercardLogo))} style={{width: 24, height: 24, borderRadius: 12}} /></View>
            <Text style={[c_style.AgInputText, style.FBColor, { flex: 1, marginLeft: 4 }]}>
              {dataList[0].symbol || `**** **** **** ${dataList[0].cardNumber?.slice(-4)}`}
            </Text>
          </>
        )}
        {selectedValue !== undefined && selectedValue !== -1 && (
          <>
            <View style={{overflow: 'hidden'}}><Image source={dataList[selectedValue].logo || ((dataList[selectedValue].type === "Visa" && visacardLogo) || (dataList[selectedValue].type === "MasterCard" && mastercardLogo))} style={{width: 24, height: 24, borderRadius: 12}} /></View>
            <Text style={[c_style.AgInputText, style.FBColor, { flex: 1, marginLeft: 4 }]}>
              {dataList[selectedValue].symbol || `**** **** **** ${dataList[selectedValue].cardNumber?.slice(-4)}`}
            </Text>
          </>
        )}
        <Image source={icon_select_arrow_down} style={styles.ArrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SelectContainer: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 10,
  },
  ArrowIcon: {
    margin: 4,
    height: 16,
    width: 16,
  },
});

export default SelectInput;