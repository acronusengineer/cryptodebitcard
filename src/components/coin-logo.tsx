import { Image, View } from "react-native";

interface Props {
  logo: any;
  size?: number;
}
const CountryFlag = (props: Props) => {
  const { logo, size = 40 } = props;
  
  return (
    <View style={{overflow: 'hidden'}}>
      <Image
        source={logo}
        style={{ width: size, height: size, borderRadius: size/2 }}
      />
    </View>
  )
};
export default CountryFlag;
