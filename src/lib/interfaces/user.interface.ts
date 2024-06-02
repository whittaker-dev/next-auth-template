export enum ERoleUser {
  Dev = "Dev",
  Admin = "Admin",
}

export interface IUser {
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
