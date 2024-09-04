'use strict'

import { StyleSheet } from 'react-native';
const style = StyleSheet.create({
    // Text Style
    AgH1: {
        fontSize: 32,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    AgH2: {
        fontSize: 26,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    AgH3: {
        fontSize: 20,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    AgH4: {
        fontSize: 16,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    AgH5: {
        fontSize: 14,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    AgCaption: {
        fontFamily: 'Nunito',
        fontSize: 12
    },
    AgButton: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: 'bold'
    },
    AgInputText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        fontWeight: '600'
    },
    AgSpan: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: '500'
    },
    AgP: {
        fontFamily: 'Nunito',
        fontSize: 16,
    },
    AgTransaction: {
        fontFamily: 'Nunito',
        fontSize: 48,
        fontWeight: 'bold'
    },

    FontSF1: {
        fontFamily: 'SFProtext',
        fontSize: 17,
    },

    FontSF2: {
        fontFamily: 'SFProtext',
        fontSize: 11,
    },

    Cheader: {
        marginTop: 20,
        marginBottom: 20,
        height: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Fheader: {
        marginVertical: 24,
        height: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderUserStatus: {
        height: 24,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12
    },

    // Default Image Button
    ImageButton: {
        width: 32,
        height: 32
    },

    // Card
    CardContainer: {
        width: '100%',
        height: undefined,
        aspectRatio: 327 / 211
    },
    UnBlockShadow: {
        shadowColor: '#F7873C55',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
    },
    UnBlockButton: {
        width: 144, 
        height: 37, 
        backgroundColor: 
        '#F7873C', 
        borderRadius: 100, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    // Dashboard
    ButtonsContainer: {
        height: 59,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ButtonDashboard: {
        width: 102,
        height: 59,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BottomSheetButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    SystemSecurityModal: {
        width: 327, 
        borderRadius: 30,
        marginBottom: 33,
        padding: 24,
        alignItems: 'center'
    },
    BottomSheetModal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        minHeight: 100,
        paddingBottom: 24,
        paddingHorizontal: 24
    },
    BottomSheetLine: {
        width: 48,
        height: 6,
        backgroundColor: '#EAEAEA',
        alignSelf: 'center',
        marginVertical: 14,
        borderRadius: 3,
    },

    // Currency Modal
    AddCurrencyModal: {
        position: 'absolute',
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        top: 60,
        bottom: 0,
        left: 0,
        right: 0,
    },
    CurrencyItem: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },

    // ID Card
    UploadButton: {
        height: 60,
        width: '100%',
        borderRadius: 16,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16
    },

    // Card Activation
    CardDetails: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default style;