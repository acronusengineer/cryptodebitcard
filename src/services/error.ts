import { Alert } from "react-native";
import storage from "../utils/storage";

export const onApiError = async (err: any) => {
  const alertShown = await storage.get("err-alert-shown");
  if (!alertShown) {
    storage.set("err-alert-shown", "true");
    Alert.alert(
      err.message === "Network Error" ? err.message : "Axios Error",
      err.message === "Network Error"
        ? "You are not connected to internet. Please check your network and try again."
        : err.message,
      [
        {
          text: "Ok",
          onPress: async () => {
            await storage.remove("err-alert-shown");
          },
          style: "cancel",
        },
      ]
    );
  }
  return Promise.reject(err);
};
