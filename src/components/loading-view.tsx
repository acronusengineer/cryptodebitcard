import { ActivityIndicator, View } from "react-native";

export const LoadingView = () => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        zIndex: 10000,
        backgroundColor: '#ffffff',
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};
