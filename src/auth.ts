import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { AdapterAccount } from "next-auth/adapters";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await db.user.findUnique({
          where: { email: email as string },
        });

        const isValidPassword = await bcrypt.compare(
          String(password),
          user?.password as string
        );

        if (isValidPassword) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log({ token });
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    signIn({ account, user, credentials, profile }) {
      console.log({ account, user, credentials, profile });
      if (account?.provider === "github") {
        console.log("user id", profile?.id);
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  // adapter: PrismaAdapter(db),
});
