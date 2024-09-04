import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./auth/auth-navigator";
import AppNavigator from "./app-navigator";
import { firebase } from "@react-native-firebase/database";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cTokenState } from "../states/cTokenState";
import { AuthToken } from "../models/codego";
import { faceIDState, themeState } from "../states/appState";
import storage from "../utils/storage";
// import { countries } from "country-data-list";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // const [token, setAuthToken] = useRecoilState(cTokenState);
  const setAuthToken = useSetRecoilState(cTokenState);
  // const [updated, setUpdated] = useState(0);
  const setFaceID = useSetRecoilState(faceIDState);
  const [theme, setTheme] = useRecoilState(themeState);

  const token_ref = firebase.database().ref("/codego_token");

  useEffect(() => {
    SubscribeCAuth();
    LoadAppSettings();
    // const timer = setInterval(() => {
    //   setUpdated((x) => x + 1 < 65534 ? x + 1 : 0);
    // }, 60000);
    // return function () {
    //   clearInterval(timer);
    // };
  }, []);

  // useEffect(() => {
  //   if (updated > 0) {
  //     if (!token || token.timestamp < Date.now() - 15 * 60 * 1000) {
  //       GenerateNewToken();
  //     }
  //   }
  // }, [updated]);

  // useEffect(() => {
  //   if (token) {
  //     UpdateCodegoAxios(token?.auth_token);
  //     /*
  //     setTimeout(() => {
  //       LoadMetaData();
  //     }, 200);
  //     */
  //   }
  // }, [token]);

  /*
  const LoadMetaData = () => {
    const allCountries = countries.all;

    GetCountries().then((res) => {
      const all: Country[] = [];
      if (res && res.length > 0) {
        res.forEach((x) => {
          const c = allCountries.find(
            (c) => x.country_code === c.alpha2 && c.emoji && c.emoji.length > 0
          );
          if (!c) return;
          all.push({ ...x, flag: c.emoji! } as Country);
        });
      }
      console.tron.log(all);
    });
    GetNationalities().then((res) => {
      console.tron.log(res);
    });
    GetIncomeSources().then((res) => {
      console.tron.log(res);  
    });
  };
  */

  const LoadAppSettings = () => {
    storage.get("faceID").then((value) => {
      if (value === "true") {
        setFaceID(true);
      }
    });
    storage.get("theme-state").then((value) => {
      if (value === "dark") {
        setTheme("dark");
      }
    });
  };

  const SubscribeCAuth = () => {
    token_ref.on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        const val = snapshot.val() as AuthToken;
        if (val.locked) return;
        setAuthToken(snapshot.val());
      }
    });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        statusBarStyle: theme === "dark" ? "light" : "dark",
        statusBarColor: theme === "dark" ? "#1c1c1c" : "#fff",
        statusBarTranslucent: true,
      }}
    >
      {/* <Stack.Screen name="AuthNavigator" component={AuthNavigator} /> */}
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
