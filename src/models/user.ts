import { CodegoCustomer } from "./codego";

export interface User {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous?: boolean;
  phoneNumber?: string;
  photoURL?: string;
  refreshToken?: string;
}

export interface UserProfile extends CodegoCustomer {
  androidToken?: string;
  iosToken?: string;
  step?: string;
  phonecode?: string;
  codegoId?: string;
  uid?: string;
  verification?: string;
  avatar?: number;

  subscription?: string;
  accountStatus?: string;
  idDocStatus?: string;
  addressDocStatus?: string;
  kycStatus?: string;
}
