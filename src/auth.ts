import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
async function getUser(email: string, password: string): Promise<any> {
  return {
    id: 1,
    name: "test user",
    email: email,
    password: password,
  };
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials });

        const user = await getUser(
          credentials.email as string,
          credentials.password as string
        );
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log({ session, token });

      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
