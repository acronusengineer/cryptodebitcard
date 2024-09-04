import { FC, useCallback, useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import c_style from "../../styles/card";

interface Props {
  suppressDoublePress?: boolean;
  enabled?: boolean;
  style?: any;
  source: any;
  onPress?: () => void;
}

export const ImageButton: FC<Props> = ({
  onPress,
  enabled = true,
  style,
  source,
  suppressDoublePress = true,
}) => {
  const [disabled, setDisabled] = useState(!enabled);
  const preventDoublePressed = useCallback(() => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(!enabled);
    }, 600);
  }, [setDisabled]);

  useEffect(() => {
    setDisabled(!enabled);
  }, [enabled]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[c_style.ImageButton, style]}
      onPress={() => {
        if (suppressDoublePress) {
          preventDoublePressed();
        }
        if (onPress && !disabled) onPress();
      }}
    >
      <Image source={source} style={{ width: "100%", height: "100%" }} />
    </TouchableOpacity>
  );
};
