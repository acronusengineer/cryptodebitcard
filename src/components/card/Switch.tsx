import { FC, useEffect, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import switch_on from "../../assets/images/card/switch_on.png";
import switch_off from "../../assets/images/card/switch_off.png";

interface Props {
  value: boolean;
  enabled?: boolean;
  onChange?: (value: boolean) => void;
  containerStyle?: any;
}

export const Switch: FC<Props> = ({
  value,
  onChange,
  enabled = true,
  containerStyle,
}) => {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const onSwitch = () => {
    if (enabled && onChange) onChange(!checked);
    //setChecked(!checked);
  };

  return (
    <View style={[styles.SwitchContainer, containerStyle]}>
      <TouchableOpacity onPress={onSwitch}>
        <Image
          source={checked ? switch_on : switch_off}
          style={{ width: 40, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SwitchContainer: {
    width: 40,
    height: 24,
  },
});
