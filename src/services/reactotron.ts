import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';

let scriptHostname;
if (__DEV__) {
  const {scriptURL} = NativeModules.SourceCode;
  [scriptHostname] = scriptURL.split('://')[1].split(':');
}

if (__DEV__) {
  (Reactotron as any)
    .setAsyncStorageHandler(AsyncStorage)
    .configure({host: scriptHostname})
    .useReactNative()
    .connect();
}
declare global {
  interface Console {
    tron: any;
  }
}
console.tron = Reactotron;
