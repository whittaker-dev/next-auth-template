export enum ERoleUser {
  Dev = "Dev",
  Admin = "Admin",
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
  accessToken: string;
}
