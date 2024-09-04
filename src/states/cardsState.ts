import { atom } from "recoil";
import { CodegoCardDetail } from "../models/codego";
import { creditCardItem } from "../models/card";

export const debitCardsState = atom<CodegoCardDetail[]>({
  key: "debitcards",
  default: [],
});

export const prepaidCardsState = atom<CodegoCardDetail[]>({
  key: "prepaidcards",
  default: [],
});

export const creditCardsState = atom<creditCardItem[]>({
  key: "creditCards",
  default: [
    {
      cardNumber: "4917 3456 7890 1234",
      type: "Visa",
      holderName: "Hans Mario",
      expireDate: "09/27",
      cvv: 234,
    },
    {
      cardNumber: "5432 1098 7654 3210",
      type: "MasterCard",
      holderName: "Gary James",
      expireDate: "11/27",
      cvv: 657,
    }
  ],
});

export const selectedPaymentState = atom<number | undefined>({
  key: "selectedPayment",
  default: undefined,
});
