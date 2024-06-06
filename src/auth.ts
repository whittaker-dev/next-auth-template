import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { cookieKeys } from "./constants/cookieKeys";
import { EAuthProvider, IUser } from "./features/apis/interfaces";
import { authApi } from "./features/apis";
import { setCookies } from "./lib/serverActions/setCookies";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
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
          setCookies(data.data.user.accessToken);

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
      console.log("token", token);
      const _token = token as unknown as IUser;
      const data = await authApi.getUser(_token.accessToken);
      return {
        ...session,
        user: {
          ...session.user,
          ...data.user,
        },
      };
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async signIn({ account, user, credentials, profile }) {
      // console.log({ account, user, credentials, profile });

      if (account?.provider === "github") {
        const data = await authApi.handleLoginSocialAccount({
          id: profile?.id ?? "",
          avatar: String(profile?.avatar_url) ?? "",
          name: profile?.name ?? "",
          location: String(profile?.location) ?? "",
          provider: EAuthProvider.Github,
        });
        if (data.status !== "error") {
          setCookies(data.user.accessToken);
          return true;
        } else {
          throw new Error(data.message);
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
});
