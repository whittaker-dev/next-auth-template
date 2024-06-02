import { IUser } from "@/features/apis/interfaces";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & IUser;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
