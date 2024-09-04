import { Text } from "react-native";

interface Props {
  flag: string;
  size?: number;
}
const CountryFlag = (props: Props) => {
  const { flag, size } = props;

  return <Text style={{ fontSize: size || 35 }}>{flag}</Text>;
};
export default CountryFlag;
