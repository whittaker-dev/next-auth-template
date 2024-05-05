export interface IPayloadSignUp {
  image: string | File | null;
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
