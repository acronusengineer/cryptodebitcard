import { Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRecoilValue } from "recoil";
import { themeState } from "../../states/appState";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  setTranslateY: (translateY: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const theme = useRecoilValue(themeState);
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const [minTranslateY, setMinTranslateY] = useState(0);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const setTranslateY = useCallback((destination: number) => {
      translateY.value = destination;
      setMinTranslateY(destination);
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive, setTranslateY }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        translateY.value = Math.min(translateY.value, minTranslateY);
      })
      .onEnd(() => {
        if (translateY.value > (-SCREEN_HEIGHT * 2) / 3) {
          scrollTo(minTranslateY);
        } else {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        shadowColor: "#929292",
        shadowOffset: { width: 0, height: 0 },
        elevation: 30,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              backgroundColor: theme === "dark" ? "#1c1c1c" : "#fff",
            },
            rBottomSheetStyle,
          ]}
        >
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderTopWidth: 1,
    borderColor: '#92929292',
    height: SCREEN_HEIGHT,
    width: "100%",
    position: "absolute",
    top: SCREEN_HEIGHT,
  },
  line: {
    width: 48,
    height: 6,
    backgroundColor: "#EAEAEA",
    alignSelf: "center",
    marginVertical: 14,
    borderRadius: 3,
  },
});

export default BottomSheet;
