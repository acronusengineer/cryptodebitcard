import { FC } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";
import GetStyle from "../../styles";
import arrowLeft from "../../assets/images/arrowleft.png";

interface Props {
  onPress?: () => void;
}

export const BackButton: FC<Props> = ({ onPress }) => {
  const style = GetStyle();
  const theme = useRecoilValue(themeState);
  return (
    <TouchableOpacity
        style={[style.backButton, {backgroundColor: theme === 'dark' ? '#513E31' : '#FFF5EF'}]}
      onPress={onPress}
    >
      <Image source={arrowLeft} />
    </TouchableOpacity>
  );
};
