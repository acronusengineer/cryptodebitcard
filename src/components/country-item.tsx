import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import checkIcon from "../assets/icons/check.png";
import CountryFlag from "./country-flag";
import { Country } from "../models/codego";
import GetStyle from "../styles";

interface Props {
  onPress: () => void;
  active: boolean;
  country: Country;
  showPhone?: boolean;
}
export const CountryItem = (props: Props) => {
  const style = GetStyle();
  const { active, country, showPhone, onPress } = props;

  return (
    <View style={[styles.container, style.MainRBText, active ? style.FBGActive : {}]}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          onPress();
        }}
      >
        <View style={style.VContainer}>
          <View style={style.FBase1}>
            <View style={{ marginLeft: 15 }}>
              <CountryFlag flag={country.flag!} />
            </View>
          </View>
          <View style={style.FBase5}>
            {showPhone ? (
              <View style={{ marginLeft: 15 }}>
                <Text style={[style.FSizeH5, style.FBColor]}>
                  {country.country_name}
                </Text>
                <Text style={style.FBColor}>+{country.phonecode}</Text>
              </View>
            ) : (
              <View
                style={{
                  marginLeft: 15,
                  marginTop: 12,
                }}
              >
                <Text style={style.FBColor}>{country.country_name}</Text>
              </View>
            )}
          </View>
          <View style={[style.FBase1, { paddingTop: 10 }]}>
            {active && <Image source={checkIcon} />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    color: "#000000",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  activeColor: {
    backgroundColor: "#9E9E9E",
  },
});
