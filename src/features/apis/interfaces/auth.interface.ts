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
