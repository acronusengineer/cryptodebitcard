import { FC, useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import GetStyle from "../styles";
interface Props {
  title: string;
  suppressDoublePress?: boolean;
  enabled?: boolean;
  btn: string;
  onPress?: () => void;
}

export const SolidButton: FC<Props> = ({
  title,
  onPress,
  enabled = true,
  btn = 'primary',
  suppressDoublePress = true,
}) => {
  const style = GetStyle();
  const [disabled, setDisabled] = useState(!enabled);
  const [btnStyle, setBtnStyle] = useState([style.BContainer]);
  const [fontColor, setFontColor] = useState([style.FSizeP]);

  const preventDoublePressed = useCallback(() => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(!enabled);
    }, 600);
  }, [setDisabled]);

  
  useEffect(() => {
    setDisabled(!enabled);
  }, [enabled]);
  
 useEffect(()=>{
    let clonedStyle = btnStyle.slice(0);
    let cloneFont = fontColor.slice(0);
    if(btn=="primary"){
      clonedStyle.push(style.BPColor as any);
      cloneFont.push(style.FWColor as any);
    }else if(btn == "secondary"){
      cloneFont.push(style.FPColor as any)
      clonedStyle.push(style.BSColor as any)
    }else if(btn == "disable"){
      clonedStyle.push(style.BDColor as any);
      cloneFont.push(style.FWColor as any);
    }
    setFontColor(cloneFont)
    setBtnStyle(clonedStyle)
  },[btn])
  return (
    <TouchableOpacity
      disabled={disabled}
      style={btnStyle}
      onPress={() => {
        if (suppressDoublePress) {
          preventDoublePressed();
        }
        if (onPress && !disabled) onPress();
      }}
    >
      <Text style={fontColor}> 
        {title}
      </Text>
    </TouchableOpacity>
  );
};
