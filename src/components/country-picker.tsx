import React, { FC, useEffect, useState } from "react";
import { Modal, FlatList, SafeAreaView, View } from "react-native";
import { Country } from "../models/codego";
import { CountryItem } from "./country-item";
import { PageHeader } from "./page-header";
import { CodegoCountries } from "../services/codego/constant";
import { InputField } from "./card/InputField";
import GetStyle from "../styles";

interface Props {
  onPress: (v?: Country) => void;
  selected?: string;
  open: boolean;
  showPhone?: boolean;
}

export const CountryPickerModal: FC<Props> = ({
  onPress,
  open,
  selected,
  showPhone,
}) => {
  const style = GetStyle();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(CodegoCountries);

  useEffect(() => {
    setCountries(
      CodegoCountries.filter((x) =>
        x.country_name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  }, [search]);
  return (
    <Modal
      visible={open}
      style={{ margin: 0, backgroundColor: "#fff" }}
      presentationStyle={"fullScreen"}
    >
      <SafeAreaView style={[style.WBContainer]}>
        <PageHeader
          count={5}
          active={0}
          title={showPhone ? "Choose code of the country" : "Choose country"}
          onBack={() => {
            onPress();
          }}
        />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
            height: 55,
          }}
        >
          <InputField
            placeholder="Search..."
            value={search}
            onChangeText={(v) => setSearch(v)}
          ></InputField>
        </View>
        <FlatList
          data={countries}
          renderItem={({ item, index }) => (
            <View key={index}>
              <CountryItem
                showPhone={showPhone}
                country={item}
                onPress={() => onPress(item)}
                active={selected === item.country_code}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};
