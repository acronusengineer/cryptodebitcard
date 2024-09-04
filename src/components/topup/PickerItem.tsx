import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { themeState } from "../../states/appState";
import checkIcon from "../../assets/icons/check.png";
import CoinLogo from "../coin-logo";
import GetStyle from "../../styles";
import mastercardLogo from "../../assets/images/card/mastercard.png";
import visacardLogo from "../../assets/images/card/visacard.png";

interface Props {
  onPress: () => void;
  active: boolean;
  item: any;
  showName: boolean;
}
export const PickerItem = (props: Props) => {
  const { active, item, showName = false, onPress } = props;
  const style = GetStyle();
  const [theme] = useRecoilState(themeState);
  return (
    <View style={[style.InputBGColor, styles.container, active ? (theme === "light" ? styles.activeColor : styles.activeColor_black_mode) : {}]}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          onPress();
        }}
      >
        <View style={style.VContainer}>
          <View style={style.FBase1}>
            <View style={{ marginLeft: 15 }}>
              { item.logo ? <CoinLogo logo={item.logo} /> : (
                <>
                  {item?.type === "Visa" && <CoinLogo logo={visacardLogo} />}
                  {item?.type === "MasterCard" && <CoinLogo logo={mastercardLogo} />}
                </>
              ) }
            </View>
          </View>
          <View style={style.FBase4}>
            {showName ? (
              <View style={{ marginLeft: 15 }}>
                <Text style={[(theme === "light" ? style.FBColor : style.FWColor), style.FSizeH5]}>
                  {item.symbol || `**** **** **** ${item.cardNumber?.slice(-4)}`}
                </Text>
                <Text style={[ style.FBColor ]}>{item.name || item.expirationDate!}</Text>
              </View>
              ) : (
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 12,
                  }}
                >
                  <Text style={[(theme === "light" ? style.FBColor : style.FWColor), style.FSizeH5]}>
                    {item.symbol || `**** **** **** ${item.cardNumber?.slice(-4)}`}
                  </Text>
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
    backgroundColor: "#EBEBEB",
  },
  activeColor_black_mode: {
    backgroundColor: "#2E2A2A",
  },
});
