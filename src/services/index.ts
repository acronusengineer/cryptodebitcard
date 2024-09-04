import { firebase } from "@react-native-firebase/database";
import { Platform } from "react-native";
import { Card } from "../models/card";
import { User, UserProfile } from "../models/user";
import CryptoJS from "react-native-crypto-js";
import config from "../configs";
import axios from "axios";

export const SendVerificationURL =
  "https://sendverificationcode-yqczmykqxa-uc.a.run.app";

export const encryptText = (text: string) => {
  return CryptoJS.AES.encrypt(text, config.encrypt_key).toString();
};

export const decryptText = (encrypted: string) => {
  let bytes = CryptoJS.AES.decrypt(encrypted, config.encrypt_key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const SendPhoneVerification = async (uid: string, phone: string) => {
  const res = await axios.post(
    SendVerificationURL,
    {
      uid,
      phone,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const CreateUserProfile = async (
  user: User,
  password: string
): Promise<UserProfile> => {
  const encryptedPassword = encryptText(password);
  const ref = firebase.database().ref(`/users/${user.uid}`);
  const patch: Partial<UserProfile> = {
    uid: user.uid,
    email: user.email,
    password: encryptedPassword,
    step: "email",
  };
  await ref.update(patch);
  const updated = await ref.once("value");
  return updated.val() as UserProfile;
};

export const UpdateUserProfile = async (
  uid: string,
  patch: Partial<UserProfile>
) => {
  const ref = firebase.database().ref(`/users/${uid}`);
  await ref.update(patch);
  const value = await ref.once("value");
  return value.val() as UserProfile;
};

export const GetUserProfile = async (uid: string) => {
  const ref = firebase.database().ref(`/users/${uid}`);
  const value = await ref.once("value");
  return value.val() as UserProfile;
};

export const GetCards = (uid: string): Promise<Card[]> => {
  return new Promise((resolve) => {
    const ref = firebase.database().ref(`/users/${uid}/cards`);
    ref
      .once("value")
      .then((res) => {
        if (!res) resolve([]);
        const data = res.val();
        const cards: Card[] = [];
        Object.keys(data).forEach((id) => {
          const detail: Card = (data as any)[id] as Card;
          cards.push({ ...detail, id: id });
        });
        resolve(cards);
      })
      .catch((_) => {
        resolve([]);
      });
  });
};

export const UpdateDeviceToken = (
  uid: string,
  token: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const ref = firebase.database().ref(`/users/${uid}`);
    const toUpdate: any = {};
    toUpdate[Platform.OS + "Token"] = token;
    ref
      .update(toUpdate)
      .then(() => {
        resolve(true);
      })
      .catch((_) => {
        resolve(false);
      });
  });
};
