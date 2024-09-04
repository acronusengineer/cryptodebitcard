import { FC, useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    TextStyle,
} from "react-native";

import { useRecoilState } from "recoil";
import { themeState } from "../../states/appState";
import style from "../../styles/card";
import DropShadow from "react-native-drop-shadow";

interface Props {
    btn: string;
    title: string;
    suppressDoublePress?: boolean;
    enabled?: boolean;
    onPress?: () => void;
    containerStyle?: any;
}

export const Button: FC<Props> = ({
    btn = 'primary',
    title,
    onPress,
    enabled = true,
    containerStyle,
    suppressDoublePress = false,
}) => {
    
    const [theme] = useRecoilState(themeState);
    const [ disabled, setDisabled ] = useState(!enabled);
    const [ buttonStyle, setButtonStyle ] = useState<StyleProp<ViewStyle>>([styles.Button]);
    const [ textStyle, setTextStyle ] = useState<StyleProp<TextStyle>>([]);
    const [ shadowStyle, setShadowStyle ] = useState<StyleProp<ViewStyle>>([]);

    const preventDoublePressed = useCallback(() => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(!enabled);
        }, 600);
    }, [setDisabled]);


    useEffect(() => {
        setDisabled(!enabled);
    }, [enabled]);

    useEffect(() => {
        if (disabled) {
            setButtonStyle([styles.Button, styles.ButtonDisabled]);
            setTextStyle([style.AgButton, styles.TextDisabled]);
            setShadowStyle([])
        } else if (btn == "primary") {
            setButtonStyle([styles.Button, styles.ButtonPrimary]);
            setTextStyle([style.AgButton, styles.TextPrimary]);
            setShadowStyle([styles.ButtonShadow])
        } else if (btn == "secondary") {
            setTextStyle([style.AgButton, styles.TextSecondary]);
            setShadowStyle([])
            if (theme === "light") {
                setButtonStyle([styles.Button, styles.ButtonSecondary]);
            } else {
                setButtonStyle([styles.Button, styles.ButtonSecondary_black_theme]);
            }
        } 
    }, [btn, disabled])

    return (
        <View style={[ styles.ButtonContainer, containerStyle ]}>
            <DropShadow style={shadowStyle}>
                <TouchableOpacity
                    disabled={disabled}
                    style={buttonStyle}
                    onPress={() => {
                        if (suppressDoublePress) {
                            preventDoublePressed();
                        }
                        if (onPress && !disabled) onPress();
                    }}
                >
                    <Text style={textStyle}>
                        {title}
                    </Text>
                </TouchableOpacity>
            </DropShadow>
        </View>
    );
};

const styles = StyleSheet.create({
    ButtonContainer: {
        width: '100%',
    },
    Button: {
        height: 54,
        width: '100%',
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonShadow: {
        shadowColor: '#F7873C5E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    ButtonPrimary: {
        backgroundColor: '#F7873C',
    },
    ButtonSecondary: {
        backgroundColor: '#FFF5EF'
    },
    ButtonSecondary_black_theme: {
        backgroundColor: "#513E31",
    },
    ButtonDisabled: {
        backgroundColor: '#9E9E9E',
        opacity: 0.3
    },
    TextPrimary: {
        color: 'white'
    },
    TextSecondary: {
        color: '#F7873C'
    },
    TextDisabled: {
        color: 'white'
    }
});