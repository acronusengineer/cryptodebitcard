import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  async set(key: string, value: any) {
    if (value === undefined) return;
    let stringify = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringify);
  },
  async get(key: string, defaultValue = null) {
    let stringify = await AsyncStorage.getItem(key);
    if (stringify === null) return defaultValue;
    return JSON.parse(stringify);
  },
  async clear() {
    AsyncStorage.clear();
  },
  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
  async getToken() {
    return await AsyncStorage.getItem(tokenKey);
  },
  async setToken(value: any) {
    await AsyncStorage.setItem(tokenKey, value);
  },
};

export const tokenKey = "_token";

export default storage;
