import { FC } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import style from "../../styles/card";
import commonStyle from "../../styles";
import Modal from "react-native-modal";

interface Props {
  title: string;
  data: { title: string; value: number }[];
  isShow?: boolean;
  onSelect?: (value: any) => void;
  setShowModal?: (value: boolean) => void;
}

export const ChooseModal: FC<Props> = ({
  title,
  isShow = true,
  onSelect,
  data,
  setShowModal,
}) => {
  const cStyle = commonStyle();

  const onPressOption = (val: number) => {
    if (onSelect) onSelect(val);    
  };

  return (
    <>
      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        isVisible={isShow}
        onBackdropPress={()=>{
          if (setShowModal) setShowModal(false);
        }}
      >
        <View style={[styles.SelectModalContainer, cStyle.OrgContainer]}>
          <View style={styles.line} />
          <Text style={[style.AgSpan, cStyle.FBColor]}>{title}</Text>
          {data.map((option, index) => {
            return (
              <TouchableOpacity
                style={[styles.SelectOptionContainer, cStyle.MainRBText, { marginTop: 5 }]}
                key={index}
                onPress={() => {
                  onPressOption(option.value);
                }}
              >
                <Text style={[style.AgH5, cStyle.FBColor]}>
                  {option.title}
                </Text>
                <View style={{ flex: 1 }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({  
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
