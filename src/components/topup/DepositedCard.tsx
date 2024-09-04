import { View, Image, Text } from "react-native";
import c_style from "../../styles/card";
import CardOpened from "../../assets/images/card_opened.png";
import GetStyle from "../../styles";

interface Props {
    cardName: string,
    cardNumber: string,
    balanceSXP: number,
    balanceUSD: number
}

const DepositedCard = (props: Props) => {
  const style = GetStyle();
  const { cardName, cardNumber, balanceSXP, balanceUSD } = props;

  return (
    <View style={[style.SContainer, {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16
    }]}>
      <View style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      }}>
        <Image source={CardOpened} style={{width: 37, height: 25.57, marginRight: 8}} />
        <View style={{flexDirection: "column"}}>
          <Text style={[c_style.AgH4, style.FBColor]}>
            {cardName}
          </Text>
          <Text style={[c_style.AgCaption, style.FBColor]}>
            {cardNumber}
          </Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', marginVertical: 8 }} />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Text style={[c_style.AgH5, style.FBColor]}>Balance:</Text>
        <View style={{
          flexDirection: "column",
        }}>
          <Text style={[c_style.AgP, style.FBColor]}>${balanceUSD}</Text>
          <Text style={[c_style.AgCaption, style.FGColor]}>{balanceSXP} SXP</Text>
        </View>
      </View>
    </View>

  );
};

export default DepositedCard;