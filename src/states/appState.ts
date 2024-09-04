import { atom } from "recoil";

export const themeState = atom<string>({
  key: "theme",
  default: "light",
});

export const faceIDState = atom<boolean>({
  key: "face_id",
  default: false,
});
