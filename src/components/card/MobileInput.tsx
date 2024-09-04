import { FC, SetStateAction, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import style from "../../styles/card";
import Modal from "react-native-modal";

import icon_list_check from "../../assets/images/card/icon_list_check.png"
import { InputField } from "./InputField";

import flag_austria from "../../assets/images/card/flag_austria.png";
import flag_belgium from "../../assets/images/card/flag_belgium.png";
import flag_bosnis from "../../assets/images/card/flag_bosnis.png";
import flag_bulgaria from "../../assets/images/card/flag_bulgaria.png";
import flag_croatia from "../../assets/images/card/flag_croatia.png";
import flag_czech from "../../assets/images/card/flag_czech.png";
import flag_denmark from "../../assets/images/card/flag_denmark.png";
import flag_britain from "../../assets/images/card/flag_britain.png";
import flag_greece from "../../assets/images/card/flag_greece.png";
import flag_italy from "../../assets/images/card/flag_italy.png";

import { BackButton } from "./BackButton";


const countryList = [
    {
        flag: flag_austria,
        name: 'Austria',
        code: '+380'
    },
    {
        flag: flag_belgium,
        name: 'Belgium',
        code: '+32'
    },
    {
        flag: flag_bosnis,
        name: 'Bosnis',
        code: '+387'
    },
    {
        flag: flag_bulgaria,
        name: 'Bulgaria',
        code: '+39'
    },
    {
        flag: flag_croatia,
        name: 'Croatia',
        code: '+385'
    },
    {
        flag: flag_czech,
        name: 'Czech Republic',
        code: '+420'
    },
    {
        flag: flag_denmark,
        name: 'Denmark',
        code: '+22'
    },
    {
        flag: flag_britain,
        name: 'Great Britain',
        code: '+32'
    },
    {
        flag: flag_greece,
        name: 'Greece',
        code: '+42'
    },
    {
        flag: flag_italy,
        name: 'Italy',
        code: '+32'
    },
]

interface Props {
    error?: string;
    title: string;
    containerStyle?: any;
    value?: number,
    placeholder: string,
    disabled?: boolean,
    onChange? : (value: any) => void;
}

export const MobileInput: FC<Props> = ({ 
    title,
    containerStyle,
    disabled = false,
    onChange,
    //error = '', 
    //value = -1,
    placeholder }) => {

    const [ selectedCountry, setSelectedCountry ] = useState({
        flag: flag_austria,
        name: 'Austria',
        code: '+380'
    });
    const [ mobile, setMobile ] = useState('');
    const [ showModal, setShowModal ] = useState(false);

    const onPressSelect = () => {
        setShowModal(true);
    }

    const onPressOption = (val: SetStateAction<{ flag: any; name: string; code: string; }>) => {
        setSelectedCountry(val);
    }

    useEffect(() => {
        let mobile_number = selectedCountry.code + ' ' + mobile;
        if (onChange) onChange(mobile_number);
    }, [mobile, selectedCountry])

    return (
        <>
            <View style={[{ flexDirection: 'row', width: '100%' }, containerStyle]}>
                <TouchableOpacity
                    onPress={onPressSelect}
                    style={styles.CountryPickerContainer}
                >
                    <Image source={selectedCountry.flag} style={{ width: 18, height: 18}}/>
                    <Text style={[ style.AgInputText, { color: '#000', marginLeft: 2 }]}>{selectedCountry.code}</Text>
                </TouchableOpacity>
                <InputField
                    value={mobile}
                    placeholder={placeholder}
                    keyboardType="numeric"
                    containerStyle={{ flex: 1, marginLeft: 5 }}
                    onChangeText={(text) => {
                        setMobile(text);
                    }}
                />
            </View>
            <Modal
                style={{ justifyContent: 'flex-end', margin: 0 }}
                isVisible={showModal && !disabled}
            >
                <View style={styles.SelectModalContainer}>
                    <View style={{ marginTop: 7, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', height: 42 }}>
                        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[ style.AgH4, { color: '#000' }]}>{title}</Text>
                        </View>
                        <BackButton
                            onPress={() => {
                                setShowModal(false);
                            }}
                        />
                    </View>                    
                    <ScrollView style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                    {
                        countryList.map((country, index) => {
                            return (
                                <TouchableOpacity style={[styles.SelectOptionContainer, { marginTop: 10 }, country.name == selectedCountry.name && { backgroundColor: '#EBEBEB' }]} key={index}
                                    onPress={() => {
                                        onPressOption(country)
                                        setShowModal(false);
                                    }}
                                >
                                    <Image source={country.flag} style={{ width: 40, height: 40 }}/>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={[style.AgH5, { color: '#000' }]}>{country.name}</Text>
                                        <Text style={[style.AgInputText, { color: '#9E9E9E' }]}>{country.code}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}/>
                                    {
                                        country.name == selectedCountry.name && 
                                        <Image source={icon_list_check} style={{ width: 24, height: 24 }}/>
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    CountryPickerContainer: {
        height: 45,
        minWidth: 80,
        borderRadius: 30,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 12,
        alignItems: 'center',
        flexDirection: 'row'
    },
    SelectModalContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        top: 20,
        bottom: 0,
        left: 0,
        right: 0,
    },
    SelectOptionContainer: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    }
});
