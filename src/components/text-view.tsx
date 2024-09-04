import {
  Text,
  View,
} from "react-native";
import GetStyle from "../styles/index";

export const TextView = (props: any) => {
  const style = GetStyle();
  
  return (
    <View style={props.style}>
        <Text style={[style.FBColor, style.FBold, style.FSizeH1]}>{props.title}</Text>
        <Text style={[style.FGColor, style.FSizeP]}>
            {props.details}
        </Text>
    </View>
  );
};
