import { CardType } from "../components/card/Card";
import { decryptText } from "../services";
import { UserProfile } from "./user";

export interface AuthToken {
  auth_token: string;
  timestamp: number;
  locked?: boolean;
}

export interface Country {
  id: string;
  country_code: string;
  country_name: string;
  phonecode: string;
  status: string;
  is_iban: string;
  iso3: string;
  europe_country: string;
  solaris_iban: string;
  shipping_cost: string;
  flag?: string;
}

export interface Nationality {
  id: string;
  country_code: string;
  country_name: string;
  phonecode: string;
  status: string;
  is_iban: string;
}

export interface CodegoCustomer {
  country_of_residence: number;
  name: string;
  surname: string;
  mobile: string;
  email: string;
  password: string;

  country_id: number;
  dob: string;
  nationality: number;

  address: string;
  city: string;
  country: number;
  zipcode: string;
  is_same: number; //1 or 0

  receive_card_address: string;
  receive_card_capital: string;
  receive_card_city: string;
  receive_card_country: number;
  receive_card_zipcode: string;

  work_country: number;
  income_source: string;
  political_person: "Yes" | "No";
  country_pay_tax: number;
  tax_personal_number: string;
  gender: "Male" | "Female";
  ipaddress?: string;
}

export const GetCustomerFromProfile = (
  profile: UserProfile
): CodegoCustomer => {
  const res = { ...profile } as UserProfile;
  delete res.androidToken;
  delete res.uid;
  delete res.codegoId;
  delete res.step;
  delete res.iosToken;
  delete res.phonecode;
  delete res.verification;
  delete res.subscription;
  delete res.accountStatus;
  delete res.idDocStatus;
  delete res.addressDocStatus;
  delete res.kycStatus;

  res.password = decryptText(res.password);

  return res as CodegoCustomer;
};

export interface KYCDocument {
  id: string;
  name: string;
}

export interface KYCDocStatus {
  document_name: string;
  status: "Pending" | "Verified" | "Rejected";
}

export interface DebitCard {
  card_number: string;
  cvv: string;
  mm: string;
  yy: string;
}

export interface CodegoCardDetail {
  card_id?: string;
  card_number?: string;
  expiry_date?: string;
  card_status?: string;
  DailyLoadLimit?: string;
  DailyLoadFrequencyLimit?: string;
  card_lock?: string;
  balance?: string;
  card_image?: string;

  card_type?: CardType;
}

export interface CardTransaction {
  trx_type: string;
  fee: string;
  TxId: string;
  TransLink: string;
  total_amount: string;
  TxAmount: string;
  De043: string;
  Note: string;
  created: string;
  refund_date: string;
  name: string;
  surname: string;
  username: string;
}

export interface PrepaidCardTransaction {
  unique_id?: string;
  amount: string;
  currency: string;
  description: string;
  created: string;
  type: string;
}

export interface AccountDetail {
  name: string;
  surname: string;
  kyc_status: string;
  account_status: string;
}
export interface CodegoResponse {
  status?: number;
  message: string;
}
export interface CreateCustomerResp extends CodegoResponse {
  user_id: string;
}
export interface CardActivateResp extends CodegoResponse {
  card_pin: string;
}

export interface DebitTransactionResp {
  status: number;
  page_number: string;
  per_page: string;
  num_rows: string;
  data: CardTransaction[];
}

export interface PrepaidTransactionResp {
  status: number;
  total_page: string;
  previous_page: string;
  next_page: string;
  transaction_history: PrepaidCardTransaction[];
}

export interface PrepaidLoadCardResp extends CodegoResponse {
  id: string;
}

export interface GetCryptoCoinResp extends CodegoResponse {
  coin: CryptoCoin[];
}

export interface CryptoWalletAddressResp extends CodegoResponse {
  unique_id: string;
  wallet_address: string;
  coin: string;
  network: string;
}

export interface CryptoWalletListResp extends CodegoResponse{
  wallet: CryptoWallet[];
}

export interface CryptoWallet {
  unique_id: string;
  address: string;
  coin: string;
  network: string;
  contract: string;
  datetime: string;
}

export interface CryptoCoin {
  currency_name: string;
  name: string;
  image: string;
  eur_price: string;
  network_type: string;
  network_fee: string;
  network: string;
}
