import { EAuthProvider } from "./user.interface";

export interface IPayloadSignUp {
  avatar: File | null;
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IPayloadSignIn {
  email: string;
  password: string;
}

export interface IPayloadAuthSocial {
  id?: string;
  name?: string;
  email?: string;
  location?: string;
  avatar?: string;
  provider: EAuthProvider;
}
