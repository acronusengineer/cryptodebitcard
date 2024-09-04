import { 
    StyleSheet, 
    View
} from 'react-native';
import React, { useCallback, useImperativeHandle, useState } from 'react';

// import bg_blur from "../../assets/images/card/bg-blur.png";

type ModalProps = {
    children?: React.ReactNode;
};

export type ModalRefProps = {
    show: () => void;
    hide: () => void;
};

const Modal = React.forwardRef<ModalRefProps, ModalProps>(
    ({ children }, ref) => {
        const [ active, setActive ] = useState(false);

        const show = useCallback(() => {
            setActive(true);
        }, []);

        const hide = useCallback(() => {
            setActive(false);
        }, []);

        useImperativeHandle(ref, () => ({ show, hide }), [
            show,
            hide
        ]);

        return (
            <>
                {
                    active && 
                    <View style={styles.bottomSheetModalContainer}>
                        {children}
                    </View>
                }
            </>
        );
    }
);

const styles = StyleSheet.create({
    bottomSheetModalContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0, 
        backgroundColor: '#0000004D',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});

export default Modal;