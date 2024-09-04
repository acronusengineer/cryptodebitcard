import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { atom } from "recoil";
import { User, UserProfile } from "../models/user";

export const authState = atom<User | null>({
  key: "user",
  default: null,
});

export const profileState = atom<UserProfile | null>({
  key: "profile",
  default: null,
});

export const multiFactorResolver =
  atom<FirebaseAuthTypes.MultiFactorResolver | null>({
    key: "phoneResolver",
    default: null,
  });
