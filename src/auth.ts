import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { cookieKeys } from "./constants/cookieKeys";

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
        try {
          const { email, password } = credentials;

          console.log({ email, password });
          if (!email || !password) {
            return null;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );
          const data = await res.json();

          if (data.status === "error") {
            throw new Error(data.message);
          }
          cookies().set({
            name: `${cookieKeys.accessToken}`,
            value: data.data.user.accessToken,
            httpOnly: true,
            sameSite: "strict",
            secure: false,
          });

          return data.data.user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      console.log("Session", session);
      console.log("Token", token);
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
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
});
