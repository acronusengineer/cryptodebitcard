import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import style from "../../styles/card";
import commonStyle from "../../styles";
import Modal from "react-native-modal";

import icon_list_check from "../../assets/images/card/icon_list_check.png";
import icon_select_arrow_down from "../../assets/images/card/icon_select_arrow_down.png";
import icon_input_error from "../../assets/images/card/icon_input_error.png";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";

interface Props {
  error?: string;
  title: string;
  containerStyle?: any;
  data: { title: string; value: number }[];
  value?: number;
  placeholder: string;
  disabled?: boolean;
  onSelect?: (value: any) => void;
}

export const Select: FC<Props> = ({
  title,
  error = "",
  containerStyle,
  onSelect,
  value = -1,
  data,
  disabled = false,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [showModal, setShowModal] = useState(false);
  const cStyle = commonStyle();
  const theme = useRecoilValue(themeState);
  const onPressSelect = () => {
    setShowModal(true);
  };

  const onPressOption = (val: number) => {
    setSelectedValue(val);
    if (onSelect) onSelect(val);
  };

  return (
    <>
      {!!title && <Text style={[style.AgCaption, { color: "#9E9E9E", marginLeft: 10, marginBottom: -20}]}>
          {title}
        </Text>}
      <TouchableOpacity onPress={onPressSelect}>
        <View
          style={[
            styles.SelectContainer,
            { backgroundColor: theme === "dark" ? "#000" : "#f7f7f7" },
            containerStyle,
            error && styles.SelectContainerError,
          ]}
        >
          {selectedValue == -1 && (
            <Text style={[style.AgInputText, { color: "#9E9E9E", flex: 1 }]}>
              {placeholder}
            </Text>
          )}
          {selectedValue != -1 && (
            <Text
              style={[
                style.AgInputText,
                { color: theme === "dark" ? "white" : "black", flex: 1 },
              ]}
            >
              {data[selectedValue].title}
            </Text>
          )}
          <Image source={icon_select_arrow_down} style={styles.ArrowIcon} />
        </View>
        {error && error.length > 0 && (
          <View style={{ paddingHorizontal: 16, flexDirection: "row" }}>
            <Image
              source={icon_input_error}
              style={{ width: 12, height: 12, marginTop: 3 }}
            />
            <Text
              style={[style.AgCaption, { color: "#F62323", marginLeft: 3 }]}
            >
              {error}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        isVisible={showModal && !disabled}
        onBackdropPress={()=>{
          setShowModal(false)
        }}
      >
        <View style={[styles.SelectModalContainer, cStyle.OrgContainer]}>
          <View style={styles.line} />
          <Text style={[style.AgSpan, cStyle.FBColor, { alignSelf: 'center'}]}>{placeholder}</Text>
          {data.map((option, index) => {
            return (
              <TouchableOpacity
                style={[styles.SelectOptionContainer, cStyle.MainRBText, { marginTop: 5 }]}
                key={index}
                onPress={() => {
                  onPressOption(option.value);
                  setShowModal(false);
                }}
              >
                <Text style={[style.AgH5, cStyle.FBColor]}>
                  {option.title}
                </Text>
                <View style={{ flex: 1 }} />
                {option.value == selectedValue && (
                  <Image
                    source={icon_list_check}
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  SelectContainer: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 10,
  },
  SelectContainerError: {
    borderWidth: 0.5,
    borderColor: "red",
    backgroundColor: "#FFF8F8",
  },
  ArrowIcon: {
    margin: 4,
    height: 16,
    width: 16,
  },
  SelectModalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 100,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  line: {
    width: 48,
    height: 6,
    backgroundColor: "#EAEAEA",
    alignSelf: "center",
    marginVertical: 14,
    borderRadius: 3,
  },
  SelectOptionContainer: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
