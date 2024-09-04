"use strict";

import { Platform, StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { themeState } from "../states/appState";

const lightTheme = StyleSheet.create({
  WBContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  OrgContainer: {
    backgroundColor: "#fff",
  },
  FBColor: {
    color: "#000000",
  },
  MainRBText: {
    color: "#000000",
    backgroundColor: "#fff",
  },
  ImageBg: {
    backgroundColor: "#fff",
  },
  FBGActive: {
    backgroundColor: "#9E9E9E",
  },
  BDColor: {
    // Button Disabled Color
    backgroundColor: "#9E9E9E",
  },
  InputBGColor: {
    backgroundColor: "#F7F7F7"
  },
  SContainer: {
    backgroundColor: "#F7F7F7"
  },
  BSColor: {
    // Button Secondray Color
    backgroundColor: "#FFF5EF",
  }
});
const darkTheme = StyleSheet.create({
  WBContainer: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  OrgContainer: {
    backgroundColor: "#1c1c1c",
  },
  FBColor: {
    color: "#fff",
  },
  MainRBText: {
    color: "#fff",
    backgroundColor: "#000",
  },
  FBGActive: {
    backgroundColor: "#2E2A2A",
  },
  ImageBg: {
    backgroundColor: "#2E2A2A",
  },
  BDColor: {
    // Button Disabled Color
    backgroundColor: "#BAB9B9",
  },
  InputBGColor: {
    backgroundColor: "#000000"
  },
  SContainer: {
    backgroundColor: "#000000"
  },
  BSColor: {
    // Button Secondray Color
    backgroundColor: "#513E31",
  }
});

const style = StyleSheet.create({
  action: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 22,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  WBContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  HContainer: {
    //Header container
    height: 50,
    justifyContent: "space-between",
  },
  BContainer: {
    // ?? Container
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    height: 54,
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    marginTop: 20,
  },
  CContainer: {
    // Content Container
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  TContainer: {
    // Top Container
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  VContainer: {
    // Vertical Continer
    flexDirection: "row",
    alignContent: "space-between",
  },
  /** Containers */

  /** Font Size */
  FSizeP: {
    //Button Font Szie
    fontSize: 16,
    fontFamily: "Nunito",
  },
  FSizeButton: {
    fontSize: 16,
    fontFamily: "Nunito",
    fontWeight: "bold",
  },
  FSizeH1: {
    // Title Font Size H1
    fontSize: 32,
    fontFamily: "Nunito",
    fontWeight: "bold",
  },
  FBold: {
    // Font Bold
    fontWeight: "bold",
  },
  FSizeH5: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
  /** Font Size */

  /**  Font Colors */
  FBColor: {
    // Font Black Color
    color: "#000000",
  },
  FGColor: {
    // Font Gray Color
    color: "#9E9E9E",
  },
  FWColor: {
    // Font White Color
    color: "#ffffff",
  }, // Font Primary Color
  FPColor: {
    color: "#F7873C",
  },
  /**  Font Colors */

  /**  Margins */
  MTop20: {
    // Margin Top 20
    marginTop: 20,
  },
  MLeft20: {
    marginLeft: 20,
  },
  MV20: {
    marginVertical: 20,
  },
  PTop40: {
    paddingTop: 40,
  },
  Padding5: {
    padding: 5,
  },
  Margin20: {
    margin: 20,
  },
  Bottom: {
    position: "absolute",
    bottom: 0,
  },
  Padding20: {
    padding: 20,
  },
  /**  Margins */

  /** Button Colors */
  BPColor: {
    // Button Primary Color
    backgroundColor: "#F7873C",
  },
  BFColor: {
    // Button Focused Color
    backgroundColor: "#F9B180",
  },
  shadowProp: {
    // Button Drop Shawdow
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  /** Button Colors */

  IField: {
    // Input Field
    fontSize: 16,
    width: "100%",
    color: "#000000",
  },

  /**  Layout Flex */
  FLayout: {
    width: "100%",
    height: "100%",
  },
  FBase1: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 1,
  },
  FBase2: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 2,
  },
  FBase3: {
    flexGrow: 3,
    flexShrink: 3,
    flexBasis: 3,
  },
  FBase4: {
    flexGrow: 4,
    flexShrink: 4,
    flexBasis: 4,
  },
  FBase5: {
    flexGrow: 5,
    flexShrink: 5,
    flexBasis: 5,
  },
  Flex1: {
    // Flex 1 in Layout
    flex: 1,
  },
  Flex2: {
    // Flex 2 in Layout
    flex: 2,
  },
  Flex3: {
    // Flex 3 in Layout
    flex: 3,
  },
  Flex4: {
    // Flex 4 in Layout
    flex: 4,
  },
  Flex5: {
    // Flex 5 in Layout
    flex: 5,
  },
  Flex6: {
    // Flex 6 in Layout
    flex: 6,
  },
  Flex7: {
    // Flex 7 in Layout
    flex: 7,
  },
  Flex8: {
    // Flex 8 in Layout
    flex: 8,
  },
  /**  Layout Flex */

  /** Content Align */
  TACenter: {
    // Align Center
    justifyContent: "center",
    alignItems: "center",
  },
  TLCenter: {
    // Align Left
    justifyContent: "flex-end",
    alignItems: "center",
  },
  /** Content Align */
  
  backButton: {
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

const GetStyle = () => {
  const theme = useRecoilValue(themeState);
  const insets = useSafeAreaInsets();
  const common = StyleSheet.create({
    top: {
      paddingTop: insets.top,
      height: 44 + insets.top,
    },
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  if (theme === "dark") {
    return {
      ...common,
      ...style,
      ...darkTheme,
    };
  } else {
    return {
      ...common,
      ...style,
      ...lightTheme,
    };
  }
};
export default GetStyle;
