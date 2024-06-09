export enum ERoleUser {
  Dev = "Dev",
  Admin = "Admin",
}

export enum EAuthProvider {
  Github = "Github",
  Google = "Google",
  Apple = "Apple",
  Discord = "Discord",
  Twitter = "Twitter",
  EmailPassword = "EmailPassword",
}

export interface IPayloadUpdateUser extends Partial<IUser> {}

export interface IUser {
  id: string;
  name: string;
  displayName: string;
  userName: string;
  avatar: string;
  email: string;
  websiteUrl: string;
  bio: string;
  location: string;
  role: ERoleUser;
  authProvider: EAuthProvider;
  authProviderId: string;
  accessToken: string;
  refreshToken: string;
}
