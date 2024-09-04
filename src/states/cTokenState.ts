import { atom } from "recoil";
import { AuthToken } from "../models/codego";

export const cTokenState = atom<AuthToken | null>({
  key: "cAuthToken",
  default: null,
});
