import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  Image,
  TouchableOpacity,
} from "react-native";
import GetStyle from "../../styles";
import c_style from "../../styles/card";

import icon_input_show from "../../assets/images/card/icon_input_show.png";
import icon_input_hide from "../../assets/images/card/icon_input_hide.png";
import icon_input_clear from "../../assets/images/card/icon_input_clear.png";
import icon_calendar from "../../assets/images/card/icon_calendar.png";
import icon_input_error from "../../assets/images/card/icon_input_error.png";
import icon_input_camera from "../../assets/images/card/icon_input_camera.png";
import DatePicker from "react-native-date-picker";
import { dateFormat } from "../../utils/helper";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";

function getDateString(date: Date) {
  return dateFormat("YYYY-MM-DD", date);
}
interface Props extends TextInputProps {
  title?: string,
  error?: string;
  containerStyle?: any;
  datePicker?: boolean;
  disabled?: boolean;
  enableClear?: boolean;
  onClear?: () => void;
  onPaste?: () => void;
  onCamera?: () => void;
  onMax?: () => void;
  onShow?: (state: boolean) => void;
  onChangeText?: (text: string) => void;
}

export const InputField: FC<Props> = ({
  title = "",
  error = "",
  containerStyle,
  datePicker = false,
  disabled = false,
  enableClear = true,
  onClear,
  onShow,
  onChangeText,
  onPaste,
  onCamera,
  onMax,
  ...props
}) => {
  const theme = useRecoilValue(themeState);
  const style = GetStyle();
  const [passwordVisibility, setPasswordVisibility] = useState(
    props.textContentType == "password" ? true : false
  );
  const [text, setText] = useState(props.value);
  const [focused, setFocused] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onPressShowHide = () => {
    setPasswordVisibility(!passwordVisibility);
    if (onShow) onShow(passwordVisibility);
  };

  const onPressClear = () => {
    onChange("");
    if (onClear) onClear();
  };

  const onChange = (value: string) => {
    setText(value);
    if (onChangeText) onChangeText(value);
  };

  const onPressDate = () => {
    if (!disabled) setOpenDatePicker(true);
  };

  const onPressPaste = () => {
    if(onPaste) onPaste();
  };

  const onPressCamera = () => {
    if (onCamera) onCamera();
  }

  const onPressMax = () => {
    if (onMax) onMax();
  }

  return (
    <>
      <View style={{flexDirection: "column"}}>
        {!!title && <Text style={[c_style.AgCaption, { color: "#9E9E9E", marginLeft: 10 }]}>
          {title}
        </Text>}
        
        <View
          style={[
            styles.InputContainer,
            {
              backgroundColor:
                theme === "dark" ? (focused ? "#2E2A2A" : "#000") : "#f7f7f7",
            },
            containerStyle,
            error && styles.InputContainerError,
            disabled && styles.InputContainerDisabled,
          ]}
        >
          {datePicker ? (
            <TextInput
              {...props}
              secureTextEntry={passwordVisibility}
              style={[
                c_style.AgInputText,
                {
                  flex: 1,
                  padding: 0,
                  color: theme === "dark" ? "#fff" : "#000",
                },
              ]}
              placeholderTextColor="#9E9E9E"
              onFocus={(_) => {
                setFocused(true);
              }}
              onBlur={(_) => {
                setFocused(false);
              }}
              onPressIn={onPressDate}
              value={text}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          ) : (
            <TextInput
              {...props}
              secureTextEntry={passwordVisibility}
              style={[
                c_style.AgInputText,
                {
                  flex: 1,
                  padding: 0,
                  color: theme === "dark" ? "#fff" : "#000",
                },
              ]}
              onFocus={(_) => {
                setFocused(true);
              }}
              onBlur={(_) => {
                setFocused(false);
              }}
              placeholderTextColor="#9E9E9E"
              editable={!disabled}
              onChangeText={(value) => {                
                onChange(value);
              }}
            />
          )}

          {text && text.length > 0 && !disabled && enableClear && (
            <TouchableOpacity onPress={onPressClear}>
              <Image source={icon_input_clear} style={styles.InputIcon} />
            </TouchableOpacity>
          )}
          {props.textContentType == "password" && !disabled && (
            <TouchableOpacity onPress={onPressShowHide}>
              <Image
                source={passwordVisibility ? icon_input_show : icon_input_hide}
                style={styles.InputIcon}
              />
            </TouchableOpacity>
          )}
          {datePicker && (
            <TouchableOpacity onPress={onPressDate}>
              <Image source={icon_calendar} style={styles.InputIcon} />
            </TouchableOpacity>
          )}
          {onPaste && (
            <TouchableOpacity onPress={onPressPaste} style={{marginRight: 8}}>
              <Text style={[c_style.AgCaption, style.FPColor]}>Paste</Text>
            </TouchableOpacity>
          )}
          {onMax && (
            <TouchableOpacity onPress={onPressMax} style={{marginRight: 3}}>
              <Text style={[c_style.AgCaption, style.FPColor]}>MAX</Text>
            </TouchableOpacity>
          )}
          {onCamera && (
            <TouchableOpacity onPress={onPressCamera} style={{marginRight: 3}}>
            <Image source={icon_input_camera} style={styles.InputIcon} />
            </TouchableOpacity>
          )}
        </View>
        {error && error.length > 0 ? (
          <View
            style={{
              paddingHorizontal: 0,
              flexDirection: "row",
              height: 24,
              paddingVertical: 2,
            }}
          >
            <Image
              source={icon_input_error}
              style={{ width: 12, height: 12, marginTop: 3 }}
            />
            <Text style={[c_style.AgCaption, { color: "#F62323", marginLeft: 3 }]}>
              {error}
            </Text>
          </View>
        ) : (
          <View style={{ height: 16 }}></View>
        )}
      </View>
      <DatePicker
        modal
        open={openDatePicker}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpenDatePicker(false);
          setDate(date);
          let value = getDateString(date);
          onChange(value);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    height: 45,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 10,
  },
  InputContainerDisabled: {
    backgroundColor: "#9E9E9E4D",
  },
  InputContainerError: {
    borderWidth: 0.5,
    borderColor: "red",
  },
  InputIcon: {
    margin: 4,
    height: 16,
    width: 16,
  },
});
