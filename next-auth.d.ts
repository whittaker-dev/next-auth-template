import { IUser } from "@/features/apis/interfaces";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
export type ExtendedUser = DefaultSession["user"] & IUser;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User extends IUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
