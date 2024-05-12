import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  email: string;
  access_token: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
