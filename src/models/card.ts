export interface Card {
    id: string;
    uid: string;
    name: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
    status: string;
    created: string;
}

export interface creditCardItem {
  symbol?: string,
  logo?: any,
  type?: string,
  cardNumber?: string,
  holderName?: string,
  expireDate?: string,
  cvv?: number,
}