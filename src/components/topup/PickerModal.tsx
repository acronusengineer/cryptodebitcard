import React, { FC, useState } from "react";
import { Modal, FlatList, SafeAreaView, View, Text } from "react-native";

import { PickerItem } from "./PickerItem";
import { BackButton } from "../card/BackButton";
import GetStyle from "../../styles";
import { Button } from "../../components/card/Button";

interface Props {
  onPress: (i?: number) => void;
  selectedIndex?: number;
  open: boolean;
  data: any;
  title: string;
  showName?: boolean;
  onPressNewCard? : () => void
}

export const PickerModal: FC<Props> = ({
  onPress,
  open,
  selectedIndex,
  data,
  title,
  showName = false,
  onPressNewCard
}) => {
  const [dataState] = useState(data);
  const style = GetStyle();
  return (
    <Modal
      visible={open}
      style={{ backgroundColor: "#fff" }}
      presentationStyle={"fullScreen"}
    >
      <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
        <View style={[style.VContainer, {paddingHorizontal: 24 }]}>
          <View style={[style.FBase1, {marginBottom: 16}]}>
            <BackButton 
              onPress={() => onPress()}
            />
          </View>
          <View style={style.FBase5}>
            {title && (<Text style={[style.FSizeButton, style.FBColor, {paddingTop: 5, paddingRight: 50, textAlign: "center"}]}>{title}</Text>)}
          </View>
        </View>
        <FlatList
          data={dataState}
          renderItem={({ item, index }) => (
            <View key={index} style={{paddingHorizontal: 22}}>
              <PickerItem
                showName={showName}
                item={item}
                onPress={() => onPress(index)}
                active={selectedIndex === index}
              />
            </View>
          )}
        />
        <View style={{ flex: 1 }} />
        {onPressNewCard && 
          <View
            style={{ marginBottom: 45, marginHorizontal: 22 }}
          >
            <Button
              btn="secondary"
              title="Add new card"
              onPress={onPressNewCard}
            />
          </View>
        }
      </SafeAreaView>
    </Modal>
  );
};
